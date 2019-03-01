package com.oem.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
public class Bis_data extends BaseEntity implements Serializable {

    @Id
    @Column(name = "DATA_SEQ_ID",length = 25)
    private String data_seq_id;

    @Column(name = "UNQ_SEQ_ID", length = 25)
    private String unq_seq_id;

    @Column(name="DATA_CATE", length = 4)
    private String data_cate;
    @Column(name="DATA_ID", length = 10)
    private String data_id;

    @Column(name="DATA_EXT", length = 10)
    private String data_ext;

    @Column(name="DATA_ITEM", length = 10)
    private String data_item;

    @Column(name="DATA_DESC", length = 50)
    private String data_desc;

    @Column(name="EXT_1", length = 100)
    private String ext_1;

    @Column(name="EXT_2", length = 100)
    private String ext_2;

    @Column(name="EXT_3", length = 100)
    private String ext_3;

    @Column(name="EXT_4", length = 100)
    private String ext_4;

    @Column(name="EXT_5", length = 100)
    private String ext_5;

    @Column(name="EXT_6", length = 100)
    private String ext_6;

    @Column(name="EXT_7", length = 100)
    private String ext_7;

    @Column(name="EXT_8", length = 100)
    private String ext_8;

    @Column(name="EVT_USR", length = 10)
    private String evt_usr;

    @Column(name="EVT_TIMESTAMP", length = 25)
    private Timestamp evt_timestamp;

    public String getData_seq_id() {
        return data_seq_id;
    }

    public void setData_seq_id(String data_seq_id) {
        this.data_seq_id = data_seq_id;
    }

    public String getUnq_seq_id() {
        return unq_seq_id;
    }

    public void setUnq_seq_id(String unq_seq_id) {
        this.unq_seq_id = unq_seq_id;
    }

    public String getData_cate() {
        return data_cate;
    }

    public void setData_cate(String data_cate) {
        this.data_cate = data_cate;
    }

    public String getData_id() {
        return data_id;
    }

    public void setData_id(String data_id) {
        this.data_id = data_id;
    }

    public String getData_ext() {
        return data_ext;
    }

    public void setData_ext(String data_ext) {
        this.data_ext = data_ext;
    }

    public String getData_item() {
        return data_item;
    }

    public void setData_item(String data_item) {
        this.data_item = data_item;
    }

    public String getData_desc() {
        return data_desc;
    }

    public void setData_desc(String data_desc) {
        this.data_desc = data_desc;
    }

    public String getExt_1() {
        return ext_1;
    }

    public void setExt_1(String ext_1) {
        this.ext_1 = ext_1;
    }

    public String getExt_2() {
        return ext_2;
    }

    public void setExt_2(String ext_2) {
        this.ext_2 = ext_2;
    }

    public String getExt_3() {
        return ext_3;
    }

    public void setExt_3(String ext_3) {
        this.ext_3 = ext_3;
    }

    public String getExt_4() {
        return ext_4;
    }

    public void setExt_4(String ext_4) {
        this.ext_4 = ext_4;
    }

    public String getExt_5() {
        return ext_5;
    }

    public void setExt_5(String ext_5) {
        this.ext_5 = ext_5;
    }

    public String getExt_6() {
        return ext_6;
    }

    public void setExt_6(String ext_6) {
        this.ext_6 = ext_6;
    }

    public String getExt_7() {
        return ext_7;
    }

    public void setExt_7(String ext_7) {
        this.ext_7 = ext_7;
    }

    public String getExt_8() {
        return ext_8;
    }

    public void setExt_8(String ext_8) {
        this.ext_8 = ext_8;
    }

    public String getEvt_usr() {
        return evt_usr;
    }

    public void setEvt_usr(String evt_usr) {
        this.evt_usr = evt_usr;
    }

    public Timestamp getEvt_timestamp() {
        return this.evt_timestamp;
    }

    public void setEvt_timestamp(Timestamp evt_timestamp) {
        this.evt_timestamp = evt_timestamp;
    }
}
