package com.oem.tx.brm.Fbpretbox;

import com.oem.base.tx.BaseI;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class FbpretboxI extends BaseI {
    private MultipartFile file;
    private String qry_type;
    private List<FbpretboxIA> iary;
}
