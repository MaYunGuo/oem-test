package com.oem.service.uas.impl;

import com.oem.dao.IBisFuncCodeRepository;
import com.oem.dao.IBisGrpFuncRepository;
import com.oem.dao.IBisUserGrpRepository;
import com.oem.dao.IBisUserRepository;
import com.oem.entity.Bis_user;
import com.oem.entity.Bis_usr_grp;
import com.oem.entity.Bis_usr_grpId;
import com.oem.service.uas.IFupusrmageService;
import com.oem.tx.uas.Fupusrmage.*;
import com.oem.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static com.oem.comdef.GenericDef.*;

@Service("fupusrmageService")
public class FupusrmageService implements IFupusrmageService {

    private LogUtils logUtils;

    @Autowired
    private IBisUserRepository bisUserRepository;

    @Autowired
    private IBisGrpFuncRepository bisGrpFuncRepository;

    @Autowired
    private IBisUserGrpRepository bisUserGrpRepository;

    @Autowired
    private IBisFuncCodeRepository bisFuncCodeRepository;

    @Override
    public Bis_user getBisUser(String usr_id){
        return bisUserRepository.get(usr_id);
    }

    @Override
    public List<String> getUserFuncCode(Bis_user bis_user){

        List<String> funcCodeList = new ArrayList<>();
        if(_YES.equals(bis_user.getAdmin_flg())){
            funcCodeList  = bisFuncCodeRepository.findBySQL("select func_code from bis_func_code");
       }else{
           String hql = "From Bis_usr_grp where usr_id_fk='" + bis_user.getUsr_id() +"'";
           List<Bis_usr_grp> bis_usr_grps = bisUserGrpRepository.find(hql);
           if(bis_usr_grps == null || bis_usr_grps.isEmpty()) {
               return funcCodeList;
           }

           StringBuffer sql =new StringBuffer("select func_code from bis_grp_func where group_id_fk in (");
           for(int i=0;i<bis_usr_grps.size()-1;i++){
               sql.append("'") .append(bis_usr_grps.get(i).getId().getGroup_id_fk()).append("',");
           }
           sql.append("'").append(bis_usr_grps.get(bis_usr_grps.size()-1).getId().getGroup_id_fk()).append("')");

           funcCodeList  = bisFuncCodeRepository.findBySQL(sql.toString());

       }
        return funcCodeList;
    }

    @Override
    @Transactional
    public boolean updatePassWord(String usr_id, String new_password){
         Bis_user bis_user = bisUserRepository.getWithLock(usr_id);
         if(bis_user == null ){
             return false;
         }
         bis_user.setUsr_key(new_password);
         bisUserRepository.update(bis_user);
         return true;
    }

