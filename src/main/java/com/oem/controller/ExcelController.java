package com.oem.controller;

import com.alibaba.fastjson.JSONObject;
import com.oem.base.tx.BaseO;
import com.oem.dao.IOemPrdBoxRepository;
import com.oem.entity.Oem_prd_box;
import com.oem.service.ISendMessageService;
import com.oem.tx.brm.Fbpretbox.FbpretboxI;
import com.oem.tx.brm.Fbpretbox.FbpretboxIA;
import com.oem.tx.brm.Fbpretbox.FbpretboxO;
import com.oem.tx.brm.Fbpretlot.FbpretlotI;
import com.oem.tx.brm.Fbpretlot.FbpretlotIA;
import com.oem.tx.brm.Fbpretmtrl.FbpretmtrlI;
import com.oem.tx.brm.Fbpretmtrl.FbpretmtrlIA;
import com.oem.util.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.*;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import static com.oem.comdef.GenericDef.*;
import static com.oem.comdef.GenericDef.RETURN_CODE_OK;
import static com.oem.comdef.GenericDef.RETURN_MESG_OK;
import static com.oem.comdef.GenericStaticDef.MODEL_PATH;

/**
 * Created by ghost on 2019/3/6.
 */
@RestController
public class ExcelController {

    @Autowired
    private ISendMessageService sendMessageService;

    private LogUtils logUtil = new LogUtils(ExcelController.class);
    @Autowired
    private IOemPrdBoxRepository oemPrdBox;

    @RequestMapping(value = "/download.do")
    public void downloadModel(HttpServletRequest request, HttpServletResponse response, String fileName) throws IOException {
        if (StringUtils.isEmpty(fileName)) {
            fileName = "NameUndefined";
        }
        String filePath = MODEL_PATH + File.separator + fileName;
        export(request, response, filePath, fileName);
    }

    @RequestMapping(value = "/upload.do")
    @ResponseBody
    @Transactional
    public String uploadExcel(@RequestParam(value = "file", required = false) MultipartFile file, String trx_id, String action_flg,String data_type) throws IOException {

        FbpretboxI inTrx = new FbpretboxI();
        inTrx.setTrx_id(trx_id);
        inTrx.setAction_flg(action_flg);
        inTrx.setFile(file);
        logUtil.info("[InTrx:"+inTrx.toString()+"]");

        String strOutTrx = null;
        FbpretboxO outTrx = new FbpretboxO();
        outTrx.setTrx_id(TX_FBPRETBOX);
        outTrx.setType_id(TRX_TYPE_OUT);
        outTrx.setRtn_code(RETURN_CODE_OK);
        outTrx.setRtn_mesg(RETURN_MESG_OK);
        try {
            long rtn_code = uploadFile(inTrx,outTrx,data_type);
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
            logUtil.info("[OutTrx:" + strOutTrx + "]");
        }
        return strOutTrx;
    }


