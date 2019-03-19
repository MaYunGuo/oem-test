package com.oem.service.brm.impl;

import com.oem.dao.IBisDataRepository;
import com.oem.entity.Bis_data;
import com.oem.service.brm.IFbpbisdataService;
import com.oem.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import com.oem.tx.brm.Fbpbisdata.FbpbisdataI;
import com.oem.tx.brm.Fbpbisdata.FbpbisdataIA;
import com.oem.tx.brm.Fbpbisdata.FbpbisdataO;
import com.oem.tx.brm.Fbpbisdata.FbpbisdataOA;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static com.oem.comdef.GenericDef.*;

@Service("fbpbisdataService")
public class FbpbisdataService implements IFbpbisdataService {

    private LogUtils logUtils;

    @Autowired
    private IBisDataRepository bisDataRepository;

    @Override
    @Transactional
    public String subMainProc(String evt_no, String strInMsg) {

        AppContext.clear();
        AppContext.setCurrServiceName(FbpbisdataService.class.getSimpleName());
        AppContext.setCurrEventNumber(evt_no);
        logUtils = new LogUtils(FbpbisdataService.class);
        logUtils.info("[InTrx:" + strInMsg + "]");

        String strOutTrx = null;

        FbpbisdataO outTrx = new FbpbisdataO();

        outTrx.setTrx_id(TX_FBPBISDATA);
        outTrx.setType_id(TRX_TYPE_OUT);
        outTrx.setRtn_code(RETURN_CODE_OK);
        outTrx.setRtn_mesg(RETURN_MESG_OK);

        try {
            FbpbisdataI inTrx = JacksonUtil.fromJson(strInMsg, FbpbisdataI.class);
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

    public long subMainProc2(FbpbisdataI inTrx, FbpbisdataO outTrx){
        long rtn_code = _ERROR;
        char action_flg = inTrx.getAction_flg().charAt(0);
        switch (action_flg){
            case ACTION_FLG_QUERY:
                rtn_code = queryCondition(inTrx, outTrx);
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
            case ACTION_FLG_ADD_NEW_CATE:
                rtn_code = addDataCateProc(inTrx, outTrx);
                break;
            case ACTION_FLG_UPDATE_NEW_CATE:
                rtn_code = updateDataCateProc(inTrx, outTrx);
                break;
            case ACTON_FLG_DELETE_NEW_CATE:
                rtn_code = deleteDataCateProc(inTrx, outTrx);
                break;
            default:
                outTrx.setRtn_code(INVALID_ACTION_FLG);
                outTrx.setRtn_mesg("无效的操作标识");
                break;

        }
        return rtn_code;
    }

    public long queryCondition(FbpbisdataI inTrx, FbpbisdataO outTrx){
         StringBuffer hql = new StringBuffer("From Bis_data where 1=1");
         if(inTrx.getIary()!= null){
             FbpbisdataIA iary = inTrx.getIary().get(0);

             if(!StringUtil.isSpaceCheck(iary.getData_seq_id())){
                 hql.append(" and ").append("data_seq_id ='").append(iary.getData_seq_id()).append("'");
             }

             if(!StringUtil.isSpaceCheck(iary.getData_cate())){
                 hql.append(" and ").append("data_cate ='").append(iary.getData_cate()).append("'");
             }
             if(!StringUtil.isSpaceCheck(iary.getData_id())){
                 hql.append(" and ").append("data_id ='").append(iary.getData_id()).append("'");
             }
             if(!StringUtil.isSpaceCheck(iary.getData_item())){
                 hql.append(" and ").append("data_item ='").append(iary.getData_item()).append("'");
             }
             if(!StringUtil.isSpaceCheck(iary.getExt_1())){
                 hql.append(" and ").append("ext_1 ='").append(iary.getExt_1()).append("'");
             }
             if(!StringUtil.isSpaceCheck(iary.getExt_2())){
                 hql.append(" and ").append("ext_2 ='").append(iary.getExt_2()).append("'");
             }
             if(!StringUtil.isSpaceCheck(iary.getExt_1())){
                 hql.append(" and ").append("ext_3 ='").append(iary.getExt_3()).append("'");
             }
             if(!StringUtil.isSpaceCheck(iary.getExt_2())){
                 hql.append(" and ").append("ext_4 ='").append(iary.getExt_4()).append("'");
             }
             if(!StringUtil.isSpaceCheck(iary.getExt_1())){
                 hql.append(" and ").append("ext_5 ='").append(iary.getExt_5()).append("'");
             }
             if(!StringUtil.isSpaceCheck(iary.getExt_2())){
                 hql.append(" and ").append("ext_6 ='").append(iary.getExt_6()).append("'");
             }
             if(!StringUtil.isSpaceCheck(iary.getExt_1())){
                 hql.append(" and ").append("ext_7 ='").append(iary.getExt_7()).append("'");
             }
             if(!StringUtil.isSpaceCheck(iary.getExt_2())){
                 hql.append(" and ").append("ext_8 ='").append(iary.getExt_8()).append("'");
             }
         }
         List<Bis_data> bisDataList = bisDataRepository.find(hql.toString());
         if(bisDataList != null && !bisDataList.isEmpty()){
             List<FbpbisdataOA> oary = new ArrayList<>();
             for(Bis_data bis_data : bisDataList){
                 FbpbisdataOA fbpbisdataOA = new FbpbisdataOA();
                 fbpbisdataOA.setData_seq_id(bis_data.getData_seq_id());
                 fbpbisdataOA.setData_cate(bis_data.getData_cate());
                 fbpbisdataOA.setData_id(bis_data.getData_id());
                 fbpbisdataOA.setData_ext(bis_data.getData_ext());
                 fbpbisdataOA.setData_item(bis_data.getData_item());
                 fbpbisdataOA.setData_desc(bis_data.getData_desc());
                 fbpbisdataOA.setExt_1(bis_data.getExt_1());
                 fbpbisdataOA.setExt_2(bis_data.getExt_2());
                 fbpbisdataOA.setExt_3(bis_data.getExt_3());
                 fbpbisdataOA.setExt_4(bis_data.getExt_4());
                 fbpbisdataOA.setExt_5(bis_data.getExt_5());
                 fbpbisdataOA.setExt_6(bis_data.getExt_6());
                 fbpbisdataOA.setExt_7(bis_data.getExt_7());
                 fbpbisdataOA.setExt_8(bis_data.getExt_8());
                 fbpbisdataOA.setEvt_usr(bis_data.getEvt_usr());
                 fbpbisdataOA.setEvt_timestamp(bis_data.getEvt_timestamp());
                 oary.add(fbpbisdataOA);
             }
             outTrx.setOary(oary);
             outTrx.setTbl_cnt(bisDataList.size());
         }
         return _NORMAL;
    }

    public long addFnc(FbpbisdataI inTrx, FbpbisdataO outTrx){
        List<FbpbisdataOA> oaryList = new ArrayList<FbpbisdataOA>();

            List<FbpbisdataIA> iaryList = inTrx.getIary();
            for (FbpbisdataIA iary : iaryList) {
                Bis_data bis_data = new Bis_data();
                Bis_data tmp_bis_data = getDataByKeyProc(iary.getData_cate(), iary.getData_id(), iary.getData_ext());
                if (tmp_bis_data != null) {
                    outTrx.setRtn_code(E_BIS_DATA + E_ADD_EXIST + _SPACE);
                    outTrx.setRtn_mesg("Record Already Exist");
                    return _ERROR;
                }
                bis_data.setData_seq_id(GUIDGenerator.javaGUID());
                bis_data.setData_cate(iary.getData_cate());
                bis_data.setData_id(iary.getData_id());
                bis_data.setData_ext(iary.getData_ext());
                bis_data.setData_item(iary.getData_item());
                bis_data.setExt_1(iary.getExt_1());
                bis_data.setExt_2(iary.getExt_2());
                bis_data.setExt_3(iary.getExt_3());
                bis_data.setExt_4(iary.getExt_4());
                bis_data.setExt_5(iary.getExt_5());
                bis_data.setExt_6(iary.getExt_6());
                bis_data.setExt_7(iary.getExt_7());
                bis_data.setExt_8(iary.getExt_8());
                bis_data.setData_desc(iary.getData_desc());
                bis_data.setEvt_usr(inTrx.getEvt_usr());
                bis_data.setEvt_timestamp(DateUtil.getCurrentTimestamp());
                bisDataRepository.save(bis_data);

                FbpbisdataOA oary = new FbpbisdataOA();
                oary.setData_seq_id(bis_data.getData_seq_id());
                oary.setData_cate(bis_data.getData_cate());
                oary.setData_id(bis_data.getData_id());
                oary.setData_ext(bis_data.getData_ext());
                oary.setData_item(bis_data.getData_item());
                oary.setData_desc(bis_data.getData_desc());
                oary.setExt_1(bis_data.getExt_1());
                oary.setExt_2(bis_data.getExt_2());
                oary.setExt_3(bis_data.getExt_3());
                oary.setExt_4(bis_data.getExt_4());
                oary.setExt_5(bis_data.getExt_5());
                oary.setExt_6(bis_data.getExt_6());
                oary.setExt_7(bis_data.getExt_7());
                oary.setExt_8(bis_data.getExt_8());
                oaryList.add(oary);
            }

        outTrx.setOary(oaryList);
        outTrx.setTbl_cnt(oaryList.size());
        return _NORMAL;
    }

    public long updateFnc(FbpbisdataI inTrx, FbpbisdataO outTrx) {
        List<FbpbisdataIA> iaryList = inTrx.getIary();
        for (FbpbisdataIA iary : iaryList) {
            Bis_data bis_data = null;
            String data_seq_id = iary.getData_seq_id();
            String data_cate = iary.getData_cate();
            String data_id = iary.getData_id();
            String data_ext = iary.getData_ext();
            String data_item = iary.getData_item();
            String ext_1 = iary.getExt_1();
            String ext_2 = iary.getExt_2();
            String ext_3 = iary.getExt_3();
            String ext_4 = iary.getExt_4();
            String ext_5 = iary.getExt_5();
            String ext_6 = iary.getExt_6();
            String ext_7 = iary.getExt_7();
            String ext_8 = iary.getExt_8();
            String data_desc = iary.getData_desc();

            if (data_seq_id != null) {
                bis_data = bisDataRepository.get(data_seq_id);
                bis_data.setData_id(data_id);
            } else {
                String hql = " from Bis_data where data_cate=?0 and data_id= ?1 and data_ext= ?2";
                bis_data = bisDataRepository.uniqueResultWithLock(hql, data_cate, data_id, data_ext);
            }
            if (bis_data == null) {
                outTrx.setRtn_code(E_BIS_DATA + E_READ_NOT_FOUND + "");
                outTrx.setRtn_mesg("[Bis_data] Record Not Found");
                return _ERROR;
            }
            if (data_ext != null) {
                bis_data.setData_ext(data_ext);
            }
            if (data_item != null) {
                bis_data.setData_item(data_item);
            }
            if (ext_1 != null) {
                bis_data.setExt_1(ext_1);
            }
            if (ext_2 != null) {
                bis_data.setExt_2(ext_2);
            }
            if (ext_3 != null) {
                bis_data.setExt_3(ext_3);
            }
            if (ext_4 != null) {
                bis_data.setExt_4(ext_4);
            }
            if (ext_5 != null) {
                bis_data.setExt_5(ext_5);
            }
            if (ext_6 != null) {
                bis_data.setExt_6(ext_6);
            }
            if (ext_7 != null) {
                bis_data.setExt_7(ext_7);
            }
            if (ext_8 != null) {
                bis_data.setExt_8(ext_8);
            }
            if (data_desc != null) {
                bis_data.setData_desc(data_desc);
            }
            bis_data.setEvt_usr(inTrx.getEvt_usr());
            bis_data.setEvt_timestamp(DateUtil.getCurrentTimestamp());
            bisDataRepository.update(bis_data);
        }
        return _NORMAL;
    }

    public long deleteFnc(FbpbisdataI inTrx, FbpbisdataO outTrx) {
        List<FbpbisdataIA> iaryList = inTrx.getIary();
        for (FbpbisdataIA iary : iaryList) {
            if (iary.getData_seq_id() != null) {
                Bis_data bis_data = bisDataRepository.get(iary.getData_seq_id());
                if (bis_data != null) {
                    bis_data.setEvt_usr(inTrx.getEvt_usr());
                    bis_data.setEvt_timestamp(DateUtil.getCurrentTimestamp());
                    bisDataRepository.delete(bis_data);
                }
            } else {
                String data_cate = iary.getData_cate();
                String data_id = iary.getData_id();
                String data_ext = iary.getData_ext();
                String hql = "from Bis_data where data_cate = ?0 and data_id = ?1 and data_ext = ?2";
                Bis_data bis_data = bisDataRepository.uniqueResult(hql, data_cate, data_id, data_ext);
                if (bis_data == null) {
                    outTrx.setRtn_code(E_BIS_DATA + E_READ_NOT_FOUND + "");
                    outTrx.setRtn_mesg("[Bis_data] Record Not Found");
                    return _ERROR;
                }
                bis_data.setEvt_usr(inTrx.getEvt_usr());
                bis_data.setEvt_timestamp(DateUtil.getCurrentTimestamp());
                bisDataRepository.delete(bis_data);
            }
        }
        return _NORMAL;
    }



    public long addDataCateProc(FbpbisdataI inTrx, FbpbisdataO outTrx) {
        Timestamp evt_timestamp = DateUtil.getCurrentTimestamp();
        FbpbisdataIA iary = inTrx.getIary().get(0);
        String data_cate = iary.getData_cate();
        String data_desc = iary.getData_desc();
        String hql = "FROM Bis_data where data_cate='CATE' and data_id= ?0 ";
        Bis_data cr_bis_data = bisDataRepository.uniqueResult(hql, iary.getData_cate());
        if (cr_bis_data != null) {
            outTrx.setRtn_code(E_BIS_DATA + E_ADD_EXIST + "");
            outTrx.setRtn_mesg("该数据类型已经存在");
            return _ERROR;
        }
        Bis_data bis_data = new Bis_data();
        bis_data.setData_seq_id(GUIDGenerator.javaGUID());
        bis_data.setData_cate("CATE");
        bis_data.setData_id(data_cate);
        bis_data.setData_desc(data_desc);
        bis_data.setEvt_usr(inTrx.getEvt_usr());
        bis_data.setEvt_timestamp(evt_timestamp);
        bisDataRepository.save(bis_data);
        if (!StringUtil.isSpaceCheck(iary.getDsc_data_id())) {
            Bis_data bis_data_1 = new Bis_data();
            bis_data_1.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_1.setData_cate("CODE");
            bis_data_1.setData_id(data_cate);
            bis_data_1.setData_ext("DATA_ID");
            bis_data_1.setData_desc(iary.getDsc_data_id());
            bis_data_1.setEvt_usr(inTrx.getEvt_usr());
            bis_data_1.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_1);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_data_ext())) {
            Bis_data bis_data_2 = new Bis_data();
            bis_data_2.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_2.setData_cate("CODE");
            bis_data_2.setData_id(data_cate);
            bis_data_2.setData_ext("DATA_EXT");
            bis_data_2.setData_desc(iary.getDsc_data_ext());
            bis_data_2.setEvt_usr(inTrx.getEvt_usr());
            bis_data_2.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_2);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_data_item())) {
            Bis_data bis_data_3 = new Bis_data();
            bis_data_3.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_3.setData_cate("CODE");
            bis_data_3.setData_id(data_cate);
            bis_data_3.setData_ext("DATA_ITEM");
            bis_data_3.setData_desc(iary.getDsc_data_item());
            bis_data_3.setEvt_usr(inTrx.getEvt_usr());
            bis_data_3.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_3);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_1())) {
            Bis_data bis_data_4 = new Bis_data();
            bis_data_4.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_4.setData_cate("CODE");
            bis_data_4.setData_id(data_cate);
            bis_data_4.setData_ext("EXT_1");
            bis_data_4.setData_desc(iary.getDsc_ext_1());
            bis_data_4.setEvt_usr(inTrx.getEvt_usr());
            bis_data_4.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_4);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_2())) {
            Bis_data bis_data_5 = new Bis_data();
            bis_data_5.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_5.setData_cate("CODE");
            bis_data_5.setData_id(data_cate);
            bis_data_5.setData_ext("EXT_2");
            bis_data_5.setData_desc(iary.getDsc_ext_2());
            bis_data_5.setEvt_usr(inTrx.getEvt_usr());
            bis_data_5.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_5);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_3())) {
            Bis_data bis_data_6 = new Bis_data();
            bis_data_6.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_6.setData_cate("CODE");
            bis_data_6.setData_id(data_cate);
            bis_data_6.setData_ext("EXT_3");
            bis_data_6.setData_desc(iary.getDsc_ext_3());
            bis_data_6.setEvt_usr(inTrx.getEvt_usr());
            bis_data_6.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_6);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_4())) {
            Bis_data bis_data_7 = new Bis_data();
            bis_data_7.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_7.setData_cate("CODE");
            bis_data_7.setData_id(data_cate);
            bis_data_7.setData_ext("EXT_4");
            bis_data_7.setData_desc(iary.getDsc_ext_4());
            bis_data_7.setEvt_usr(inTrx.getEvt_usr());
            bis_data_7.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_7);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_5())) {
            Bis_data bis_data_8 = new Bis_data();
            bis_data_8.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_8.setData_cate("CODE");
            bis_data_8.setData_id(data_cate);
            bis_data_8.setData_ext("EXT_5");
            bis_data_8.setData_desc(iary.getDsc_ext_5());
            bis_data_8.setEvt_usr(inTrx.getEvt_usr());
            bis_data_8.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_8);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_6())) {
            Bis_data bis_data_9 = new Bis_data();
            bis_data_9.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_9.setData_cate("CODE");
            bis_data_9.setData_id(data_cate);
            bis_data_9.setData_ext("EXT_6");
            bis_data_9.setData_desc(iary.getDsc_ext_6());
            bis_data_9.setEvt_usr(inTrx.getEvt_usr());
            bis_data_9.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_9);
        }

        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_7())) {
            Bis_data bis_data_10 = new Bis_data();
            bis_data_10.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_10.setData_cate("CODE");
            bis_data_10.setData_id(data_cate);
            bis_data_10.setData_ext("EXT_7");
            bis_data_10.setData_desc(iary.getDsc_ext_7());
            bis_data_10.setEvt_usr(inTrx.getEvt_usr());
            bis_data_10.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_10);
        }

        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_8())) {
            Bis_data bis_data_11 = new Bis_data();
            bis_data_11.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_11.setData_cate("CODE");
            bis_data_11.setData_id(data_cate);
            bis_data_11.setData_ext("EXT_8");
            bis_data_11.setData_desc(iary.getDsc_ext_8());
            bis_data_11.setEvt_usr(inTrx.getEvt_usr());
            bis_data_11.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_11);
        }

        if (!StringUtil.isSpaceCheck(iary.getDsc_data_dsc())) {
            Bis_data bis_data_12 = new Bis_data();
            bis_data_12.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_12.setData_cate("CODE");
            bis_data_12.setData_id(data_cate);
            bis_data_12.setData_ext("DATA_DESC");
            bis_data_12.setData_desc(iary.getDsc_data_dsc());
            bis_data_12.setEvt_usr(inTrx.getEvt_usr());
            bis_data_12.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_12);
        }
        return _NORMAL;
    }

    public long updateDataCateProc(FbpbisdataI inTrx, FbpbisdataO outTrx) {
        Timestamp evt_timestamp = DateUtil.getCurrentTimestamp();
        FbpbisdataIA iary = inTrx.getIary().get(0);
        String hql = "FROM Bis_data where data_cate='CATE' and data_id= ?0";
        Bis_data bis_data = bisDataRepository.uniqueResult(hql, iary.getData_cate());
        if (bis_data == null) {
            outTrx.setRtn_code(E_BIS_DATA + E_READ_NOT_FOUND + "");
            outTrx.setRtn_mesg("not found record in Bis_data");
            return _ERROR;
        }
        //修改参数类型描述
        bis_data.setData_desc(iary.getData_desc());
        bis_data.setEvt_usr(inTrx.getEvt_usr());
        bis_data.setEvt_timestamp(evt_timestamp);
        bisDataRepository.update(bis_data);

        //先删除CODE全部的栏位定义
        String hql2 = "FROM Bis_data where data_cate='CODE' and data_id= ?0";
        List<Bis_data> bis_dataList = bisDataRepository.list(hql2, iary.getData_cate());
        if (bis_dataList != null && !bis_dataList.isEmpty()) {
            for(Bis_data bis_data1 : bis_dataList){
                bisDataRepository.delete(bis_data1);
            }
        }

        //新增栏位定义
        if (!StringUtil.isSpaceCheck(iary.getDsc_data_id())) {
            Bis_data bis_data_1 = new Bis_data();
            bis_data_1.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_1.setData_cate("CODE");
            bis_data_1.setData_id(iary.getData_cate());
            bis_data_1.setData_ext("DATA_ID");
            bis_data_1.setData_desc(iary.getDsc_data_id());
            bis_data_1.setEvt_usr(inTrx.getEvt_usr());
            bis_data_1.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_1);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_data_ext())) {
            Bis_data bis_data_2 = new Bis_data();
            bis_data_2.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_2.setData_cate("CODE");
            bis_data_2.setData_id(iary.getData_cate());
            bis_data_2.setData_ext("DATA_EXT");
            bis_data_2.setData_desc(iary.getDsc_data_ext());
            bis_data_2.setEvt_usr(inTrx.getEvt_usr());
            bis_data_2.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_2);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_data_item())) {
            Bis_data bis_data_3 = new Bis_data();
            bis_data_3.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_3.setData_cate("CODE");
            bis_data_3.setData_id(iary.getData_cate());
            bis_data_3.setData_ext("DATA_ITEM");
            bis_data_3.setData_desc(iary.getDsc_data_item());
            bis_data_3.setEvt_usr(inTrx.getEvt_usr());
            bis_data_3.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_3);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_1())) {
            Bis_data bis_data_4 = new Bis_data();
            bis_data_4.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_4.setData_cate("CODE");
            bis_data_4.setData_id(iary.getData_cate());
            bis_data_4.setData_ext("EXT_1");
            bis_data_4.setData_desc(iary.getDsc_ext_1());
            bis_data_4.setEvt_usr(inTrx.getEvt_usr());
            bis_data_4.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_4);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_2())) {
            Bis_data bis_data_5 = new Bis_data();
            bis_data_5.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_5.setData_cate("CODE");
            bis_data_5.setData_id(iary.getData_cate());
            bis_data_5.setData_ext("EXT_2");
            bis_data_5.setData_desc(iary.getDsc_ext_2());
            bis_data_5.setEvt_usr(inTrx.getEvt_usr());
            bis_data_5.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_5);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_3())) {
            Bis_data bis_data_6 = new Bis_data();
            bis_data_6.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_6.setData_cate("CODE");
            bis_data_6.setData_id(iary.getData_cate());
            bis_data_6.setData_ext("EXT_3");
            bis_data_6.setData_desc(iary.getDsc_ext_3());
            bis_data_6.setEvt_usr(inTrx.getEvt_usr());
            bis_data_6.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_6);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_4())) {
            Bis_data bis_data_7 = new Bis_data();
            bis_data_7.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_7.setData_cate("CODE");
            bis_data_7.setData_id(iary.getData_cate());
            bis_data_7.setData_ext("EXT_4");
            bis_data_7.setData_desc(iary.getDsc_ext_4());
            bis_data_7.setEvt_usr(inTrx.getEvt_usr());
            bis_data_7.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_7);
        }
        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_5())) {
            Bis_data bis_data_8 = new Bis_data();
            bis_data_8.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_8.setData_cate("CODE");
            bis_data_8.setData_id(iary.getData_cate());
            bis_data_8.setData_ext("EXT_5");
            bis_data_8.setData_desc(iary.getDsc_ext_5());
            bis_data_8.setEvt_usr(inTrx.getEvt_usr());
            bis_data_8.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_8);
        }

        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_6())) {
            Bis_data bis_data_9 = new Bis_data();
            bis_data_9.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_9.setData_cate("CODE");
            bis_data_9.setData_id(iary.getData_cate());
            bis_data_9.setData_ext("EXT_6");
            bis_data_9.setData_desc(iary.getDsc_ext_6());
            bis_data_9.setEvt_usr(inTrx.getEvt_usr());
            bis_data_9.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_9);
        }

        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_7())) {
            Bis_data bis_data_10 = new Bis_data();
            bis_data_10.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_10.setData_cate("CODE");
            bis_data_10.setData_id(iary.getData_cate());
            bis_data_10.setData_ext("EXT_7");
            bis_data_10.setData_desc(iary.getDsc_ext_7());
            bis_data_10.setEvt_usr(inTrx.getEvt_usr());
            bis_data_10.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_10);
        }

        if (!StringUtil.isSpaceCheck(iary.getDsc_ext_8())) {
            Bis_data bis_data_11 = new Bis_data();
            bis_data_11.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_11.setData_cate("CODE");
            bis_data_11.setData_id(iary.getData_cate());
            bis_data_11.setData_ext("EXT_8");
            bis_data_11.setData_desc(iary.getDsc_ext_8());
            bis_data_11.setEvt_usr(inTrx.getEvt_usr());
            bis_data_11.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_11);
        }

        if (!StringUtil.isSpaceCheck(iary.getDsc_data_dsc())) {
            Bis_data bis_data_12 = new Bis_data();
            bis_data_12.setData_seq_id(GUIDGenerator.javaGUID());
            bis_data_12.setData_cate("CODE");
            bis_data_12.setData_id(iary.getData_cate());
            bis_data_12.setData_ext("DATA_DESC");
            bis_data_12.setData_desc(iary.getDsc_data_dsc());
            bis_data_12.setEvt_usr(inTrx.getEvt_usr());
            bis_data_12.setEvt_timestamp(evt_timestamp);
            bisDataRepository.save(bis_data_12);
        }
        return _NORMAL;

    }

    public long deleteDataCateProc(FbpbisdataI inTrx, FbpbisdataO outTrx) {
        Timestamp evt_timestamp = DateUtil.getCurrentTimestamp();
        FbpbisdataIA iary = inTrx.getIary().get(0);
        String data_cate = iary.getData_cate();
        String hql = "FROM Bis_data where data_cate='CATE' and data_id= ?0";
        Bis_data bis_data = bisDataRepository.uniqueResult(hql, data_cate);
        if (bis_data == null) {
            outTrx.setRtn_code(E_BIS_DATA + E_READ_NOT_FOUND + "");
            outTrx.setRtn_mesg("[Bis_data] Record Not Found");
            return _ERROR;
        }
        bisDataRepository.delete(bis_data);

        String hql2 = "FROM Bis_data where data_cate= ?0 ";
        List<Bis_data> bis_dataList = bisDataRepository.list(hql2, data_cate);
        for (Bis_data bis_data2 : bis_dataList) {
            bis_data2.setEvt_usr(inTrx.getEvt_usr());
            bis_data2.setEvt_timestamp(evt_timestamp);
            bisDataRepository.delete(bis_data2);
        }

        String hql3 = "FROM Bis_data where data_cate='CODE' and data_id= ?0 ";
        List<Bis_data> bis_dataList1 = bisDataRepository.list(hql3, data_cate);
        for (Bis_data bis_data3 : bis_dataList1) {
            bis_data3.setEvt_usr(inTrx.getEvt_usr());
            bis_data3.setEvt_timestamp(evt_timestamp);
            bisDataRepository.delete(bis_data3);
        }
        return _NORMAL;

    }

    private Bis_data getDataByKeyProc(String data_cate, String data_id, String data_ext) {
        String hql = "FROM Bis_data where data_cate = ?0 and data_id= ?1 and data_ext= ?2";
        Bis_data bis_data = bisDataRepository.uniqueResult(hql, data_cate, data_id, data_ext);
        return bis_data;
    }
}
