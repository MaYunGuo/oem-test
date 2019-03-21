package com.oem.comdef;

import org.springframework.beans.factory.annotation.Value;

public class GenericDef {

    public static final long _NORMAL = 0;
    public static final long _ERROR = -1;
    public static final String _YES = "Y";
    public static final String _NO = "N";
    public static final String _SPACE = "";




    public static final String TRX_TYPE_IN = "I";
    public static final String TRX_TYPE_OUT = "O";

    public static final String QUARTZ_GROUP_IV = "QUARTZ_GROUP_IV";
    public static final String QUARTZ_GROUP_FIN = "QUARTZ_GROUP_FIN";
    public static final String QUARTZ_GROUP_PACK = "QUARTZ_GROUP_PACK";
    public static final String QUARTZ_GROUP_MTRL = "QUARTZ_GROUP_MTRL";


    public static final String RETURN_CODE_OK = "0000000";
    public static final String RETURN_MESG_OK = "SUCCESS";
    public static final String INVALID_ACTION_FLG ="0000001";
    public static final String RETURN_CODE_UNKNOWN = "9999999";




    public static final char ACTION_FLG_QUERY = 'Q';
    public static final char ACTION_FLG_UPDATE = 'U';
    public static final char ACTION_FLG_MODIFY = 'M';
    public static final char ACTION_FLG_ADD = 'A';
    public static final char ACTION_FLG_DELETE = 'D';
    public static final char ACTION_FLG_REMOVE = 'R';
    public static final char ACTION_FLG_INQUIRE = 'I';
    public static final char ACTION_FLG_ADD_NEW_CATE = 'N'; //新增
    public static final char ACTION_FLG_UPDATE_NEW_CATE = 'R'; //更新
    public static final char ACTON_FLG_DELETE_NEW_CATE='C'; //删除
    public static final char ACTION_FLG_CREAT = 'C';
    public static final char ACTION_FLG_BIND ='B';
    public static final char ACTION_FLG_PACK = 'P';
    public static final char ACTION_FLG_SHIP = 'S';
    public static final char ACTION_FLG_OQC = 'O';













    /**
     * 1. TRX名称
     */
    public static final String TX_FUPUSRMAGE = "FUPUSRMAGE";
    public static final String TX_FUPFNCMAGE = "FUPFNCMAGE";
    public static final String TX_FBPBISDATA = "FBPBISDATA";
    public static final String TX_FBPBISFATY = "FBPBISFATY";
    public static final String TX_FBPRETMTRL = "FBPRETMTRL";
    public static final String TX_FBPRETBOX = "FBPRETBOX";
    public static final String TX_FBPRETLOT = "FBPRETLOT";



    /**
     * 2. service对应错误代码
     */
    public static final long E_FUPUSRMAGE = 1000100;
    public static final long E_FUPUSRMAGE_INVALID_INPUT = E_FUPUSRMAGE + 1;


    public static final long E_FBPBISDATA = 1000200;
    public static final long E_FBPBISDATA_INVALID_INPUT = E_FBPBISDATA + 1;

    public static final long E_FBPBISFATY = 1000300;
    public static final long E_FBPBISFATY_INVALID_INPUT = E_FBPBISFATY + 1;

    public static final long E_FUPFNCMAGE = 1000400;
    public static final long E_FUPFNCMAGE_INVALID_INPUT = E_FUPFNCMAGE + 1;

    public static final long E_FBPRETLOT = 1000500;
    public static final long E_FBPRETLOT_IMG_UPLOAD_ERR = E_FBPRETLOT + 1;
    public static final long E_FBPRETLOT_LOT_HAVE_PACKED = E_FBPRETLOT + 2;

    public static final long E_FBTRETBOX = 1000600;
    public static final long E_FBPRETBOX_INVALID_INPUT = E_FBTRETBOX + 1;
    public static final long E_FBPRETBOX_BOX_HAD_SHIPED = E_FBTRETBOX + 2;

    public static final long E_FBPRETMTRL = 1000700;
    public static final long E_FBPRETMTRL_INVALID_INPUT = E_FBPRETMTRL + 1;



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
    public static final long E_BIS_FUNC_GRP = 3000400;
    public static final long E_BIS_FUNC_CODE = 3000500;
    public static final long E_BIS_GRP_FUNC = 3000600;
    public static final long E_BIS_USR_GRP = 3000700;
    public static final long E_OEM_PRD_LOT = 3000800;
    public static final long E_OEM_PRD_BOX = 3000900;
    public static final long E_OEM_MTRL_USE = 3001000;










    public static final long E_EXCEL_ANALY = 4000100;
    public static final long E_EXCEL_ANALY_CAN_NOT_GET_WORKBOOK = E_EXCEL_ANALY +1;
    public static final long E_EXCEL_ANALY_EXCEL_IS_EMPTY = E_EXCEL_ANALY +2;


    public static final long E_IMAGE_ANALY = 5000100;
    public static final long E_IMAGE_ANALY_NOT_FOUND =  E_IMAGE_ANALY + 1;




}
