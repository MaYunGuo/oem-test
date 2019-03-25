package com.oem.base.redis;

import org.apache.poi.ss.formula.functions.T;

import java.util.List;

public interface IRedisManager {
    Object getFromRedis(String keyFormat, String key);

    Object getFromRedis(String keyFormat, String key1, String key2);

    boolean setToRedis(String keyFormat, String key, Object value);

    boolean setToReids(String keyFormat, String key, Object value, long expreTime);

    boolean setToReids(String keyFormat, String key1, String key2, Object value);

    boolean setToReids(String keyFormat, String key1, String key2, Object value, long expreTime);


    void delRedis(String keyFormat, String key);

    void delRedis(String keyFormat, String key1, String key2);

    List<Object> getListFromRedis(String keyFormat, String key);

    List<Object> getListFromRedis(String keyFormat, String key1, String key2);

    boolean setListToRedis(String keyFormat, String key, List<Object> objects);

    boolean setListToRedis(String keyFormat, String key, List<Object> objects, long expreTime);

    boolean setListToRedis(String keyFormat, String key1, String key2, List<Object> objects);

    boolean setListToRedis(String keyFormat, String key1, String key2, List<Object> objects, long expreTime);
}
