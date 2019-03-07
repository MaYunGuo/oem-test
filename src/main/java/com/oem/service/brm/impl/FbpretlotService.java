package com.oem.service.brm.impl;

import com.oem.dao.IRetBoxInfoRepository;
import com.oem.dao.IRetLotInfoRepository;
import com.oem.entity.Ret_box_info;
import com.oem.entity.Ret_lot_info;
import com.oem.service.brm.IFbpretlotService;

import com.oem.tx.brm.Fbpretlot.FbpretlotI;
import com.oem.tx.brm.Fbpretlot.FbpretlotO;
import com.oem.tx.brm.Fbpretlot.FbpretlotOA;
import com.oem.tx.brm.Fbpretlot.FbpretlotOB;
import com.oem.util.*;
import org.apache.commons.collections.ArrayStack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.thymeleaf.util.StringUtils;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static com.oem.comdef.GenericDef.*;

@Service("fbpretlotService")
public class FbpretlotService implements IFbpretlotService {

    private LogUtils logUtils;

    @Autowired
    private IRetLotInfoRepository retLotInfoRepository;

    @Autowired
    private IRetBoxInfoRepository retBoxInfoRepository;

    @Override
    @Transactional
    public String subMainProc(String evt_no, String strInMsg) {

        AppContext.clear();
        AppContext.setCurrServiceName(FbpretlotService.class.getSimpleName());
        AppContext.setCurrEventNumber(evt_no);
        logUtils = new LogUtils(FbpretlotService.class);
        logUtils.info("[InTrx:" + strInMsg + "]");

        String strOutTrx = null;

        FbpretlotO outTrx = new FbpretlotO();

        outTrx.setTrx_id(TX_FBPBISDATA);
        outTrx.setType_id(TRX_TYPE_OUT);
        outTrx.setRtn_code(RETURN_CODE_OK);
        outTrx.setRtn_mesg(RETURN_MESG_OK);

        try {
            FbpretlotI inTrx = JacksonUtil.fromJson(strInMsg, FbpretlotI.class);
            long rtn_code = subMainProc2(inTrx, outTrx);
            if(rtn_code != _NORMAL){
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            }
        } catch (Exception ex) {
            outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
            outTrx.setRtn_mesg(ex.getCause().toString());
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        } finally {
            strOutTrx = JacksonUtil.toJSONStr(outTrx);
            logUtils.info("[OutTrx:" + strOutTrx + "]");
        }
        return strOutTrx;
    }

    public long subMainProc2(FbpretlotI inTrx, FbpretlotO outTrx){
        long rtn_code = _ERROR;
        char action_flg = inTrx.getAction_flg().charAt(0);
        switch (action_flg){
            case ACTION_FLG_QUERY:
                rtn_code = queryCondition(inTrx, outTrx);
                break;
            case ACTION_FLG_ADD:
                rtn_code = addOrUpdateFnc(inTrx, outTrx);
                break;
            case ACTION_FLG_DELETE:
                rtn_code = deleteFnc(inTrx, outTrx);
                break;
            case 'S':
                rtn_code = saveFnc(inTrx, outTrx);
                break;
            case 'Y':
                rtn_code = saveBoxFnc(inTrx, outTrx);
                break;
            case 'F':
                rtn_code = queryBoxCondition(inTrx, outTrx);
                break;
            default:
                outTrx.setRtn_code(INVALID_ACTION_FLG);
                outTrx.setRtn_mesg("无效的操作标识");
                break;
        }
        return rtn_code;
    }

    public long queryCondition(FbpretlotI inTrx, FbpretlotO outTrx){
         String hql = "From Ret_lot_info where 1=1 ";
         if(!StringUtils.isEmpty(inTrx.getLot_id())){
               hql +="and lot_id = '"+inTrx.getLot_id()+"'";
         }
         if(!StringUtils.isEmpty(inTrx.getCal())){
             hql +="and cal = '"+inTrx.getCal()+"'";
         }
         List<Ret_lot_info> retLotInfoList = retLotInfoRepository.find(hql);
         List<FbpretlotOA> oaryList = new ArrayList<>();
         for(Ret_lot_info ret_lot_info:retLotInfoList){
             FbpretlotOA oary = new FbpretlotOA();
             oary.setLot_id(ret_lot_info.getLot_id());
             oary.setPower(ret_lot_info.getPower());
             oary.setCal(ret_lot_info.getCal());
             oary.setIsc(ret_lot_info.getIsc());
             oary.setVoc(ret_lot_info.getVoc());
             oary.setImp(ret_lot_info.getImp());
             oary.setVmp(ret_lot_info.getVmp());
             oary.setFf(ret_lot_info.getTemp());
             oary.setTemp(ret_lot_info.getTemp());
             oary.setMeas_timestamp(ret_lot_info.getMeas_timestamp());
             oary.setIns_color(ret_lot_info.getIns_color());
             oary.setIns_grade(ret_lot_info.getIns_grade());
             oary.setIns_power(ret_lot_info.getIns_power());
             oaryList.add(oary);
         }
         outTrx.setOary(oaryList);
         return _NORMAL;
    }

