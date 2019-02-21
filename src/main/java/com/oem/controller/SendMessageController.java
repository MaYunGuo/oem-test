package com.oem.controller;

import com.oem.service.ISendMessageService;
import com.oem.util.GUIDGenerator;
import com.oem.util.LogUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class SendMessageController {
	LogUtils logUtils = new LogUtils(SendMessageController.class);

	@Autowired
	private ISendMessageService sendMessageService;

	@RequestMapping("sendMsg.do")
	public String sendMessage(String trxId, String strInMsg,HttpServletRequest request) {
		String evt_no = GUIDGenerator.javaGUID();
		String message = sendMessageService.sendMesage(trxId, evt_no, strInMsg);
		return message;
	}
}
