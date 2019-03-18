package com.oem.tx.brm.Fbpretlot;

import com.oem.base.tx.BaseI;
import com.oem.base.tx.BaseO;

import java.sql.Timestamp;
import java.util.List;

public class FbpretlotO extends BaseO {
       private List<FbpretlotOA> oary;
       private List<FbpretlotOB> oaryB;

    public List<FbpretlotOA> getOary() {
        return oary;
    }

    public void setOary(List<FbpretlotOA> oary) {
        this.oary = oary;
    }


    public List<FbpretlotOB> getOaryB() {
        return oaryB;
    }

    public void setOaryB(List<FbpretlotOB> oaryB) {
        this.oaryB = oaryB;
    }
}
