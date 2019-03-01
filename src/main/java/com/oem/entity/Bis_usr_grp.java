package com.oem.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * user绑定group 表
 *
 */

@Entity
public class Bis_usr_grp extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Bis_usr_grpId id;

    @Column(name="UNQ_SEQ_ID",length = 25)
    private String unq_seq_id;

    @Column(name = "EVT_USR", length = 15)
    private String evt_usr;

    @Column(name="EVT_TIMESTAMP", length = 25)
    private Timestamp evt_timestamp;

    public Bis_usr_grpId getId() {
        return id;
    }

    public void setId(Bis_usr_grpId id) {
        this.id = id;
    }

    public String getUnq_seq_id() {
        return unq_seq_id;
    }

    public void setUnq_seq_id(String unq_seq_id) {
        this.unq_seq_id = unq_seq_id;
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


    public Bis_usr_grp(){}

    public Bis_usr_grp(Bis_usr_grpId id){
        this.id = id;
    }
}
