package com.oem.tx.brm.Fbpretmtrl;

import java.sql.Timestamp;

public class FbpretmtrlOA {
    private Integer id;
    private String lot_no;
    private String oem_id;
    private String oem_name;
    private String mtrl_no;
    private String mtrl_batch;
    private String mtrl_vender;
    private String mtrl_power;
    private String mtrl_color;
    private String mtrl_model;
    private String update_usr;
    private Timestamp update_timestamp;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLot_no() {
        return lot_no;
    }

    public void setLot_no(String lot_no) {
        this.lot_no = lot_no;
    }

    public String getOem_id() {
        return oem_id;
    }

    public void setOem_id(String oem_id) {
        this.oem_id = oem_id;
    }

    public String getMtrl_no() {
        return mtrl_no;
    }

    public void setMtrl_no(String mtrl_no) {
        this.mtrl_no = mtrl_no;
    }

    public String getMtrl_batch() {
        return mtrl_batch;
    }

    public void setMtrl_batch(String mtrl_batch) {
        this.mtrl_batch = mtrl_batch;
    }

    public String getMtrl_vender() {
        return mtrl_vender;
    }

    public void setMtrl_vender(String mtrl_vender) {
        this.mtrl_vender = mtrl_vender;
    }

    public String getMtrl_power() {
        return mtrl_power;
    }

    public void setMtrl_power(String mtrl_power) {
        this.mtrl_power = mtrl_power;
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

    public String getUpdate_usr() {
        return update_usr;
    }

    public void setUpdate_usr(String update_usr) {
        this.update_usr = update_usr;
    }

    public Timestamp getUpdate_timestamp() {
        return update_timestamp;
    }

    public void setUpdate_timestamp(Timestamp update_timestamp) {
        this.update_timestamp = update_timestamp;
    }

    public String getOem_name() {
        return oem_name;
    }

    public void setOem_name(String oem_name) {
        this.oem_name = oem_name;
    }
}
