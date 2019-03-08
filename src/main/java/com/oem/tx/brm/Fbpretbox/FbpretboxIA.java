package com.oem.tx.brm.Fbpretbox;


import lombok.Data;

@Data
public class FbpretboxIA {

    //oem_prd_lot
    private String lot_no;//主键
    private String iv_power;//功率
    private String iv_isc;//ISC
    private String iv_voc;//VOC
    private String iv_imp;//IMP
    private String iv_vmp;//VMP
    private String iv_ff;//FF
    private String iv_tmper;//温度
    private String iv_adj_versioni;//校准版
    private String iv_timestamp;//IV测试时间
    private String final_grade;//等级
    private String final_power_lvl;//功率档
    private String final_color_lvl;//颜色档

    //ret_box
    private String box_no;//主键
    private String oqc_grade;//OQC等级
    private String ship_statu;//出货

    //oem_mtrl_use
//    private String iv_voc;//扣料信息

    //image path
    private String path;//IV/EL3
    private String img_ope;//IV图片/EL3图片





}
