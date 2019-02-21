package com.oem.util;

import java.io.PrintWriter;
import java.io.StringWriter;

public class StringUtil {

    public static boolean isSpaceCheck(String str) {
        if (null == str || str.length() <= 0 || ("").equals(str)) {
            return true;
        }
        return false;
    }

    public static String stackTraceToString(Exception excp) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw, true);
        excp.printStackTrace(pw);
        pw.flush();
        sw.flush();
        return sw.toString();
    }

    public static String comInt2String(int value, int length) {
        String s = String.valueOf(value);
        if (s.length() > length) {
            throw new RuntimeException("length is too short.");
        } else if (s.length() == length) {
            return s;
        } else {
            char[] cc = new char[length];
            int i = 0;
            for (; i < length - s.length(); i++) {
                cc[i] = '0';
            }
            for (int j=0; j < s.length();i++,j++) {
                // System.out.println(i);
                cc[i] = s.charAt(j);
            }
            return new String(cc);
        }
    }

    public static String comString2String(String s, int length) {
        if (s.length() > length) {
            throw new RuntimeException("length is too short.");
        } else if (s.length() == length) {
            return s;
        } else {
            char[] cc = new char[length];
            int i = 0;
            for (; i < length - s.length(); i++) {
                cc[i] = '0';
            }
            for (int j=0; j < s.length();i++,j++) {
                // System.out.println(i);
                cc[i] = s.charAt(j);
            }
            return new String(cc);
        }
    }
}
