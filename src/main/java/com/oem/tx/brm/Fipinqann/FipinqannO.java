package com.oem.tx.brm.Fipinqann;

import com.oem.base.tx.BaseO;

import java.util.List;

public class FipinqannO extends BaseO{

	private Integer count  ;
	private List<FipinqannOA> oary ;

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public List<FipinqannOA> getOary() {
		return oary;
	}

	public void setOary(List<FipinqannOA> oary) {
		this.oary = oary;
	}
}
