package com.oem.service.brm.impl;

import com.oem.dao.IBisFactoryRepository;
import com.oem.entity.Bis_factory;
import com.oem.quartz.QuartzFinInsDataJob;
import com.oem.quartz.QuartzIvDataJob;
import com.oem.quartz.QuartzService;
import com.oem.service.brm.IFbpbisfatyService;
import com.oem.tx.brm.Fbpbisfaty.FbpbisfatyI;
import com.oem.tx.brm.Fbpbisfaty.FbpbisfatyIA;
import com.oem.tx.brm.Fbpbisfaty.FbpbisfatyO;
import com.oem.tx.brm.Fbpbisfaty.FbpbisfatyOA;
import com.oem.util.*;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;


import java.util.ArrayList;
import java.util.List;

import static com.oem.comdef.GenericDef.*;

@Service("fbpbisfatyService")
public class FbpbisfatyService implements IFbpbisfatyService {

    private LogUtils logUtils;

    @Autowired
    private IBisFactoryRepository bisFactoryRepository;

    @Autowired
    private QuartzService quartzService;

    @Override
    @Transactional
    public String subMainProc(String evt_no, String strInMsg) {
        AppContext.clear();
        AppContext.setCurrServiceName(FbpbisfatyService.class.getSimpleName());
        AppContext.setCurrEventNumber(evt_no);
        logUtils = new LogUtils(FbpbisfatyService.class);
        logUtils.info("[InTrx:" + strInMsg + "]");

        String strOutTrx = null;
        FbpbisfatyO outTrx = new FbpbisfatyO();
        outTrx.setTrx_id(TX_FBPBISFATY);
        outTrx.setType_id(TRX_TYPE_OUT);
        outTrx.setRtn_code(RETURN_CODE_OK);
        outTrx.setRtn_mesg(RETURN_MESG_OK);
        try{
            FbpbisfatyI inTrx = JacksonUtil.fromJson(strInMsg, FbpbisfatyI.class);
            long rtn_code = subMainProc2(inTrx, outTrx);
            if(rtn_code != _NORMAL){
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            }
        }catch (Exception ex){
            outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
            outTrx.setRtn_mesg(ex.getCause().toString());
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }finally {
            strOutTrx = JacksonUtil.toJSONStr(outTrx);
            logUtils.info("[OutTrx:" + strOutTrx + "]");
        }
        return strOutTrx;
    }

    public long subMainProc2(FbpbisfatyI inTrx, FbpbisfatyO outTrx) throws SchedulerException {
        long rtn_code = _ERROR;
        char action_flg = inTrx.getAction_flg().charAt(0);
        switch (action_flg){
            case ACTION_FLG_QUERY:
                rtn_code = queryFunc(inTrx, outTrx);
                break;
            case ACTION_FLG_ADD:
                rtn_code = addFunc(inTrx, outTrx);
                break;
            case ACTION_FLG_UPDATE:
                rtn_code = updateFunc(inTrx, outTrx);
                break;
            case ACTION_FLG_DELETE:
                rtn_code = deleteFunc(inTrx, outTrx);
                break;
            default:
                outTrx.setRtn_code(INVALID_ACTION_FLG);
                outTrx.setRtn_mesg("无效的操作标识");

        }
        return rtn_code;
    }

