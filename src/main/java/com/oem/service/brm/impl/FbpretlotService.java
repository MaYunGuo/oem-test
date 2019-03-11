package com.oem.service.brm.impl;

import com.oem.dao.*;
import com.oem.entity.*;
import com.oem.service.brm.IFbpretlotService;

import com.oem.tx.brm.Fbpretlot.*;
import com.oem.util.*;
import org.apache.commons.collections.ArrayStack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.thymeleaf.util.StringUtils;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static com.oem.comdef.GenericDef.*;

@Service("fbpretlotService")
public class FbpretlotService implements IFbpretlotService {

    private LogUtils logUtils;

    @Autowired
    private IOemPrdBoxRepository oemPrdBoxRepository;

    @Autowired
    private IOemPrdLotRepository oemPrdLotRepository;

    @Autowired
    private IBisUserRepository bisUserRepository;

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
            if (rtn_code != _NORMAL) {
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

    public long subMainProc2(FbpretlotI inTrx, FbpretlotO outTrx) {
        long rtn_code = _ERROR;
        char action_flg = inTrx.getAction_flg().charAt(0);
        switch (action_flg) {
            case ACTION_FLG_QUERY:
                rtn_code = queryCondition(inTrx, outTrx);
                break;
            case ACTION_FLG_ADD:
                rtn_code = addOrUpdateFnc(inTrx, outTrx);
                break;
//            case ACTION_FLG_DELETE:
//                rtn_code = deleteFnc(inTrx, outTrx);
//                break;
            case 'S':
                rtn_code = saveFnc(inTrx, outTrx);
                break;
            case 'Y':
                rtn_code = saveBoxFnc(inTrx, outTrx);
                break;
//            case 'F':
//                rtn_code = queryBoxCondition(inTrx, outTrx);
//                break;
            default:
                outTrx.setRtn_code(INVALID_ACTION_FLG);
                outTrx.setRtn_mesg("无效的操作标识");
                break;
        }
        return rtn_code;
    }

    public long queryCondition(FbpretlotI inTrx, FbpretlotO outTrx) {
        String hql = "From Oem_prd_lot where 1=1 ";
        if (!StringUtils.isEmpty(inTrx.getLot_no())) {
            hql += "and lot_no = '" + inTrx.getLot_no() + "'";
        }
        List<Oem_prd_lot> oemPrdLotList = oemPrdLotRepository.find(hql);
        List<FbpretlotOA> oaryList = new ArrayList<>();
        for (Oem_prd_lot oem_prd_lot : oemPrdLotList) {
            FbpretlotOA oary = new FbpretlotOA();
            oary.setLot_no(oem_prd_lot.getLot_no());
            oary.setIv_timestamp(oem_prd_lot.getIv_timestamp());
            oary.setFinal_color_lvl(oem_prd_lot.getFinal_color_lvl());
            oary.setFinal_grade(oem_prd_lot.getFinal_grade());
            oary.setFinal_power_lvl(oem_prd_lot.getFinal_power_lvl());
            oaryList.add(oary);
        }
        outTrx.setOary(oaryList);
        return _NORMAL;
    }

    public long addOrUpdateFnc(FbpretlotI inTrx, FbpretlotO outTrx) {
        String lot_no = inTrx.getLot_no();
        BigDecimal iv_power = inTrx.getIv_power();
        BigDecimal iv_isc = inTrx.getIv_isc();
        BigDecimal iv_voc = inTrx.getIv_voc();
        BigDecimal iv_imp = inTrx.getIv_imp();
        BigDecimal iv_vmp = inTrx.getIv_vmp();
        BigDecimal iv_ff = inTrx.getIv_ff();
        BigDecimal iv_tmper = inTrx.getIv_tmper();
        String iv_adj_versioni = inTrx.getIv_adj_versioni();
        Timestamp iv_timestamp = inTrx.getIv_timestamp();
        Bis_user bis_user = bisUserRepository.get(inTrx.getEvt_usr());
        String oem_id = "";
        if (bis_user != null) {
            oem_id = bis_user.getOem_id();
        }
        String hql = "From Oem_prd_lot where lot_no = '" + inTrx.getLot_no() + "'";
        List<Oem_prd_lot> oemPrdLotList = oemPrdLotRepository.find(hql);
        if (oemPrdLotList.size() > 0) {
            Oem_prd_lot oem_prd_lot = oemPrdLotList.get(0);
            oem_prd_lot.setIv_power(iv_power);
            oem_prd_lot.setIv_isc(iv_isc);
            oem_prd_lot.setIv_voc(iv_voc);
            oem_prd_lot.setIv_imp(iv_imp);
            oem_prd_lot.setIv_vmp(iv_vmp);
            oem_prd_lot.setIv_ff(iv_ff);
            oem_prd_lot.setIv_tmper(iv_tmper);
            oem_prd_lot.setIv_adj_versioni(iv_adj_versioni);
            oem_prd_lot.setIv_timestamp(iv_timestamp);
            oem_prd_lot.setUpdate_user(inTrx.getEvt_usr());
            oem_prd_lot.setUpdate_timestamp(DateUtil.getCurrentTimestamp());
            oem_prd_lot.setOem_id(oem_id);
            oemPrdLotRepository.update(oem_prd_lot);
        } else {
            Oem_prd_lot oem_prd_lot = new Oem_prd_lot();
            oem_prd_lot.setLot_no(lot_no);
            oem_prd_lot.setIv_power(iv_power);
            oem_prd_lot.setIv_isc(iv_isc);
            oem_prd_lot.setIv_voc(iv_voc);
            oem_prd_lot.setIv_imp(iv_imp);
            oem_prd_lot.setIv_vmp(iv_vmp);
            oem_prd_lot.setIv_ff(iv_ff);
            oem_prd_lot.setIv_tmper(iv_tmper);
            oem_prd_lot.setIv_adj_versioni(iv_adj_versioni);
            oem_prd_lot.setIv_timestamp(iv_timestamp);
            oem_prd_lot.setUpdate_user(inTrx.getEvt_usr());
            oem_prd_lot.setDb_timestamp(DateUtil.getCurrentTimestamp());
            oem_prd_lot.setOem_id(oem_id);
            oemPrdLotRepository.save(oem_prd_lot);
        }
        return _NORMAL;
    }

    //    public long deleteFnc(FbpretlotI inTrx, FbpretlotO outTrx) {
//        String lot_id = inTrx.getLot_id();
//        Ret_lot_info ret_lot_info = retLotInfoRepository.get(lot_id);
//        if(ret_lot_info ==null){
//            outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
//            outTrx.setRtn_mesg("批次为"+lot_id+"的数据不存在！");
//            return _ERROR;
//        }
//        retLotInfoRepository.delete(ret_lot_info);
//        return _NORMAL;
//    }
    public long saveFnc(FbpretlotI inTrx, FbpretlotO outTrx) {
        String lot_no = inTrx.getLot_no();
        String hql = "From Oem_prd_lot where lot_no = '" + inTrx.getLot_no() + "'";
        List<Oem_prd_lot> oemPrdLotList = oemPrdLotRepository.find(hql);
        if (oemPrdLotList.size() <= 0) {
            outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
            outTrx.setRtn_mesg("批次为" + lot_no + "的数据不存在！");
            return _ERROR;
        } else {
            Oem_prd_lot oem_prd_lot = oemPrdLotList.get(0);
            oem_prd_lot.setFinal_color_lvl(inTrx.getFinal_color_lvl());
            oem_prd_lot.setFinal_grade(inTrx.getFinal_grade());
            oem_prd_lot.setFinal_power_lvl(inTrx.getFinal_power_lvl());
            oem_prd_lot.setUpdate_user(inTrx.getEvt_usr());
            oem_prd_lot.setUpdate_timestamp(DateUtil.getCurrentTimestamp());
            oemPrdLotRepository.update(oem_prd_lot);
        }
        return _NORMAL;
    }

    public long saveBoxFnc(FbpretlotI inTrx, FbpretlotO outTrx) {
        String box_no = inTrx.getBox_no();
        List<FbpretlotIA> iaryList = inTrx.getIary();
        String boxHql = "From Oem_prd_box where box_no = '" + box_no + "'";
        List<Oem_prd_box> oemPrdBoxList = oemPrdBoxRepository.find(boxHql);
        if (oemPrdBoxList.size() <= 0) {
            Oem_prd_box oem_prd_box = new Oem_prd_box();
            oem_prd_box.setBox_no(box_no);
            oem_prd_box.setShip_statu(_NO);
            oem_prd_box.setOqc_grade(_SPACE);
            oemPrdBoxRepository.save(oem_prd_box);
        }
        for(FbpretlotIA iary:iaryList){
            String lot_no = iary.getLot_no();
            String lotHql = "From Oem_prd_lot where lot_no = '" + lot_no + "'";
            List<Oem_prd_lot> oemPrdLotList = oemPrdLotRepository.find(lotHql);
            if (oemPrdLotList.size() <= 0) {
                outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
                outTrx.setRtn_mesg("批次为" + lot_no + "的数据不存在！");
                return _ERROR;
            } else {
                Oem_prd_lot oem_prd_lot = oemPrdLotList.get(0);
                oem_prd_lot.setBox_no(box_no);
                oem_prd_lot.setUpdate_user(inTrx.getEvt_usr());
                oem_prd_lot.setUpdate_timestamp(DateUtil.getCurrentTimestamp());
                oemPrdLotRepository.update(oem_prd_lot);
            }
        }
        return _NORMAL;
    }
}
