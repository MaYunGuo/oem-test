package com.oem.service.brm.impl;

import com.oem.dao.IBisFactoryRepository;
import com.oem.dao.IOemMtrlUseRepository;
import com.oem.entity.Bis_factory;
import com.oem.entity.Oem_mtrl_use;
import com.oem.service.brm.IFbpretmtrlService;
import com.oem.tx.brm.Fbpretmtrl.FbpretmtrlI;
import com.oem.tx.brm.Fbpretmtrl.FbpretmtrlIA;
import com.oem.tx.brm.Fbpretmtrl.FbpretmtrlO;
import com.oem.tx.brm.Fbpretmtrl.FbpretmtrlOA;
import com.oem.util.AppContext;
import com.oem.util.JacksonUtil;
import com.oem.util.LogUtils;
import com.oem.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

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
        outTrx.setTrx_id(TX_FBPRETBOX);
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
            if(!StringUtil.isSpaceCheck(oem_id)){
                hql.append(" and oem_id ='").append(oem_id).append("'");
            }
            if(!StringUtil.isSpaceCheck(mtrl_no)){
                hql.append(" and mtrl_no ='").append(mtrl_no).append("'");
            }
        }
        List<Oem_mtrl_use> mtrlUseList = oemMtrlUseRepository.find(hql.toString());
        if(mtrlUseList != null && !mtrlUseList.isEmpty()){
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
        }
        return _NORMAL;
    }
}
