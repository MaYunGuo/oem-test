package com.oem.util;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

    private static Logger logger = LoggerFactory.getLogger(DateUtil.class);
    private static String strMySQLTimeFormat = "yyyy-MM-dd HH:mm:ss";

    public static String getEvtTime() {
        Calendar now = Calendar.getInstance();
        SimpleDateFormat tempDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        String evt_timestamp = tempDate.format(now.getTime());
        return evt_timestamp;
    }

    public static Timestamp getCurrentTimestamp() {
        Calendar now = Calendar.getInstance();
        SimpleDateFormat tempDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String evt_timestamp = tempDate.format(now.getTime());
        Timestamp timestatmp = null;
        try {
            timestatmp = Timestamp.valueOf(evt_timestamp);
        } catch (Exception ex) {
            logger.error(StringUtil.stackTraceToString(ex));
        }
        return timestatmp;
    }

    public static String getEvtTimeforVer() {
        Calendar now = Calendar.getInstance();
        SimpleDateFormat tempDate = new SimpleDateFormat("yyyyMMdd");
        String evt_timestamp = tempDate.format(now.getTime());
        return evt_timestamp;
    }

    public static String getRvTime() {
        Calendar now = Calendar.getInstance();
        SimpleDateFormat tempDate = new SimpleDateFormat("yyyyMMddHHmmss");
        String evt_timestamp = tempDate.format(now.getTime());
        return evt_timestamp;
    }

    public static String getMillisecondTime() {
        Calendar now = Calendar.getInstance();
        SimpleDateFormat tempDate = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String evt_timestamp = tempDate.format(now.getTime());
        return evt_timestamp;
    }

    public static String getMillTimeStr() {
        Calendar now = Calendar.getInstance();
        // SimpleDateFormat tempDate = new
        // SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        SimpleDateFormat tempDate = new SimpleDateFormat(strMySQLTimeFormat);
        String evt_timestamp = tempDate.format(now.getTime());
        return evt_timestamp;
    }

    public static Date getMillTime() {// TODO Need format
        return String2Date(getMillTimeStr());
    }

    public static String formatEvtTime(Calendar calendar) {
        SimpleDateFormat tempDate = new SimpleDateFormat(strMySQLTimeFormat);
        String evt_timestamp = tempDate.format(calendar.getTime());
        return evt_timestamp;
    }

    public static String formatRvTime(Calendar calendar) {
        SimpleDateFormat tempDate = new SimpleDateFormat("yyyyMMddHHmmss");
        String evt_timestamp = tempDate.format(calendar.getTime());
        return evt_timestamp;
    }

    public static Date String2Date(String dateString) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(strMySQLTimeFormat);
            Date date = sdf.parse(dateString);
            return date;
        } catch (ParseException e) {
           logger.info(StringUtil.stackTraceToString(e));
        }
        return null;
    }

    public static Date String2Time(String timeString) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("HH.mm.ss");
            Date date = sdf.parse(timeString);
            return date;
        } catch (ParseException e) {
            logger.info(StringUtil.stackTraceToString(e));
        }
        return null;
    }

    public static Timestamp String2Timestamp(String timeString) {
        try {
            Timestamp timestatmp = Timestamp.valueOf(timeString);
            return timestatmp;
        } catch (Exception ex) {
            logger.error(StringUtil.stackTraceToString(ex));
        }
        return null;
    }

    public static String Date2String(Date date, String strMySQLTimeFormat) {
        SimpleDateFormat sdf = new SimpleDateFormat(strMySQLTimeFormat);
        return sdf.format(date);
    }

    public static Timestamp getSomeTimeAgo(Timestamp timestamp, int min){
        long bf_times = min * 60 * 1000;
        long diff = timestamp.getTime() - bf_times;
        return new Timestamp(diff);
    }

    /**
     * Get time diff value (By min)
     *
     * @param startTime
     * @param endTime
     * @return
     */
    public static long getDiffMin(String startTime, String endTime) {
        long diff;
        long diffMin = 0;
        long nm = 1000 * 60;// 一分钟的毫秒数
        SimpleDateFormat sd = new SimpleDateFormat(strMySQLTimeFormat);
        try {
            // 获得两个时间的毫秒时间差异
            diff = sd.parse(endTime).getTime() - sd.parse(startTime).getTime();
            diffMin = diff / nm;// 计算差多少分钟
        } catch (ParseException ex) {
            logger.error(StringUtil.stackTraceToString(ex));
        }
        return diffMin;
    }

    /**
     * Get time diff value (By min)
     *
     * @param startTime
     * @param endTime
     * @return
     */
    public static long getDiffMin(Timestamp startTime, Timestamp endTime) {
        long diffMin = 0;
        long nm = 1000 * 60;// 一分钟的毫秒数

        long diff = endTime.getTime() - startTime.getTime();
        diffMin = diff / nm;// 计算差多少分钟 //TODO Double

        return diffMin;
    }

    public static long getDiffSec(Timestamp startTime, Timestamp endTime) {
        long diffSec = 0;
        long nm = 1000;//

        long diff = endTime.getTime() - startTime.getTime();
        diffSec = diff / nm;// 计算差多少秒 //TODO Double
        return diffSec;
    }

    public static long getDiffMillisec(Timestamp startTime, Timestamp endTime) {
        long diffMillisec = 0;
        diffMillisec = endTime.getTime() - startTime.getTime();
        return diffMillisec;
    }

    /*****
     * 获取 double类型时间 逻辑混乱，不建议深入研究
     * ******/
    public static Double getDoubleTime() {
        long now = System.currentTimeMillis(); // 微秒级当前时间
        Calendar c = Calendar.getInstance();
        c.setTimeInMillis(now);
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH) + 1;
        int day = c.get(Calendar.DATE);
        // int year = 2013;
        // int month = 10;
        // int day = 27;
        int hour = c.get(Calendar.HOUR_OF_DAY);
        int minute = c.get(Calendar.MINUTE);
        int second = c.get(Calendar.SECOND);
        int millisecond = c.get(Calendar.MILLISECOND);
        // System.out.println("当前微秒级时间:"+System.currentTimeMillis());
        // System.out.println("当前时间: " + c.get(Calendar.YEAR) + "年 "
        // + (c.get(Calendar.MONTH) + 1) + "月 " + c.get(Calendar.DATE)
        // + "日  周" + (c.get(Calendar.DAY_OF_WEEK) - 1) + "  "
        // + c.get(Calendar.HOUR) + "时 " + c.get(Calendar.MINUTE) + "分 "
        // + c.get(Calendar.SECOND) + "秒 " + c.get(Calendar.MILLISECOND)
        // + " 微秒");
        Double days = Double.valueOf("0");// 统计天数
        for (int i = 1900; i < year; i++) {
            days += getDaysByYear(i);
        }
        // System.out.println("passDays :" + days + "\n");
        int[] days_each_month = new int[] { 31, 28, 31, 30, 31, 30, 31, 31, 30,
                31, 30, 31 };
        if (isLeepYear(year)) {
            days_each_month[1] = 29;
        }

        for (int i = 0; i < month - 1; i++) {
            days += days_each_month[i];
        }

        days = days + day + 1;
        // 获取微秒
        // long nanoTime = System.nanoTime();
        // String snonoTime = nanoTime+"";
        // String sMicroSecond = snonoTime.substring(snonoTime.length()-6,
        // snonoTime.length()-3);

        double seconds = hour * 3600 + minute * 60 + second;
        double millSeconds = millisecond + seconds * 1000;// 000
        // +Double.valueOf(sMicroSecond);

        Double d = Double.valueOf(millSeconds / (3600 * 24 * 1000) + "");
        return Double.valueOf(days + d);
    }

    // 获得某年的天数
    private static int getDaysByYear(int year) {
        if (isLeepYear(year)) {
            return 366;
        } else {
            return 365;
        }
    }
    // 判断是否是闰年
    private static boolean isLeepYear(int year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }
}
