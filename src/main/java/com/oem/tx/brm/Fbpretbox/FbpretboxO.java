package com.oem.tx.brm.Fbpretbox;

import com.oem.base.tx.BaseO;
import java.util.List;

public class FbpretboxO extends BaseO {

    private Integer tbl_cnt;
    private List<FbpretboxOA> oary;

    public Integer getTbl_cnt() {
        return tbl_cnt;
    }

    public void setTbl_cnt(Integer tbl_cnt) {
        this.tbl_cnt = tbl_cnt;
    }

    public List<FbpretboxOA> getOary() {
        return oary;
    }

    public void setOary(List<FbpretboxOA> oary) {
        this.oary = oary;
    }
}
