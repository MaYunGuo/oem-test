package com.oem.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;

import java.util.List;

public class JacksonUtil {
	/**
	 * 将json字符串转换成对象
	 * 
	 * @param jsonString
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> T fromJson(String jsonString, @SuppressWarnings("rawtypes") Class clazz) {
		return (T) JSON.parseObject(jsonString, clazz);
	}

	/**
	 * 将一个 Object 或者List对象转化为JSOObject或者JSONArray
	 * 
	 * @param ObjOrList
	 *            Object 或者List对象 或者hashmap 但是如果是set 就会有问题
	 * @return
	 */
	public static String toJSONStr(Object ObjOrList) {
//		return JSON.toJSONString(ObjOrList);
//		JSON.toJSONStringWithDateFormat(date, "yyyy-MM-dd HH:mm:ss.SSS");
		return JSON.toJSONString(ObjOrList, SerializerFeature.WriteDateUseDateFormat);
	}

	/**
	 * 字符串转list
	 *
	 * @param jsonstr
	 * @param clazz
	 * @return
	 */
	public static List<?> parseToList(String jsonstr, Class<?> clazz) {
		List<?> parseObj = JSON.parseArray(jsonstr, clazz);
		return parseObj;
	}

	public static JSONObject getObjectValue(String key, JSONObject oj) {
		return oj.getJSONObject(key);
	}

	public static boolean getBooleanValue(String key, JSONObject oj) {
		return oj.getBoolean(key);
	}

	public static int getIntValue(String key, JSONObject oj) {
		return oj.getIntValue(key);
	}

	public static String getStringValue(String key, JSONObject oj) {
		return oj.getString(key);
	}

	public static JSONArray getListValue(String key, JSONObject oj) {
		JSONArray str = oj.getJSONArray(key);
		return str;
	}

}
