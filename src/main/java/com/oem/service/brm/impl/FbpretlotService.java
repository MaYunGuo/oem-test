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
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
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
    private IBisFactoryRepository bisFactoryRepository;

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
            case ACTION_FLG_INQUIRE:
                rtn_code = queryOeMFnc(inTrx, outTrx);
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
            String box_no = fbpretlotIA.getBox_no();
            String start_time = fbpretlotIA.getStart_time();
            String end_time = fbpretlotIA.getEnd_time();
            if (!StringUtil.isSpaceCheck(lot_no)) {
                hql.append(" and lot_no like '").append(lot_no).append("%'");
            }
            if(!StringUtil.isSpaceCheck(box_no)){
                hql.append(" and box_no like'").append(box_no).append("%'");
            }
            if(!StringUtil.isSpaceCheck(start_time)){
                hql.append(" and iv_timestamp >='").append(start_time).append("'");
            }
            if(!StringUtil.isSpaceCheck(end_time)){
                hql.append(" and iv_timestamp <'").append(end_time).append("'");
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
        hql.append(" order by lot_no asc");

        List<Oem_prd_lot> oemPrdLotList = oemPrdLotRepository.find(hql.toString());
        if(oemPrdLotList == null || oemPrdLotList.isEmpty()){
            outTrx.setRtn_code(E_OEM_PRD_LOT + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有批次号信息请确认");
            return _ERROR;
        }

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
        String lotHql = "From Oem_prd_lot where oem_id=?0 and lot_no =?1";
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
        List<FbpretlotOA> oary = new ArrayList<>();

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

    public long queryOeMFnc(FbpretlotI inTrx, FbpretlotO outTrx){
        StringBuffer hql = new StringBuffer(" where 1=1");
        List<FbpretlotIA> iary = inTrx.getIary();
        if(iary != null && !iary.isEmpty()){
            String box_no = iary.get(0).getBox_no();
            String lot_no = iary.get(0).getLot_no();
            String oem_id = iary.get(0).getOem_id();
            String start_time = iary.get(0).getStart_time();
            String end_time = iary.get(0).getEnd_time();
            if(!StringUtil.isSpaceCheck(box_no)){
                hql.append(" and A.box_no like '").append(box_no).append("%'");
            }
            if(!StringUtil.isSpaceCheck(lot_no)){
                hql.append(" and A.lot_no like '").append(lot_no).append("%'");
            }
            if(!StringUtil.isSpaceCheck(oem_id)){
                hql.append(" and A.oem_id ='").append(oem_id).append("'");
            }else{
                String evt_usr = inTrx.getEvt_usr();
                if(!StringUtil.isSpaceCheck(evt_usr)){
                    Bis_user bis_user = bisUserRepository.get(evt_usr);
                    if(bis_user == null){
                        outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
                        outTrx.setRtn_mesg("没有找到用户[" + evt_usr +"]的信息，情确认");
                        return _ERROR;
                    }
                    String usr_faty = bis_user.getUsr_fty();
                    if(!StringUtil.isSpaceCheck(usr_faty)){
                        hql.append(" and A.oem_id ='").append(usr_faty).append("'");
                    }
                }
            }
            if(!StringUtil.isSpaceCheck(start_time)){
                hql.append(" and A.iv_timestamp >='").append(start_time).append("'");
            }
            if(!StringUtil.isSpaceCheck(end_time)){
                hql.append(" and A.iv_timestamp <'").append(end_time).append("'");
            }
        }

        String sql = "select A.lot_no, A.box_no, A.oem_id, A.iv_power, A.iv_isc, A.iv_voc,A.iv_imp, A.iv_vmp, " +
                "A.iv_ff, A.iv_tmper,A.iv_adj_versioni, A.iv_timestamp, A.final_power_lvl, " +
                "A.final_grade, A.final_color_lvl,A.update_user, A.update_timestamp, B.oqc_grade,B.ship_statu " +
                "from oem_prd_lot A left join oem_prd_box B on B.oem_id = A.oem_id and B.box_no = A.box_no";
        if(!StringUtil.isSpaceCheck(hql.toString())){
            sql += hql.toString();
        }

        List<Object[]> objectList = oemPrdLotRepository.findBySQL(sql);
        if(objectList != null && !objectList.isEmpty()){
            Map<String, Bis_factory>  factoryMap = new HashMap<>();
            List<Bis_factory> bisFactoryList =bisFactoryRepository.find("From Bis_factory where 1=1");
            if(bisFactoryList!= null && !bisFactoryList.isEmpty()){
                for(Bis_factory bis_factory : bisFactoryList){
                    factoryMap.put(bis_factory.getFaty_id(), bis_factory);
                }
            }
            List<FbpretlotOA> oary = new ArrayList<>();
            for(Object[] obj : objectList) {
                FbpretlotOA fbpretlotOA = new FbpretlotOA();
                fbpretlotOA.setLot_no(obj[0] == null ? _SPACE : obj[0].toString());
                fbpretlotOA.setBox_no(obj[1] == null ? _SPACE : obj[1].toString());
                fbpretlotOA.setOem_id(obj[2] == null ? _SPACE : obj[2].toString());
                fbpretlotOA.setOem_name(factoryMap.get(fbpretlotOA.getOem_id())== null ? _SPACE :factoryMap.get(fbpretlotOA.getOem_id()).getFaty_name());
                fbpretlotOA.setIv_power(obj[3] == null ? BigDecimal.valueOf(0.0) : BigDecimal.valueOf(Double.valueOf(obj[3].toString())));
                fbpretlotOA.setIv_isc(obj[4] == null ? BigDecimal.valueOf(0.0) : BigDecimal.valueOf(Double.valueOf(obj[4].toString())));
                fbpretlotOA.setIv_voc(obj[5] == null ? BigDecimal.valueOf(0.0) : BigDecimal.valueOf(Double.valueOf(obj[5].toString())));
                fbpretlotOA.setIv_imp(obj[6] == null ? BigDecimal.valueOf(0.0) : BigDecimal.valueOf(Double.valueOf(obj[6].toString())));
                fbpretlotOA.setIv_vmp(obj[7] == null ? BigDecimal.valueOf(0.0) : BigDecimal.valueOf(Double.valueOf(obj[7].toString())));
                fbpretlotOA.setIv_ff(obj[8] == null ? BigDecimal.valueOf(0.0) : BigDecimal.valueOf(Double.valueOf(obj[8].toString())));
                fbpretlotOA.setIv_tmper(obj[9] == null ? BigDecimal.valueOf(0.0) : BigDecimal.valueOf(Double.valueOf(obj[9].toString())));
                fbpretlotOA.setIv_adj_versioni(obj[10] == null ? _SPACE : obj[10].toString());
                fbpretlotOA.setIv_timestamp(obj[11] == null ? null : Timestamp.valueOf(obj[11].toString()));
                fbpretlotOA.setFinal_power(obj[12] == null ? _SPACE : obj[12].toString());
                fbpretlotOA.setFinal_grade(obj[13] == null ? _SPACE : obj[13].toString());
                fbpretlotOA.setFinal_color(obj[14] == null ? _SPACE : obj[14].toString());
                fbpretlotOA.setUpdate_user(obj[15] == null ? _SPACE : obj[15].toString());
                fbpretlotOA.setUpdate_timestamp(obj[16] == null ? null : Timestamp.valueOf(obj[16].toString()));
                fbpretlotOA.setOqc_grade(obj[17] == null ? _SPACE : obj[17].toString());
                fbpretlotOA.setShip_stat(obj[18] == null ? "未出货" : _YES.equals(obj[18].toString()) ? "已出货" : "为出货");
                oary.add(fbpretlotOA);
            }
            outTrx.setOary(oary);
        }
        return _NORMAL;
    }


}
