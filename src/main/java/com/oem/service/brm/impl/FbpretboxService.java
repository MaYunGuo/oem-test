package com.oem.service.brm.impl;

import com.oem.dao.IBisFactoryRepository;
import com.oem.dao.IRetBoxInfoRepository;
import com.oem.entity.Ret_box_info;
import com.oem.quartz.QuartzService;
import com.oem.service.brm.IFbpretboxService;
import com.oem.tx.brm.Fbpretbox.FbpretboxI;
import com.oem.tx.brm.Fbpretbox.FbpretboxIA;
import com.oem.tx.brm.Fbpretbox.FbpretboxO;
import com.oem.tx.brm.Fbpretbox.FbpretboxOA;
import com.oem.util.*;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.InputStream;
import java.util.*;

import static com.oem.comdef.GenericDef.*;

@Service("fbpretboxService")
public class FbpretboxService implements IFbpretboxService {

    private LogUtils logUtils;

    @Autowired
    private IRetBoxInfoRepository retBox;

    @Autowired
    private QuartzService quartzService;

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
            case 'O':
                rtn_code = setOkFunc(inTrx, outTrx);
                break;
//            case ACTION_FLG_DELETE:
//                rtn_code = deleteFunc(inTrx, outTrx);
//                break;
            default:
                outTrx.setRtn_code(INVALID_ACTION_FLG);
                outTrx.setRtn_mesg("无效的操作标识");

        }
        return rtn_code;
    }

    public long queryFunc(FbpretboxI inTrx, FbpretboxO outTrx) {
        StringBuffer hql = new StringBuffer("From Ret_box_info where 1=1");
        if (inTrx.getIary() != null) {
            FbpretboxIA iary = inTrx.getIary().get(0);
//            if (!StringUtil.isSpaceCheck(iary.getBox_id())) {
            hql.append(" and box_id ='").append(iary.getBox_id()).append("'");
//            }
        }
        List<Ret_box_info> retBoxInfoList = retBox.find(hql.toString());
        List<FbpretboxOA> oary = new ArrayList<>();
        if (retBoxInfoList != null && !retBoxInfoList.isEmpty()) {
            for (Ret_box_info ret_box_info : retBoxInfoList) {
                FbpretboxOA fbpretboxOA = new FbpretboxOA();
                fbpretboxOA.setBox_id(ret_box_info.getBox_id());
                fbpretboxOA.setOqc_grade(ret_box_info.getOqc_grade());
                fbpretboxOA.setShip_flg(ret_box_info.getShip_flg());
                oary.add(fbpretboxOA);
            }
        }
        outTrx.setTbl_cnt(oary.size());
        outTrx.setOary(oary);
        return _NORMAL;
    }

    public long setOkFunc(FbpretboxI inTrx, FbpretboxO outTrx) {
        FbpretboxIA iary = inTrx.getIary().get(0);
        StringBuffer hql = new StringBuffer("From Ret_box_info where 1=1");
        if (inTrx.getIary() != null) {
//            if (!StringUtil.isSpaceCheck(iary.getBox_id())) {
            hql.append(" and box_id ='").append(iary.getBox_id()).append("'");
//            }
        }
        List<Ret_box_info> retBoxInfoList = retBox.find(hql.toString());
        retBoxInfoList.get(0).setOqc_grade(iary.getOqc_grade());
        List<FbpretboxOA> oary = new ArrayList<>();
        if (retBoxInfoList != null && !retBoxInfoList.isEmpty()) {
            for (Ret_box_info ret_box_info : retBoxInfoList) {
                FbpretboxOA fbpretboxOA = new FbpretboxOA();
                fbpretboxOA.setBox_id(ret_box_info.getBox_id());
                fbpretboxOA.setOqc_grade(ret_box_info.getOqc_grade());
                fbpretboxOA.setShip_flg(ret_box_info.getShip_flg());
                oary.add(fbpretboxOA);
            }
        }
        outTrx.setTbl_cnt(oary.size());
        outTrx.setOary(oary);
        return _NORMAL;
    }


