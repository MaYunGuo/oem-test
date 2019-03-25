package com.oem.service.brm.impl;


import com.oem.dao.IOemAnnRepository;
import com.oem.entity.Oem_announment;
import com.oem.service.brm.IFipinqAnnService;
import com.oem.tx.brm.Fipinqann.FipinqannI;
import com.oem.tx.brm.Fipinqann.FipinqannIA;
import com.oem.tx.brm.Fipinqann.FipinqannO;
import com.oem.tx.brm.Fipinqann.FipinqannOA;
import com.oem.util.*;
import com.zaxxer.hikari.util.FastList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static com.oem.comdef.GenericDef.*;


@Service("fipinqannService")
public class FipinqAnnService implements IFipinqAnnService {

	private LogUtils logUtils;
	
	@Autowired
	private IOemAnnRepository oemAnnRepository;

	@Transactional
	public String subMainProc(String evt_no,String strInMsg) {
		AppContext.clear();
		AppContext.setCurrServiceName(FipinqAnnService.class.getSimpleName());
		AppContext.setCurrEventNumber(evt_no);
		logUtils = new LogUtils(FipinqAnnService.class);
		logUtils.info("[InTrx:" + strInMsg + "]");
		String outMsg = "";

		FipinqannO outTrx = new FipinqannO();
		outTrx.setTrx_id(TX_FIPINQANN);
		outTrx.setType_id(TRX_TYPE_OUT);
		outTrx.setRtn_code(RETURN_CODE_OK);
		outTrx.setRtn_mesg(RETURN_MESG_OK);

		try {
			FipinqannI inTrx = JacksonUtil.fromJson(strInMsg, FipinqannI.class);
			long rtn_code = subMainProc2(inTrx,outTrx);
			if (rtn_code != _NORMAL){
				TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			}
		} catch (Exception ex) {
			outTrx.setRtn_code(RETURN_CODE_UNKNOWN);
			outTrx.setRtn_mesg(StringUtil.stackTraceToString(ex));

			logUtils.error(StringUtil.stackTraceToString(ex));
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		} finally {
			outMsg = JacksonUtil.toJSONStr(outTrx);
			logUtils.info("[OutTrx:" + outMsg + "]");
		}
		return outMsg;
	}

	private long subMainProc2(FipinqannI inTrx,FipinqannO outTrx) {
		long rtn_code = _ERROR;
		char action_flg = inTrx.getAction_flg().charAt(0);
		switch (action_flg) {
			case 'S': {
				rtn_code = saveAnnouncement(inTrx,outTrx);
				break;
			}
			case 'Q': {
				rtn_code = setOutTrxByList(inTrx,outTrx);
				break;
			}
			default: {
				outTrx.setRtn_mesg("无效的操作标识[" + action_flg +"]");
				outTrx.setRtn_code(INVALID_ACTION_FLG);
			}
		}
		return rtn_code;
	}

	

	public long setOutTrxByList(FipinqannI inTrx,FipinqannO outTrx){
		List<FipinqannOA> fipinqannOAList = new ArrayList<FipinqannOA>();
		String announce_no = inTrx.getAnnounce_no();
		String hql = "FROM Oem_announment where announce_no ='" + announce_no +"' order by announce_seq";
		List<Oem_announment> annList = oemAnnRepository.find(hql);
		if(annList.size()>0){
			for(Oem_announment announ: annList){
				FipinqannOA fipinqannOA = new FipinqannOA();
				fipinqannOA.setAnnounce_no(announ.getAnnounce_no());
				fipinqannOA.setAnnounce_text(announ.getAnnounce_text());
				fipinqannOA.setEvt_usr(announ.getEvt_usr());
				fipinqannOA.setEvt_timestamp(announ.getEvt_timestamp());
				fipinqannOAList.add(fipinqannOA);
			}
			outTrx.setCount(annList.size());
		}else{
			outTrx.setCount(0);
		}
		outTrx.setOary(fipinqannOAList);
        return _NORMAL;
	}

	public long saveAnnouncement(FipinqannI inTrx,FipinqannO outTrx){
		String evt_usr = inTrx.getEvt_usr();
		Timestamp cr_timestamp = DateUtil.getCurrentTimestamp();

		List<FipinqannIA> iary = inTrx.getIary();
		if(iary == null || iary.isEmpty()){
			outTrx.setRtn_code(E_FIPINQANN_INVALID_INPUT + _SPACE);
			outTrx.setRtn_mesg("请输入要更新的公告信息");
			return _ERROR;
		}
		String announce_no = inTrx.getAnnounce_no();
		String hql = "From Oem_announment where announce_no = '" + announce_no +"'";
		List<Oem_announment> announmentList = oemAnnRepository.find(hql);
		if(announmentList != null && !announmentList.isEmpty()){
             for(Oem_announment oem_announment : announmentList){
             	oemAnnRepository.delete(oem_announment);
			 }
		}

		List<FipinqannOA> oary = new ArrayList<>();
		for(FipinqannIA fipinqannIA : iary){
             Oem_announment oem_announment = new Oem_announment();
             oem_announment.setUnq_seq_id(GUIDGenerator.javaGUID());
             oem_announment.setAnnounce_no(announce_no);
             oem_announment.setAnnounce_seq(fipinqannIA.getAnnounce_seq());
             oem_announment.setAnnounce_text(fipinqannIA.getAnnounce_text());
             oem_announment.setEvt_usr(evt_usr);
             oem_announment.setEvt_timestamp(cr_timestamp);
             oemAnnRepository.save(oem_announment);

             FipinqannOA fipinqannOA = new FipinqannOA();
			 fipinqannOA.setAnnounce_no(oem_announment.getAnnounce_no());
			 fipinqannOA.setAnnounce_seq(oem_announment.getAnnounce_seq());
			 fipinqannOA.setAnnounce_text(oem_announment.getAnnounce_text());
			oary.add(fipinqannOA);
		}
		outTrx.setCount(oary.size());
		outTrx.setOary(oary);
		return _NORMAL;
	}

}
