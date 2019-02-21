package com.oem.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * func_group 定义表
 *
 */

@Entity
public class Bis_func_grp implements Serializable {


    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "GROUP_ID", length = 40)
    private String group_id;

    @Column(name = "GROUP_NAME", length = 40)
    private String group_name;

    @Column(name = "SYSTEM_ID", length = 5)
    private String system_id;

    @Column(name = "EVT_USR", length = 15)
    private String evt_usr;

    @Column(name = "EVT_TIMESTAMP", length = 19)
    private Timestamp evt_timestamp;

    public String getGroup_id() {
        return group_id;
    }

    public void setGroup_id(String group_id) {
        this.group_id = group_id;
    }

    public String getGroup_name() {
        return group_name;
    }

    public void setGroup_name(String group_name) {
        this.group_name = group_name;
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