    public long queryFunc(FbpbisfatyI inTrx, FbpbisfatyO outTrx){
        StringBuffer hql = new StringBuffer("From Bis_factory where 1=1");
        if(inTrx.getIary() != null) {
            FbpbisfatyIA iary = inTrx.getIary().get(0);
            if (!StringUtil.isSpaceCheck(iary.getFaty_id())) {
                hql.append(" and faty_id ='").append(iary.getFaty_id()).append("'");
            }
        }
        List<Bis_factory> bisFactoryList = bisFactoryRepository.find(hql.toString());
        if(bisFactoryList != null && !bisFactoryList.isEmpty()){
            List<FbpbisfatyOA> oary = new ArrayList<>();
            for(Bis_factory bis_factory : bisFactoryList){
                FbpbisfatyOA fbpbisfatyOA = new FbpbisfatyOA();
                fbpbisfatyOA.setFaty_id(bis_factory.getFaty_id());
                fbpbisfatyOA.setFaty_name(bis_factory.getFaty_name());
                fbpbisfatyOA.setAnls_rate(bis_factory.getAnls_rate());
                fbpbisfatyOA.setAnls_unit(bis_factory.getAnls_unit());
                fbpbisfatyOA.setFaty_mail(bis_factory.getFaty_mail());
                oary.add(fbpbisfatyOA);
            }
            outTrx.setTbl_cnt(bisFactoryList.size());
            outTrx.setOary(oary);
        }
        return _NORMAL;
    }
    public long addFunc(FbpbisfatyI inTrx, FbpbisfatyO outTrx){
        List<FbpbisfatyIA> iaryList = inTrx.getIary();
        if(iaryList == null || iaryList.isEmpty()){
           outTrx.setRtn_code(E_FBPBISFATY_INVALID_INPUT + _SPACE);
           outTrx.setRtn_mesg("请输入要添加的代工厂信息");
           return _ERROR;
        }
        List<FbpbisfatyOA> oaryList = new ArrayList<>();
        for(FbpbisfatyIA fbpbisfatyIA : iaryList){
            Bis_factory bis_factory = bisFactoryRepository.get(fbpbisfatyIA.getFaty_id());
            if(bis_factory != null){
                outTrx.setRtn_code(E_BIS_FACTORY + E_ADD_EXIST + _SPACE);
                outTrx.setRtn_mesg("代工厂[" + fbpbisfatyIA.getFaty_id() +"]已经存在，请确认");
                return _ERROR;
            }
            bis_factory = new Bis_factory();
            bis_factory.setUnq_seq_id(AppContext.getCurrEventNumber());
            bis_factory.setFaty_id(fbpbisfatyIA.getFaty_id());
            bis_factory.setFaty_name(fbpbisfatyIA.getFaty_name());
            bis_factory.setAnls_rate(fbpbisfatyIA.getAnls_rate());
            bis_factory.setAnls_unit(fbpbisfatyIA.getAnls_unit());
            bis_factory.setFaty_mail(fbpbisfatyIA.getFaty_mail());
            bis_factory.setEvt_usr(inTrx.getEvt_usr());
            bis_factory.setEvt_timestamp(DateUtil.getCurrentTimestamp());
            bisFactoryRepository.save(bis_factory);

            String conExcepssion = getConExpession(fbpbisfatyIA.getAnls_rate(), fbpbisfatyIA.getAnls_unit());
            quartzService.addJob(QuartzIvDataJob.class, fbpbisfatyIA.getFaty_id(), QUARTZ_GROUP_IV, conExcepssion, fbpbisfatyIA.getFaty_id());
            quartzService.addJob(QuartzFinInsDataJob.class, fbpbisfatyIA.getFaty_id(), QUARTZ_GROUP_FIN, conExcepssion, fbpbisfatyIA.getFaty_id());
            quartzService.addJob(QuartzFinInsDataJob.class, fbpbisfatyIA.getFaty_id(), QUARTZ_GROUP_PACK, conExcepssion, fbpbisfatyIA.getFaty_id());

            FbpbisfatyOA fbpbisfatyOA = new FbpbisfatyOA();
            fbpbisfatyOA.setFaty_id(fbpbisfatyIA.getFaty_id());
            fbpbisfatyOA.setFaty_name(fbpbisfatyIA.getFaty_name());
            fbpbisfatyOA.setAnls_rate(fbpbisfatyIA.getAnls_rate());
            fbpbisfatyOA.setAnls_unit(fbpbisfatyIA.getAnls_unit());
            oaryList.add(fbpbisfatyOA);
        }
        outTrx.setTbl_cnt(oaryList.size());
        outTrx.setOary(oaryList);
        return _NORMAL;
    }
    public long updateFunc(FbpbisfatyI inTrx, FbpbisfatyO outTrx) throws SchedulerException {

        List<FbpbisfatyIA> iaryList = inTrx.getIary();
        if(iaryList == null || iaryList.isEmpty()){
            outTrx.setRtn_code(E_FBPBISFATY_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入要添加的代工厂信息");
            return _ERROR;
        }
        FbpbisfatyIA fbpbisfatyIA = iaryList.get(0);
        String faty_id = fbpbisfatyIA.getFaty_id();
        Bis_factory bis_factory = bisFactoryRepository.getWithLock(faty_id);
        if(bis_factory == null){
            outTrx.setRtn_code(E_BIS_FACTORY + E_READ_NOT_FOUND + _SPACE);
            outTrx.setRtn_mesg("没有找到代工厂[" + faty_id +"] 的信息,请确认");
            return _ERROR;
        }

        bis_factory.setFaty_name(fbpbisfatyIA.getFaty_name());
        bis_factory.setAnls_rate(fbpbisfatyIA.getAnls_rate());
        bis_factory.setAnls_unit(fbpbisfatyIA.getAnls_unit());
        bis_factory.setFaty_mail(fbpbisfatyIA.getFaty_mail());
        bis_factory.setEvt_usr(inTrx.getEvt_usr());
        bis_factory.setEvt_timestamp(DateUtil.getCurrentTimestamp());
        bisFactoryRepository.update(bis_factory);

        String conExcepssion = getConExpession(fbpbisfatyIA.getAnls_rate(), fbpbisfatyIA.getAnls_unit());
        quartzService.modifyJob(fbpbisfatyIA.getFaty_id(), QUARTZ_GROUP_IV, conExcepssion);
        quartzService.modifyJob(fbpbisfatyIA.getFaty_id(), QUARTZ_GROUP_FIN, conExcepssion);
        quartzService.modifyJob(fbpbisfatyIA.getFaty_id(), QUARTZ_GROUP_PACK, conExcepssion);

        return _NORMAL;
    }
    public long deleteFunc(FbpbisfatyI inTrx, FbpbisfatyO outTrx) throws SchedulerException {
        List<FbpbisfatyIA> iaryList = inTrx.getIary();
        if(iaryList == null || iaryList.isEmpty()){
            outTrx.setRtn_code(E_FBPBISFATY_INVALID_INPUT + _SPACE);
            outTrx.setRtn_mesg("请输入要删除的代工厂信息");
            return _ERROR;
        }

        for(FbpbisfatyIA fbpbisfatyIA : iaryList){
            Bis_factory bis_factory = bisFactoryRepository.get(fbpbisfatyIA.getFaty_id());
            if(bis_factory != null){
                bis_factory.setEvt_usr(inTrx.getEvt_usr());
                bis_factory.setEvt_timestamp(DateUtil.getCurrentTimestamp());
                bisFactoryRepository.delete(bis_factory);
                quartzService.deleteJob(bis_factory.getFaty_id(), QUARTZ_GROUP_IV);
                quartzService.deleteJob(bis_factory.getFaty_id(), QUARTZ_GROUP_FIN);
                quartzService.deleteJob(bis_factory.getFaty_id(), QUARTZ_GROUP_PACK);
            }
        }
        return _NORMAL;
    }

    public String getConExpession(int anls_rate, String anls_unit){
       StringBuffer conExcepssion = new StringBuffer("* * * * * ?");
       List<Bis_factory> bis_factories = bisFactoryRepository.find("From Bis_factory where 1=1");
       int jobSize = bis_factories.size()+1;
       int startSecond = jobSize%60;
       if("S".equals(anls_unit)){
           String newCon = startSecond + "/" + anls_rate;
           conExcepssion.replace(0, 1, newCon);
       }else if("M".equals(anls_unit)){
           String newCon = "0/" + anls_rate;
           conExcepssion.replace(0,1, String.valueOf(startSecond));
           conExcepssion.replace(2,3, newCon);
       }else if("H".equals(anls_unit)){
           String newCon = "0/" + anls_rate;
           conExcepssion.replace(0,1, String.valueOf(startSecond));
           conExcepssion.replace(4,5, newCon);
       }
       return conExcepssion.toString();
    }
}
