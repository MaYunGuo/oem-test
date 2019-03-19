package com.oem.tx.brm.Fbpretbox;
import com.oem.entity.Oem_image_path;
import com.oem.entity.Oem_mtrl_use;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by ghost on 2019/3/8.
 */

@Data
public class FbpretboxOB {
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
    private String final_grade;
    private String final_power;
    private String final_color;
    private Timestamp update_timestamp;
    private String update_user;
    private Timestamp db_timestamp;


    //oem_mtrl_use 扣料信息  根据lot_no 所以可以一对一
    private List<MtrlUseInfo> mtrlUseList;

    //image path  根据lot_no 所以可以一对一
    private ImagePathInfo imagePathList;

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

    public List<MtrlUseInfo> getMtrlUseList() {
        return mtrlUseList;
    }

    public void setMtrlUseList(List<MtrlUseInfo> mtrlUseList) {
        this.mtrlUseList = mtrlUseList;
    }

    public ImagePathInfo getImagePathList() {
        return imagePathList;
    }

    public void setImagePathList(ImagePathInfo imagePathList) {
        this.imagePathList = imagePathList;
    }
}
