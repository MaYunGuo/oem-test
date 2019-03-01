package com.oem.tx.uas.Fupfncmage;

import java.util.List;

public class FupfncmageOA {
    private String group_id;
    private String group_name;
    private String system_id;
    private List<String> funcList;

    public String getGroup_id() {
        return group_id;
    }

    public void setGroup_id(String group_id) {
        this.group_id = group_id;
    }

    public String getGroup_name() {
        return group_name;
    }

    public void setGroup_name(String group_name) {
        this.group_name = group_name;
    }

    public String getSystem_id() {
        return system_id;
    }

    public void setSystem_id(String system_id) {
        this.system_id = system_id;
    }

    public List<String> getFuncList() {
        return funcList;
    }

    public void setFuncList(List<String> funcList) {
        this.funcList = funcList;
    }
}
