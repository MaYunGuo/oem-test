package com.oem.comdef;

public class ReturnBean {
    private Long rtn_code;
    private String rtn_mesg;
    private Object rtn_objt;

    public ReturnBean() {

    }

    public ReturnBean(Long rtn_code, String rtn_mesg) {
        this.rtn_code = rtn_code;
        this.rtn_mesg = rtn_mesg;
    }

    public ReturnBean(Long rtn_code, Object rtn_objt) {
        this.rtn_code = rtn_code;
        this.rtn_objt = rtn_objt;
    }

    public Long getRtn_code() {
        return rtn_code;
    }

    public void setRtn_code(Long rtn_code) {
        this.rtn_code = rtn_code;
    }

    public String getRtn_mesg() {
        return rtn_mesg;
    }

    public void setRtn_mesg(String rtn_mesg) {
        this.rtn_mesg = rtn_mesg;
    }

    public Object getRtn_objt() {
        return rtn_objt;
    }

    public void setRtn_objt(Object rtn_objt) {
        this.rtn_objt = rtn_objt;
    }
}
