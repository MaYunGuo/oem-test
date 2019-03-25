package com.oem.tx.brm.Fbpretbox;

import com.oem.base.tx.BaseI;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public class FbpretboxI extends BaseI {
    private MultipartFile file;
    private String qry_type;
    private List<FbpretboxIA> iary;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public String getQry_type() {
        return qry_type;
    }

    public void setQry_type(String qry_type) {
        this.qry_type = qry_type;
    }

    public List<FbpretboxIA> getIary() {
        return iary;
    }

    public void setIary(List<FbpretboxIA> iary) {
        this.iary = iary;
    }
}
