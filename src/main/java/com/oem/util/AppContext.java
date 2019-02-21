package com.oem.util;

public class AppContext {
	private static ThreadLocal<String> currServiceName = new ThreadLocal<String>();
	private static ThreadLocal<String> currEventNumber = new ThreadLocal<String>();

	public static String getCurrServiceName() {
		return (String) currServiceName.get();
	}

	public static void setCurrServiceName(String serviceName) {
		currServiceName.set(serviceName);
	}

	public static String getCurrEventNumber() {
		return (String) currEventNumber.get();
	}


	public static void setCurrEventNumber(String eventNo) {
		currEventNumber.set(eventNo);
	}

	public static void clear() {
		currServiceName.set(null);
		currEventNumber.set(null);
	}
}