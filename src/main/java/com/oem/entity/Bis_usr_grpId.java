package com.oem.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class Bis_usr_grpId implements Serializable {

    @Column(name="USR_ID_FK",length = 10)
    private String usr_id_fk;

    @Column(name="GROUP_ID_FK",length = 40)
    private String group_id_fk;


    public String getUsr_id_fk() {
        return usr_id_fk;
    }

    public void setUsr_id_fk(String usr_id_fk) {
        this.usr_id_fk = usr_id_fk;
    }

    public String getGroup_id_fk() {
        return group_id_fk;
    }


    public void setGroup_id_fk(String group_id_fk) {
        this.group_id_fk = group_id_fk;
    }
}
