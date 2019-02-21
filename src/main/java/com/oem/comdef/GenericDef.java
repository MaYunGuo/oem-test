package com.oem.comdef;

public class GenericDef {
    public static final long _NORMAL = 0;
    public static final long _ERROR = -1;
    public static final String _YES = "Y";
    public static final String _NO = "N";
    public static final String _SPACE = "";




    public static final String TRX_TYPE_IN = "I";
    public static final String TRX_TYPE_OUT = "O";


    public static final String RETURN_CODE_OK = "0000000";
    public static final String RETURN_MESG_OK = "SUCCESS";
    public static final String INVALID_ACTION_FLG ="0000001";
    public static final String RETURN_CODE_UNKNOWN = "9999999";




    public static final char ACTION_FLG_QUERY = 'Q';
    public static final char ACTION_FLG_SEARCH = 'S';
    public static final char ACTION_FLG_UPDATE = 'U';
    public static final char ACTION_FLG_ADD = 'A';
    public static final char ACTION_FLG_DELETE = 'D';
    public static final char ACTION_FLG_INQUIRE = 'I';
    public static final char ACTION_FLG_ADD_NEW_CATE = 'N'; //新增
    public static final char ACTION_FLG_UPDATE_NEW_CATE = 'R'; //更新
    public static final char ACTON_FLG_DELETE_NEW_CATE='C'; //删除












    /**
     * 1. TRX名称
     */
    public static final String TX_USERMAGE = "USERMAGE";
    public static final String TX_FBPBISDATA = "FBPBISDATA";
    public static final String TX_FBPBISFATY = "FBPBISFATY";



    /**
     * 2. service对应错误代码
     */
    public static final long E_USERMAGE = 1000100;
    public static final long E_USERMAGE_INVALID_INPUT = E_USERMAGE + 1;


    public static final long E_FBPBISDATA = 1000200;
    public static final long E_FBPBISDATA_INVALID_INPUT = E_FBPBISDATA + 1;

    public static final long E_FBPBISFATY = 1000300;
    public static final long E_FBPBISFATY_INVALID_INPUT = E_FBPBISDATA + 1;



    /**
     * 3. DB 基本报错
     */
    public static final long E_READ_NOT_FOUND = 2;
    public static final long SQL_OTHER_ERROR = 9;
    public static final long E_ADD_EXIST = 31;
    public static final long E_DELETE_NOT_FOUND = 32;
    public static final long E_UPDATE_NOT_FOUND = 33;
    public static final long E_COMMIT_FAULT = 71;
    public static final long E_ROLLBACK_FAULT = 72;
    public static final long E_GET_NEXT_SEQUENCE_FAIL = 90;


    /**
     * 4.表对应错误代码
     */
    public static final long E_BIS_DATA = 3000100;
    public static final long E_BIS_USER = 3000200;
    public static final long E_BIS_FACTORY = 3000300;




}
