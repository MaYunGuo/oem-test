package com.oem.tx.brm.Fbpretbox;

import lombok.Data;

import java.sql.Timestamp;

/**
 * Created by ghosta on 2019/3/8.
 */
@Data
public class ImagePathInfo {
    private int id;
    private String lot_no;
    private String oem_id;
    private String img_ope;
    private String path;
    private Timestamp update_timestamp;
    private String update_user;
    private Timestamp db_timestamp;
}
