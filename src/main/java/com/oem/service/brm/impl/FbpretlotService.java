package com.oem.service.brm.impl;

import com.oem.dao.*;
import com.oem.entity.*;
import com.oem.service.brm.IFbpretlotService;

import com.oem.tx.brm.Fbpbisfaty.FbpbisfatyOA;
import com.oem.tx.brm.Fbpretlot.*;
import com.oem.util.*;
import org.apache.commons.collections.ArrayStack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.thymeleaf.util.StringUtils;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.oem.comdef.GenericDef.*;
import static com.oem.comdef.GenericStaticDef.FTP_PATH;

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

        outTrx.setTrx_id(TX_FBPRETLOT);
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

    public long subMainProc2(FbpretlotI inTrx, FbpretlotO outTrx) throws IOException {
        long rtn_code = _ERROR;
        char action_flg = inTrx.getAction_flg().charAt(0);
        switch (action_flg) {
            case ACTION_FLG_QUERY:
                rtn_code = queryCondition(inTrx, outTrx);
                break;
            case ACTION_FLG_ADD:
                rtn_code = saveFnc(inTrx, outTrx);
                break;
            case ACTION_FLG_UPDATE:
                rtn_code = updateFnc(inTrx, outTrx);
                break;
            case ACTION_FLG_PACK:
                rtn_code = lotPackFnc(inTrx, outTrx);
                break;
            default:
                outTrx.setRtn_code(INVALID_ACTION_FLG);
                outTrx.setRtn_mesg("无效的操作标识");
                break;
        }
        return rtn_code;
    }

    public long queryCondition(FbpretlotI inTrx, FbpretlotO outTrx) {
        String evt_usr = inTrx.getEvt_usr();

        StringBuffer hql = new StringBuffer("From Oem_prd_lot where 1=1");
        if(inTrx.getIary() != null && !inTrx.getIary().isEmpty()) {
            FbpretlotIA fbpretlotIA = inTrx.getIary().get(0);
            String lot_no = fbpretlotIA.getLot_no();
            if (!StringUtil.isSpaceCheck(lot_no)) {
                hql.append(" and lot_no ='").append(lot_no).append("'");
            }
        }
        Bis_user bis_user = bisUserRepository.get(evt_usr);
        if(bis_user == null){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到用户[" + evt_usr +"]的信息,请确认");
            return _ERROR;
        }
        String usr_faty = bis_user.getUsr_fty();
        if(!StringUtil.isSpaceCheck(usr_faty)){
            hql.append(" and oem_id='").append(usr_faty).append("'");
        }

        List<Oem_prd_lot> oemPrdLotList = oemPrdLotRepository.find(hql.toString());
        List<FbpretlotOA> oaryList = new ArrayList<>();
        for (Oem_prd_lot oem_prd_lot : oemPrdLotList) {
            FbpretlotOA oary = new FbpretlotOA();
            oary.setId(oem_prd_lot.getId());
            oary.setLot_no(oem_prd_lot.getLot_no());
            oary.setOem_id(oem_prd_lot.getOem_id());
            oary.setIv_power(oem_prd_lot.getIv_power());
            oary.setIv_isc(oem_prd_lot.getIv_isc());
            oary.setIv_voc(oem_prd_lot.getIv_voc());
            oary.setIv_imp(oem_prd_lot.getIv_imp());
            oary.setIv_vmp(oem_prd_lot.getIv_vmp());
            oary.setIv_ff(oem_prd_lot.getIv_ff());
            oary.setIv_tmper(oem_prd_lot.getIv_tmper());
            oary.setIv_adj_versioni(oem_prd_lot.getIv_adj_versioni());
            oary.setIv_timestamp(oem_prd_lot.getIv_timestamp());
            oary.setFinal_grade(oem_prd_lot.getFinal_grade());
            oary.setFinal_color(oem_prd_lot.getFinal_color_lvl());
            oary.setFinal_power(oem_prd_lot.getFinal_power_lvl());
            oary.setBox_no(oem_prd_lot.getBox_no());
            oaryList.add(oary);
        }
        outTrx.setOary(oaryList);
        return _NORMAL;
    }

    public long saveFnc(FbpretlotI inTrx, FbpretlotO outTrx) throws IOException {

        String evt_usr = inTrx.getEvt_usr();
        Timestamp cr_timestamp = DateUtil.getCurrentTimestamp();

        List<FbpretlotIA> iaryList = inTrx.getIary();
        if(iaryList == null || iaryList.isEmpty()){
            outTrx.setRtn_code(E_FBPBISDATA_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入要添加的批次信息");
            return _ERROR;
        }

        Bis_user bis_user = bisUserRepository.get(evt_usr);
        if(bis_user == null){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到用户[" + evt_usr +"]的信息,请确认");
            return _ERROR;
        }
        String usr_faty = bis_user.getUsr_fty();
        if(StringUtil.isSpaceCheck(usr_faty)){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("用户[" + evt_usr +"]的所属的工厂信息为空,请确认");
            return _ERROR;
        }
        String lotHql = "From Oem_prd_lot where oem_id=? and lot_no =?0";
        List<FbpretlotOA> oary = new ArrayList<>();
        for(FbpretlotIA iary : iaryList){
            Oem_prd_lot oem_prd_lot = oemPrdLotRepository.uniqueResult(lotHql, usr_faty, iary.getLot_no());
            if(oem_prd_lot != null){
                outTrx.setRtn_code(E_OEM_PRD_LOT + E_ADD_EXIST + _SPACE);
                outTrx.setRtn_mesg("批次号[" + iary.getLot_no() +"]信息已经存在，不能重复添加");
                return _ERROR;
            }

            oem_prd_lot = new Oem_prd_lot();
            oem_prd_lot.setLot_no(iary.getLot_no());
            oem_prd_lot.setOem_id(usr_faty);
            oem_prd_lot.setIv_power(iary.getIv_power());
            oem_prd_lot.setIv_isc(iary.getIv_isc());
            oem_prd_lot.setIv_voc(iary.getIv_voc());
            oem_prd_lot.setIv_imp(iary.getIv_imp());
            oem_prd_lot.setIv_vmp(iary.getIv_vmp());
            oem_prd_lot.setIv_ff(iary.getIv_ff());
            oem_prd_lot.setIv_tmper(iary.getIv_tmper());
            oem_prd_lot.setIv_adj_versioni(iary.getIv_adj_versioni());
            oem_prd_lot.setIv_timestamp(iary.getIv_timestamp());
            oem_prd_lot.setUpdate_user(evt_usr);
            oem_prd_lot.setUpdate_timestamp(cr_timestamp);
            oemPrdLotRepository.save(oem_prd_lot);


            FbpretlotOA fbpretlotOA = new FbpretlotOA();
            fbpretlotOA.setOem_id(usr_faty);
            fbpretlotOA.setLot_no(iary.getLot_no());
            fbpretlotOA.setIv_power(oem_prd_lot.getIv_power());
            fbpretlotOA.setIv_isc(oem_prd_lot.getIv_isc());
            fbpretlotOA.setIv_voc(oem_prd_lot.getIv_voc());
            fbpretlotOA.setIv_imp(oem_prd_lot.getIv_imp());
            fbpretlotOA.setIv_vmp(oem_prd_lot.getIv_vmp());
            fbpretlotOA.setIv_ff(oem_prd_lot.getIv_ff());
            fbpretlotOA.setIv_tmper(oem_prd_lot.getIv_tmper());
            fbpretlotOA.setIv_adj_versioni(oem_prd_lot.getIv_adj_versioni());
            fbpretlotOA.setIv_timestamp(oem_prd_lot.getIv_timestamp());
            fbpretlotOA.setFinal_grade(oem_prd_lot.getFinal_grade());
            fbpretlotOA.setFinal_color(oem_prd_lot.getFinal_color_lvl());
            fbpretlotOA.setFinal_power(oem_prd_lot.getFinal_power_lvl());
            fbpretlotOA.setBox_no(oem_prd_lot.getBox_no());
            oary.add(fbpretlotOA);
        }
        outTrx.setOary(oary);
        return _NORMAL;
    }

    public long updateFnc(FbpretlotI inTrx, FbpretlotO outTrx){

        String evt_usr = inTrx.getEvt_usr();
        Timestamp cr_timestamp = DateUtil.getCurrentTimestamp();

        List<FbpretlotIA> iaryList = inTrx.getIary();
        if(iaryList == null || iaryList.isEmpty()){
            outTrx.setRtn_code(E_FBPBISDATA_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入要添加的批次信息");
            return _ERROR;
        }

        Bis_user bis_user = bisUserRepository.get(evt_usr);
        if(bis_user == null){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到用户[" + evt_usr +"]的信息,请确认");
            return _ERROR;
        }
        String usr_faty = bis_user.getUsr_fty();
        if(StringUtil.isSpaceCheck(usr_faty)){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("用户[" + evt_usr +"]的所属的工厂信息为空,请确认");
            return _ERROR;
        }
        String lotHql = "From Oem_prd_lot where oem_id=?0 and lot_no =?1";
        for(FbpretlotIA iary : iaryList){
            Oem_prd_lot oem_prd_lot = oemPrdLotRepository.uniqueResult(lotHql, usr_faty, iary.getLot_no());
            if(oem_prd_lot == null){
                outTrx.setRtn_code(E_OEM_PRD_LOT + E_READ_NOT_FOUND + _SPACE);
                outTrx.setRtn_mesg("批次号[" + iary.getLot_no() +"]信息不存在，请确认");
                return _ERROR;
            }
            oem_prd_lot.setFinal_grade(iary.getFinal_grade());
            oem_prd_lot.setFinal_color_lvl(iary.getFinal_color());
            oem_prd_lot.setFinal_power_lvl(iary.getFinal_power());
            oem_prd_lot.setUpdate_user(evt_usr);
            oem_prd_lot.setUpdate_timestamp(cr_timestamp);
            oemPrdLotRepository.update(oem_prd_lot);
        }
        return _NORMAL;
    }

    public long lotPackFnc(FbpretlotI inTrx, FbpretlotO outTrx){
        String evt_usr = inTrx.getEvt_usr();
        Timestamp cr_timestamp = DateUtil.getCurrentTimestamp();
        List<FbpretlotIA> iaryList = inTrx.getIary();
        if(iaryList == null || iaryList.isEmpty()){
            outTrx.setRtn_code(E_FBPBISDATA_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入要添加的批次信息");
            return _ERROR;
        }

        Bis_user bis_user = bisUserRepository.get(evt_usr);
        if(bis_user == null){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到用户[" + evt_usr +"]的信息,请确认");
            return _ERROR;
        }
        String usr_faty = bis_user.getUsr_fty();
        if(StringUtil.isSpaceCheck(usr_faty)){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("用户[" + evt_usr +"]的所属的工厂信息为空,请确认");
            return _ERROR;
        }

        Map<String, List<FbpretlotIA>> boxInfoMap = iaryList.stream().collect(Collectors.groupingBy(iaryItem -> iaryItem.getBox_no()));
        String boxHql = "From Oem_prd_box where oem_id = ?0 and box_no = ?1";
        for(String box_no : boxInfoMap.keySet()){
            Oem_prd_box oem_prd_box = oemPrdBoxRepository.uniqueResult(boxHql, usr_faty, box_no);
            if(oem_prd_box ==null){
                oem_prd_box = new Oem_prd_box();
                oem_prd_box.setOem_id(usr_faty);
                oem_prd_box.setBox_no(box_no);
                oem_prd_box.setUpdate_user(evt_usr);
                oem_prd_box.setUpdate_timestamp(cr_timestamp);
                oemPrdBoxRepository.save(oem_prd_box);
            }
        }
        List<FbpretlotOA> oary = new ArrayList<>();
        String lotHql = "From Oem_prd_lot where oem_id=?0 and lot_no =?1";
        for(FbpretlotIA iary : iaryList){
            Oem_prd_lot oem_prd_lot = oemPrdLotRepository.uniqueResult(lotHql, usr_faty, iary.getLot_no());
            if(oem_prd_lot == null){
                outTrx.setRtn_code(E_OEM_PRD_LOT + E_READ_NOT_FOUND + _SPACE);
                outTrx.setRtn_mesg("批次号[" + iary.getLot_no() +"]信息不存在，请确认");
                return _ERROR;
            }

            if(!StringUtil.isSpaceCheck(oem_prd_lot.getBox_no())){
                outTrx.setRtn_code(E_FBPRETLOT_LOT_HAVE_PACKED + _SPACE);
                outTrx.setRtn_mesg("批次[" + iary.getLot_no() +"]已经进行包装，包装箱号是["+ oem_prd_lot.getBox_no()+"]，请确认");
                return _ERROR;
            }
            oem_prd_lot.setBox_no(iary.getBox_no());
            oem_prd_lot.setUpdate_user(evt_usr);
            oem_prd_lot.setUpdate_timestamp(cr_timestamp);
            oemPrdLotRepository.update(oem_prd_lot);

            FbpretlotOA fbpretlotOA = new FbpretlotOA();
            fbpretlotOA.setLot_no(oem_prd_lot.getLot_no());
            fbpretlotOA.setBox_no(oem_prd_lot.getBox_no());
            fbpretlotOA.setIv_power(oem_prd_lot.getIv_power());
            fbpretlotOA.setIv_isc(oem_prd_lot.getIv_isc());
            fbpretlotOA.setIv_voc(oem_prd_lot.getIv_voc());
            fbpretlotOA.setIv_imp(oem_prd_lot.getIv_imp());
            fbpretlotOA.setIv_vmp(oem_prd_lot.getIv_vmp());
            fbpretlotOA.setIv_ff(oem_prd_lot.getIv_ff());
            fbpretlotOA.setIv_tmper(oem_prd_lot.getIv_tmper());
            fbpretlotOA.setIv_adj_versioni(oem_prd_lot.getIv_adj_versioni());
            fbpretlotOA.setIv_timestamp(oem_prd_lot.getIv_timestamp());
            fbpretlotOA.setFinal_grade(oem_prd_lot.getFinal_grade());
            fbpretlotOA.setFinal_color(oem_prd_lot.getFinal_color_lvl());
            fbpretlotOA.setFinal_power(oem_prd_lot.getFinal_power_lvl());
            oary.add(fbpretlotOA);
        }
        outTrx.setOary(oary);
        return _NORMAL;

    }


}
