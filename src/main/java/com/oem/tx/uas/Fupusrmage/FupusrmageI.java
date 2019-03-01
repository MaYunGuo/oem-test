package com.oem.tx.uas.Fupusrmage;

import com.oem.base.tx.BaseI;

import java.util.List;

public class FupusrmageI extends BaseI {

    private List<FupusrmageIA> iaryA;

    private List<FupusrmageIB> iaryB;

    public List<FupusrmageIA> getIaryA() {
        return iaryA;
    }

    public void setIaryA(List<FupusrmageIA> iaryA) {
        this.iaryA = iaryA;
    }

    public List<FupusrmageIB> getIaryB() {
        return iaryB;
    }

    public void setIaryB(List<FupusrmageIB> iaryB) {
        this.iaryB = iaryB;
    }
}