    public void export(HttpServletRequest request, HttpServletResponse response,String url,String fileName){
        response.setContentType("application/octet-stream");
        try{
            if (request.getHeader("user-agent").toLowerCase().indexOf("firefox") > -1) {
                //火狐浏览器自己会对URL进行一次URL转码所以区别处理
                response.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("utf-8"), "ISO-8859-1"));
            } else {
                response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName,"utf-8"));
            }
        }catch (UnsupportedEncodingException e) {
            logUtil.info(StringUtil.stackTraceToString(e));
        }
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
            logUtil.info(StringUtil.stackTraceToString(e));
        }finally {
            if(fis != null){
                try {
                    fis.close();
                } catch (IOException e) {
                    logUtil.info(StringUtil.stackTraceToString(e));
                }
            }
            if(output != null) {
                try {
                    output.close();
                } catch (IOException e) {
                    logUtil.info(StringUtil.stackTraceToString(e));
                }

            }
        }
    }


    public long uploadFile(FbpretboxI inTrx, FbpretboxO outTrx,String data_type) {
        MultipartFile file = inTrx.getFile();
        String fileName = file.getOriginalFilename();
        if (fileName.matches("^.+\\.(?i)((xls)|(xlsx))$")) {
            try {
                //读取文件
                Workbook workbook = ExcelUtil.readExcel(file);
                //处理数据
                HashMap<String, String> excelData =new HashMap<>();
                if("M1600".equals(data_type))excelData=getOqcGradeExcelData(workbook);
                if("M1601".equals(data_type))excelData=getOqcShipExcelData(workbook);
                //操作数据库
                if("M1600".equals(data_type)) updateOqcGradeByExcelData(excelData);
                if("M1601".equals(data_type))updateOqcShipByExcelData(excelData);
            } catch (Exception e) {
                logUtil.error(StringUtil.stackTraceToString(e));
                outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
                outTrx.setRtn_mesg(e.getMessage());
                return _ERROR;
            }
        } else {
            outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
            outTrx.setRtn_mesg("文件格式不正确！");
            logUtil.error("文件格式不正确！");
            return _ERROR;
        }
        return _NORMAL;
    }




    private HashMap<String, String> getOqcGradeExcelData(Workbook workbook) throws Exception {
        HashMap<String, String> boxGradeList = new HashMap<>();

        Sheet sheet = workbook.getSheetAt(0);
        if (sheet.getPhysicalNumberOfRows() > 1) {
            for (int k = 1; k <= sheet.getLastRowNum(); k++) {
                String box_no;
                String oqc_grade;
                Row row = sheet.getRow(k);
                Cell cell0 = row.getCell(0);
                cell0.setCellType(Cell.CELL_TYPE_STRING);
                if (cell0 != null && !"".equals(cell0.getStringCellValue())) {
                    box_no = cell0.getStringCellValue();
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

                if (!boxGradeList.isEmpty() && null != boxGradeList.get(box_no))
                    throw new Exception("第" + (k + 1) + " 行 箱号出现重复,请确认！");
                boxGradeList.put(box_no, oqc_grade);
            }
        } else {
            throw new Exception("Excel 数据 为空,请确认！");
        }
        return boxGradeList;
    }

    private HashMap<String, String> getOqcShipExcelData(Workbook workbook) throws Exception {
        HashMap<String, String> boxShipList = new HashMap<>();

        Sheet sheet = workbook.getSheetAt(0);
        if (sheet.getPhysicalNumberOfRows() > 1) {
            for (int k = 1; k <= sheet.getLastRowNum(); k++) {
                String box_no;
                String ship_statu="Y";
                Row row = sheet.getRow(k);
                Cell cell0 = row.getCell(0);
                cell0.setCellType(Cell.CELL_TYPE_STRING);
                if (cell0 != null && !"".equals(cell0.getStringCellValue())) {
                    box_no = cell0.getStringCellValue();
                } else {
                    throw new Exception("第" + (k + 1) + " 行 箱号 为空,请确认！");
                }
                boxShipList.put(box_no, ship_statu);
            }
        } else {
            throw new Exception("Excel 数据 为空,请确认！");
        }
        return boxShipList;
    }

    private void updateOqcGradeByExcelData(HashMap<String, String> excelData) throws Exception{
        StringBuffer boxIdList = new StringBuffer();
        excelData.forEach((box_no, oqc_grade) -> boxIdList.append("'" + box_no + "',"));
        boxIdList.deleteCharAt(boxIdList.length()-1);

        //判断是否已经判定
        String existBoxGradeSQL="from Oem_prd_box where box_no in("+boxIdList+") and oqc_grade is not null";
        List<Oem_prd_box> existBoxGradeList=oemPrdBox.find(existBoxGradeSQL);
        if(!existBoxGradeList.isEmpty()) throw new Exception("箱号 为 "+existBoxGradeList.get(0).getBox_no()+" 已经判定，请修改EXCEL！");

        //update 已经存在的数据
        String existBoxSQL="from Oem_prd_box where box_no in("+boxIdList+")";
        List<Oem_prd_box> existBoxList=oemPrdBox.find(existBoxSQL);
        existBoxList.forEach(e->{
            e.setOqc_grade(excelData.get(e.getBox_no()));
            oemPrdBox.update(e);
            excelData.remove(e.getBox_no());
        });

        //insert 新数据
        if(!excelData.isEmpty()){
            excelData.forEach((box_no, oqc_grade)->{
                Oem_prd_box oem_prd_box=new Oem_prd_box();
                oem_prd_box.setBox_no(box_no);
                oem_prd_box.setOqc_grade(oqc_grade);
                oemPrdBox.save(oem_prd_box);
            });
        }
    }

    private void updateOqcShipByExcelData(HashMap<String, String> excelData) throws Exception{
        StringBuffer boxIdList = new StringBuffer();
        excelData.forEach((box_no, ship_statu) -> boxIdList.append("'" + box_no + "',"));
        boxIdList.deleteCharAt(boxIdList.length()-1);

        //判断是否已经出货
        String existBoxShipSQL="from Oem_prd_box where box_no in("+boxIdList+") and ship_statu ='Y'";
        List<Oem_prd_box> existBoxShipList=oemPrdBox.find(existBoxShipSQL);
        if(!existBoxShipList.isEmpty()) throw new Exception("箱号 为 "+existBoxShipList.get(0).getBox_no()+" 已经出货，请修改EXCEL！");

        //update 已经存在的数据
        String existBoxSQL="from Oem_prd_box where box_no in("+boxIdList+")";
        List<Oem_prd_box> existBoxList=oemPrdBox.find(existBoxSQL);
        existBoxList.forEach(e->{
            e.setShip_statu(excelData.get(e.getBox_no()));
            oemPrdBox.update(e);
            excelData.remove(e.getBox_no());
        });

        //insert 新数据
        if(!excelData.isEmpty()){
            excelData.forEach((box_no, ship_statu)->{
                Oem_prd_box oem_prd_box=new Oem_prd_box();
                oem_prd_box.setBox_no(box_no);
                oem_prd_box.setShip_statu(ship_statu);
                oemPrdBox.save(oem_prd_box);
            });
        }
    }

    @RequestMapping("/uploadExcel.do")
    public String uploadExcel(String trx_id, String action_flg, String evt_usr, String data_type, MultipartFile upload_file){

        String evt_no = GUIDGenerator.javaGUID();
        AppContext.setCurrEventNumber(evt_no);
        AppContext.setCurrServiceName(ExcelController.class.getSimpleName());

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("trx_id",trx_id);
        jsonObject.put("action_flg",action_flg);
        jsonObject.put("evt_usr",evt_usr);
        jsonObject.put("data_type",data_type);
        jsonObject.put("file_name", upload_file.getOriginalFilename());
        logUtil.info("inTrx:[" + JacksonUtil.toJSONStr(jsonObject) +"]");

        String  rtn_mesg = analyExcel(trx_id, action_flg, evt_usr, data_type, upload_file);
        logUtil.info("outTrx:[" + rtn_mesg +"]");
        return rtn_mesg;
    }

    public String analyExcel(String trx_id, String action_flg, String evt_usr, String data_type, MultipartFile upload_file){

        BaseO ouTrx = new BaseO();
        ouTrx.setRtn_code(RETURN_CODE_OK);
        ouTrx.setRtn_mesg(RETURN_MESG_OK);
        try {
            Workbook workbook  = ExcelUtil.readExcel(upload_file);
            List<String[]> excelData = ExcelUtil.getExcelData(workbook);
            if(excelData == null || excelData.isEmpty()){
                ouTrx.setRtn_code(E_EXCEL_ANALY_EXCEL_IS_EMPTY + _SPACE);
                ouTrx.setRtn_mesg("excel是空的，请确认");
                return JacksonUtil.toJSONStr(ouTrx);
            }
            workbook.close();
            String rtn_mesg = uploadExcelData(data_type, trx_id, action_flg, evt_usr, excelData);
            if(!StringUtil.isSpaceCheck(rtn_mesg)){
                return rtn_mesg;
            }
        } catch (Exception e) {
            ouTrx.setRtn_code(E_EXCEL_ANALY_CAN_NOT_GET_WORKBOOK + _SPACE);
            ouTrx.setRtn_mesg("无法解析EXCEL,请确认excel格式是否正确");

        }
        return JacksonUtil.toJSONStr(ouTrx);
    }

    private String uploadExcelData(String data_typ, String trx_id, String action_flg, String evt_usr, List<String[]> dataList){
        String inTrxStr = null;
        switch(data_typ){
            case "I": //IV数据
                inTrxStr = dealIvData(trx_id, action_flg, evt_usr, dataList);
                break;
            case "F":  // 终检数据
                inTrxStr = dealFinData(trx_id, action_flg, evt_usr, dataList);
                break;
            case "P":
                inTrxStr = dealPackData(trx_id, action_flg, evt_usr, dataList);
                break; //包装
            case "O" : //OQC
                inTrxStr = dealOqcData(trx_id, action_flg, evt_usr, dataList);
                break;
            case "S":  //出货
                inTrxStr = dealShipData(trx_id, action_flg, evt_usr, dataList);
                break;
            case "M":  //扣料信息
                inTrxStr = dealMtrlData(trx_id, action_flg, evt_usr, dataList);
                break;
            default:
                break;
        }
        if(inTrxStr != null){
            String rtnMesg = sendMessageService.sendMesage(trx_id, AppContext.getCurrEventNumber(), inTrxStr);
            return rtnMesg;
        }
        return null;
    }

    private String dealIvData(String trx_id, String action_flg, String evt_usr, List<String[]> dataList){
        FbpretlotI fbpretlotI = new FbpretlotI();
        fbpretlotI.setTrx_id(trx_id);
        fbpretlotI.setAction_flg(action_flg);
        fbpretlotI.setEvt_usr(evt_usr);

        List<FbpretlotIA> iary = new ArrayList<>();
        for(String[] strings: dataList){
            FbpretlotIA fbpretlotIA =  new FbpretlotIA();
            fbpretlotIA.setLot_no(strings[0]);
            fbpretlotIA.setIv_power(BigDecimal.valueOf(Double.valueOf(strings[1])));
            fbpretlotIA.setIv_isc(BigDecimal.valueOf(Double.valueOf(strings[2])));
            fbpretlotIA.setIv_voc(BigDecimal.valueOf(Double.valueOf(strings[3])));
            fbpretlotIA.setIv_imp(BigDecimal.valueOf(Double.valueOf(strings[4])));
            fbpretlotIA.setIv_vmp(BigDecimal.valueOf(Double.valueOf(strings[5])));
            fbpretlotIA.setIv_ff(BigDecimal.valueOf(Double.valueOf(strings[6])));
            fbpretlotIA.setIv_tmper(BigDecimal.valueOf(Double.valueOf(strings[7])));
            fbpretlotIA.setIv_adj_versioni(strings[8]);
            fbpretlotIA.setIv_timestamp(DateUtil.Date2Timestamp(new Date(strings[9])));
            iary.add(fbpretlotIA);
        }
        fbpretlotI.setIary(iary);

        return JacksonUtil.toJSONStr(fbpretlotI);
    }

    private String dealFinData(String trx_id, String action_flg, String evt_usr, List<String[]> dataList){


        FbpretlotI fbpretlotI = new FbpretlotI();
        fbpretlotI.setTrx_id(trx_id);
        fbpretlotI.setAction_flg(action_flg);
        fbpretlotI.setEvt_usr(evt_usr);

        List<FbpretlotIA> iary = new ArrayList<>();
        for(String[] strings: dataList){
            FbpretlotIA fbpretlotIA =  new FbpretlotIA();
            fbpretlotIA.setLot_no(strings[0]);
            fbpretlotIA.setFinal_grade(strings[1]);
            fbpretlotIA.setFinal_power(strings[2]);
            fbpretlotIA.setFinal_color(strings[3]);
            iary.add(fbpretlotIA);
        }
        fbpretlotI.setIary(iary);

        return JacksonUtil.toJSONStr(fbpretlotI);
    }

    private String dealPackData(String trx_id, String action_flg, String evt_usr, List<String[]> dataList){

        FbpretlotI fbpretlotI = new FbpretlotI();
        fbpretlotI.setTrx_id(trx_id);
        fbpretlotI.setAction_flg(action_flg);
        fbpretlotI.setEvt_usr(evt_usr);

        List<FbpretlotIA> iary = new ArrayList<>();
        for(String[] strings: dataList){
            FbpretlotIA fbpretlotIA =  new FbpretlotIA();
            fbpretlotIA.setBox_no(strings[0]);
            fbpretlotIA.setLot_no(strings[1]);
            iary.add(fbpretlotIA);
        }
        fbpretlotI.setIary(iary);
        return JacksonUtil.toJSONStr(fbpretlotI);
    }

    private String dealOqcData(String trx_id, String action_flg, String evt_usr, List<String[]> dataList){

        FbpretboxI fbpretboxI = new FbpretboxI();
        fbpretboxI.setTrx_id(trx_id);
        fbpretboxI.setAction_flg(action_flg);
        fbpretboxI.setEvt_usr(evt_usr);
        List<FbpretboxIA> iary = new ArrayList<>();
        for(String[] strings: dataList){
            FbpretboxIA fbpretboxIA =  new FbpretboxIA();
            fbpretboxIA.setBox_no(strings[0]);
            fbpretboxIA.setOqc_grade(strings[1]);
            iary.add(fbpretboxIA);
        }
        fbpretboxI.setIary(iary);
        return JacksonUtil.toJSONStr(fbpretboxI);
    }

    private String dealShipData(String trx_id, String action_flg, String evt_usr, List<String[]> dataList){
        FbpretboxI fbpretboxI = new FbpretboxI();
        fbpretboxI.setTrx_id(trx_id);
        fbpretboxI.setAction_flg(action_flg);
        fbpretboxI.setEvt_usr(evt_usr);
        List<FbpretboxIA> iary = new ArrayList<>();
        for(String[] strings: dataList){
            FbpretboxIA fbpretboxIA =  new FbpretboxIA();
            fbpretboxIA.setBox_no(strings[0]);
            iary.add(fbpretboxIA);
        }
        fbpretboxI.setIary(iary);
        return JacksonUtil.toJSONStr(fbpretboxI);
    }

    private String dealMtrlData(String trx_id, String action_flg, String evt_usr, List<String[]> dataList){
        FbpretmtrlI fbpretmtrlI = new FbpretmtrlI();
        fbpretmtrlI.setTrx_id(trx_id);
        fbpretmtrlI.setAction_flg(action_flg);
        fbpretmtrlI.setEvt_usr(evt_usr);
        List<FbpretmtrlIA> iary = new ArrayList<>();
        for(String[] strings: dataList){
            FbpretmtrlIA fbpretmtrlIA =  new FbpretmtrlIA();
            fbpretmtrlIA.setLot_no(strings[0]);
            fbpretmtrlIA.setMtrl_no(strings[1]);
            fbpretmtrlIA.setMtrl_vender(strings[2]);
            fbpretmtrlIA.setMtrl_power(BigDecimal.valueOf(Double.valueOf(strings[3])));
            fbpretmtrlIA.setMtrl_color(strings[4]);
            fbpretmtrlIA.setMtrl_model(strings[5]);
            iary.add(fbpretmtrlIA);
        }
        fbpretmtrlI.setIary(iary);
        return JacksonUtil.toJSONStr(fbpretmtrlI);
    }
}
