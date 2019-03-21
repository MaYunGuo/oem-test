package com.oem.service.brm.impl;

import com.oem.dao.IBisFactoryRepository;
import com.oem.dao.IBisUserRepository;
import com.oem.dao.IOemMtrlUseRepository;
import com.oem.entity.Bis_factory;
import com.oem.entity.Bis_user;
import com.oem.entity.Oem_mtrl_use;
import com.oem.service.brm.IFbpretmtrlService;
import com.oem.tx.brm.Fbpretmtrl.FbpretmtrlI;
import com.oem.tx.brm.Fbpretmtrl.FbpretmtrlIA;
import com.oem.tx.brm.Fbpretmtrl.FbpretmtrlO;
import com.oem.tx.brm.Fbpretmtrl.FbpretmtrlOA;
import com.oem.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.oem.comdef.GenericDef.*;
import static com.oem.comdef.GenericDef.RETURN_CODE_UNKNOWN;
import static com.oem.comdef.GenericDef._NORMAL;

@Service("fbpretmtrlService")
public class FbpretmtrlService implements IFbpretmtrlService {

    @Autowired
    private IOemMtrlUseRepository oemMtrlUseRepository;

    @Autowired
    private IBisFactoryRepository bisFactoryRepository;

    @Autowired
    private IBisUserRepository bisUserRepository;


    private LogUtils logUtils;

