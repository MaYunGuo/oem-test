package com.oem.tx.uas.Fupfncmage;

import com.oem.base.tx.BaseI;

import java.util.List;

public class FupfncmageI extends BaseI {

    private List<FupfncmageIA> iaryA;
    private List<FupfncmageIB> iaryB;

    public List<FupfncmageIA> getIaryA() {
        return iaryA;
    }

    public void setIaryA(List<FupfncmageIA> iaryA) {
        this.iaryA = iaryA;
    }

    public List<FupfncmageIB> getIaryB() {
        return iaryB;
    }

    public void setIaryB(List<FupfncmageIB> iaryB) {
        this.iaryB = iaryB;
    }
}
