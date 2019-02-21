package com.oem.entity;

import com.alibaba.fastjson.annotation.JSONField;


public class BaseEntity {
    @JSONField(name = "dbope_time_d")
    protected Double dbopeTimeD;

    @JSONField(name = "sta_time_d")
    protected Double staTimeD;

    @JSONField(name = "end_time_d")
    protected Double endTimeD;

    @JSONField(name = "pv_unq_seq_id")
    protected String pvUnqSeqId;

    @JSONField(name = "operation")
    protected String operation;

    @JSONField(name = "ope_evt_name")
    protected String opeEvtName;

    @JSONField(name = "ope_evt_node")
    protected String opeEvtNode;

    @JSONField(name = "ope_evt_usr")
    protected String opeEvtUsr;

    @JSONField(name = "ope_evt_no")
    protected String opeEvtNo;

    @JSONField(name = "ope_tbl_name")
    protected String opeTblName;

    public Double getDbopeTimeD() {
        return dbopeTimeD;
    }

    public void setDbopeTimeD(Double dbopeTimeD) {
        this.dbopeTimeD = dbopeTimeD;
    }

    public Double getStaTimeD() {
        return staTimeD;
    }

    public void setStaTimeD(Double staTimeD) {
        this.staTimeD = staTimeD;
    }

    public Double getEndTimeD() {
        return endTimeD;
    }

    public void setEndTimeD(Double endTimeD) {
        this.endTimeD = endTimeD;
    }

    public String getPvUnqSeqId() {
        return pvUnqSeqId;
    }

    public void setPvUnqSeqId(String pvUnqSeqId) {
        this.pvUnqSeqId = pvUnqSeqId;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getOpeEvtName() {
        return opeEvtName;
    }

    public void setOpeEvtName(String opeEvtName) {
        this.opeEvtName = opeEvtName;
    }

    public String getOpeEvtNode() {
        return opeEvtNode;
    }

    public void setOpeEvtNode(String opeEvtNode) {
        this.opeEvtNode = opeEvtNode;
    }

    public String getOpeEvtUsr() {
        return opeEvtUsr;
    }

    public void setOpeEvtUsr(String opeEvtUsr) {
        this.opeEvtUsr = opeEvtUsr;
    }

    public String getOpeTblName() {
        return opeTblName;
    }

    public void setOpeTblName(String opeTblName) {
        this.opeTblName = opeTblName;
    }

    public String getOpeEvtNo() {
        return opeEvtNo;
    }

    public void setOpeEvtNo(String opeEvtNo) {
        this.opeEvtNo = opeEvtNo;
    }
}
