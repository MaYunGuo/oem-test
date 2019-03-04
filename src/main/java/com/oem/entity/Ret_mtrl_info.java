package com.oem.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
public class Ret_mtrl_info extends BaseEntity implements Serializable {


    @Id
    @Column(name = "DAT_SEQ_ID", length = 25)
    private String dat_seq_id;
    @Column(name = "UNQ_SEQ_ID", length = 25)
    private String unq_seq_id;
    @Column(name = "MTRL_ID", length = 30)
    private String mtrl_id;
    @Column(name = "MTRL_LOT_ID", length = 30)
    private String mtrl_lot_id;
    @Column(name = "MTRL_ORDER_ID", length = 25)
    private String mtrl_order_id; //发料单
    @Column(name = "MTRL_FATY_ID", length = 30)
    private String mtrl_faty_id;  //厂家
    @Column(name = "MTRL_EFFCY", length = 10)
    private String mtrl_effcy;    //效率
    @Column(name = "MTRL_COLOR", length = 10)
    private String mtrl_color;    //颜色
    @Column(name = "MTRL_MODEL", length = 10)
    private String mtrl_model;    //型号
    @Column(name = "MTRL_QTY")
    private Integer mtrl_qty;     //发料数量
    @Column(name = "USE_QTY")
    private Integer use_qty;      //使用数量
    @Column(name = "EVT_USR", length = 10)
    private String evt_usr;
    @Column(name="EVT_TIMESTAMP", length = 25)
    private Timestamp evt_timestamp;


    public String getDat_seq_id() {
        return dat_seq_id;
    }

    public void setDat_seq_id(String dat_seq_id) {
        this.dat_seq_id = dat_seq_id;
    }

    public String getUnq_seq_id() {
        return unq_seq_id;
    }

    public void setUnq_seq_id(String unq_seq_id) {
        this.unq_seq_id = unq_seq_id;
    }

    public String getMtrl_id() {
        return mtrl_id;
    }

    public void setMtrl_id(String mtrl_id) {
        this.mtrl_id = mtrl_id;
    }

    public String getMtrl_lot_id() {
        return mtrl_lot_id;
    }

    public void setMtrl_lot_id(String mtrl_lot_id) {
        this.mtrl_lot_id = mtrl_lot_id;
    }

    public String getMtrl_order_id() {
        return mtrl_order_id;
    }

    public void setMtrl_order_id(String mtrl_order_id) {
        this.mtrl_order_id = mtrl_order_id;
    }

    public String getMtrl_faty_id() {
        return mtrl_faty_id;
    }

    public void setMtrl_faty_id(String mtrl_faty_id) {
        this.mtrl_faty_id = mtrl_faty_id;
    }

    public String getMtrl_effcy() {
        return mtrl_effcy;
    }

    public void setMtrl_effcy(String mtrl_effcy) {
        this.mtrl_effcy = mtrl_effcy;
    }

    public String getMtrl_color() {
        return mtrl_color;
    }

    public void setMtrl_color(String mtrl_color) {
        this.mtrl_color = mtrl_color;
    }

    public String getMtrl_model() {
        return mtrl_model;
    }

    public void setMtrl_model(String mtrl_model) {
        this.mtrl_model = mtrl_model;
    }

    public Integer getMtrl_qty() {
        return mtrl_qty;
    }

    public void setMtrl_qty(Integer mtrl_qty) {
        this.mtrl_qty = mtrl_qty;
    }

    public Integer getUse_qty() {
        return use_qty;
    }

    public void setUse_qty(Integer use_qty) {
        this.use_qty = use_qty;
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
