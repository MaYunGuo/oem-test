package com.oem.tx.brm.Fipinqann;

import com.oem.base.tx.BaseI;

import java.util.List;

public class FipinqannI extends BaseI{

	private String announce_no;
	private List<FipinqannIA> iary;


	public String getAnnounce_no() {
		return announce_no;
	}

	public void setAnnounce_no(String announce_no) {
		this.announce_no = announce_no;
	}

	public List<FipinqannIA> getIary() {
		return iary;
	}

	public void setIary(List<FipinqannIA> iary) {
		this.iary = iary;
	}
}
