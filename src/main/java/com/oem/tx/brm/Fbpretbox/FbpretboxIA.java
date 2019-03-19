package com.oem.tx.brm.Fbpretbox;


import lombok.Data;

import java.util.List;

@Data
public class FbpretboxIA {

    //ret_box 以Box_no 为主
    private String box_no;//主键
    private String oqc_grade;//OQC等级
    private String ship_statu;//出货

    private String lot_no;

    //oem_prd_lot 根据Box_no 串lot 一对多
    private List<FbpretboxOB> lotList;

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

    public String getLot_no() {
        return lot_no;
    }

    public void setLot_no(String lot_no) {
        this.lot_no = lot_no;
    }

    public List<FbpretboxOB> getLotList() {
        return lotList;
    }

    public void setLotList(List<FbpretboxOB> lotList) {
        this.lotList = lotList;
    }
}
