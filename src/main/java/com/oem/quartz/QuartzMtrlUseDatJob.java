package com.oem.quartz;

import com.oem.dao.IOemMtrlUseRepository;
import com.oem.dao.IOemPrdLotRepository;
import com.oem.entity.Oem_mtrl_use;
import com.oem.entity.Oem_prd_lot;
import com.oem.util.*;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.io.File;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import static com.oem.comdef.GenericDef._SPACE;
import static com.oem.comdef.GenericStaticDef.FTP_PATH;

public class QuartzMtrlUseDatJob extends QuartzJobBean {

    private LogUtils logUtils;

    @Autowired
    private IOemMtrlUseRepository oemMtrlUseRepository;

    @Override
    @Transactional
    public void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {

        logUtils = new LogUtils(QuartzMtrlUseDatJob.class);
        AppContext.setCurrEventNumber(GUIDGenerator.javaGUID());
        AppContext.setCurrServiceName(QuartzMtrlUseDatJob.class.getSimpleName());


        JobDataMap dataMap = jobExecutionContext.getJobDetail().getJobDataMap();
        String task_name = (String) dataMap.get("task_name");
        String task_path = FTP_PATH  + File.separator + task_name + File.separator + "EXCEL" + File.separator + "MTRL";
        long startTimes = System.currentTimeMillis();
        logUtils.info(task_name + "物料使用数据解析开始执行---------------------------");

        File filePath = new File(task_path);
        String realPath = null;
        Workbook wb = null;
        Sheet sheet = null;
        Row row = null;
        Timestamp cr_timestamp = DateUtil.getCurrentTimestamp();
        if(filePath.exists() && filePath.isDirectory()){
            File[] allFiles =  filePath.listFiles();
            for(File finalInsFile : allFiles){
                realPath = finalInsFile.getAbsolutePath();
                try {
                    wb = ExcelUtil.readExcel(realPath);
                    if(wb == null){
                        logUtils.info(task_name +"解析物料使用数据,文件:["+ realPath +"]不存在");
                        continue;
                    }
                    //获取第一个sheet
                    sheet = wb.getSheetAt(0);
                    //获取最大行数
                    int rownum = sheet.getPhysicalNumberOfRows();
                    //获取最大列数
                    String lot_no = _SPACE;
                    String mtrl_no = _SPACE;
                    String mtrl_vender = _SPACE;
                    String mtrl_power = _SPACE;
                    String mtrl_color = _SPACE;
                    String mtrl_model = _SPACE;

                    for (int i = 1; i<rownum; i++) {
                        row = sheet.getRow(i);
                        if(row == null){
                            continue;
                        }
                        lot_no = ExcelUtil.getCellValue(row.getCell(0));
                        mtrl_no = ExcelUtil.getCellValue(row.getCell(1));
                        mtrl_vender = ExcelUtil.getCellValue(row.getCell(2));
                        mtrl_power = ExcelUtil.getCellValue(row.getCell(3));
                        mtrl_color = ExcelUtil.getCellValue(row.getCell(4));
                        mtrl_model = ExcelUtil.getCellValue(row.getCell(5));
                        if(StringUtil.isSpaceCheck(lot_no)){
                            logUtils.info(task_name +"解析无聊使用数据，文件["+ finalInsFile.getName() +"]第[" + i+ "]行批次号为空") ;
                            continue;
                        }
                        if(StringUtil.isSpaceCheck(mtrl_no)){
                            logUtils.info(task_name +"解析物料使用数据，文件["+ finalInsFile.getName() +"]第[" + i+ "]行物料号为空") ;
                            continue;
                        }
                        if(StringUtil.isSpaceCheck(mtrl_vender)){
                            logUtils.info(task_name +"解析物料使用数据，文件["+ finalInsFile.getName() +"]第[" + i+ "]行厂家为空") ;
                            continue;
                        }
                        if(StringUtil.isSpaceCheck(mtrl_power)){
                            logUtils.info(task_name +"解析物料使用数据，文件["+ finalInsFile.getName() +"]第[" + i+ "]行效率为空") ;
                            continue;
                        }
                        if(StringUtil.isSpaceCheck(mtrl_color)){
                            logUtils.info(task_name +"解析物料使用数据，文件["+ finalInsFile.getName() +"]第[" + i+ "]行颜色为空") ;
                            continue;
                        }
                        if(StringUtil.isSpaceCheck(mtrl_model)){
                            logUtils.info(task_name +"解析物料使用数据，文件["+ finalInsFile.getName() +"]第[" + i+ "]行型号为空") ;
                            continue;
                        }
                        Oem_mtrl_use oem_mtrl_use = new Oem_mtrl_use();
                        oem_mtrl_use.setLot_no(lot_no);
                        oem_mtrl_use.setModel_no(mtrl_no);
                        oem_mtrl_use.setOem_id(task_name);
                        oem_mtrl_use.setVender(mtrl_vender);
                        oem_mtrl_use.setPower(BigDecimal.valueOf(Double.valueOf(mtrl_power)));
                        oem_mtrl_use.setColor(mtrl_color);
                        oem_mtrl_use.setModel_no(mtrl_model);
                        oem_mtrl_use.setUpdate_user("MTRL_TASK");
                        oem_mtrl_use.setUpdate_timestamp(cr_timestamp);
                        oemMtrlUseRepository.save(oem_mtrl_use);

                        lot_no = _SPACE;
                        mtrl_no = _SPACE;
                        mtrl_vender = _SPACE;
                        mtrl_power = _SPACE;
                        mtrl_color = _SPACE;
                        mtrl_model = _SPACE;
                    }
                    FileUtil.backExcelFile(finalInsFile);
                } catch (Exception e) {
                    TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                    logUtils.info(task_name +"解析物料使用数据发生异常，原因[" + StringUtil.stackTraceToString(e) +"]");
                }
            }
        }
        long endTimes = System.currentTimeMillis();
        logUtils.info(task_name +"IV数据解析完成，总耗时:" +(endTimes -startTimes));
    }
}
