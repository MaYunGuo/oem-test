package com.oem.controller;

import com.oem.base.tx.BaseO;
import com.oem.dao.IBisFactoryRepository;
import com.oem.dao.IBisUserRepository;
import com.oem.dao.IOemPrdLotRepository;
import com.oem.entity.Bis_user;
import com.oem.entity.Oem_prd_lot;
import com.oem.util.FileUtil;
import com.oem.util.JacksonUtil;
import com.oem.util.LogUtils;
import com.oem.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.Field;
import java.util.List;

import static com.oem.comdef.GenericDef.*;
import static com.oem.comdef.GenericStaticDef.FTP_PATH;

@RestController
public class ImgController {

    private LogUtils logUtils;

    @Autowired
    private IBisUserRepository bisUserRepository;

    @Autowired
    private IOemPrdLotRepository oemPrdLotRepository;

    @RequestMapping("/uploadImg.do")
    public String uploadImg(String usr_id, String img_typ, String lot_no, MultipartFile img_file){

        logUtils = new LogUtils(ImgController.class);

        BaseO baseO = new BaseO();
        Bis_user bis_user = bisUserRepository.get(usr_id);
        if(bis_user == null){
            baseO.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            baseO.setRtn_mesg("没有找到用户[" +usr_id +"]的信息");
            return JacksonUtil.toJSONStr(baseO);
        }
        String usr_faty = bis_user.getUsr_fty();
        if(StringUtil.isSpaceCheck(usr_faty)){
            baseO.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            baseO.setRtn_mesg("用户[" +usr_id +"]没有绑定代工厂信息");
            return JacksonUtil.toJSONStr(baseO);
        }
        String targetFiilePath = FTP_PATH + File.separator + usr_faty + File.separator + "IMAGE" + File.separator + img_typ + File.separator + lot_no + ".jpg";
        try {
            File targeFile = new File(targetFiilePath);
            if(!targeFile.exists()){
                targeFile.createNewFile();
            }
            InputStream inputStream = img_file.getInputStream();
            FileUtil.copyFile(inputStream, targeFile);
        } catch (Exception e) {
            baseO.setRtn_code(E_FBPRETLOT_IMG_UPLOAD_ERR + _SPACE);
            baseO.setRtn_mesg("图片上传失败，原因[" + StringUtil.stackTraceToString(e));
            return JacksonUtil.toJSONStr(baseO);
        }
        baseO.setRtn_code(RETURN_CODE_OK);
        baseO.setRtn_mesg(RETURN_MESG_OK);
        return JacksonUtil.toJSONStr(baseO);
    }

    @RequestMapping("/batchUploadImg.do")
    public String batchUploadImgs(String usr_id, String img_typ, MultipartFile[] img_files){

        logUtils = new LogUtils(ImgController.class);

        BaseO baseO = new BaseO();
        Bis_user bis_user = bisUserRepository.get(usr_id);
        if(bis_user == null){
            baseO.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            baseO.setRtn_mesg("没有找到用户[" +usr_id +"]的信息");
            return JacksonUtil.toJSONStr(baseO);
        }
        String usr_faty = bis_user.getUsr_fty();
        if(StringUtil.isSpaceCheck(usr_faty)){
            baseO.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            baseO.setRtn_mesg("用户[" +usr_id +"]没有绑定代工厂信息");
            return JacksonUtil.toJSONStr(baseO);
        }
        if(img_files.length ==0){
            baseO.setRtn_code(E_BIS_USER + E_READ_NOT_FOUND + _SPACE);
            baseO.setRtn_mesg("请选择要上传的图片或者目录");
            return JacksonUtil.toJSONStr(baseO);
        }
        String targetFiilePath = FTP_PATH + File.separator + usr_faty + File.separator + "IMAGE" + File.separator + img_typ + File.separator;
        String hql ="From Oem_prd_lot where oem_id=?0 and lot_no =?1";
        for(MultipartFile img_file : img_files){
            try {
                String originName = img_file.getOriginalFilename();
                String img_name = originName.substring(0, originName.indexOf("."));
                Oem_prd_lot oem_prd_lot = oemPrdLotRepository.uniqueResult(hql, usr_faty, img_name);
                if(oem_prd_lot == null){
                    baseO.setRtn_code(E_OEM_PRD_LOT + E_READ_NOT_FOUND + _SPACE);
                    baseO.setRtn_mesg("图片[" + img_name +"]对应的批次信息不存在，请确认");
                    return JacksonUtil.toJSONStr(baseO);
                }
                File targeFile = new File(targetFiilePath + img_name +".jpg");
                if(!targeFile.exists()){
                    targeFile.createNewFile();
                }
                InputStream inputStream = img_file.getInputStream();
                FileUtil.copyFile(inputStream, targeFile);
            } catch (Exception e) {
                baseO.setRtn_code(E_FBPRETLOT_IMG_UPLOAD_ERR + _SPACE);
                baseO.setRtn_mesg("图片上传失败，原因[" + StringUtil.stackTraceToString(e));
                return JacksonUtil.toJSONStr(baseO);
            }
        }

        baseO.setRtn_code(RETURN_CODE_OK);
        baseO.setRtn_mesg(RETURN_MESG_OK);
        return JacksonUtil.toJSONStr(baseO);
    }

    @RequestMapping("/checkImg.do")
    public String checkImg(String lot_no, String oem_id, String img_typ ) {
        logUtils = new LogUtils(ImgController.class);
        BaseO baseO = new BaseO();
        String targetFiilePath = FTP_PATH + File.separator + oem_id + File.separator + "IMAGE" + File.separator + img_typ + File.separator + lot_no + ".jpg";
        File file = new File(targetFiilePath);
        if(!file.exists()){
            baseO.setRtn_code(E_IMAGE_ANALY_NOT_FOUND + _SPACE);
            baseO.setRtn_mesg("没有找到批次号[" +lot_no + "]的" + img_typ + "图片");
            return JacksonUtil.toJSONStr(baseO);
        }
        baseO.setRtn_code(RETURN_CODE_OK);
        baseO.setRtn_mesg(targetFiilePath);
        return JacksonUtil.toJSONStr(baseO);
    }
    @RequestMapping("/showImg.do")
    public void showImg(String imgPath, HttpServletResponse response){

        logUtils = new LogUtils(ImgController.class);

        FileInputStream inputStream = null;
        OutputStream out= null;
        try {
            inputStream = new FileInputStream(imgPath);
            int i = inputStream.available();
            //byte数组用于存放图片字节数据
            byte[] buff = new byte[i];
            inputStream.read(buff);
            //记得关闭输入流
            inputStream.close();
            //设置发送到客户端的响应内容类型
            response.setContentType("image/*");
            out = response.getOutputStream();
            out.write(buff);
            //关闭响应输出流
            out.close();
        } catch (Exception e) {
            logUtils.info("图片显示异常,原因[" + StringUtil.stackTraceToString(e));
        }
    }
}
