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

}
