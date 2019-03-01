package com.oem.tx.uas.Fupusrmage;

import com.oem.base.tx.BaseO;

import java.util.List;

public class FupusrmageO extends BaseO {
    private List<FupusrmageOA> oaryA;
    private List<FupusrmageOB> oaryB;

    public List<FupusrmageOA> getOaryA() {
        return oaryA;
    }

    public void setOaryA(List<FupusrmageOA> oaryA) {
        this.oaryA = oaryA;
    }

    public List<FupusrmageOB> getOaryB() {
        return oaryB;
    }

    public void setOaryB(List<FupusrmageOB> oaryB) {
        this.oaryB = oaryB;
    }
}
