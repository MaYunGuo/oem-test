package com.oem.tx.brm.Fbpretlot;

import com.oem.base.tx.BaseI;
import com.oem.tx.brm.Fbpbisfaty.FbpbisfatyIA;

import java.sql.Timestamp;
import java.util.List;

public class FbpretlotI extends BaseI {

    private String lot_id;
    private Double power;
    private Double isc;
    private Double voc;
    private Double imp;
    private Double vmp;
    private Double ff;
    private Double temp;
    private String cal; //校准版
    private Timestamp meas_timestamp; //测试时间
    private String ins_grade;   //终检等级
    private String ins_power;   //终检功率
    private String ins_color;   //终检颜色
    private String pack_box_id;
    private String evt_usr;
    private Timestamp evt_timestamp;
    private String box_id;

    public String getLot_id() {
        return lot_id;
    }

    public void setLot_id(String lot_id) {
        this.lot_id = lot_id;
    }

    public Double getPower() {
        return power;
    }

    public void setPower(Double power) {
        this.power = power;
    }

    public Double getIsc() {
        return isc;
    }

    public void setIsc(Double isc) {
        this.isc = isc;
    }

    public Double getVoc() {
        return voc;
    }

    public void setVoc(Double voc) {
        this.voc = voc;
    }

    public Double getImp() {
        return imp;
    }

    public void setImp(Double imp) {
        this.imp = imp;
    }

    public Double getVmp() {
        return vmp;
    }

    public void setVmp(Double vmp) {
        this.vmp = vmp;
    }

    public Double getFf() {
        return ff;
    }

    public void setFf(Double ff) {
        this.ff = ff;
    }

    public Double getTemp() {
        return temp;
    }

    public void setTemp(Double temp) {
        this.temp = temp;
    }

    public String getCal() {
        return cal;
    }

    public void setCal(String cal) {
        this.cal = cal;
    }

    public Timestamp getMeas_timestamp() {
        return meas_timestamp;
    }

    public void setMeas_timestamp(Timestamp meas_timestamp) {
        this.meas_timestamp = meas_timestamp;
    }

    public String getIns_grade() {
        return ins_grade;
    }

    public void setIns_grade(String ins_grade) {
        this.ins_grade = ins_grade;
    }

    public String getIns_power() {
        return ins_power;
    }

    public void setIns_power(String ins_power) {
        this.ins_power = ins_power;
    }

    public String getIns_color() {
        return ins_color;
    }

    public void setIns_color(String ins_color) {
        this.ins_color = ins_color;
    }

    public String getPack_box_id() {
        return pack_box_id;
    }

    public void setPack_box_id(String pack_box_id) {
        this.pack_box_id = pack_box_id;
    }

    @Override
    public String getEvt_usr() {
        return evt_usr;
    }

    @Override
    public void setEvt_usr(String evt_usr) {
        this.evt_usr = evt_usr;
    }

    public Timestamp getEvt_timestamp() {
        return evt_timestamp;
    }

    public void setEvt_timestamp(Timestamp evt_timestamp) {
        this.evt_timestamp = evt_timestamp;
    }

    public String getBox_id() {
        return box_id;
    }

    public void setBox_id(String box_id) {
        this.box_id = box_id;
    }
}
