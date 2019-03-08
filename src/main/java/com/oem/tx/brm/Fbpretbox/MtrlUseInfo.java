package com.oem.tx.brm.Fbpretbox;

import com.oem.entity.Oem_image_path;
import com.oem.entity.Oem_mtrl_use;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by ghost on 2019/3/8.
 */
@Data
public class MtrlUseInfo {
    private String id;
    private String lot_no;
    private String mtrl_no;
    private String oem_id;
    private String vender;
    private BigDecimal power;
    private String color;
    private String model_no;
    private Timestamp update_timestamp;
    private String update_user;
    private Timestamp db_timestamp;

}
