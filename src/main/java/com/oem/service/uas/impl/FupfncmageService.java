package com.oem.service.uas.impl;

import com.oem.comdef.GenericDef;
import com.oem.dao.IBisFuncCodeRepository;
import com.oem.dao.IBisFuncGrpRepositroy;
import com.oem.dao.IBisGrpFuncRepository;
import com.oem.entity.Bis_func_code;
import com.oem.entity.Bis_func_grp;
import com.oem.entity.Bis_grp_func;
import com.oem.entity.Bis_grp_funcId;
import com.oem.service.uas.IFupfncmageService;
import com.oem.tx.brm.Fbpbisdata.FbpbisdataIA;
import com.oem.tx.brm.Fbpbisfaty.FbpbisfatyIA;
import com.oem.tx.uas.Fupfncmage.*;
import com.oem.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.transaction.Transactional;
import java.sql.DatabaseMetaData;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static com.oem.comdef.GenericDef.*;

@Service("fupfncmageService")
public class FupfncmageService implements IFupfncmageService {
    private LogUtils logUtils;


    @Autowired
    private IBisFuncGrpRepositroy bisFuncGrpRepositroy;

    @Autowired
    private IBisGrpFuncRepository bisGrpFuncRepository;

    @Autowired
    private IBisFuncCodeRepository bisFuncCodeRepository;



