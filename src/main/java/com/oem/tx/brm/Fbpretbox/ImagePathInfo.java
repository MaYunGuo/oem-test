package com.oem.tx.brm.Fbpretbox;

import lombok.Data;

import java.sql.Timestamp;

/**
 * Created by ghosta on 2019/3/8.
 */
@Data
public class ImagePathInfo {
    private int id;
    private String lot_no;
    private String oem_id;
    private String img_ope;
    private String path;
    private Timestamp update_timestamp;
    private String update_user;
    private Timestamp db_timestamp;

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getImg_ope() {
        return img_ope;
    }

    public void setImg_ope(String img_ope) {
        this.img_ope = img_ope;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
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
