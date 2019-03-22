package com.oem.tx.brm.Fbpretlot;

import java.io.File;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

public class FbpretlotIA {
    private int id;
    private String box_no;
    private String oem_id;
    private String lot_no;
    private BigDecimal iv_power;
    private BigDecimal iv_isc;
    private BigDecimal iv_voc;
    private BigDecimal iv_imp;
    private BigDecimal iv_vmp;
    private BigDecimal iv_ff;
    private BigDecimal iv_tmper;
    private String iv_adj_versioni;
    private Timestamp iv_timestamp;
    private File iv_imgFile;
    private String final_grade;
    private String final_power;
    private String final_color;
    private String start_time;
    private String end_time;

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

    public File getIv_imgFile() {
        return iv_imgFile;
    }

    public void setIv_imgFile(File iv_imgFile) {
        this.iv_imgFile = iv_imgFile;
    }

    public String getFinal_grade() {
        return final_grade;
    }

    public void setFinal_grade(String final_grade) {
        this.final_grade = final_grade;
    }

    public String getFinal_power() {
        return final_power;
    }

    public void setFinal_power(String final_power) {
        this.final_power = final_power;
    }

    public String getFinal_color() {
        return final_color;
    }

    public void setFinal_color(String final_color) {
        this.final_color = final_color;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }
}