    @Override
    @Transactional
    public String subMainProc(String evt_no, String strInMsg) {
        AppContext.clear();
        AppContext.setCurrServiceName(FupusrmageService.class.getSimpleName());
        AppContext.setCurrEventNumber(evt_no);
        logUtils = new LogUtils(FupusrmageService.class);
        logUtils.info("[InTrx:" + strInMsg + "]");

        FupusrmageO outTrx = new FupusrmageO();
        String strOutTrx = null;

        outTrx.setTrx_id(TX_FUPUSRMAGE);
        outTrx.setType_id(TRX_TYPE_OUT);
        outTrx.setRtn_code(RETURN_CODE_OK);

        try {
            FupusrmageI inTrx = JacksonUtil.fromJson(strInMsg, FupusrmageI.class);
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

    public long subMainProc2(FupusrmageI inTrx, FupusrmageO outTrx){
       long rtn_code = _ERROR;
       char action_flg = inTrx.getAction_flg().charAt(0);
        switch (action_flg) {
            case ACTION_FLG_QUERY:
                rtn_code = queryByCondition(inTrx, outTrx);
                break;
            case ACTION_FLG_INQUIRE:  //查询用户权限组
                rtn_code = queryUsrGroup(inTrx, outTrx);
                break;
            case ACTION_FLG_ADD:
                rtn_code = addFnc(inTrx, outTrx);
                break;
            case ACTION_FLG_UPDATE:
                rtn_code = updateFnc(inTrx, outTrx);
                break;
            case ACTION_FLG_DELETE:
                rtn_code = deleteFnc(inTrx, outTrx);
                break;
            case ACTION_FLG_BIND: //绑定用户和权限群组
                rtn_code = bindUsrAndFuncGroup(inTrx, outTrx);
                break;
            default:
                outTrx.setRtn_code(INVALID_ACTION_FLG);
                outTrx.setRtn_mesg("无效的操作标识");
                break;
        }
        return rtn_code;
    }

    public long queryByCondition(FupusrmageI inTrx, FupusrmageO outTrx){

        StringBuffer hql = new StringBuffer("FROM Bis_user where 1=1");
        List<FupusrmageIA> iaryA = inTrx.getIaryA();
        if(iaryA != null && !iaryA.isEmpty()){
            String usr_id = iaryA.get(0).getUsr_id();
            if (!StringUtil.isSpaceCheck(usr_id)) {
                hql.append(" and usr_id ='").append(usr_id).append("'");
            }
        }
        List<Bis_user> bis_users = bisUserRepository.find(hql.toString());
        List<FupusrmageOA> oaryList = new ArrayList<>();
        for (Bis_user bis_user : bis_users) {
            FupusrmageOA oary = new FupusrmageOA();
            oary.setUsr_id(bis_user.getUsr_id());
            oary.setUsr_name(bis_user.getUsr_name());
            oary.setUsr_type(bis_user.getUsr_type());
            oary.setUsr_mail(bis_user.getUsr_mail());
            oary.setUsr_phone(bis_user.getUsr_phone());
            oary.setAdmin_flg(bis_user.getAdmin_flg());
            oaryList.add(oary);
        }
        outTrx.setOaryA(oaryList);
        return _NORMAL;
    }

    public long queryUsrGroup(FupusrmageI inTrx, FupusrmageO outTrx){
        List<FupusrmageIA> iaryAList = inTrx.getIaryA();
        if(iaryAList == null || iaryAList.isEmpty()){
            outTrx.setRtn_code(E_FUPUSRMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入要查询的用户信息");
            return _ERROR;
        }
        String usr_id =  iaryAList.get(0).getUsr_id();
        Bis_user bis_user = bisUserRepository.get(usr_id);
        if(bis_user == null){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到工号[" + usr_id +"]的用户信息，请确认");
            return _ERROR;
        }
        String sql = "select group_id_fk from bis_usr_grp where usr_id_fk='" + usr_id +"'";
        List<String> groupList = bisUserGrpRepository.findBySQL(sql);
        if(groupList!= null && !groupList.isEmpty()){
            List<FupusrmageOB> oaryBList = new ArrayList<>();
            FupusrmageOB fupusrmageOB = new FupusrmageOB();
            fupusrmageOB.setUsr_id(bis_user.getUsr_id());
            fupusrmageOB.setUsr_name(bis_user.getUsr_name());
            fupusrmageOB.setGroupList(groupList);
            oaryBList.add(fupusrmageOB);
            outTrx.setOaryB(oaryBList);
        }
        return _NORMAL;
    }

    public long addFnc(FupusrmageI inTrx, FupusrmageO outTrx){
        List<FupusrmageIA> iary = inTrx.getIaryA();
        if(iary == null || iary.isEmpty()) {
            outTrx.setRtn_code(E_FUPUSRMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入要添加的用户信息");
            return _ERROR;
        }
        for(FupusrmageIA fupusrmageIA : iary){
            Bis_user bis_user = bisUserRepository.get(fupusrmageIA.getUsr_id());
            if(bis_user != null){
               outTrx.setRtn_code(E_BIS_USER + E_ADD_EXIST + _SPACE);
               outTrx.setRtn_mesg("工号[" + fupusrmageIA.getUsr_id() +"]已经存在，请确认");
               return _ERROR;
            }
            bis_user = new Bis_user();
            bis_user.setUnq_seq_id(AppContext.getCurrEventNumber());
            bis_user.setUsr_id(fupusrmageIA.getUsr_id());
            bis_user.setUsr_key("123");
            bis_user.setUsr_name(fupusrmageIA.getUsr_name());
            bis_user.setUsr_type(fupusrmageIA.getUsr_type());
            bis_user.setUsr_fty(fupusrmageIA.getUsr_fty());
            bis_user.setUsr_phone(fupusrmageIA.getUsr_phone());
            bis_user.setUsr_mail(fupusrmageIA.getUsr_mail());
            bis_user.setValid_flg(fupusrmageIA.getValid_flg());
            bis_user.setAdmin_flg(fupusrmageIA.getAdmin_flg());
            bisUserRepository.save(bis_user);
        }
        return _NORMAL;

    }

    public long updateFnc(FupusrmageI inTrx, FupusrmageO outTrx){
        List<FupusrmageIA> iary = inTrx.getIaryA();
        if(iary == null || iary.isEmpty()) {
            outTrx.setRtn_code(E_FUPUSRMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入要添加的用户信息");
            return _ERROR;
        }
        for(FupusrmageIA fupusrmageIA : iary){
            Bis_user bis_user = bisUserRepository.getWithLock(fupusrmageIA.getUsr_id());
            if(bis_user == null){
                outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
                outTrx.setRtn_mesg("没有找到工号[" + fupusrmageIA.getUsr_id() +"]的用户信息，请确认");
                return _ERROR;
            }
            bis_user.setUnq_seq_id(AppContext.getCurrEventNumber());
            bis_user.setUsr_name(fupusrmageIA.getUsr_name());
            bis_user.setUsr_type(fupusrmageIA.getUsr_type());
            bis_user.setUsr_fty(fupusrmageIA.getUsr_fty());
            bis_user.setUsr_phone(fupusrmageIA.getUsr_phone());
            bis_user.setUsr_mail(fupusrmageIA.getUsr_mail());
            bis_user.setValid_flg(fupusrmageIA.getValid_flg());
            bis_user.setAdmin_flg(fupusrmageIA.getAdmin_flg());
            bisUserRepository.update(bis_user);
        }
        return  _NORMAL;
    }

    public long deleteFnc(FupusrmageI inTrx, FupusrmageO outTrx){
        String evt_usr = inTrx.getEvt_usr();
        Timestamp evt_timestamp = DateUtil.getCurrentTimestamp();
        List<FupusrmageIA> iary = inTrx.getIaryA();
        if(iary == null || iary.isEmpty()) {
            outTrx.setRtn_code(E_FUPUSRMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入要删除的用户信息");
            return _ERROR;
        }
        for(FupusrmageIA fupusrmageIA : iary){
            Bis_user bis_user = bisUserRepository.getWithLock(fupusrmageIA.getUsr_id());
            if(bis_user != null){
                bisUserRepository.delete(bis_user);
                String hql ="From Bis_usr_grp where usr_id_fk='" + fupusrmageIA.getUsr_id() +"'";
                List<Bis_usr_grp> bisUsrGrpList = bisUserGrpRepository.listWithLock(hql);
                if(bisUsrGrpList != null && !bisUsrGrpList.isEmpty()){
                    for(Bis_usr_grp bis_usr_grp : bisUsrGrpList){
                        bis_usr_grp.setUnq_seq_id(AppContext.getCurrEventNumber());
                        bis_usr_grp.setEvt_usr(evt_usr);
                        bis_usr_grp.setEvt_timestamp(evt_timestamp);
                        bisUserGrpRepository.delete(bis_usr_grp);
                    }
                }
            }
        }
        return _NORMAL;
    }

    public long bindUsrAndFuncGroup(FupusrmageI inTrx, FupusrmageO outTrx){
        String evt_usr = inTrx.getEvt_usr();
        Timestamp evt_timestamp = DateUtil.getCurrentTimestamp();
        List<FupusrmageIA> iaryA = inTrx.getIaryA();
        if(iaryA == null || iaryA.isEmpty()) {
            outTrx.setRtn_code(E_FUPUSRMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请选择用户信息");
            return _ERROR;
        }
        String usr_id = iaryA.get(0).getUsr_id();
        Bis_user bis_usr = bisUserRepository.get(usr_id);
        if(bis_usr == null){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到工号[" + usr_id +"]的用户信息，请确认");
            return _ERROR;
        }
        String hql ="From Bis_usr_grp where usr_id_fk='" + usr_id +"'";
        List<Bis_usr_grp> bisUsrGrpList = bisUserGrpRepository.listWithLock(hql);
        if(bisUsrGrpList != null && !bisUsrGrpList.isEmpty()){
            for(Bis_usr_grp bis_usr_grp : bisUsrGrpList){
                bisUserGrpRepository.delete(bis_usr_grp);
            }
        }

        List<FupusrmageIB> iaryB = inTrx.getIaryB();
        if(iaryB != null && !iaryB.isEmpty()){
            for(FupusrmageIB fupusrmageIB:iaryB){
                Bis_usr_grpId bis_usr_grpId = new Bis_usr_grpId();
                bis_usr_grpId.setUsr_id_fk(usr_id);
                bis_usr_grpId.setGroup_id_fk(fupusrmageIB.getGroup_id());
                Bis_usr_grp bis_usr_grp = new Bis_usr_grp(bis_usr_grpId);
                bis_usr_grp.setUnq_seq_id(AppContext.getCurrEventNumber());
                bis_usr_grp.setEvt_usr(evt_usr);
                bis_usr_grp.setEvt_timestamp(evt_timestamp);
                bisUserGrpRepository.save(bis_usr_grp);
            }
        }
        return _NORMAL;
    }
}
