package com.oem.quartz;

import com.oem.dao.IOemPrdBoxRepository;
import com.oem.dao.IOemPrdLotRepository;
import com.oem.entity.Oem_prd_box;
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
import java.sql.Timestamp;
import java.util.List;

import static com.oem.comdef.GenericDef._SPACE;
import static com.oem.comdef.GenericStaticDef.FTP_PATH;

public class QuartzOqcDataJob extends QuartzJobBean {

    private LogUtils logUtils;

    @Autowired
    private IOemPrdBoxRepository oemPrdBoxRepository;

    @Override
    @Transactional
    public void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {

        logUtils = new LogUtils(QuartzOqcDataJob.class);
        AppContext.setCurrEventNumber(GUIDGenerator.javaGUID());
        AppContext.setCurrServiceName(QuartzOqcDataJob.class.getSimpleName());


        JobDataMap dataMap = jobExecutionContext.getJobDetail().getJobDataMap();
        String task_name = (String) dataMap.get("task_name");
        String task_path = FTP_PATH  + File.separator + task_name + File.separator + "EXCEL" + File.separator + "OQC";
        long startTimes = System.currentTimeMillis();
        logUtils.info(task_name + "OQC数据解析开始执行---------------------------");
        try {
            File filePath = new File(task_path);
            if(!filePath.exists()){
                filePath.mkdirs();
            }
            String realPath = null;
            Workbook wb = null;
            Sheet sheet = null;
            Row row = null;
            Timestamp cr_timestamp = DateUtil.getCurrentTimestamp();
            if(filePath.exists() && filePath.isDirectory()){
                File[] allFiles =  filePath.listFiles();
                for(File oqcFile : allFiles){
                    if(!oqcFile.isFile()){
                        continue;
                    }
                    realPath = oqcFile.getAbsolutePath();

                    wb = ExcelUtil.readExcel(realPath);
                    if(wb == null){
                        logUtils.info(task_name +"解析OQC数据,文件:["+ realPath +"]不存在");
                        continue;
                    }
                    //获取第一个sheet
                    sheet = wb.getSheetAt(0);
                    //获取最大行数
                    int rownum = sheet.getPhysicalNumberOfRows();
                    //获取最大列数
                    String oqc_grade = _SPACE;

                    for (int i = 1; i<rownum; i++) {
                        row = sheet.getRow(i);
                        if(row == null){
                            continue;
                        }
                        String box_no = ExcelUtil.getCellValue(row.getCell(0));
                        Oem_prd_box oem_prd_box = oemPrdBoxRepository.uniqueResultWithLock("From Oem_prd_box where box_no = ?0", box_no);
                        if(oem_prd_box == null ){
                            logUtils.info(task_name + "OQC数据解析错误,第" + i +"行数据，批次号[" + box_no +"]信息不存在，请确认");
                            continue;
                        }

                        oqc_grade = ExcelUtil.getCellValue(row.getCell(1));
                        if(StringUtil.isSpaceCheck(oqc_grade)){
                            logUtils.info(task_name + "OQC数据解析错误,第" + i +"行数据，OQC等级为空，请确认");
                            continue;
                        }
                        oem_prd_box.setOqc_grade(oqc_grade);
                        oem_prd_box.setUpdate_user("OAC_TASK");
                        oem_prd_box.setUpdate_timestamp(cr_timestamp);
                        oemPrdBoxRepository.update(oem_prd_box);
                    }
                    FileUtil.backExcelFile(oqcFile);
                }
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            logUtils.info(task_name +"解析OQC数据发生异常，原因[" + StringUtil.stackTraceToString(e) +"]");
        }
        long endTimes = System.currentTimeMillis();
        logUtils.info(task_name +"OQC数据解析完成，总耗时:" +(endTimes -startTimes));
    }
}
