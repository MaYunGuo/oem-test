package com.oem.entity;


import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * func_code 定义表
 *
 */

@Entity
public class Bis_func_code implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name="FUNC_CODE", length = 40)
    private String func_code;

    @Column(name="UNQ_SEQ_ID", length = 25)
    private String unq_seq_id;

    @Column(name="FUNC_NAME", length = 32)
    private String func_name;

    @Column(name="SYSTEM_ID", length = 5)
    private String system_id;

    @Column(name="EVT_USR", length = 15)
    private String evt_usr;

    @Column(name="EVT_TIMESTAMP", length = 19)
    private Timestamp evt_timestamp;

    public String getFunc_code() {
        return func_code;
    }


    public void setFunc_code(String func_code) {
        this.func_code = func_code;
    }

    public String getUnq_seq_id() {
        return unq_seq_id;
    }

    public void setUnq_seq_id(String unq_seq_id) {
        this.unq_seq_id = unq_seq_id;
    }

    public String getFunc_name() {
        return func_name;
    }

    public void setFunc_name(String func_name) {
        this.func_name = func_name;
    }

    public String getSystem_id() {
        return system_id;
    }

    public void setSystem_id(String system_id) {
        this.system_id = system_id;
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
