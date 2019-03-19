package com.oem.service.brm.impl;

import com.oem.dao.*;
import com.oem.entity.*;
import com.oem.service.brm.IFbpretboxService;
import com.oem.tx.brm.Fbpretbox.*;
import com.oem.util.*;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.sql.Timestamp;
import java.util.*;

import static com.oem.comdef.GenericDef.*;
import static java.util.stream.Collectors.groupingBy;

@Service("fbpretboxService")
public class FbpretboxService implements IFbpretboxService {

    private LogUtils logUtils;

    @Autowired
    private IBisUserRepository bisUserRepository;

    @Autowired
    private IOemPrdBoxRepository oemPrdBoxRepository;
    @Autowired
    private IOemPrdLotRepository oemPrdLotRepository;
    @Autowired
    private IOemMtrlUseRepository oemMtrlUse;
    @Autowired
    private IOemImagePathRepository oemImagePath;


    @Override
    @Transactional
    public String subMainProc(String evt_no, String strInMsg) {
        AppContext.clear();
        AppContext.setCurrServiceName(FbpretboxService.class.getSimpleName());
        AppContext.setCurrEventNumber(evt_no);
        logUtils = new LogUtils(FbpretboxService.class);
        logUtils.info("[InTrx:" + strInMsg + "]");

        String strOutTrx = null;
        FbpretboxO outTrx = new FbpretboxO();
        outTrx.setTrx_id(TX_FBPRETBOX);
        outTrx.setType_id(TRX_TYPE_OUT);
        outTrx.setRtn_code(RETURN_CODE_OK);
        outTrx.setRtn_mesg(RETURN_MESG_OK);
        try {
            FbpretboxI inTrx = JacksonUtil.fromJson(strInMsg, FbpretboxI.class);
            long rtn_code = subMainProc2(inTrx, outTrx);
            if (rtn_code != _NORMAL) {
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
            outTrx.setRtn_mesg(ex.getCause().toString());
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        } finally {
            strOutTrx = JacksonUtil.toJSONStr(outTrx);
            logUtils.info("[OutTrx:" + strOutTrx + "]");
        }
        return strOutTrx;
    }

    public long subMainProc2(FbpretboxI inTrx, FbpretboxO outTrx) throws SchedulerException {
        long rtn_code = _ERROR;
        char action_flg = inTrx.getAction_flg().charAt(0);
        switch (action_flg) {
            case ACTION_FLG_QUERY:
                rtn_code = queryFunc(inTrx, outTrx);
                break;
            case ACTION_FLG_OQC:
                rtn_code = setGradeFunc(inTrx, outTrx);
                break;
            case ACTION_FLG_SHIP:
                rtn_code = setShipFunc(inTrx, outTrx);
                break;
            default:
                outTrx.setRtn_code(INVALID_ACTION_FLG);
                outTrx.setRtn_mesg("无效的操作标识");

        }
        return rtn_code;
    }

    public long queryFunc(FbpretboxI inTrx, FbpretboxO outTrx) {

        StringBuffer hql = new StringBuffer("From Oem_prd_box where 1=1");
        if (inTrx.getIary() != null && !inTrx.getIary().isEmpty()) {
            String box_no = inTrx.getIary().get(0).getBox_no();
            if(!StringUtil.isSpaceCheck(box_no)){
                hql.append(" and box_no ='").append(box_no).append("'");
            }
        }
        String evt_usr = inTrx.getEvt_usr();
        Bis_user bis_user = bisUserRepository.get(evt_usr);
        if(bis_user == null){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到用户[" + evt_usr +"]的信息，情确认");
            return _ERROR;
        }
        String usr_faty = bis_user.getUsr_fty();
        if(!StringUtil.isSpaceCheck(usr_faty)){
            hql.append(" and oem_id ='").append(usr_faty).append("'");
        }

        List<Oem_prd_box> oemPrdBoxInfoList = oemPrdBoxRepository.find(hql.toString());
        List<FbpretboxOA> oary = new ArrayList<>();
        if (!oemPrdBoxInfoList.isEmpty()) {
            String lotHql = "From Oem_prd_lot where box_no = ?0 and oem_id = ?1";
            for (Oem_prd_box oem_prd_box : oemPrdBoxInfoList) {
                String box_no = oem_prd_box.getBox_no();
                FbpretboxOA fbpretboxOA = new FbpretboxOA();
                fbpretboxOA.setBox_no(box_no);
                fbpretboxOA.setOqc_grade(oem_prd_box.getOqc_grade());
                fbpretboxOA.setShip_statu(oem_prd_box.getShip_statu());

                List<Oem_prd_lot> oem_prd_lots = oemPrdLotRepository.list(lotHql, box_no, usr_faty);
                if(oem_prd_lots != null && !oem_prd_lots.isEmpty()){
                    List<FbpretboxOB> oaryB = new ArrayList<>();
                    for(Oem_prd_lot oem_prd_lot : oem_prd_lots){
                        FbpretboxOB fbpretboxOB = new FbpretboxOB();
                        fbpretboxOB.setOem_id(usr_faty);
                        fbpretboxOB.setLot_no(oem_prd_lot.getLot_no());
                        fbpretboxOB.setIv_power(oem_prd_lot.getIv_power());
                        fbpretboxOB.setIv_isc(oem_prd_lot.getIv_isc());
                        fbpretboxOB.setIv_voc(oem_prd_lot.getIv_voc());
                        fbpretboxOB.setIv_imp(oem_prd_lot.getIv_imp());
                        fbpretboxOB.setIv_vmp(oem_prd_lot.getIv_vmp());
                        fbpretboxOB.setIv_ff(oem_prd_lot.getIv_ff());
                        fbpretboxOB.setIv_tmper(oem_prd_lot.getIv_tmper());
                        fbpretboxOB.setIv_adj_versioni(oem_prd_lot.getIv_adj_versioni());
                        fbpretboxOB.setIv_timestamp(oem_prd_lot.getIv_timestamp());
                        fbpretboxOB.setFinal_grade(oem_prd_lot.getFinal_grade());
                        fbpretboxOB.setFinal_color(oem_prd_lot.getFinal_color_lvl());
                        fbpretboxOB.setFinal_power(oem_prd_lot.getFinal_power_lvl());
                        fbpretboxOB.setBox_no(oem_prd_lot.getBox_no());
                        oaryB.add(fbpretboxOB);
                    }
                    fbpretboxOA.setOaryB(oaryB);
                }
                oary.add(fbpretboxOA);
            }
        }
        outTrx.setTbl_cnt(oary.size());
        outTrx.setOary(oary);
        return _NORMAL;
    }

    public long setGradeFunc(FbpretboxI inTrx, FbpretboxO outTrx) {

        List<FbpretboxIA> iaryList = inTrx.getIary();
        if(iaryList == null || iaryList.isEmpty()){
            outTrx.setRtn_code(E_FBPRETBOX_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入箱子信息");
            return _ERROR;
        }
        String evt_usr = inTrx.getEvt_usr();
        Timestamp cr_timestamp = DateUtil.getCurrentTimestamp();
        Bis_user bis_user = bisUserRepository.get(evt_usr);
        if(bis_user == null){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到用户[" + evt_usr +"]的信息，情确认");
            return _ERROR;
        }
        String usr_faty = bis_user.getUsr_fty();
        if(StringUtil.isSpaceCheck(usr_faty)){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("用户[" + evt_usr +"]的所属的工厂信息为空,请确认");
            return _ERROR;
        }
        List<FbpretboxOA> oary = new ArrayList<>();
        String hql = "From Oem_prd_box where box_no = ?0 and oem_id = ?1";
        for(FbpretboxIA fbpretboxIA : iaryList){
            String box_no = fbpretboxIA.getBox_no();
            String oqc_grade = fbpretboxIA.getOqc_grade();
            Oem_prd_box oem_prd_box = oemPrdBoxRepository.uniqueResultWithLock(hql, box_no, usr_faty);
            if(oem_prd_box == null){
                outTrx.setRtn_code(E_OEM_PRD_BOX + E_READ_NOT_FOUND + _SPACE);
                outTrx.setRtn_mesg("没有找到箱号[" + box_no +"]的信息，请确认");
                return _ERROR;
            }
            oem_prd_box.setOqc_grade(oqc_grade);
            oem_prd_box.setUpdate_user(evt_usr);
            oem_prd_box.setUpdate_timestamp(cr_timestamp);
            oemPrdBoxRepository.update(oem_prd_box);

            FbpretboxOA fbpretboxOA = new FbpretboxOA();
            fbpretboxIA.setBox_no(oem_prd_box.getBox_no());
            fbpretboxOA.setOqc_grade(oem_prd_box.getOqc_grade());
            fbpretboxOA.setShip_statu(oem_prd_box.getShip_statu());
            oary.add(fbpretboxOA);
        }
        outTrx.setTbl_cnt(oary.size());
        outTrx.setOary(oary);
        return _NORMAL;
    }

    public long setShipFunc(FbpretboxI inTrx, FbpretboxO outTrx) {
        List<FbpretboxIA> iaryList = inTrx.getIary();
        if(iaryList == null || iaryList.isEmpty()){
            outTrx.setRtn_code(E_FBPRETBOX_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入箱子信息");
            return _ERROR;
        }
        String evt_usr = inTrx.getEvt_usr();
        Timestamp cr_timestamp = DateUtil.getCurrentTimestamp();
        Bis_user bis_user = bisUserRepository.get(evt_usr);
        if(bis_user == null){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到用户[" + evt_usr +"]的信息，情确认");
            return _ERROR;
        }
        String usr_faty = bis_user.getUsr_fty();
        if(StringUtil.isSpaceCheck(usr_faty)){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("用户[" + evt_usr +"]的所属的工厂信息为空,请确认");
            return _ERROR;
        }
        List<FbpretboxOA> oary = new ArrayList<>();
        String hql = "From Oem_prd_box where box_no = ?0 and oem_id = ?1 ";
        for(FbpretboxIA fbpretboxIA : iaryList){
            String box_no = fbpretboxIA.getBox_no();
            Oem_prd_box oem_prd_box = oemPrdBoxRepository.uniqueResultWithLock(hql, box_no, usr_faty);
            if(oem_prd_box == null){
                outTrx.setRtn_code(E_OEM_PRD_BOX + E_READ_NOT_FOUND + _SPACE);
                outTrx.setRtn_mesg("没有找到箱号[" + box_no +"]的信息，请确认");
                return _ERROR;
            }
            oem_prd_box.setShip_statu(_YES);
            oem_prd_box.setUpdate_user(evt_usr);
            oem_prd_box.setUpdate_timestamp(cr_timestamp);
            oemPrdBoxRepository.update(oem_prd_box);

            FbpretboxOA fbpretboxOA = new FbpretboxOA();
            fbpretboxIA.setBox_no(oem_prd_box.getBox_no());
            fbpretboxOA.setOqc_grade(oem_prd_box.getOqc_grade());
            fbpretboxOA.setShip_statu(oem_prd_box.getShip_statu());
            oary.add(fbpretboxOA);
        }
        outTrx.setTbl_cnt(oary.size());
        outTrx.setOary(oary);
        return _NORMAL;

    }
}
