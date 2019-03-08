package com.oem.tx.brm.Fbpretbox;


import lombok.Data;

import java.util.List;

@Data
public class FbpretboxOA {
    private String box_no;
    private String oqc_grade;
    private String ship_statu;

    //oem_prd_lot 根据Box_no 串lot 一对多
    private List<LotInfo> lotList;

}
