package com.oem.service.uas.impl;

import com.oem.dao.IBisFuncCodeRepository;
import com.oem.dao.IBisGrpFuncRepository;
import com.oem.dao.IBisUserGrpRepository;
import com.oem.dao.IBisUserRepository;
import com.oem.entity.Bis_user;
import com.oem.entity.Bis_usr_grp;
import com.oem.service.uas.IUsermageService;
import com.oem.util.AppContext;
import com.oem.util.JacksonUtil;
import com.oem.util.LogUtils;
import com.oem.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import com.oem.tx.uas.usermage.UsermageI;
import com.oem.tx.uas.usermage.UsermageIA;
import com.oem.tx.uas.usermage.UsermageO;
import com.oem.tx.uas.usermage.UsermageOA;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static com.oem.comdef.GenericDef.*;

@Service("usermageService")
public class UsermageService implements IUsermageService {

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
        AppContext.setCurrServiceName(UsermageService.class.getSimpleName());
        AppContext.setCurrEventNumber(evt_no);
        logUtils = new LogUtils(UsermageService.class);
        logUtils.info("[InTrx:" + strInMsg + "]");

        UsermageO outTrx = new UsermageO();
        String strOutTrx = null;

        outTrx.setTrx_id(TX_USERMAGE);
        outTrx.setType_id(TRX_TYPE_OUT);
        outTrx.setRtn_code(RETURN_CODE_OK);

        try {
            UsermageI inTrx = JacksonUtil.fromJson(strInMsg, UsermageI.class);
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

    public long subMainProc2(UsermageI inTrx, UsermageO outTrx){
       long rtn_code = _ERROR;
       char action_flg = inTrx.getAction_flg().charAt(0);
        switch (action_flg) {
            case ACTION_FLG_QUERY:
                rtn_code = queryByCondition(inTrx, outTrx);
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
            default:
                outTrx.setRtn_code(INVALID_ACTION_FLG);
                outTrx.setRtn_mesg("无效的操作标识");
                break;
        }
        return rtn_code;
    }

    public long queryByCondition(UsermageI inTrx, UsermageO outTrx){

        StringBuffer hql = new StringBuffer("FROM Bis_user where 1=1");
        UsermageIA iary = inTrx.getIary().get(0);
        if(iary != null){
            String usr_id = iary.getUsr_id();
            if (!StringUtil.isSpaceCheck(usr_id)) {
                hql.append(" and usr_id ='").append(usr_id).append("'");
            }
        }
        List<Bis_user> bis_users = bisUserRepository.find(hql.toString());
        List<UsermageOA> oaryList = new ArrayList<>();
        for (Bis_user bis_user : bis_users) {
            UsermageOA oary = new UsermageOA();
            oary.setUsr_id(bis_user.getUsr_id());
            oary.setUsr_name(bis_user.getUsr_name());
            oary.setUsr_type(bis_user.getUsr_type());
            oary.setAdmin_flg(bis_user.getAdmin_flg());
            oaryList.add(oary);
        }
        outTrx.setOary(oaryList);
        return _NORMAL;
    }

    public long addFnc(UsermageI inTrx, UsermageO outTrx){
        List<UsermageIA> iary = inTrx.getIary();
        if(iary == null || iary.isEmpty()) {
            outTrx.setRtn_code(E_USERMAGE_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入要添加的用户信息");
            return _ERROR;
        }
        for(UsermageIA usermageIA : iary){
            Bis_user bis_user = bisUserRepository.get(usermageIA.getUsr_id());
            if(bis_user != null){
               outTrx.setRtn_code(E_BIS_USER + E_ADD_EXIST + _SPACE);
               outTrx.setRtn_mesg("工号[" + usermageIA.getUsr_id() +"]已经存在，请确认");
               return _ERROR;
            }
            bis_user = new Bis_user();
            bis_user.setUnq_seq_id(AppContext.getCurrEventNumber());
            bis_user.setUsr_id(usermageIA.getUsr_id());
            bis_user.setUsr_key("123");
            bis_user.setUsr_name(usermageIA.getUsr_name());
            bis_user.setUsr_type(usermageIA.getUsr_type());
            bis_user.setUsr_fty(usermageIA.getUsr_fty());
            bis_user.setUsr_phone(usermageIA.getUsr_phone());
            bis_user.setUsr_mail(usermageIA.getUsr_mail());
            bis_user.setValid_flg(usermageIA.getValid_flg());
            bis_user.setAdmin_flg(usermageIA.getAdmin_flg());
            bisUserRepository.save(bis_user);
        }
        return _NORMAL;

    }

    public long updateFnc(UsermageI inTrx, UsermageO outTrx){
      return  _NORMAL;
    }

    public long deleteFnc(UsermageI inTrx, UsermageO outTrx){
        return _NORMAL;
    }
}
