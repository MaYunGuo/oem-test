package com.oem.tx.brm.Fbpbisdata;

import com.oem.base.tx.BaseI;

import java.util.List;

public class FbpbisdataI extends BaseI {

    private List<FbpbisdataIA> iary;

    public List<FbpbisdataIA> getIary() {
        return iary;
    }

    public void setIary(List<FbpbisdataIA> iary) {
        this.iary = iary;
    }
}
