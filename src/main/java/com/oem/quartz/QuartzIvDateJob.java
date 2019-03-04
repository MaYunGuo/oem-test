package com.oem.quartz;

import com.oem.dao.IRetLotInfoRepository;
import com.oem.entity.Ret_lot_info;
import com.oem.util.*;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;


public class QuartzIvDateJob extends QuartzJobBean {

    private LogUtils logUtils;

    @Autowired
    private IRetLotInfoRepository retLotInfoRepository;

    @Override
    @Transactional
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {

        logUtils = new LogUtils(QuartzIvDateJob.class);

        JobDataMap dataMap = jobExecutionContext.getJobDetail().getJobDataMap();
        String task_name = (String) dataMap.get("task_name");
        String task_path = (String) dataMap.get("task_path");

        long startTimes = System.currentTimeMillis();
        logUtils.info(task_name + "IV数据解析开始执行---------------------------");

        File filePath = new File(task_path);
        String realPath = null;
        Workbook wb = null;
        Sheet sheet = null;
        Row row = null;
        if(filePath.exists() && filePath.isDirectory()){
           File[] allFiles =  filePath.listFiles();
           for(File ivFile : allFiles){
               realPath = ivFile.getAbsolutePath();
               try {
                   wb = ExcelUtil.readExcel(realPath);
                   if(wb == null){
                       logUtils.info(task_name +"解析IV数据,文件:["+ realPath +"]不存在");
                       continue;
                   }
                   //获取第一个sheet
                   sheet = wb.getSheetAt(0);
                   //获取最大行数
                   int rownum = sheet.getPhysicalNumberOfRows();
                   //获取最大列数
                   for (int i = 1; i<rownum; i++) {
                       row = sheet.getRow(i);
                       if(row == null){
                           continue;
                       }
                       Ret_lot_info ret_lot_info = new Ret_lot_info();
                       ret_lot_info.setLot_id(row.getCell(0).getStringCellValue());
                       ret_lot_info.setPower(Double.valueOf(row.getCell(1).getNumericCellValue()));
                       ret_lot_info.setIsc(Double.valueOf(row.getCell(2).getNumericCellValue()));
                       ret_lot_info.setVoc(Double.valueOf(row.getCell(3).getNumericCellValue()));
                       ret_lot_info.setImp(Double.valueOf(row.getCell(4).getNumericCellValue()));
                       ret_lot_info.setVmp(Double.valueOf(row.getCell(5).getNumericCellValue()));
                       ret_lot_info.setFf(Double.valueOf(row.getCell(6).getNumericCellValue()));
                       ret_lot_info.setTemp(Double.valueOf(row.getCell(7).getNumericCellValue()));
                       ret_lot_info.setCal(row.getCell(8).getStringCellValue());
                       ret_lot_info.setMeas_timestamp(DateUtil.Date2Timestamp(row.getCell(9).getDateCellValue()));
                       retLotInfoRepository.save(ret_lot_info);
                   }
                   backExcelFile(ivFile);
               } catch (Exception e) {
                   TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                   logUtils.info(task_name +"解析IV数据发生异常，原因[" + StringUtil.stackTraceToString(e) +"]");
               }
           }
        }
        long endTimes = System.currentTimeMillis();
        logUtils.info(task_name +"IV数据解析完成，总耗时:" +(endTimes -startTimes));
    }


    public void backExcelFile(File excelFile) throws IOException {
        String fileName = excelFile.getName();
        String filePath = excelFile.getAbsolutePath();
        String fileBakPath = filePath.substring(0, filePath.lastIndexOf(File.separator)) + File.separator + "TEMP" + File.separator;
        File destFile = FileUtil.createFile(fileBakPath, fileName);  //备份
        FileUtil.copyFile(excelFile, destFile);
        FileUtil.deleteFile(excelFile);
    }
}

