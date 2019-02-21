package com.oem.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Id;
import java.io.Serializable;

@Embeddable
public class Bis_grp_funcId implements Serializable {

    @Column(name="GROUP_ID_FK", length = 40)
    private String group_id_fk;

    @Column(name="FUNC_CODE", length = 40)
    private String func_code;

    public String getGroup_id_fk() {
        return group_id_fk;
    }


    public void setGroup_id_fk(String group_id_fk) {
        this.group_id_fk = group_id_fk;
    }

    public String getFunc_code() {
        return func_code;
    }


    public void setFunc_code(String func_code) {
        this.func_code = func_code;
    }
}
