package com.oem.util;

import org.apache.log4j.Logger;

public class LogUtils {
	private Logger logger;
	
	public LogUtils(Class clazz){
		logger = Logger.getLogger(clazz);
	}
	
	public void info(String message){
		StackTraceElement ste = new Throwable().getStackTrace()[1];
		logger.info(AppContext.getCurrEventNumber() + " [className:" + ste.getClassName() + "] [Line:" + ste.getLineNumber() + "] "+ message);
	}
	
	public void error(String message){
		StackTraceElement ste = new Throwable().getStackTrace()[1];
		logger.error(AppContext.getCurrEventNumber() + " [className:" + ste.getClassName() + "] [Line:" + ste.getLineNumber() + "] "+ message);
	}

	public void warn(String message){
		StackTraceElement ste = new Throwable().getStackTrace()[1];
		logger.warn(AppContext.getCurrEventNumber() + " [className:" + ste.getClassName() + "] [Line:" + ste.getLineNumber() + "] "+ message);
	}
	
}
