package com.oem.config;

/**
 * Created by ghost on 2019/3/12.
 */

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * 图片绝对地址与虚拟地址映射
 */

@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

    @Value("${sourcePath}")
    private String sourcePath;
    @Value("${targetPath}")
    private String targetPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        /**
         * @Description: 对文件的路径进行配置,创建一个虚拟路径/Path/** ，即只要在<img src="http://localhost:8088/oem-jn/Path/picName.jpg" />便可以直接引用图片
         *这是图片的物理路径 "file:/+本地图片的地址"
         * @Date： Create in 14:08 2017/12/20
         */   registry.addResourceHandler(targetPath).addResourceLocations(sourcePath);
        super.addResourceHandlers(registry);
    }
}
