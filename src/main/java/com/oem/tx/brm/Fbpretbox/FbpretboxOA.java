package com.oem.tx.brm.Fbpretbox;


import lombok.Data;

import java.util.List;

@Data
public class FbpretboxOA {
    private String box_no;
    private String oqc_grade;
    private String ship_statu;

    //oem_prd_lot 根据Box_no 串lot 一对多
    private List<LotInfo> lotList;

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

    public List<LotInfo> getLotList() {
        return lotList;
    }

    public void setLotList(List<LotInfo> lotList) {
        this.lotList = lotList;
    }
}
