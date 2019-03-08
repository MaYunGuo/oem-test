package com.oem.service.brm.impl;

import com.oem.dao.IBisFactoryRepository;
import com.oem.dao.IOemPrdBoxRepository;
import com.oem.dao.IRetBoxInfoRepository;
import com.oem.entity.Oem_prd_box;
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
    private IOemPrdBoxRepository oemPrdBox;

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
            case 'G':
                rtn_code = setGradeFunc(inTrx, outTrx);
                break;
            case 'S':
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
        if (inTrx.getIary() != null) {
            FbpretboxIA iary = inTrx.getIary().get(0);
            hql.append(" and box_no ='").append(iary.getBox_no()).append("'");
        }
        List<Oem_prd_box> oemPrdBoxInfoList = oemPrdBox.find(hql.toString());
        List<FbpretboxOA> oary = new ArrayList<>();
        if (oemPrdBoxInfoList != null && !oemPrdBoxInfoList.isEmpty()) {
            for (Oem_prd_box oem_prd_box : oemPrdBoxInfoList) {
                FbpretboxOA fbpretboxOA = new FbpretboxOA();
                fbpretboxOA.setBox_no(oem_prd_box.getBox_no());
                fbpretboxOA.setOqc_grade(oem_prd_box.getOqc_grade());
                fbpretboxOA.setShip_statu(oem_prd_box.getShip_statu());
                oary.add(fbpretboxOA);
            }
        }
        outTrx.setTbl_cnt(oary.size());
        outTrx.setOary(oary);
        return _NORMAL;
    }

    public long setGradeFunc(FbpretboxI inTrx, FbpretboxO outTrx) {
        FbpretboxIA iary = inTrx.getIary().get(0);
        StringBuffer hql = new StringBuffer("From Oem_prd_box where 1=1");
        if (inTrx.getIary() != null) {
            hql.append(" and box_no ='").append(iary.getBox_no()).append("'");
        }
        List<Oem_prd_box> oemPrdBoxInfoList = oemPrdBox.find(hql.toString());
        oemPrdBoxInfoList.get(0).setOqc_grade(iary.getOqc_grade());
        List<FbpretboxOA> oary = new ArrayList<>();
        if (oemPrdBoxInfoList != null && !oemPrdBoxInfoList.isEmpty()) {
            for (Oem_prd_box oem_prd_box : oemPrdBoxInfoList) {
                FbpretboxOA fbpretboxOA = new FbpretboxOA();
                fbpretboxOA.setBox_no(oem_prd_box.getBox_no());
                fbpretboxOA.setOqc_grade(oem_prd_box.getOqc_grade());
                fbpretboxOA.setShip_statu(oem_prd_box.getShip_statu());
                oary.add(fbpretboxOA);
            }
        }
        outTrx.setTbl_cnt(oary.size());
        outTrx.setOary(oary);
        return _NORMAL;
    }

    public long setShipFunc(FbpretboxI inTrx, FbpretboxO outTrx) {
        FbpretboxIA iary = inTrx.getIary().get(0);
        StringBuffer hql = new StringBuffer("From Oem_prd_box where 1=1");
        if (inTrx.getIary() != null) {
//            if (!StringUtil.isSpaceCheck(iary.getBox_no())) {
            hql.append(" and box_no ='").append(iary.getBox_no()).append("'");
//            }
        }
        List<Oem_prd_box> oemPrdBoxInfoList = oemPrdBox.find(hql.toString());
        oemPrdBoxInfoList.get(0).setShip_statu(iary.getShip_statu());
        List<FbpretboxOA> oary = new ArrayList<>();
        if (oemPrdBoxInfoList != null && !oemPrdBoxInfoList.isEmpty()) {
            for (Oem_prd_box oem_prd_box : oemPrdBoxInfoList) {
                FbpretboxOA fbpretboxOA = new FbpretboxOA();
                fbpretboxOA.setBox_no(oem_prd_box.getBox_no());
                fbpretboxOA.setOqc_grade(oem_prd_box.getOqc_grade());
                fbpretboxOA.setShip_statu(oem_prd_box.getShip_statu());
                oary.add(fbpretboxOA);
            }
        }
        outTrx.setTbl_cnt(oary.size());
        outTrx.setOary(oary);
        return _NORMAL;
    }

}
