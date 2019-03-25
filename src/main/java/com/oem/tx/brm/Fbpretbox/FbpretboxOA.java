package com.oem.tx.brm.Fbpretbox;



import java.util.List;


public class FbpretboxOA {
    private String box_no;
    private String oqc_grade;
    private String ship_statu;
    private List<FbpretboxOB> oaryB;

    public String getBox_no() {
        return box_no;
    }

    public void setBox_no(String box_no) {
        this.box_no = box_no;
    }

    public String getOqc_grade() {
        return oqc_grade;
    }

    public void setOqc_grade(String oqc_grade) {
        this.oqc_grade = oqc_grade;
    }

    public String getShip_statu() {
        return ship_statu;
    }

    public void setShip_statu(String ship_statu) {
        this.ship_statu = ship_statu;
    }

    public List<FbpretboxOB> getOaryB() {
        return oaryB;
    }

    public void setOaryB(List<FbpretboxOB> oaryB) {
        this.oaryB = oaryB;
    }
}