    @Override
    @Transactional
    public String subMainProc(String evt_no, String strInMsg) {
        AppContext.clear();
        AppContext.setCurrServiceName(FupusrmageService.class.getSimpleName());
        AppContext.setCurrEventNumber(evt_no);
        logUtils = new LogUtils(FupusrmageService.class);
        logUtils.info("[InTrx:" + strInMsg + "]");

        FupfncmageO outTrx = new FupfncmageO();
        String strOutTrx = null;

        outTrx.setTrx_id(TX_FUPFNCMAGE);
        outTrx.setType_id(TRX_TYPE_OUT);
        outTrx.setRtn_code(RETURN_CODE_OK);

        try {
            FupfncmageI inTrx = JacksonUtil.fromJson(strInMsg, FupfncmageI.class);
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

    public long subMainProc2(FupfncmageI inTrx, FupfncmageO outTrx){
        long rtn_code = _ERROR;
        char action_flg = inTrx.getAction_flg().charAt(0);
        switch (action_flg) {
            case ACTION_FLG_QUERY:   //查询func_group
                rtn_code = queryFuncGroup(inTrx, outTrx);
                break;
            case ACTION_FLG_INQUIRE: //查询func_code
                rtn_code = queryFuncCode(inTrx, outTrx);
                break;
            case ACTION_FLG_ADD:  //新增func_group
                rtn_code = addNewFuncGroup(inTrx, outTrx);
                break;

            case ACTION_FLG_CREAT: //新增func_code
                rtn_code = addNewFuncCode(inTrx, outTrx);
                break;
            case ACTION_FLG_BIND: //绑定func_group和func_code
                rtn_code = bindFuncGroupAndFuncCode(inTrx, outTrx);
                break;
            case ACTION_FLG_UPDATE: //修改func_group
                rtn_code = updateFuncGroup(inTrx, outTrx);
                break;
            case ACTION_FLG_MODIFY: //修改func_code
                rtn_code = updateFuncCode(inTrx, outTrx);
                break;
            case ACTION_FLG_DELETE: //删除func_group
                rtn_code = deleteFuncGroup(inTrx, outTrx);
                break;
            case ACTION_FLG_REMOVE: //删除func_code
                rtn_code = deleteFuncCode(inTrx, outTrx);
                break;
            default:
                outTrx.setRtn_code(INVALID_ACTION_FLG);
                outTrx.setRtn_mesg("无效的操作标识[" + action_flg +"]");
        }

        return rtn_code;
    }

    private long queryFuncGroup(FupfncmageI inTrx, FupfncmageO outTrx) {
        List<FupfncmageIA> iaryAList = inTrx.getIaryA();
        List<FupfncmageOA> oaryAList = new ArrayList<>();
        if(iaryAList != null && !iaryAList.isEmpty()) {
            String group_id = iaryAList.get(0).getGroup_id();
            if(!StringUtil.isSpaceCheck(group_id)){
                Bis_func_grp bis_func_grp = bisFuncGrpRepositroy.get(iaryAList.get(0).getGroup_id());
                if(bis_func_grp != null){
                    FupfncmageOA fupfncmageOA = new FupfncmageOA();
                    fupfncmageOA.setGroup_id(bis_func_grp.getGroup_id());
                    fupfncmageOA.setGroup_name(bis_func_grp.getGroup_name());
                    fupfncmageOA.setSystem_id(bis_func_grp.getSystem_id());
                    String sql = "select func_code from bis_grp_func where group_id_fk ='" + iaryAList.get(0).getGroup_id() +"'";
                    List<String> funcCodeList = bisGrpFuncRepository.findBySQL(sql);
                    if(funcCodeList != null && !funcCodeList.isEmpty()){
                        fupfncmageOA.setFuncList(funcCodeList);
                    }
                    oaryAList.add(fupfncmageOA);
                }
            }
        }else {
            String hql = "From Bis_func_grp  where 1=1";
            List<Bis_func_grp> bisFuncGrpList = bisFuncGrpRepositroy.find(hql);
            if(bisFuncGrpList != null && !bisFuncGrpList.isEmpty()){
                for(Bis_func_grp bis_func_grp : bisFuncGrpList){
                    FupfncmageOA fupfncmageOA = new FupfncmageOA();
                    fupfncmageOA.setGroup_id(bis_func_grp.getGroup_id());
                    fupfncmageOA.setGroup_name(bis_func_grp.getGroup_name());
                    fupfncmageOA.setSystem_id(bis_func_grp.getSystem_id());
                    oaryAList.add(fupfncmageOA);
                }
            }
        }
        outTrx.setOaryA(oaryAList);
        return _NORMAL;
    }

    private long queryFuncCode(FupfncmageI inTrx, FupfncmageO outTrx) {
        StringBuffer hql = new StringBuffer("From Bis_func_code where 1=1");
        List<FupfncmageIB> iaryBList = inTrx.getIaryB();
        if(iaryBList != null && !iaryBList.isEmpty()){
             String func_code = iaryBList.get(0).getFunc_code();
             String system_id = iaryBList.get(0).getSystem_id();
             if(!StringUtil.isSpaceCheck(func_code)){
                 hql.append(" and func_code ='").append(func_code).append("'");
             }

             if(!StringUtil.isSpaceCheck(system_id)){
                 hql.append(" and system_id ='").append(system_id).append("'");
             }
        }
        List<Bis_func_code> bisFuncCodeList = bisFuncCodeRepository.find(hql.toString());
        if(bisFuncCodeList != null && !bisFuncCodeList.isEmpty()){
            List<FupfncmageOB> oaryBList = new ArrayList<>();
            for(Bis_func_code bis_func_code : bisFuncCodeList){
                FupfncmageOB fupfncmageOB = new FupfncmageOB();
                fupfncmageOB.setFunc_code(bis_func_code.getFunc_code());
                fupfncmageOB.setFunc_name(bis_func_code.getFunc_name());
                fupfncmageOB.setSystem_id(bis_func_code.getSystem_id());
                oaryBList.add(fupfncmageOB);
            }
            outTrx.setOaryB(oaryBList);
        }
        return _NORMAL;
    }


    private long addNewFuncGroup(FupfncmageI inTrx, FupfncmageO outTrx) {
        String evt_usr = inTrx.getEvt_usr();
        Timestamp evt_timestamp = DateUtil.getCurrentTimestamp();
        List<FupfncmageIA> iaryAList = inTrx.getIaryA();
        if(iaryAList == null || iaryAList.isEmpty()){
            outTrx.setRtn_code(E_FUPFNCMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入要添加的权限群组信息");
            return _ERROR;
        }
        for(FupfncmageIA fupfncmageIA: iaryAList){
           Bis_func_grp bis_func_grp = bisFuncGrpRepositroy.get(fupfncmageIA.getGroup_id());
           if(bis_func_grp != null){
              outTrx.setRtn_code(E_BIS_FUNC_GRP + E_ADD_EXIST + _SPACE);
              outTrx.setRtn_mesg("权限群组[" + fupfncmageIA.getGroup_id() +"]已经存在，请趣人");
              return _ERROR;
           }
           bis_func_grp = new Bis_func_grp();
           bis_func_grp.setGroup_id(fupfncmageIA.getGroup_id());
           bis_func_grp.setGroup_name(fupfncmageIA.getGroup_name());
           bis_func_grp.setSystem_id(fupfncmageIA.getSystem_id());
           bis_func_grp.setEvt_usr(evt_usr);
           bis_func_grp.setEvt_timestamp(evt_timestamp);
           bisFuncGrpRepositroy.save(bis_func_grp);
        }
        return _NORMAL;
    }

    private long addNewFuncCode(FupfncmageI inTrx, FupfncmageO outTrx) {
        String evt_usr = inTrx.getEvt_usr();
        Timestamp evt_timestamp = DateUtil.getCurrentTimestamp();
        List<FupfncmageIB> iaryBList = inTrx.getIaryB();
        if(iaryBList == null || iaryBList.isEmpty()){
            outTrx.setRtn_code(E_FUPFNCMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入要添加的权限代码信息");
            return _ERROR;
        }
        for(FupfncmageIB fupfncmageIB: iaryBList){
            Bis_func_code bis_func_code = bisFuncCodeRepository.get(fupfncmageIB.getFunc_code());
            if(bis_func_code != null){
                outTrx.setRtn_code(E_BIS_FUNC_GRP + E_ADD_EXIST + _SPACE);
                outTrx.setRtn_mesg("权限代码[" + fupfncmageIB.getFunc_code()+"]已经存在，请趣人");
                return _ERROR;
            }
            bis_func_code = new Bis_func_code();
            bis_func_code.setFunc_code(fupfncmageIB.getFunc_code());
            bis_func_code.setFunc_name(fupfncmageIB.getFunc_name());
            bis_func_code.setSystem_id(fupfncmageIB.getSystem_id());
            bis_func_code.setEvt_usr(evt_usr);
            bis_func_code.setEvt_timestamp(evt_timestamp);
            bisFuncGrpRepositroy.save(bis_func_code);
        }
        return _NORMAL;
    }

    private long bindFuncGroupAndFuncCode(FupfncmageI inTrx, FupfncmageO outTrx) {
        String evt_usr = inTrx.getEvt_usr();
        Timestamp evt_timestamp = DateUtil.getCurrentTimestamp();
        List<FupfncmageIA> iaryAList = inTrx.getIaryA();
        if(iaryAList == null || iaryAList.isEmpty()){
            outTrx.setRtn_code(E_FUPFNCMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请选择权限群组信息");
            return _ERROR;
        }

        FupfncmageIA fupfncmageIA = iaryAList.get(0);
        String group_id = fupfncmageIA.getGroup_id();
        Bis_func_grp bis_func_grp = bisFuncGrpRepositroy.get(group_id);
        if(bis_func_grp == null){
            outTrx.setRtn_code(E_BIS_FUNC_GRP + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到权限群组[" + group_id +"]的信息");
            return _ERROR;
        }
        String hql ="From Bis_grp_func where group_id_fk ='" + group_id +"'";
        List<Bis_grp_func> bisGrpFuncList = bisGrpFuncRepository.find(hql);
        if(bisGrpFuncList != null && !bisGrpFuncList.isEmpty()){
            for(Bis_grp_func bis_grp_func : bisGrpFuncList){
                bisGrpFuncRepository.delete(bis_grp_func);
            }
        }
        List<FupfncmageIB> iaryBList = inTrx.getIaryB();
        if(iaryBList != null && !iaryBList.isEmpty()){
            for(FupfncmageIB fupfncmageIB : iaryBList){
                Bis_func_code bis_func_code = bisFuncCodeRepository.get(fupfncmageIB.getFunc_code());
                if(bis_func_code == null){
                    outTrx.setRtn_code(E_BIS_FUNC_CODE + E_READ_NOT_FOUND + _SPACE);
                    outTrx.setRtn_mesg("没有找到权限代码[" + fupfncmageIB.getFunc_code() + "]的信息");
                    return _ERROR;
                }
                Bis_grp_funcId bis_grp_funcId = new Bis_grp_funcId();
                bis_grp_funcId.setGroup_id_fk(group_id);
                bis_grp_funcId.setFunc_code(fupfncmageIB.getFunc_code());
                Bis_grp_func bis_grp_func = new Bis_grp_func(bis_grp_funcId);
                bis_grp_func.setSystem_id(bis_func_grp.getSystem_id());
                bis_grp_func.setEvt_usr(evt_usr);
                bis_grp_func.setEvt_timestamp(evt_timestamp);
                bisGrpFuncRepository.save(bis_grp_func);
            }
        }
        return _NORMAL;
    }

    private long updateFuncGroup(FupfncmageI inTrx, FupfncmageO outTrx) {
        String evt_usr = inTrx.getEvt_usr();
        Timestamp evt_timestamp = DateUtil.getCurrentTimestamp();
        List<FupfncmageIA> iaryAList = inTrx.getIaryA();
        if(iaryAList == null || iaryAList.isEmpty()){
            outTrx.setRtn_code(E_FUPFNCMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请选择要修改的权限群组信息");
            return _ERROR;
        }
        for(FupfncmageIA fupfncmageIA : iaryAList){
            Bis_func_grp bis_func_grp = bisFuncGrpRepositroy.getWithLock(fupfncmageIA.getGroup_id());
            if(bis_func_grp == null){
                outTrx.setRtn_code(E_BIS_FUNC_GRP + E_READ_NOT_FOUND + _SPACE);
                outTrx.setRtn_mesg("没有找到权限群组[" + fupfncmageIA.getGroup_id() +"]的信息");
                return _ERROR;
            }
            bis_func_grp.setGroup_name(fupfncmageIA.getGroup_name());
            bis_func_grp.setSystem_id(fupfncmageIA.getSystem_id());
            bis_func_grp.setEvt_usr(evt_usr);
            bis_func_grp.setEvt_timestamp(evt_timestamp);
            bisFuncGrpRepositroy.update(bis_func_grp);
        }
        return _NORMAL;
    }

    private long updateFuncCode(FupfncmageI inTrx, FupfncmageO outTrx) {
        String evt_usr = inTrx.getEvt_usr();
        Timestamp evt_timestamp = DateUtil.getCurrentTimestamp();
        List<FupfncmageIB> iaryBList = inTrx.getIaryB();
        if(iaryBList == null || iaryBList.isEmpty()){
            outTrx.setRtn_code(E_FUPFNCMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请选择要修改的权限代码信息");
            return _ERROR;
        }
        for(FupfncmageIB fupfncmageIB: iaryBList){
            Bis_func_code bis_func_code = bisFuncCodeRepository.get(fupfncmageIB.getFunc_code());
            if(bis_func_code == null){
                outTrx.setRtn_code(E_BIS_FUNC_CODE + E_READ_NOT_FOUND + _SPACE);
                outTrx.setRtn_mesg("没有找到权限代码[" + fupfncmageIB.getFunc_code() + "]的信息");
                return _ERROR;
            }
            bis_func_code.setFunc_name(fupfncmageIB.getFunc_name());
            bis_func_code.setSystem_id(fupfncmageIB.getSystem_id());
            bis_func_code.setEvt_usr(evt_usr);
            bis_func_code.setEvt_timestamp(evt_timestamp);
            bisFuncGrpRepositroy.update(bis_func_code);
        }
        return _NORMAL;
    }

    private long deleteFuncGroup(FupfncmageI inTrx, FupfncmageO outTrx) {
        String evt_usr = inTrx.getEvt_usr();
        Timestamp evt_timestamp = DateUtil.getCurrentTimestamp();
        List<FupfncmageIA> iaryAList = inTrx.getIaryA();
        if(iaryAList == null || iaryAList.isEmpty()){
            outTrx.setRtn_code(E_FUPFNCMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请选择要修改的权限群组信息");
            return _ERROR;
        }
        for(FupfncmageIA fupfncmageIA : iaryAList){
            Bis_func_grp bis_func_grp = bisFuncGrpRepositroy.getWithLock(fupfncmageIA.getGroup_id());
            if(bis_func_grp != null){
                bis_func_grp.setEvt_usr(evt_usr);
                bis_func_grp.setEvt_timestamp(evt_timestamp);
                bisFuncGrpRepositroy.delete(bis_func_grp);
                String hql ="From Bis_grp_func where group_id_fk='" + fupfncmageIA.getGroup_id() +"'";
                List<Bis_grp_func> bisGrpFuncList = bisGrpFuncRepository.listWithLock(hql);
                if(bisGrpFuncList != null && !bisGrpFuncList.isEmpty()){
                   for(Bis_grp_func bis_grp_func : bisGrpFuncList){
                       bis_grp_func.setEvt_usr(evt_usr);
                       bis_grp_func.setEvt_timestamp(evt_timestamp);
                       bisGrpFuncRepository.delete(bis_grp_func);
                   }
                }
            }
        }
        return _NORMAL;
    }

    private long deleteFuncCode(FupfncmageI inTrx, FupfncmageO outTrx) {
        String evt_usr = inTrx.getEvt_usr();
        Timestamp evt_timestamp = DateUtil.getCurrentTimestamp();
        List<FupfncmageIB> iaryBList = inTrx.getIaryB();
        if(iaryBList == null || iaryBList.isEmpty()){
            outTrx.setRtn_code(E_FUPFNCMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请选择要修改的权限代码信息");
            return _ERROR;
        }
        for(FupfncmageIB fupfncmageIB: iaryBList){
            Bis_func_code bis_func_code = bisFuncCodeRepository.get(fupfncmageIB.getFunc_code());
            if(bis_func_code != null){
                bis_func_code.setEvt_usr(evt_usr);
                bis_func_code.setEvt_timestamp(evt_timestamp);
                bisFuncCodeRepository.delete(bis_func_code);
                String hql ="From Bis_grp_func where func_code='" + bis_func_code.getFunc_code() +"'";
                List<Bis_grp_func> bisGrpFuncList = bisGrpFuncRepository.listWithLock(hql);
                if(bisGrpFuncList != null && !bisGrpFuncList.isEmpty()){
                    for(Bis_grp_func bis_grp_func : bisGrpFuncList){
                        bis_grp_func.setEvt_usr(evt_usr);
                        bis_grp_func.setEvt_timestamp(evt_timestamp);
                        bisGrpFuncRepository.delete(bis_grp_func);
                    }
                }
            }
        }
        return _NORMAL;
    }


}
