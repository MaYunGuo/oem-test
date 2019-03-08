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
public class LotInfo {
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
    private String final_power_lvl;
    private String final_color_lvl;
    private Timestamp update_timestamp;
    private String update_user;
    private Timestamp db_timestamp;


    //oem_mtrl_use 扣料信息  根据lot_no 所以可以一对一
    private List<MtrlUseInfo> mtrlUseList;

    //image path  根据lot_no 所以可以一对一
    private ImagePathInfo imagePathList;

}
