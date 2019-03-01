package com.oem.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * group绑定func_code 表
 *
 */

@Entity
public class Bis_grp_func extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Bis_grp_funcId id;

    @Column(name = "SYSTEM_ID", length = 5)
    private String system_id;

    @Column(name = "EVT_USR", length = 15)
    private String evt_usr;

    @Column(name = "EVT_TIMESTAMP", length = 25)
    private Timestamp evt_timestamp;

    public Bis_grp_funcId getId() {
        return id;
    }


    public void setId(Bis_grp_funcId id) {
        this.id = id;
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

    public Bis_grp_func(){

    }
     public Bis_grp_func(Bis_grp_funcId id){
        this.id = id;
     }
}
