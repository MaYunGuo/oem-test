package com.oem.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Bis_user extends BaseEntity implements Serializable {

    @Column(name="UNQ_SEQ_ID",length = 25)
    private String unq_seq_id;

    @Id
    @Column(name="USR_ID", length = 10)
    private String usr_id;

    @Column(name="USR_KEY", length = 20)
    private String usr_key;

    @Column(name="USR_NAME", length = 32)
    private String usr_name;

    @Column(name="USR_TYPE", length = 1)
    private String usr_type; //内部用户:I, 还是代工厂:O

    @Column(name="USR_FTY", length = 5)
    private String usr_fty;  //如果是代工厂用户，用户对应的工厂

    @Column(name="USR_PHONE", length = 11)
    private String usr_phone;

    @Column(name="USR_MAIL", length = 50)
    private String usr_mail;

    @Column(name="ADMIN_FLG", length = 1)
    private String admin_flg; //管理员标识

    @Column(name="VALID_FLG", length = 1)
    private String valid_flg;  //有效标识

    public String getUnq_seq_id() {
        return unq_seq_id;
    }

    public void setUnq_seq_id(String unq_seq_id) {
        this.unq_seq_id = unq_seq_id;
    }

    public String getUsr_id() {
        return usr_id;
    }

    public void setUsr_id(String usr_id) {
        this.usr_id = usr_id;
    }

    public String getUsr_key() {
        return usr_key;
    }


    public void setUsr_key(String usr_key) {
        this.usr_key = usr_key;
    }

    public String getUsr_name() {
        return usr_name;
    }

    public void setUsr_name(String usr_name) {
        this.usr_name = usr_name;
    }

    public String getUsr_type() {
        return usr_type;
    }

    public void setUsr_type(String usr_type) {
        this.usr_type = usr_type;
    }

    public String getUsr_fty() {
        return usr_fty;
    }


    public void setUsr_fty(String usr_fty) {
        this.usr_fty = usr_fty;
    }

    public String getAdmin_flg() {
        return admin_flg;
    }

    public void setAdmin_flg(String admin_flg) {
        this.admin_flg = admin_flg;
    }

    public String getValid_flg() {
        return valid_flg;
    }

    public void setValid_flg(String valid_flg) {
        this.valid_flg = valid_flg;
    }

    public String getUsr_phone() {
        return usr_phone;
    }

    public void setUsr_phone(String usr_phone) {
        this.usr_phone = usr_phone;
    }

    public String getUsr_mail() {
        return usr_mail;
    }

    public void setUsr_mail(String usr_mail) {
        this.usr_mail = usr_mail;
    }
}
