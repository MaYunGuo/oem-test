package com.oem.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by ghost on 2019/3/8.
 */

@Entity
@Data
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


}
