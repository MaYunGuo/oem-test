package com.oem.tx.brm.Fbpretmtrl;

import com.oem.base.tx.BaseO;

import java.util.List;

public class FbpretmtrlO extends BaseO {
    private Integer tbl_cnt;
    private List<FbpretmtrlOA> oary;

    public Integer getTbl_cnt() {
        return tbl_cnt;
    }

    public void setTbl_cnt(Integer tbl_cnt) {
        this.tbl_cnt = tbl_cnt;
    }

    public List<FbpretmtrlOA> getOary() {
        return oary;
    }

    public void setOary(List<FbpretmtrlOA> oary) {
        this.oary = oary;
    }
}
