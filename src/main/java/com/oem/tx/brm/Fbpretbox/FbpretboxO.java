package com.oem.tx.brm.Fbpretbox;

import com.oem.base.tx.BaseO;
import lombok.Data;

import java.util.List;

@Data
public class FbpretboxO extends BaseO {

    private Integer tbl_cnt;
    private List<FbpretboxOA> oary;

}
