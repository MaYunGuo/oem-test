package com.oem.quartz;

import com.oem.base.dao.IBaseRepository;
import com.oem.dao.IOemPrdLotRepository;
import com.oem.dao.IRetLotInfoRepository;
import com.oem.entity.Oem_prd_lot;
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
import java.math.BigDecimal;


public class QuartzIvDataJob extends QuartzJobBean {

    private LogUtils logUtils;

    @Autowired
    private IOemPrdLotRepository oemPrdLotRepository;

    @Override
    @Transactional
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {

        logUtils = new LogUtils(QuartzIvDataJob.class);

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
                       Oem_prd_lot oem_prd_lot = new Oem_prd_lot();
                       oem_prd_lot.setLot_no(row.getCell(0).getStringCellValue());
                       oem_prd_lot.setIv_power(BigDecimal.valueOf(row.getCell(1).getNumericCellValue()));
                       oem_prd_lot.setIv_isc(BigDecimal.valueOf(row.getCell(2).getNumericCellValue()));
                       oem_prd_lot.setIv_voc(BigDecimal.valueOf(row.getCell(3).getNumericCellValue()));
                       oem_prd_lot.setIv_imp(BigDecimal.valueOf(row.getCell(4).getNumericCellValue()));
                       oem_prd_lot.setIv_vmp(BigDecimal.valueOf(row.getCell(5).getNumericCellValue()));
                       oem_prd_lot.setIv_ff(BigDecimal.valueOf(row.getCell(6).getNumericCellValue()));
                       oem_prd_lot.setIv_tmper(BigDecimal.valueOf(row.getCell(7).getNumericCellValue()));
                       oem_prd_lot.setIv_adj_versioni(row.getCell(8).getStringCellValue());
                       oem_prd_lot.setIv_timestamp(DateUtil.Date2Timestamp(row.getCell(9).getDateCellValue()));
                       oem_prd_lot.setUpdate_timestamp(DateUtil.getCurrentTimestamp());
                       oemPrdLotRepository.save(oem_prd_lot);
                   }
                   FileUtil.backExcelFile(ivFile);
               } catch (Exception e) {
                   TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                   logUtils.info(task_name +"解析IV数据发生异常，原因[" + StringUtil.stackTraceToString(e) +"]");
               }
           }
        }
        long endTimes = System.currentTimeMillis();
        logUtils.info(task_name +"IV数据解析完成，总耗时:" +(endTimes -startTimes));
    }
}

