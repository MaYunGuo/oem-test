package com.oem.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
public class Bis_factory extends BaseEntity implements Serializable {

    @Column(name = "UNQ_SEQ_ID", length = 25)
    private String unq_seq_id;

    @Id
    @Column(name = "FATY_ID", length = 30)
    private String faty_id;   //工厂代码

    @Column(name = "FATY_NAME", length = 30)
    private String faty_name; //工厂名称

    @Column(name = "ANLS_RATE")
    private Integer anls_rate; //数据解析频率

    @Column(name = "ANLS_UNIT", length = 1)
    private String  anls_unit;  //解析单位 H:小时,M:分钟,S:秒

    @Column(name = "EVT_USR", length = 10)
    private String evt_usr;

    @Column(name = "EVT_TIMESTAMP", length = 25)
    private Timestamp evt_timestamp;


    public String getUnq_seq_id() {
        return unq_seq_id;
    }

    public void setUnq_seq_id(String unq_seq_id) {
        this.unq_seq_id = unq_seq_id;
    }

    public String getFaty_id() {
        return faty_id;
    }

    public void setFaty_id(String faty_id) {
        this.faty_id = faty_id;
    }

    public String getFaty_name() {
        return faty_name;
    }

    public void setFaty_name(String faty_name) {
        this.faty_name = faty_name;
    }

    public Integer getAnls_rate() {
        return anls_rate;
    }

    public void setAnls_rate(Integer anls_rate) {
        this.anls_rate = anls_rate;
    }

    public String getAnls_unit() {
        return anls_unit;
    }

    public void setAnls_unit(String anls_unit) {
        this.anls_unit = anls_unit;
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