    public long addOrUpdateFnc(FbpretlotI inTrx, FbpretlotO outTrx){
        String lot_id = inTrx.getLot_id();
        Double power = inTrx.getPower();
        Double isc = inTrx.getIsc();
        Double voc = inTrx.getVoc();
        Double imp = inTrx.getImp();
        Double vmp = inTrx.getVmp();
        Double ff = inTrx.getFf();
        Double temp = inTrx.getTemp();
        String cal = inTrx.getCal();
        Timestamp meas_timestamp = inTrx.getMeas_timestamp();
        Ret_lot_info ret_lot_info = retLotInfoRepository.get(lot_id);
        if(ret_lot_info !=null){
            ret_lot_info.setPower(power);
            ret_lot_info.setIsc(isc);
            ret_lot_info.setVoc(voc);
            ret_lot_info.setImp(imp);
            ret_lot_info.setVmp(vmp);
            ret_lot_info.setFf(ff);
            ret_lot_info.setTemp(temp);
            ret_lot_info.setCal(cal);
            ret_lot_info.setMeas_timestamp(meas_timestamp);
            ret_lot_info.setEvt_usr(inTrx.getEvt_usr());
            ret_lot_info.setEvt_timestamp(DateUtil.getCurrentTimestamp());
            retLotInfoRepository.update(ret_lot_info);
        }else{
            ret_lot_info = new Ret_lot_info();
            ret_lot_info.setLot_id(lot_id);
            ret_lot_info.setPower(power);
            ret_lot_info.setIsc(isc);
            ret_lot_info.setVoc(voc);
            ret_lot_info.setImp(imp);
            ret_lot_info.setVmp(vmp);
            ret_lot_info.setFf(ff);
            ret_lot_info.setTemp(temp);
            ret_lot_info.setCal(cal);
            ret_lot_info.setMeas_timestamp(meas_timestamp);
            ret_lot_info.setEvt_usr(inTrx.getEvt_usr());
            ret_lot_info.setEvt_timestamp(DateUtil.getCurrentTimestamp());
            retLotInfoRepository.save(ret_lot_info);
        }
        return _NORMAL;
    }

    public long deleteFnc(FbpretlotI inTrx, FbpretlotO outTrx) {
        String lot_id = inTrx.getLot_id();
        Ret_lot_info ret_lot_info = retLotInfoRepository.get(lot_id);
        if(ret_lot_info ==null){
            outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
            outTrx.setRtn_mesg("批次为"+lot_id+"的数据不存在！");
            return _ERROR;
        }
        retLotInfoRepository.delete(ret_lot_info);
        return _NORMAL;
    }
    public long saveFnc(FbpretlotI inTrx, FbpretlotO outTrx) {
        String lot_id = inTrx.getLot_id();
        Ret_lot_info ret_lot_info = retLotInfoRepository.get(lot_id);
        if(ret_lot_info ==null){
            outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
            outTrx.setRtn_mesg("批次为"+lot_id+"的数据不存在！");
            return _ERROR;
        }else{
            ret_lot_info.setIns_color(inTrx.getIns_color());
            ret_lot_info.setIns_grade(inTrx.getIns_grade());
            ret_lot_info.setIns_power(inTrx.getIns_power());
            ret_lot_info.setEvt_usr(inTrx.getEvt_usr());
            retLotInfoRepository.update(ret_lot_info);
        }
        return _NORMAL;
    }

    public long saveBoxFnc(FbpretlotI inTrx, FbpretlotO outTrx) {
        String lot_id = inTrx.getLot_id();
        String box_id = inTrx.getBox_id();
        Ret_lot_info ret_lot_info = retLotInfoRepository.get(lot_id);
        if (ret_lot_info == null) {
            outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
            outTrx.setRtn_mesg("批次为" + lot_id + "的数据不存在！");
            return _ERROR;
        } else {
            ret_lot_info.setPack_box_id(box_id);
            ret_lot_info.setEvt_usr(inTrx.getEvt_usr());
            ret_lot_info.setEvt_timestamp(DateUtil.getCurrentTimestamp());
            retLotInfoRepository.update(ret_lot_info);

            Ret_box_info ret_box_info = retBoxInfoRepository.get(box_id);
            if (ret_box_info == null) {
                ret_box_info = new Ret_box_info();
                ret_box_info.setBox_id(box_id);
                ret_box_info.setShip_flg(_NO);
                ret_box_info.setOqc_grade(_SPACE);
                retBoxInfoRepository.save(ret_box_info);
            }
            return _NORMAL;
        }
    }

    public long queryBoxCondition(FbpretlotI inTrx, FbpretlotO outTrx) {
          String hql = "From Ret_box_info where 1 =1";
          if(!StringUtils.isEmpty(inTrx.getBox_id())){
               hql += " and box_id = '"+inTrx.getBox_id()+"'";
          }
          if(!StringUtils.isEmpty(inTrx.getLot_id())){
              Ret_lot_info ret_lot_info = retLotInfoRepository.get(inTrx.getLot_id());
              if(ret_lot_info == null ){
                  outTrx.setRtn_mesg("未找到批次号为"+inTrx.getLot_id()+"的信息！");
                  return _ERROR;
              }
              String pick_box_id = ret_lot_info.getPack_box_id();
              if(StringUtils.isEmpty(pick_box_id)){
                  outTrx.setRtn_mesg("批次号为"+inTrx.getLot_id()+"没有绑定箱子，请先绑定！");
                  return _ERROR;
              }
              hql +=" and box_id = '"+ret_lot_info.getPack_box_id()+"'";
          }

          List<Ret_box_info> retBoxInfoList = retBoxInfoRepository.find(hql);
          List<FbpretlotOB> oaryBList = new ArrayList<>();
          for(Ret_box_info ret_box_info:retBoxInfoList){
              FbpretlotOB oaryB = new FbpretlotOB();
              oaryB.setBox_id(ret_box_info.getBox_id());
              oaryB.setOqc_grade(ret_box_info.getOqc_grade());
              oaryB.setShip_flg(ret_box_info.getShip_flg());
              oaryBList.add(oaryB);
          }
          outTrx.setOaryB(oaryBList);
          return _NORMAL;
    }
}