    @Override
    public String subMainProc(String evt_no, String strInMsg) {
        AppContext.clear();
        AppContext.setCurrServiceName(FbpretboxService.class.getSimpleName());
        AppContext.setCurrEventNumber(evt_no);
        logUtils = new LogUtils(FbpretboxService.class);
        logUtils.info("[InTrx:" + strInMsg + "]");

        String strOutTrx = null;
        FbpretmtrlO outTrx = new FbpretmtrlO();
        outTrx.setTrx_id(TX_FBPRETMTRL);
        outTrx.setType_id(TRX_TYPE_OUT);
        outTrx.setRtn_code(RETURN_CODE_OK);
        outTrx.setRtn_mesg(RETURN_MESG_OK);
        try {
            FbpretmtrlI inTrx = JacksonUtil.fromJson(strInMsg, FbpretmtrlI.class);
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

    public long subMainProc2(FbpretmtrlI inTrx, FbpretmtrlO outTrx){
        long rtn_code = _ERROR;
        char action_flg = inTrx.getAction_flg().charAt(0);
        switch (action_flg) {
            case ACTION_FLG_QUERY:
                rtn_code = queryFunc(inTrx, outTrx);
                break;
            case ACTION_FLG_ADD:
                rtn_code = addFnc(inTrx, outTrx);
                break;
            default:
                outTrx.setRtn_code(INVALID_ACTION_FLG);
                outTrx.setRtn_mesg("无效的操作标识");

        }
        return rtn_code;
    }

    public long queryFunc(FbpretmtrlI inTrx, FbpretmtrlO outTrx){
        StringBuffer hql = new StringBuffer("From Oem_mtrl_use where 1=1");
        List<FbpretmtrlIA> iary = inTrx.getIary();
        if(iary != null && !iary.isEmpty()){
            String lot_no = iary.get(0).getLot_no();
            String oem_id = iary.get(0).getOem_id();
            String mtrl_no = iary.get(0).getMtrl_no();
            if(!StringUtil.isSpaceCheck(lot_no)){
                hql.append(" and lot_no ='").append(lot_no).append("'");
            }

            if(!StringUtil.isSpaceCheck(mtrl_no)){
                hql.append(" and mtrl_no ='").append(mtrl_no).append("'");
            }

            if(!StringUtil.isSpaceCheck(oem_id)){
                hql.append(" and oem_id ='").append(oem_id).append("'");
            }else{
                String evt_usr = inTrx.getEvt_usr();
                if(!StringUtil.isSpaceCheck(evt_usr)){
                    Bis_user bis_user = bisUserRepository.get(evt_usr);
                    if(bis_user == null){
                        outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
                        outTrx.setRtn_mesg("没有找到用户[" +evt_usr +"]的信息，请确认");
                        return _ERROR;
                    }
                    String usr_faty = bis_user.getUsr_fty();
                    if(!StringUtil.isSpaceCheck(usr_faty)){
                        hql.append(" and lot_no ='").append(usr_faty).append("'");
                    }
                }
            }
        }
        List<Oem_mtrl_use> mtrlUseList = oemMtrlUseRepository.find(hql.toString());
        if(mtrlUseList == null || mtrlUseList.isEmpty()) {
            outTrx.setRtn_mesg(E_OEM_MTRL_USE + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到物料使用信息,请确认");
            return _ERROR;
        }
        Map<String, Bis_factory> factoryMap = new HashMap<>();
        List<Bis_factory> bisFactoryList =bisFactoryRepository.find("From Bis_factory where 1=1");
        if(bisFactoryList!= null && !bisFactoryList.isEmpty()){
            for(Bis_factory bis_factory : bisFactoryList){
                factoryMap.put(bis_factory.getFaty_id(), bis_factory);
            }
        }
        Bis_factory bis_factory = null;
        List<FbpretmtrlOA> oary = new ArrayList<>();
        for(Oem_mtrl_use oem_mtrl_use : mtrlUseList){
            FbpretmtrlOA fbpretmtrlOA = new FbpretmtrlOA();
            fbpretmtrlOA.setId(oem_mtrl_use.getId());
            fbpretmtrlOA.setLot_no(oem_mtrl_use.getLot_no());
            fbpretmtrlOA.setOem_id(oem_mtrl_use.getOem_id());
            bis_factory = factoryMap.get(oem_mtrl_use.getOem_id());
            fbpretmtrlOA.setOem_name(bis_factory == null? _SPACE : bis_factory.getFaty_name());
            fbpretmtrlOA.setMtrl_no(oem_mtrl_use.getMtrl_no());
            fbpretmtrlOA.setMtrl_vender(oem_mtrl_use.getVender());
            fbpretmtrlOA.setMtrl_power(oem_mtrl_use.getPower().toString());
            fbpretmtrlOA.setMtrl_color(oem_mtrl_use.getColor());
            fbpretmtrlOA.setMtrl_model(oem_mtrl_use.getModel_no());
            fbpretmtrlOA.setUpdate_usr(oem_mtrl_use.getUpdate_user());
            fbpretmtrlOA.setUpdate_timestamp(oem_mtrl_use.getUpdate_timestamp());
            oary.add(fbpretmtrlOA);
        }
        outTrx.setTbl_cnt(oary.size());
        outTrx.setOary(oary);
        return _NORMAL;
    }

    public long addFnc(FbpretmtrlI inTrx, FbpretmtrlO outTrx){
        List<FbpretmtrlIA> iary = inTrx.getIary();
        if(iary == null || iary.isEmpty()){
             outTrx.setRtn_code(E_FBPRETMTRL_INVALID_INPUT + _SPACE);
             outTrx.setRtn_mesg("请输入要添加的物料使用信息");
             return _ERROR;
        }
        String evt_usr = inTrx.getEvt_usr();
        Timestamp cr_timestamp = DateUtil.getCurrentTimestamp();
        Bis_user bis_user = bisUserRepository.get(evt_usr);
        if(bis_user == null){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到用户[" +evt_usr +"]的信息，请确认");
            return _ERROR;
        }
        String usr_faty = bis_user.getUsr_fty();
        if(StringUtil.isSpaceCheck(usr_faty)){
            outTrx.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("到用户[" +evt_usr +"]没有绑定代工厂信息，请确认");
            return _ERROR;
        }

        List<FbpretmtrlOA> oary = new ArrayList<>();

        for(FbpretmtrlIA fbpretmtrlIA : iary){
            Oem_mtrl_use oem_mtrl_use = new Oem_mtrl_use();
            oem_mtrl_use.setLot_no(fbpretmtrlIA.getLot_no());
            oem_mtrl_use.setMtrl_no(fbpretmtrlIA.getMtrl_no());
            oem_mtrl_use.setOem_id(usr_faty);
            oem_mtrl_use.setVender(fbpretmtrlIA.getMtrl_vender());
            oem_mtrl_use.setPower(fbpretmtrlIA.getMtrl_power());
            oem_mtrl_use.setColor(fbpretmtrlIA.getMtrl_color());
            oem_mtrl_use.setModel_no(fbpretmtrlIA.getMtrl_model());
            oem_mtrl_use.setUpdate_user(evt_usr);
            oem_mtrl_use.setUpdate_timestamp(cr_timestamp);
            oemMtrlUseRepository.save(oem_mtrl_use);

            FbpretmtrlOA fbpretmtrlOA = new FbpretmtrlOA();
            fbpretmtrlOA.setLot_no(oem_mtrl_use.getLot_no());
            fbpretmtrlOA.setMtrl_no(oem_mtrl_use.getMtrl_no());
            fbpretmtrlOA.setMtrl_vender(oem_mtrl_use.getVender());
            fbpretmtrlOA.setMtrl_power(oem_mtrl_use.getPower().toString());
            fbpretmtrlOA.setMtrl_color(oem_mtrl_use.getColor());
            fbpretmtrlOA.setMtrl_model(oem_mtrl_use.getModel_no());
            fbpretmtrlOA.setUpdate_usr(oem_mtrl_use.getUpdate_user());
            fbpretmtrlOA.setUpdate_timestamp(oem_mtrl_use.getUpdate_timestamp());

            oary.add(fbpretmtrlOA);
        }
        outTrx.setTbl_cnt(oary.size());
        outTrx.setOary(oary);
        return _NORMAL;
    }
}
