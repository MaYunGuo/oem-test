package com.oem.tx.uas.Fupfncmage;

import com.oem.base.tx.BaseO;

import java.util.List;

public class FupfncmageO extends BaseO{
    private List<FupfncmageOA> oaryA;
    private List<FupfncmageOB> oaryB;

    public List<FupfncmageOA> getOaryA() {
        return oaryA;
    }

    public void setOaryA(List<FupfncmageOA> oaryA) {
        this.oaryA = oaryA;
    }

    public List<FupfncmageOB> getOaryB() {
        return oaryB;
    }

    public void setOaryB(List<FupfncmageOB> oaryB) {
        this.oaryB = oaryB;
    }
}

