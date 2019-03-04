package com.oem.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Time;
import java.sql.Timestamp;

@Entity
public class Ret_lot_info extends BaseEntity implements Serializable {

    @Id
    @Column(name = "LOT_ID", length = 25)
    private String lot_id;
    @Column(name = "POWER", columnDefinition = "double(10,4)")
    private Double power;
    @Column(name = "ISC", columnDefinition = "double(10,4)")
    private Double isc;
    @Column(name = "VOC", columnDefinition = "double(10,4)")
    private Double voc;
    @Column(name = "IMP", columnDefinition = "double(10,4)")
    private Double imp;
    @Column(name = "VMP", columnDefinition = "double(10,4)")
    private Double vmp;
    @Column(name = "FF", columnDefinition = "double(10,4)")
    private Double ff;
    @Column(name = "TEMP", columnDefinition = "double(10,4)")
    private Double temp;
    private String cal; //校准版
    private Timestamp meas_timestamp; //测试时间
    @Column(name = "INS_GRADE", length = 10)
    private String ins_grade;   //终检等级
    @Column(name = "INS_POWER", length = 10)
    private String ins_power;   //终检功率
    @Column(name = "INS_COLOR", length = 10)
    private String ins_color;   //终检颜色
    private String pack_box_id;

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
}
