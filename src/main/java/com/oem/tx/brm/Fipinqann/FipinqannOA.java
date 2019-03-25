package com.oem.tx.brm.Fipinqann;

import java.sql.Timestamp;

public class FipinqannOA {
	private String announce_no;
	private Integer announce_seq;
	private String announce_text;
	private String evt_usr;
	private Timestamp evt_timestamp;

	public String getAnnounce_no() {
		return announce_no;
	}

	public void setAnnounce_no(String announce_no) {
		this.announce_no = announce_no;
	}

	public Integer getAnnounce_seq() {
		return announce_seq;
	}

	public void setAnnounce_seq(Integer announce_seq) {
		this.announce_seq = announce_seq;
	}

	public String getAnnounce_text() {
		return announce_text;
	}

	public void setAnnounce_text(String announce_text) {
		this.announce_text = announce_text;
	}

	public String getEvt_usr() {
		return evt_usr;
	}

	public void setEvt_usr(String evt_usr) {
		this.evt_usr = evt_usr;
	}

	public Timestamp getEvt_timestamp() {
		return evt_timestamp;
	}

	public void setEvt_timestamp(Timestamp evt_timestamp) {
		this.evt_timestamp = evt_timestamp;
	}
}
