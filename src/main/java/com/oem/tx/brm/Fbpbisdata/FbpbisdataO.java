package com.oem.tx.brm.Fbpbisdata;

import com.oem.base.tx.BaseO;

import java.util.List;

public class FbpbisdataO extends BaseO {

    private Integer tbl_cnt;
    private List<FbpbisdataOA> oary;


    public Integer getTbl_cnt() {
        return tbl_cnt;
    }

    public void setTbl_cnt(Integer tbl_cnt) {
        this.tbl_cnt = tbl_cnt;
    }

    public List<FbpbisdataOA> getOary() {
        return oary;
    }

    public void setOary(List<FbpbisdataOA> oary) {
        this.oary = oary;
    }
}
