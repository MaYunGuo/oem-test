package com.oem.tx.uas.usermage;

import com.oem.base.tx.BaseI;

import java.util.List;

public class UsermageI extends BaseI {

    private List<UsermageIA> iary;

    public List<UsermageIA> getIary() {
        return iary;
    }

    public void setIary(List<UsermageIA> iary) {
        this.iary = iary;
    }
}
