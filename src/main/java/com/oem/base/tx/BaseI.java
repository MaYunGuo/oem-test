package com.oem.base.tx;

public class BaseI {
    private String trx_id;
    private String type_id;
    private String evt_usr;
    private String action_flg;

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

    public String getEvt_usr() {
        return evt_usr;
    }

    public void setEvt_usr(String evt_usr) {
        this.evt_usr = evt_usr;
    }

    public String getAction_flg() {
        return action_flg;
    }

    public void setAction_flg(String action_flg) {
        this.action_flg = action_flg;
    }
}
