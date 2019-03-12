package com.oem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource(value={"file:/opt/oem_jn/conf/application.properties"})
@PropertySource(value={"file:/opt/oem_jn/conf/log4j.properties"})
public class OemJnApplication {
    public static void main(String[] args) {
        SpringApplication.run(OemJnApplication.class, args);
    }

}

