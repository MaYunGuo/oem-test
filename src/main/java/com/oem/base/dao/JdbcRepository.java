package com.oem.base.dao;

import com.oem.entity.Oem_prd_lot;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.sql.*;

@Component
public class JdbcRepository {
    @Value("${db.username}")
    private String username;
    @Value("${db.password}")
    private String password;
    @Value("${db.url}")
    private String url;
    @Value("${db.driver}")
    private String driver;


    public Connection getConnection(){
        Connection conn = null;
        try {
            Class.forName(this.driver);
            conn = DriverManager.getConnection(this.url,this.username,this.password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return conn;
    }

    public boolean getOemInfoByLotNo(Connection conn, String lot_no){

        boolean flg = false;
        String sql = "select *from oem_prd_lot where lot_no = '" + lot_no+ "'" ;
        Statement pstmt= null;
        ResultSet rs = null;
        try {
            pstmt = conn.createStatement();
            rs = pstmt.executeQuery(sql);
            while(rs.next()) {
                flg = true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            try {
                pstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return flg;

    }

    public void insertSetting(Oem_prd_lot oem_prd_lot,Connection conn) throws Exception {
        String sql = "INSERT INTO oem_prd_lot(`lot_no`, `box_no`, `oem_id`, `iv_power`, `iv_isc`, `iv_imp`, `iv_vmp`, `iv_voc`, `iv_ff`, `iv_tmper`,`iv_adj_versioni`, `iv_timestamp`, `final_color_lvl`, `final_grade`, `final_power_lvl`,`update_user`,   `update_timestamp`) VALUES (?, NULL , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, ?, ?)";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, oem_prd_lot.getLot_no());
        pstmt.setString(2, oem_prd_lot.getOem_id());
        pstmt.setBigDecimal(3, oem_prd_lot.getIv_power());
        pstmt.setBigDecimal(4, oem_prd_lot.getIv_isc());
        pstmt.setBigDecimal(5, oem_prd_lot.getIv_imp());
        pstmt.setBigDecimal(6, oem_prd_lot.getIv_vmp());
        pstmt.setBigDecimal(7, oem_prd_lot.getIv_voc());
        pstmt.setBigDecimal(8, oem_prd_lot.getIv_ff());
        pstmt.setBigDecimal(9, oem_prd_lot.getIv_tmper());
        pstmt.setString(10,oem_prd_lot.getIv_adj_versioni());
        pstmt.setTimestamp(11, oem_prd_lot.getIv_timestamp());
        pstmt.setString(12, oem_prd_lot.getUpdate_user());
        pstmt.setTimestamp(13, oem_prd_lot.getUpdate_timestamp());
        pstmt.executeUpdate();
        pstmt.close();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }
}