//    public long addFunc(FbpbisfatyI inTrx, FbpbisfatyO outTrx){
//        List<FbpbisfatyIA> iaryList = inTrx.getIary();
//        if(iaryList == null || iaryList.isEmpty()){
//           outTrx.setRtn_code(E_FBPBISFATY_INVALID_INPUT + _SPACE);
//           outTrx.setRtn_mesg("请输入要添加的代工厂信息");
//           return _ERROR;
//        }
//        List<FbpbisfatyOA> oaryList = new ArrayList<>();
//        for(FbpbisfatyIA fbpbisfatyIA : iaryList){
//            Bis_factory bis_factory = bisFactoryRepository.get(fbpbisfatyIA.getFaty_id());
//            if(bis_factory != null){
//                outTrx.setRtn_code(E_BIS_FACTORY + E_ADD_EXIST + _SPACE);
//                outTrx.setRtn_mesg("代工厂[" + fbpbisfatyIA.getFaty_id() +"]已经存在，请确认");
//                return _ERROR;
//            }
//            bis_factory = new Bis_factory();
//            bis_factory.setUnq_seq_id(AppContext.getCurrEventNumber());
//            bis_factory.setFaty_id(fbpbisfatyIA.getFaty_id());
//            bis_factory.setFaty_name(fbpbisfatyIA.getFaty_name());
//            bis_factory.setAnls_rate(fbpbisfatyIA.getAnls_rate());
//            bis_factory.setAnls_unit(fbpbisfatyIA.getAnls_unit());
//            bis_factory.setEvt_usr(inTrx.getEvt_usr());
//            bis_factory.setEvt_timestamp(DateUtil.getCurrentTimestamp());
//            bisFactoryRepository.save(bis_factory);
//
//            String conExcepssion = getConExpession(fbpbisfatyIA.getAnls_rate(), fbpbisfatyIA.getAnls_unit());
//            quartzService.addJob(QuartzIvDataJob.class, fbpbisfatyIA.getFaty_id(), Scheduler.DEFAULT_GROUP, conExcepssion, fbpbisfatyIA.getFaty_id());
//
//            FbpbisfatyOA fbpbisfatyOA = new FbpbisfatyOA();
//            fbpbisfatyOA.setFaty_id(fbpbisfatyIA.getFaty_id());
//            fbpbisfatyOA.setFaty_name(fbpbisfatyIA.getFaty_name());
//            fbpbisfatyOA.setAnls_rate(fbpbisfatyIA.getAnls_rate());
//            fbpbisfatyOA.setAnls_unit(fbpbisfatyIA.getAnls_unit());
//            oaryList.add(fbpbisfatyOA);
//        }
//        outTrx.setTbl_cnt(oaryList.size());
//        outTrx.setOary(oaryList);
//        return _NORMAL;
//    }
//    public long updateFunc(FbpbisfatyI inTrx, FbpbisfatyO outTrx) throws SchedulerException {
//
//        List<FbpbisfatyIA> iaryList = inTrx.getIary();
//        if(iaryList == null || iaryList.isEmpty()){
//            outTrx.setRtn_code(E_FBPBISFATY_INVALID_INPUT + _SPACE);
//            outTrx.setRtn_mesg("请输入要添加的代工厂信息");
//            return _ERROR;
//        }
//        FbpbisfatyIA fbpbisfatyIA = iaryList.get(0);
//        String faty_id = fbpbisfatyIA.getFaty_id();
//        Bis_factory bis_factory = bisFactoryRepository.getWithLock(faty_id);
//        if(bis_factory == null){
//            outTrx.setRtn_code(E_BIS_FACTORY + E_READ_NOT_FOUND + _SPACE);
//            outTrx.setRtn_mesg("没有找到代工厂[" + faty_id +"] 的信息,请确认");
//            return _ERROR;
//        }
//
//        bis_factory.setFaty_name(fbpbisfatyIA.getFaty_name());
//        bis_factory.setAnls_rate(fbpbisfatyIA.getAnls_rate());
//        bis_factory.setAnls_unit(fbpbisfatyIA.getAnls_unit());
//        bis_factory.setEvt_usr(inTrx.getEvt_usr());
//        bis_factory.setEvt_timestamp(DateUtil.getCurrentTimestamp());
//        bisFactoryRepository.update(bis_factory);
//
//        String conExcepssion = getConExpession(fbpbisfatyIA.getAnls_rate(), fbpbisfatyIA.getAnls_unit());
//        quartzService.modifyJob(fbpbisfatyIA.getFaty_id(), Scheduler.DEFAULT_GROUP, conExcepssion);
//
//        return _NORMAL;
//    }
//    public long deleteFunc(FbpbisfatyI inTrx, FbpbisfatyO outTrx) throws SchedulerException {
//        List<FbpbisfatyIA> iaryList = inTrx.getIary();
//        if(iaryList == null || iaryList.isEmpty()){
//            outTrx.setRtn_code(E_FBPBISFATY_INVALID_INPUT + _SPACE);
//            outTrx.setRtn_mesg("请输入要删除的代工厂信息");
//            return _ERROR;
//        }
//
//        for(FbpbisfatyIA fbpbisfatyIA : iaryList){
//            Bis_factory bis_factory = bisFactoryRepository.get(fbpbisfatyIA.getFaty_id());
//            if(bis_factory != null){
//                bis_factory.setEvt_usr(inTrx.getEvt_usr());
//                bis_factory.setEvt_timestamp(DateUtil.getCurrentTimestamp());
//                bisFactoryRepository.delete(bis_factory);
//                quartzService.deleteJob(bis_factory.getFaty_id(), Scheduler.DEFAULT_GROUP);
//            }
//        }
//        return _NORMAL;
//    }
//
//    public String getConExpession(int anls_rate, String anls_unit){
//       StringBuffer conExcepssion = new StringBuffer("* * * * * ?");
//       List<Bis_factory> bis_factories = bisFactoryRepository.find("From Bis_factory where 1=1");
//       int jobSize = bis_factories.size()+1;
//       int startSecond = jobSize%60;
//       if("S".equals(anls_unit)){
//           String newCon = startSecond + "/" + anls_rate;
//           conExcepssion.replace(0, 1, newCon);
//       }else if("M".equals(anls_unit)){
//           String newCon = "0/" + anls_rate;
//           conExcepssion.replace(0,1, String.valueOf(startSecond));
//           conExcepssion.replace(2,3, newCon);
//       }else if("H".equals(anls_unit)){
//           String newCon = "0/" + anls_rate;
//           conExcepssion.replace(0,1, String.valueOf(startSecond));
//           conExcepssion.replace(4,5, newCon);
//       }
//       return conExcepssion.toString();
//    }
}
