package com.oem.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by ghost on 2019/3/8.
 */

@Entity
public class Oem_prd_box extends BaseEntity implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "box_no", length = 32)
    private String box_no;
    @Column(name="oem_id",length = 32)
    private String oem_id;
    @Column(name="oqc_grade",length = 32)
    private String oqc_grade;
    @Column(name="ship_statu",length = 32)
    private String ship_statu;
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

    public String getOqc_grade() {
        return oqc_grade;
    }

    public void setOqc_grade(String oqc_grade) {
        this.oqc_grade = oqc_grade;
    }

    public String getShip_statu() {
        return ship_statu;
    }

    public void setShip_statu(String ship_statu) {
        this.ship_statu = ship_statu;
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
