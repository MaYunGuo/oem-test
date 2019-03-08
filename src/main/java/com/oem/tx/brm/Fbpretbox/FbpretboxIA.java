package com.oem.tx.brm.Fbpretbox;


import com.oem.entity.Oem_image_path;
import com.oem.entity.Oem_mtrl_use;
import com.oem.entity.Oem_prd_lot;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Data
public class FbpretboxIA {

    //ret_box 以Box_no 为主
    private String box_no;//主键
    private String oqc_grade;//OQC等级
    private String ship_statu;//出货

    private String lot_no;

    //oem_prd_lot 根据Box_no 串lot 一对多
    private List<LotInfo> lotList;






}
