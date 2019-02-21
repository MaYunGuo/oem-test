package com.oem.tx.uas.usermage;

import com.oem.base.tx.BaseO;

import java.util.List;

public class UsermageO extends BaseO {
    private List<UsermageOA> oary;

    public List<UsermageOA> getOary() {
        return oary;
    }

    public void setOary(List<UsermageOA> oary) {
        this.oary = oary;
    }
}
