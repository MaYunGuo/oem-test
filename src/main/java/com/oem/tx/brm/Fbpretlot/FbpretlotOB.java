package com.oem.tx.brm.Fbpretlot;

import com.oem.base.tx.BaseI;

import java.sql.Timestamp;

public class FbpretlotOB extends BaseI {

   private  String box_id;
   private String oqc_grade;
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
