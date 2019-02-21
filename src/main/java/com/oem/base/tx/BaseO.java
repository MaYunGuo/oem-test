package com.oem.base.tx;

public class BaseO {

    private String trx_id;
    private String type_id;
    private String rtn_code;
    private String rtn_mesg;

    public String getTrx_id() {
        return trx_id;
    }

    public void setTrx_id(String trx_id) {
        this.trx_id = trx_id;
    }

    public String getType_id() {
        return type_id;
    }

    public void setType_id(String type_id) {
        this.type_id = type_id;
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
}
