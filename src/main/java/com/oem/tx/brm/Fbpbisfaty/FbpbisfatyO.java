package com.oem.tx.brm.Fbpbisfaty;

import com.oem.base.tx.BaseO;

import java.util.List;

public class FbpbisfatyO extends BaseO {

    private Integer tbl_cnt;
    private List<FbpbisfatyOA> oary;

    public Integer getTbl_cnt() {
        return tbl_cnt;
    }

    public void setTbl_cnt(Integer tbl_cnt) {
        this.tbl_cnt = tbl_cnt;
    }

    public List<FbpbisfatyOA> getOary() {
        return oary;
    }

    public void setOary(List<FbpbisfatyOA> oary) {
        this.oary = oary;
    }
}
