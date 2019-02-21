package com.oem.service;

import com.oem.base.service.IBaseServiceInterface;
import com.oem.util.DateUtil;
import com.oem.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Service("sendMessageService")
public class SendMessageServiceImpl implements ISendMessageService {
	private static Logger logger = LoggerFactory.getLogger(DateUtil.class);
	private static Properties props;
	@Resource
	private ApplicationContext context;

    @PostConstruct
    public void init(){
		InputStream inputStream = null;
		try {
			props = new Properties();
			inputStream = SendMessageServiceImpl.class.getResourceAsStream("/triger.properties");
            props.load(inputStream);
			inputStream.close();
        } catch (IOException e) {
            logger.error(StringUtil.stackTraceToString(e));
			props.clear();
        }
	}

	@Override
	public String sendMesage(String trxId, String evt_no, String inTrx) {
		/**
		 * TODO:此处需要找trx_id和springServiceBean的对应关系 通过properties配置档
		 */
		String springBeanName = props.getProperty(trxId);
		try {
			IBaseServiceInterface icimBaseinterFace = (IBaseServiceInterface) context.getBean(springBeanName);
			String mesage = icimBaseinterFace.subMainProc(evt_no,inTrx);
			return mesage;
		} catch (Exception e) {
			logger.error(StringUtil.stackTraceToString(e));
			return "SendMessage failed!";
		}
	}
}