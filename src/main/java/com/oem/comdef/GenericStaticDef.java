package com.oem.comdef;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
public class GenericStaticDef {

    public static String FTP_PATH;

    public static String MODEL_PATH;

    @Value("${oem.ftp_path}")
    public  void setFtpPath(String ftpPath) {
        FTP_PATH = ftpPath;
    }

    @Value("${oem.model_path}")
    public  void setModelPath(String modelPath) {
        MODEL_PATH = modelPath;
    }




}
