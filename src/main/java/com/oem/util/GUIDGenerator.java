package com.oem.util;


import java.math.BigInteger;
import java.util.UUID;

public class GUIDGenerator {

    /**
     * This is 1 followed by 25 0. This is used to make sure the string generated
     * is always 26 chars long.
     */
    private static final String PADDING_STRING = "0000000000000000000000000";
    public static final String DEFAULT_PADDING_PREFIX = "X";
    private static int TOTAL_GUID_LENGTH = 26;

    /**
     * @return Generate fix lenght 26 char GUID.
     * Currently the using the java GUID Generator based on pseudo random number.
     * The GUID generated by java can be from 22-25 char long, prepending the value with
     * prefix followed by any number of 0s to make the the GUID 26 char long.
     * if the prefix is a white space (trimmable char), then the default prefix X is used.
     */
    public static String generateGUID(char prefix) {

        String prefixStr = (""+ prefix).trim();
        if (prefixStr.equals("")) {
            prefixStr = DEFAULT_PADDING_PREFIX;
        }
        StringBuffer retStr = new StringBuffer(prefixStr + PADDING_STRING);
        String guid = javaGUID();
        int length = guid.length();
        int replaceIdx = TOTAL_GUID_LENGTH - length;
        retStr.replace(replaceIdx, TOTAL_GUID_LENGTH, guid);
        return retStr.toString();
    }


    /**
     * @return Webex String representation of the GUID generated by java.
     * The UUID is represented in Java as 2 long.
     * 2 long are combine to from a 16 byte array, which is then converted into a string by using base36 of the number.
     * The long is considered Big-Endian and the byte array Little-Endian, to do this
     * MSB (most significant bytes) are copied to the begining of the array
     * LSB (least significant bytes) are copied to the end of the array
     * So
     * byte 7 of the MSB is copied as Byte 0 in the array
     * byte 6 of the MSB is copied as Byte 1 in the array
     * ...
     * byte 0 of the MSB is copied as Byte 7 in the array
     * byte 7 of the LSB is copied as Byte 8 in the array
     * byte 6 of the LSB is copied as Byte 9 in the array
     * ...
     * byte 0 of the LSB is copied as Byte 15 in the array
     */
    public static String javaGUID() {
        UUID uuid = UUID.randomUUID();
        long lsb = uuid.getLeastSignificantBits();
        byte bytes[] = new byte[16];
        populateBytes(bytes, 15, lsb);
        long msb = uuid.getMostSignificantBits();
        populateBytes(bytes, 7, msb);

        BigInteger bi = new BigInteger(1, bytes);

        return bi.toString(36).toUpperCase();
    }

    
    public static int javaIntGUID() {
        UUID uuid = UUID.randomUUID();
        long lsb = uuid.getLeastSignificantBits();
        byte bytes[] = new byte[16];
        populateBytes(bytes, 15, lsb);
        long msb = uuid.getMostSignificantBits();
        populateBytes(bytes, 7, msb);

        BigInteger bi = new BigInteger(1, bytes);

        return bi.intValue();
    }
    /**
     * Private method to copy bytes in the reverse endian way.
     */
    private static void populateBytes(byte [] bytes, int startIdx, long lbytes){
        int endIdx = startIdx - 8;
        for (int i = startIdx; i > endIdx; i--) {
            bytes[i] = (byte) (lbytes & 0xFF);
            lbytes = lbytes >> 8;
        }
    }
    
    public static void main(String [] args){
    	System.out.println(GUIDGenerator.javaGUID());
    	System.out.println(GUIDGenerator.javaGUID().length());

    }
}
