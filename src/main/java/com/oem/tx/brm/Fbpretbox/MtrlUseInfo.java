package com.oem.tx.brm.Fbpretbox;

import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by ghost on 2019/3/8.
 */
public class MtrlUseInfo {
    private String id;
    private String lot_no;
    private String mtrl_no;
    private String oem_id;
    private String vender;
    private BigDecimal power;
    private String color;
    private String model_no;
    private Timestamp update_timestamp;
    private String update_user;
    private Timestamp db_timestamp;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLot_no() {
        return lot_no;
    }

    public void setLot_no(String lot_no) {
        this.lot_no = lot_no;
    }

    public String getMtrl_no() {
        return mtrl_no;
    }

    public void setMtrl_no(String mtrl_no) {
        this.mtrl_no = mtrl_no;
    }

    public String getOem_id() {
        return oem_id;
    }

    public void setOem_id(String oem_id) {
        this.oem_id = oem_id;
    }

    public String getVender() {
        return vender;
    }

    public void setVender(String vender) {
        this.vender = vender;
    }

    public BigDecimal getPower() {
        return power;
    }

    public void setPower(BigDecimal power) {
        this.power = power;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getModel_no() {
        return model_no;
    }

    public void setModel_no(String model_no) {
        this.model_no = model_no;
    }

    public Timestamp getUpdate_timestamp() {
        return update_timestamp;
    }

    public void setUpdate_timestamp(Timestamp update_timestamp) {
        this.update_timestamp = update_timestamp;
    }

    public String getUpdate_user() {
        return update_user;
    }

    public void setUpdate_user(String update_user) {
        this.update_user = update_user;
    }

    public Timestamp getDb_timestamp() {
        return db_timestamp;
    }

    public void setDb_timestamp(Timestamp db_timestamp) {
        this.db_timestamp = db_timestamp;
    }
}
