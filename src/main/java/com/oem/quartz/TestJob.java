package com.oem.quartz;

import com.oem.dao.IRetLotInfoRepository;
import com.oem.entity.Ret_lot_info;
import com.oem.util.DateUtil;
import com.oem.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Component
public class TestJob {

   /* @Autowired
    private IRetLotInfoRepository retLotInfoRepository;


    private long CON_TIME = 5 * 1000;

    @Scheduled(cron="0/5 * * * * ?")
    @Transactional
    public void insertIntoIv() {

        Ret_lot_info ret_lot_info = new Ret_lot_info();
        ret_lot_info.setLot_id(DateUtil.getRvTime());
        ret_lot_info.setPower(10.0 + (CON_TIME / 1000));
        ret_lot_info.setIsc(11.0 + (CON_TIME / 1000));
        ret_lot_info.setVoc(12.0 + (CON_TIME / 1000));
        ret_lot_info.setImp(13.0 + (CON_TIME / 1000));
        ret_lot_info.setVmp(14.0 + (CON_TIME / 1000));
        ret_lot_info.setFf(15.0 + (CON_TIME / 1000));
        ret_lot_info.setTemp(22.0 + (CON_TIME / 1000));
        ret_lot_info.setCal("test");
        ret_lot_info.setMeas_timestamp(DateUtil.getCurrentTimestamp());
        retLotInfoRepository.save(ret_lot_info);
    }
   @Scheduled(cron="30/60 * * * * ?")
   @Transactional
    public void updateFin(){
        Timestamp cr_timestamp = DateUtil.getCurrentTimestamp();
        Timestamp beforeTimestamp = DateUtil.getSomeTimeAgo(cr_timestamp, 120);
        String hql = "From Ret_lot_info where meas_timestamp >='" + beforeTimestamp + "' and meas_timestamp <'" + cr_timestamp +"'";
        List<Ret_lot_info> ret_lot_infoList = retLotInfoRepository.find(hql);
        if(ret_lot_infoList != null && !ret_lot_infoList.isEmpty()){
           for(Ret_lot_info ret_lot_info : ret_lot_infoList){
                if(!StringUtil.isSpaceCheck(ret_lot_info.getIns_grade())){
                    continue;
                }
                ret_lot_info.setIns_color("RED");
                ret_lot_info.setIns_power("22");
                ret_lot_info.setIns_grade("OK");
                ret_lot_info.setEvt_timestamp(cr_timestamp);
                retLotInfoRepository.update(ret_lot_info);
           }
        }
    }*/

    /* @Scheduled(cron="40/60 * * * * ?")
    public void updatePack(){
        String box_id = DateUtil.getRvTime();
        Timestamp cr_timestamp = DateUtil.getCurrentTimestamp();
        Timestamp beforeTimestamp = DateUtil.getSomeTimeAgo(cr_timestamp, 1);
        String hql = "From Ret_lot_info where meas_timestamp >='" + beforeTimestamp + "' and meas_timestamp <'" + cr_timestamp +"'";
        List<Ret_lot_info> ret_lot_infoList = retLotInfoRepository.find(hql);
        if(ret_lot_infoList != null && !ret_lot_infoList.isEmpty()){
            for(Ret_lot_info ret_lot_info : ret_lot_infoList){
                if(!StringUtil.isSpaceCheck(ret_lot_info.getPack_box_id())){
                    continue;
                }
                ret_lot_info.setPack_box_id(box_id);
                retLotInfoRepository.update(ret_lot_info);
            }
        }
    }*/
}
