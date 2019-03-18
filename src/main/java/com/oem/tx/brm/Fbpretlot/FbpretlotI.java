package com.oem.tx.brm.Fbpretlot;

import com.oem.base.tx.BaseI;
import com.oem.tx.brm.Fbpbisfaty.FbpbisfatyIA;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

public class FbpretlotI extends BaseI {

    private List<FbpretlotIA> iary;

    public List<FbpretlotIA> getIary() {
        return iary;
    }

    public void setIary(List<FbpretlotIA> iary) {
        this.iary = iary;
    }
}
