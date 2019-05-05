package com.oem.quartz;

import com.oem.dao.IOemPrdLotRepository;
import com.oem.entity.Oem_prd_lot;
import com.oem.util.*;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.quartz.DisallowConcurrentExecution;
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
import java.util.Date;
import java.util.List;

import static com.oem.comdef.GenericStaticDef.FTP_PATH;


@DisallowConcurrentExecution
public class QuartzIvDataJob extends QuartzJobBean {

    private LogUtils logUtils;

    @Autowired
    private IOemPrdLotRepository oemPrdLotRepository;

    @Override
    @Transactional
    public void executeInternal(JobExecutionContext jobExecutionContext){

        logUtils = new LogUtils(QuartzIvDataJob.class);
        AppContext.setCurrEventNumber(GUIDGenerator.javaGUID());
        AppContext.setCurrServiceName(QuartzIvDataJob.class.getSimpleName());

        JobDataMap dataMap = jobExecutionContext.getJobDetail().getJobDataMap();
        String task_name = (String) dataMap.get("task_name");
        String task_path = FTP_PATH  + File.separator + task_name + File.separator + "EXCEL" + File.separator + "IV";

        long startTimes = System.currentTimeMillis();
        logUtils.info(task_name + "IV数据解析开始执行---------------------------");
        try {
            File filePath = new File(task_path);
            if(!filePath.exists()){
                filePath.mkdirs();
                FileUtil.storeFile(task_path);
            }
            String realPath = null;
            Workbook wb = null;
            Sheet sheet = null;
            Row row = null;
            Timestamp cr_timestamp = DateUtil.getCurrentTimestamp();
            if(filePath.exists() && filePath.isDirectory()){
               File[] allFiles =  filePath.listFiles();
               for(File ivFile : allFiles){
                   if(ivFile.isDirectory()){
                       continue;
                   }
                   realPath = ivFile.getAbsolutePath();
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
                   String hql = "From Oem_prd_lot where lot_no = ?0  and oem_id = ?1";
                   for (int i = 1; i<rownum; i++) {
                       row = sheet.getRow(i);
                       if(row == null){
                           continue;
                       }
                       String lot_no = ExcelUtil.getCellValue(row.getCell(0));
                       List<Oem_prd_lot> oemPrdLotList = oemPrdLotRepository.list(hql,lot_no, task_name);
                       if(oemPrdLotList != null && !oemPrdLotList.isEmpty()){
                           logUtils.info(task_name +"解析IV数据,批次号[" + lot_no +"]已经存在");
                           continue;
                       }

                       Oem_prd_lot oem_prd_lot = new Oem_prd_lot();
                       oem_prd_lot.setOem_id(task_name);
                       oem_prd_lot.setLot_no(lot_no);
                       oem_prd_lot.setIv_power(BigDecimal.valueOf(Double.valueOf(ExcelUtil.getCellValue(row.getCell(1)))));
                       oem_prd_lot.setIv_isc(BigDecimal.valueOf(Double.valueOf(ExcelUtil.getCellValue(row.getCell(2)))));
                       oem_prd_lot.setIv_voc(BigDecimal.valueOf(Double.valueOf(ExcelUtil.getCellValue(row.getCell(3)))));
                       oem_prd_lot.setIv_imp(BigDecimal.valueOf(Double.valueOf(ExcelUtil.getCellValue(row.getCell(4)))));
                       oem_prd_lot.setIv_vmp(BigDecimal.valueOf(Double.valueOf(ExcelUtil.getCellValue(row.getCell(5)))));
                       oem_prd_lot.setIv_ff(BigDecimal.valueOf(Double.valueOf(ExcelUtil.getCellValue(row.getCell(6)))));
                       oem_prd_lot.setIv_tmper(BigDecimal.valueOf(Double.valueOf(ExcelUtil.getCellValue(row.getCell(7)))));
                       oem_prd_lot.setIv_adj_versioni(ExcelUtil.getCellValue(row.getCell(8)));
                       oem_prd_lot.setIv_timestamp(Timestamp.valueOf(ExcelUtil.getCellValue(row.getCell(9))));
                       oem_prd_lot.setUpdate_user("IV_TASK");
                       oem_prd_lot.setUpdate_timestamp(cr_timestamp);
                       oemPrdLotRepository.save(oem_prd_lot);
                   }
                   FileUtil.backExcelFile(ivFile);
               }
            }
         } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            logUtils.info(task_name +"解析IV数据发生异常，原因[" + StringUtil.stackTraceToString(e) +"]");
        }
        long endTimes = System.currentTimeMillis();
        logUtils.info(task_name +"IV数据解析完成，总耗时:" +(endTimes -startTimes));
    }
}

