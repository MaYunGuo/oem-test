package com.oem.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by ghost on 2019/3/8.
 */

@Entity
public class Oem_prd_lot extends BaseEntity implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "box_no", length = 32)
    private String box_no;
    @Column(name = "oem_id", length = 32)
    private String oem_id;
    @Column(name = "lot_no", length = 32)
    private String lot_no;
    @Column(name = "iv_power", precision = 10, scale = 4)
    private BigDecimal iv_power;
    @Column(name = "iv_isc", precision = 10, scale = 4)
    private BigDecimal iv_isc;
    @Column(name = "iv_voc", precision = 10, scale = 4)
    private BigDecimal iv_voc;
    @Column(name = "iv_imp", precision = 10, scale = 4)
    private BigDecimal iv_imp;
    @Column(name = "iv_vmp", precision = 10, scale = 4)
    private BigDecimal iv_vmp;
    @Column(name = "iv_ff", precision = 10, scale = 4)
    private BigDecimal iv_ff;
    @Column(name = "iv_tmper", precision = 10, scale = 4)
    private BigDecimal iv_tmper;
    @Column(name = "iv_adj_versioni", length = 32)
    private String iv_adj_versioni;
    @Column(name = "iv_timestamp")
    private Timestamp iv_timestamp;
    @Column(name = "final_grade", length = 32)
    private String final_grade;
    @Column(name = "final_power_lvl", length = 32)
    private String final_power_lvl;
    @Column(name = "final_color_lvl", length = 32)
    private String final_color_lvl;
    @Column(name = "update_timestamp")
    private Timestamp update_timestamp;
    @Column(name = "update_user", length = 32)
    private String update_user;
    @Column(name = "db_timestamp")
    private Timestamp db_timestamp;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBox_no() {
        return box_no;
    }

    public void setBox_no(String box_no) {
        this.box_no = box_no;
    }

    public String getOem_id() {
        return oem_id;
    }

    public void setOem_id(String oem_id) {
        this.oem_id = oem_id;
    }

    public String getLot_no() {
        return lot_no;
    }

    public void setLot_no(String lot_no) {
        this.lot_no = lot_no;
    }

    public BigDecimal getIv_power() {
        return iv_power;
    }

    public void setIv_power(BigDecimal iv_power) {
        this.iv_power = iv_power;
    }

    public BigDecimal getIv_isc() {
        return iv_isc;
    }

    public void setIv_isc(BigDecimal iv_isc) {
        this.iv_isc = iv_isc;
    }

    public BigDecimal getIv_voc() {
        return iv_voc;
    }

    public void setIv_voc(BigDecimal iv_voc) {
        this.iv_voc = iv_voc;
    }

    public BigDecimal getIv_imp() {
        return iv_imp;
    }

    public void setIv_imp(BigDecimal iv_imp) {
        this.iv_imp = iv_imp;
    }

    public BigDecimal getIv_vmp() {
        return iv_vmp;
    }

    public void setIv_vmp(BigDecimal iv_vmp) {
        this.iv_vmp = iv_vmp;
    }

    public BigDecimal getIv_ff() {
        return iv_ff;
    }

    public void setIv_ff(BigDecimal iv_ff) {
        this.iv_ff = iv_ff;
    }

    public BigDecimal getIv_tmper() {
        return iv_tmper;
    }

    public void setIv_tmper(BigDecimal iv_tmper) {
        this.iv_tmper = iv_tmper;
    }

    public String getIv_adj_versioni() {
        return iv_adj_versioni;
    }

    public void setIv_adj_versioni(String iv_adj_versioni) {
        this.iv_adj_versioni = iv_adj_versioni;
    }

    public Timestamp getIv_timestamp() {
        return iv_timestamp;
    }

    public void setIv_timestamp(Timestamp iv_timestamp) {
        this.iv_timestamp = iv_timestamp;
    }

    public String getFinal_grade() {
        return final_grade;
    }

    public void setFinal_grade(String final_grade) {
        this.final_grade = final_grade;
    }

    public String getFinal_power_lvl() {
        return final_power_lvl;
    }

    public void setFinal_power_lvl(String final_power_lvl) {
        this.final_power_lvl = final_power_lvl;
    }

    public String getFinal_color_lvl() {
        return final_color_lvl;
    }

    public void setFinal_color_lvl(String final_color_lvl) {
        this.final_color_lvl = final_color_lvl;
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
