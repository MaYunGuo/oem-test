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
@Data
public class Oem_mtrl_use extends BaseEntity implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "lot_no", length = 32)
    private String lot_no;
    @Column(name = "mtrl_no", length = 32)
    private String mtrl_no;
    @Column(name = "oem_id", length = 32)
    private String oem_id;
    @Column(name = "vender", length = 32)
    private String vender;
    @Column(name = "power", precision = 10, scale = 4)
    private BigDecimal power;
    @Column(name = "color", length = 32)
    private String color;
    @Column(name = "model_no", length = 32)
    private String model_no;
    @Column(name = "update_timestamp")
    private Timestamp update_timestamp;
    @Column(name = "update_user", length = 32)
    private String update_user;
    @Column(name = "db_timestamp")
    private Timestamp db_timestamp;

}
