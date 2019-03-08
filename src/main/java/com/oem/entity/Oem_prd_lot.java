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


}
