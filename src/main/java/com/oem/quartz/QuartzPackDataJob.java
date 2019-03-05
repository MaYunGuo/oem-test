package com.oem.quartz;

import com.oem.dao.IRetBoxInfoRepository;
import com.oem.dao.IRetLotInfoRepository;
import com.oem.entity.Ret_box_info;
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

import java.io.File;

import static com.oem.comdef.GenericDef._NO;
import static com.oem.comdef.GenericDef._SPACE;

public class QuartzPackDataJob extends QuartzJobBean {

    private LogUtils logUtils;

    @Autowired
    private IRetLotInfoRepository retLotInfoRepository;

    @Autowired
    private IRetBoxInfoRepository retBoxInfoRepository;


    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        logUtils = new LogUtils(QuartzPackDataJob.class);

        JobDataMap dataMap = jobExecutionContext.getJobDetail().getJobDataMap();
        String task_name = (String) dataMap.get("task_name");
        String task_path = (String) dataMap.get("task_path");

        long startTimes = System.currentTimeMillis();
        logUtils.info(task_name + "包装数据解析开始执行---------------------------");

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
                        logUtils.info(task_name +"解析包装数据,文件:["+ realPath +"]不存在");
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
                        String box_id = row.getCell(0).getStringCellValue();
                        String lot_id = row.getCell(1).getStringCellValue();
                        Ret_lot_info ret_lot_info = retLotInfoRepository.getWithLock(lot_id);
                        if(ret_lot_info == null){
                            logUtils.info(task_name + "包装数据解析错误,第" + i +"行数据，批次号[" + lot_id +"]信息不存在，请确认");
                            continue;
                        }
                        ret_lot_info.setPack_box_id(box_id);
                        retLotInfoRepository.update(ret_lot_info);

                        Ret_box_info ret_box_info = retBoxInfoRepository.get(box_id);
                        if(ret_box_info == null){
                            ret_box_info = new Ret_box_info();
                            ret_box_info.setBox_id(box_id);
                            ret_box_info.setShip_flg(_NO);
                            ret_box_info.setOqc_grade(_SPACE);
                            retBoxInfoRepository.save(ret_box_info);
                        }
                    }
                    FileUtil.backExcelFile(ivFile);
                } catch (Exception e) {
                    TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                    logUtils.info(task_name +"解析包装数据发生异常，原因[" + StringUtil.stackTraceToString(e) +"]");
                }
            }
        }
        long endTimes = System.currentTimeMillis();
        logUtils.info(task_name +"包装数据解析完成，总耗时:" +(endTimes -startTimes));
    }
}
