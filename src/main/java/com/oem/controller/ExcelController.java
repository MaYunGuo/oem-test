package com.oem.controller;

import com.oem.dao.IRetBoxInfoRepository;
import com.oem.entity.Ret_box_info;
import com.oem.service.brm.IFbpretboxService;
import com.oem.service.brm.impl.FbpretboxService;
import com.oem.tx.brm.Fbpretbox.FbpretboxI;
import com.oem.tx.brm.Fbpretbox.FbpretboxO;
import com.oem.util.AppContext;
import com.oem.util.JacksonUtil;
import com.oem.util.StringUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.io.*;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;

import static com.oem.comdef.GenericDef.*;
import static com.oem.comdef.GenericDef.RETURN_CODE_OK;
import static com.oem.comdef.GenericDef.RETURN_MESG_OK;

/**
 * Created by ghost on 2019/3/6.
 */
@Controller
public class ExcelController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private IRetBoxInfoRepository retBox;

    @RequestMapping(value = "/download.do")
    public void downloadModel(HttpServletRequest request, HttpServletResponse response, HttpSession session,String filePath,String fileName) throws IOException {
        if (StringUtils.isEmpty(fileName)) {
            fileName = "NameUndefined";
        }
//        String temp1 = File.separator;//路径分隔符("\\")
        String url = filePath + "/" + fileName;
//        String url = session.getServletContext().getRealPath("/") + "excelFile\\机台接触脚位模板.xlsx";
        System.out.println("filedownload =" + url);
        export(request, response, url, fileName);
    }

    @RequestMapping(value = "/upload.do")
    @ResponseBody
    @Transactional
    public String uploadExcel(@RequestParam(value = "file", required = false) MultipartFile file, String trx_id, String action_flg) throws IOException {

        FbpretboxI inTrx = new FbpretboxI();
        inTrx.setTrx_id(trx_id);
        inTrx.setAction_flg(action_flg);
        inTrx.setFile(file);
        logger.info("[InTrx:"+inTrx.toString()+"]");

        String strOutTrx = null;
        FbpretboxO outTrx = new FbpretboxO();
        outTrx.setTrx_id(TX_FBPRETBOX);
        outTrx.setType_id(TRX_TYPE_OUT);
        outTrx.setRtn_code(RETURN_CODE_OK);
        outTrx.setRtn_mesg(RETURN_MESG_OK);
        try {
            long rtn_code = uploadFile(inTrx,outTrx);
            if (rtn_code != _NORMAL) {
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
            outTrx.setRtn_mesg(ex.getCause().toString());
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        } finally {
            strOutTrx = JacksonUtil.toJSONStr(outTrx);
            logger.info("[OutTrx:" + strOutTrx + "]");
        }
        return strOutTrx;
    }


    public void export(HttpServletRequest request, HttpServletResponse response,String url,String fileName) throws IOException {
        response.setContentType("application/octet-stream");
        if (request.getHeader("user-agent").toLowerCase().indexOf("firefox") > -1) {
            //火狐浏览器自己会对URL进行一次URL转码所以区别处理
            response.setHeader("Content-Disposition", "attachment;filename="
                    + new String(fileName.getBytes("utf-8"), "ISO-8859-1"));
        } else {
            response.setHeader("Content-Disposition", "attachment;filename="
                    + URLEncoder.encode(fileName,"utf-8"));        }
        //新建文件输入输出流
        OutputStream output = null;
        FileInputStream fis = null;
        try{

            File f = new File(url);//新建File对象
            output = response.getOutputStream();//新建文件输入输出流对象
            fis = new FileInputStream(f);
            byte[] b = new byte[(int)f.length()]; //设置每次写入缓存大小

            //把输出流写入客户端
            int i = 0;
            while((i = fis.read(b)) > 0){
                output.write(b, 0, i);
            }
            output.flush();
        }
        catch(Exception e){
            e.printStackTrace();
        }
        finally
        {
            if(fis != null)
            {
                fis.close();
                fis = null;
            }
            if(output != null)
            {
                output.close();
                output = null;
            }
        }
    }


    public long uploadFile(FbpretboxI inTrx, FbpretboxO outTrx) {
        MultipartFile file = inTrx.getFile();
        String fileName = file.getOriginalFilename();
        if (fileName.matches("^.+\\.(?i)((xls)|(xlsx))$")) {
            try {
                //读取文件
                Workbook workbook = readFile(file, fileName);
                //处理数据
                HashMap<String, String> excelData = getExcelData(workbook);
                //操作数据库
                updateGradeByExcelData(excelData);
            } catch (Exception e) {
                logger.error(e.getMessage());
                outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
                outTrx.setRtn_mesg(e.getMessage());
                return _ERROR;
            }
        } else {
            outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
            outTrx.setRtn_mesg("文件格式不正确！");
            logger.error("文件格式不正确！");
            return _ERROR;
        }
        return _NORMAL;
    }

    private void updateGradeByExcelData(HashMap<String, String> excelData) throws Exception{
        StringBuffer boxIdList = new StringBuffer();
        excelData.forEach((box_id, oqc_grade) -> boxIdList.append("'" + box_id + "',"));
        boxIdList.deleteCharAt(boxIdList.length()-1);

        //判断是否已经判定
        String existBoxGradeSQL="from Ret_box_info where box_id in("+boxIdList+") and oqc_grade is not null";
        List<Ret_box_info> existBoxGradeList=retBox.find(existBoxGradeSQL);
        if(!existBoxGradeList.isEmpty()) throw new Exception("箱号 为 "+existBoxGradeList.get(0).getBox_id()+" 已经判定，请修改EXCEL！");

        //update 已经存在的数据
        String existBoxSQL="from Ret_box_info where box_id in("+boxIdList+")";
        List<Ret_box_info> existBoxList=retBox.find(existBoxSQL);
        existBoxList.forEach(e->{
            e.setOqc_grade(excelData.get(e.getBox_id()));
            retBox.update(e);
            excelData.remove(e.getBox_id());
        });

        //insert 新数据
        if(!excelData.isEmpty()){
            excelData.forEach((box_id, oqc_grade)->{
                Ret_box_info ret_box_info=new Ret_box_info();
                ret_box_info.setBox_id(box_id);
                ret_box_info.setOqc_grade(oqc_grade);
                retBox.save(ret_box_info);
            });
        }
    }


    private Workbook readFile(MultipartFile file, String fileName) throws Exception {
        Workbook workbook;
        try {
            InputStream in;
            boolean is03Excel = fileName.matches("^.+\\.(?i)(xls)$");
            in = file.getInputStream();
            //1、读取工作簿
            workbook = is03Excel ? new HSSFWorkbook(in) : new XSSFWorkbook(in);
        } catch (Exception e) {
            logger.error(e.toString());
            throw new Exception("文件类型异常");
        }
        return workbook;
    }

    private HashMap<String, String> getExcelData(Workbook workbook) throws Exception {
        HashMap<String, String> boxGradeList = new HashMap<>();

        Sheet sheet = workbook.getSheetAt(0);
        if (sheet.getPhysicalNumberOfRows() > 1) {
            for (int k = 1; k <= sheet.getLastRowNum(); k++) {
                String box_id;
                String oqc_grade;
                Row row = sheet.getRow(k);
                Cell cell0 = row.getCell(0);
                cell0.setCellType(Cell.CELL_TYPE_STRING);
                if (cell0 != null && !"".equals(cell0.getStringCellValue())) {
                    box_id = cell0.getStringCellValue();
                } else {
                    throw new Exception("第" + (k + 1) + " 行 箱号 为空,请确认！");
                }

                Cell cell1 = row.getCell(1);
                cell1.setCellType(Cell.CELL_TYPE_STRING);
                if (cell1 != null && !"".equals(cell1.getStringCellValue())) {
                    oqc_grade = cell1.getStringCellValue();
                    if (!"OK".equals(oqc_grade) && !"NG".equals(oqc_grade))
                        throw new Exception("第" + (k + 1) + " 行 判定类型 为空,请确认！");
                } else {
                    throw new Exception("第" + (k + 1) + " 行 判定 为空,请确认！");
                }

                if (!boxGradeList.isEmpty() && null != boxGradeList.get(box_id))
                    throw new Exception("第" + (k + 1) + " 行 箱号出现重复,请确认！");
                boxGradeList.put(box_id, oqc_grade);
            }
        } else {
            throw new Exception("Excel 数据 为空,请确认！");
        }
        return boxGradeList;
    }
}
