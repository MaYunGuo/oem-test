package com.oem.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
public class Oem_announment  extends BaseEntity implements Serializable {

    @Id
    @Column(name ="UNQ_SEQ_ID", length = 25)
    private String unq_seq_id;
    @Column(name = "ANNOUNCE_NO", length = 4)
    private String announce_no;
    @Column(name="ANNOUNCE_DEQ")
    private Integer announce_seq;    //序号，将公告信息，按换行保存
    @Column(name = "ANNOUNCE_TEXT", length = 255)
    private String announce_text;
    @Column(name = "EVT_USR",length = 32)
    private String evt_usr;
    @Column(name = "EVT_TIMESTAMP")
    private Timestamp evt_timestamp;

    public String getAnnounce_no() {
        return announce_no;
    }

    public String getUnq_seq_id() {
        return unq_seq_id;
    }

    public void setUnq_seq_id(String unq_seq_id) {
        this.unq_seq_id = unq_seq_id;
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
