package com.oem.tx.brm.Fbpretlot;

import com.oem.base.tx.BaseI;

import java.sql.Timestamp;
import java.util.List;

public class FbpretlotO extends BaseI {
       private List<FbpretlotOA> oary;
       private List<FbpretlotOB> oaryB;

       private String rtn_code;
       private String rtn_mesg;

    public List<FbpretlotOA> getOary() {
        return oary;
    }

    public void setOary(List<FbpretlotOA> oary) {
        this.oary = oary;
    }

    public String getRtn_code() {
        return rtn_code;
    }

    public void setRtn_code(String rtn_code) {
        this.rtn_code = rtn_code;
    }

    public String getRtn_mesg() {
        return rtn_mesg;
    }

    public void setRtn_mesg(String rtn_mesg) {
        this.rtn_mesg = rtn_mesg;
    }

    public List<FbpretlotOB> getOaryB() {
        return oaryB;
    }

    public void setOaryB(List<FbpretlotOB> oaryB) {
        this.oaryB = oaryB;
    }
}
