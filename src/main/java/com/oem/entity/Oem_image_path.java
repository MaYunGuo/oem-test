package com.oem.entity;


import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by ghost on 2019/3/8.
 */

@Entity
public class Oem_image_path  extends BaseEntity implements Serializable{
    @Id
    @Column(name="id")
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    @Column(name="lot_no",length = 32)
    private String lot_no;
    @Column(name="oem_id",length = 32)
    private String oem_id;
    @Column(name="img_ope",length = 32)
    private String img_ope;
    @Column(name="path",length = 32)
    private String path;
    @Column(name="update_timestamp")
    private Timestamp update_timestamp;
    @Column(name="update_user",length = 32)
    private String update_user;
    @Column(name="db_timestamp")
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
