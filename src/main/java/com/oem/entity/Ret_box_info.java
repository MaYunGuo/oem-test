package com.oem.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class Ret_box_info  extends BaseEntity implements Serializable{
    @Id
    @Column(name = "BOX_ID", length = 25)
    private String box_id;
    @Column(name = "OQC_GRADE",length = 3)
    private String oqc_grade;
    @Column(name = "ship_flg", length = 1)
    private String ship_flg;

    public String getBox_id() {
        return box_id;
    }

    public void setBox_id(String box_id) {
        this.box_id = box_id;
    }

    public String getOqc_grade() {
        return oqc_grade;
    }

    public void setOqc_grade(String oqc_grade) {
        this.oqc_grade = oqc_grade;
    }

    public String getShip_flg() {
        return ship_flg;
    }

    public void setShip_flg(String ship_flg) {
        this.ship_flg = ship_flg;
    }
}
