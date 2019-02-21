var _NORMAL ="0000000";

/*Trx Name*/
var T_FBPBISDAT = "FBPBISDAT";
var T_FBPBOXMAG = "FBPBOXMAG";
var T_FBPBISOPE = "FBPBISOPE";


/*hot key code */
var ENT_KEY=13;
var F1_KEY =112;
var F2_KEY =113;
var F3_KEY =114;
var F4_KEY =115;
var F5_KEY =116;
var F6_KEY =117;
var F7_KEY =118;
var F8_KEY =119;
var F9_KEY =120;
var F10_KEY=121;
var F11_KEY=122;
var F12_KEY=123;

/**
 * buuton--function code
 * @author CMJ
 */
var AuthObj = {
//    p_1100_f6_btn: "F_1100_RELEASE_PRD",
//	p_1100_f8_btn: "F_1100_ASSIGN_PRD",
    p_1100_query_btn: "F_1100_QUERY",
    p_1100_save_btn: "F_1100_SAVE",

    p_1200_query_btn: "F_1200_QUERY",
    p_1200_moveIn_cancel_btn: "F_1200_MOVEIN_CANCEL",

    p_1300_query_btn: "F_1300_QUERY",
    p_1300_save_btn: "F_1300_SAVE",
    p_1300_clear_btn: "F_1300_CLEAR",

    p_1400_query_btn: "F_1400_QUERY",
    p_1400_save_btn: "F_1400_SAVE",
    p_1400_clear_btn: "F_1400_CLEAR",
    p_1400_cancel_btn: "F_1400_CANCEL",

    p_1600_login_btn: "F_1600_LOGIN",
    p_1600_reg_btn: "F_1600_REG",
    p_1600_logof_btn: "F_1600_LOGOF",
    p_1600_query_btn: "F_1600_QUERY",

    p_1700_query_btn: "F_1700_QUERY",
    p_1700_save_btn: "F_1700_SAVE",
    p_1700_clear_btn: "F_1700_CLEAR",
    p_1700_clean_box_btn: "F_1700_CLEAR_BOX",

    p_1800_query_btn: "F_1800_QUERY",
    p_1800_save_btn: "F_1800_SAVE",
    p_1800_clear_btn: "F_1800_CLEAR",

    p_1900_query_btn: "F_1900_QUERY",
    p_1900_register_btn: "F_1900_REGISTER",
    p_1900_clear_btn: "F_1900_CLEAR",

    p_1A00_query_btn: "F_1A00_QUERY",
    p_1A00_save_btn: "F_1A00_SAVE",
    p_1A00_clear_btn: "F_1A00_CLEAR",

    p_1B00_move_out_btn:"F_1B00_MOVE_OUT",
    p_1B00_clean_btn:"F_1B00_CLEAR",

    p_1C00_query_btn:"F_1C00_QUERY",
    p_1C00_pack_btn:"F_1C00_PACK",
    p_1C00_cancel_btn:"F_1C00_CANCEL",
    p_1C00_cancel_whole_btn:"F_1C00_WHOLE",
    p_1C00_clean_btn:"F_1C00_CLEAR",

    p_1D10_move_out_btn:"F_1D10_MOVE_OUT",
    p_1D10_clean_btn:"F_1D10_CLEAR",


    p_2100_query_btn: "F_2100_QUERY",
    p_2100_save_btn: "F_2100_SAVE",
    p_2100_savea_btn: "F_2100_SAVEA",

    p_2200_scrapped_btn: "F_2200_SCRAPPED",
    p_2200_cancel_btn: "F_2200_CANCEL",
    p_2200_clear_btn: "F_2200_CLEAR",
    p_2200_addRsn_btn: "F_2200_ADDRSN",
    p_2200_delRsn_btn: "F_2200_DELRSN",
    p_2200_delete_btn: "F_2200_DELETE",


    p_2400_query_btn: "F_2400_QUERY",
    p_2400_selectReason_btn: "F_2400_SELECTREASON",
    p_2400_hold_btn: "F_2400_HOLD",
    p_2400_release_btn: "F_2400_RELEASE",
    p_2400_upload_btn: "F_2400_UPLOAD",
    p_2400_select_file: "F_2400_SELECT",

    p_2500_query_btn: "F_2500_QUERY",
    p_2500_skip_btn: "F_2500_SKIP",

    p_2600_query_btn:"F_2600_QUERY",
    p_2600_into_btn:"F_2600_INTO",
    p_2600_return_btn:"F_2600_RETURN",
    p_2600_refresh_btn:"F_2600_REFRESH",

    p_2700_query_btn:"F_2700_QUERY",
    p_2700_register_btn:"F_2700_REGISTER",
    p_2700_clean_btn:"F_2700_CLEAR",

    p_2800_reser_list:"F_2800_RESER_LIST",
    p_2800_login_btn:"F_2800_LOGIN",
    p_2800_active_btn:"F_2800_ACTIVE",
    p_2800_remove_btn:"F_2800_REMOVE",


    p_2A00_query_btn:"F_2A00_QUREY",
    p_2A00_selectReason_btn:"F_2A00_SELECT_REASON",
    p_2A00_deleteReason_btn:"F_2A00_DELETE_REASON",
    p_2A00_updateLev_btn:"F_2A00_UPDATE",
    p_2A00_save_btn:"F_2A00_SAVE",

    p_2B00_query_btn:"F_2B00_QUERY",

    p_2C00_reWork_btn:"F_2C00_REWORK",
    p_2C00_delReWork_btn:"F_2C00_DEL_REWORK",
    p_2C00_stopReWork_btn:"F_2C00_STOP_REWORK",
    p_2C00_selectReason_btn:"F_2C00_SELECT_REASON",
    p_2C00_deleteReason_btn:"F_2C00_DELETE_REASON",
    p_2C00_query_btn:"F_2C00_QUERY",

    p_2D00_query_btn:"F_2D00_QUERY",
    p_2D00_save_btn:"F_2D00_SAVE",
    p_2D00_del_btn:"F_2D00_DEL",
    p_2D00_active_btn:"F_2D00_ACTIVE",

    p_2E00_print_btn:"F_2E00_PRINT",

    p_3E00_query_btn:"F_3E00_QUERY",
    p_3E00_register_btn:"F_3E00_REGISTER",
    p_3E00_clean_btn:"F_3E00_CLEAN",

    p_3100_tool_trns_btn:"F_3100_TRNS",
    p_3100_tool_lock_btn:"F_3100_LOCK",
    p_3100_tool_unlock_btn:"F_3100_UNLOCK",
    p_3100_tool_hold_btn:"F_3100_HOLD",
    p_3100_tool_unhold_btn:"F_3100_UNHOLD",
    p_3100_tool_remark_btn:"F_3100_REMARK",
    p_3100_query_tool_his_btn:"F_3100_QUERY",

    p_3120_query_btn : "F_3120_QUERY",
    p_3120_save_btn : "F_3120_SAVE",

    p_3300_query_btn:"F_3300_QUERY",
    p_3300_register_btn:"F_3300_REGISTER",
    p_3300_update_btn:"F_3300_UPDATE",
    p_3300_clear_btn:"F_3300_CLEAR",
    p_3300_cancel_btn:"F_3300_CANCEL",

    p_3400_query_btn:"F_3400_QUERY",

    p_3510_query_btn:"F_3510_QUERY",
    p_3510_add_btn : "F_3510_ADD",
    p_3510_save_btn:"F_3510_SAVE",
    p_3510_del_btn:"F_3510_DEL",
    p_3510_import_btn:"F_3510_IMPORT",
    p_3510_download_btn:"F_3510_DOWNLOAD",
    p_3510_output_btn : "F_3510_OUT_PUT",

    p_3520_query_btn:"F_3520_QUERY",
    p_3520_add_btn:"F_3520_ADD",
    p_3520_update_btn:"F_3520_UPDATE",
    p_3520_del_btn:"F_3520_DEL",
    p_3520_save_btn:"F_3520_SAVE",
    p_3520_sure_btn : "F_3520_SURE",

    p_3530_query_btn:"F_3530_QUERY",
    p_3530_save_btn:"F_3530_SAVE",
    p_3530_agree_btn : "F_3530_AGREE",
    p_3530_refuse_btn : "F_3530_REFUSE",
    p_3530_return_btn : "F_3530_RETURN",
    p_3530_output_btn : "F_3530_OUTPUT",

    p_3540_query_btn : "F_3540_QUERY",
    p_3540_output_btn : "F_3540_OUTPUT",

    p_3600_query_btn:"F_3600_QUERY",
    p_3600_add_btn:"F_3600_ADD",
    p_3600_update_btn:"F_3600_UPDATE",
    p_3600_del_btn:"F_3600_DEL",
    p_3600_commit_btn:"F_3600_COMMIT",

    p_3610_query_btn:"F_3610_QUERY",
    p_3610_output_btn:"F_3610_OUTPUT",

    p_3710_add_btn:"F_3710_ADD",
    p_3710_save_btn:"F_3710_SAVE",
    p_3710_import_btn:"F_3710_IMPORT",
    p_3710_export_btn:"F_3710_EXPORT",
    p_3710_download_btn:"F_3710_DOWNLOAD",

    p_3720_query_btn:"F_3720_QUERY",
    p_3720_add_btn:"F_3720_ADD",
    p_3720_import_btn:"F_3720_IMPORT",
    p_3720_download_btn:"F_3720_DOWNLOAD",
    p_3720_save_btn:"F_3720_SAVE",

    p_3730_query_btn:"F_3730_QUERY",

    p_3740_save_btn:"F_3740_SAVE",

    p_3750_query_btn:"F_3750_QUERY",
    p_3750_output_btn:"F_3750_OUTPUT",

    p_3800_query_btn:"F_3800_QUERY",
    p_3800_mount_btn:"F_3800_MOUNT",
    p_3800_unmount_btn:"F_3800_UNMOUNT",
    p_3800_active_btn:"F_3800_ACTIVE",

    p_3900_query_btn:"F_3900_QUERY",
    p_3900_add_btn:"F_3900_ADD",
    p_3900_save_btn:"F_3900_SAVE",
    p_3900_delete_btn:"F_3900_DELETE",

    p_3S10_add_btn:"F_3S10_ADD",
    p_3S10_save_btn:"F_3S10_SAVE",
    p_3S10_import_btn:"F_3S10_IMPORT",
    p_3S10_export_btn:"F_3S10_EXPORT",
    p_3S10_download_btn:"F_3S10_DOWNLOAD",

    p_3S20_query_btn:"F_3S20_QUERY",
    p_3S20_add_btn:"F_3S20_ADD",
    p_3S20_import_btn:"F_3S20_IMPORT",
    p_3S20_download_btn:"F_3S20_DOWNLOAD",
    p_3S20_save_btn:"F_3S20_SAVE",

    p_3S30_query_btn:"F_3S30_QUERY",
    p_3S30_excute_btn:"F_3S30_EXCUTE",
    p_3S30_save_btn:"F_3S30_SAVE",
    p_3S30_add_tool_btn:"F_3S30_ADD_TOOL",
    p_3S30_del_tool_btn:"F_3S30_DEL_TOOL",
    p_3S30_saveToolIns_btn:"F_3S30_SAVE_TOOL_INS",

    p_3S40_query_btn:"F_3S40_QUERY",
    p_3S40_output_btn:"F_3S40_OUTPUT",

    p_R100_query_btn:"F_R100_QUERY",
    p_R100_update_btn:"F_R100_UPDATE",
    p_R100_del_btn:"F_R100_DEL",
    p_R100_save_btn:"F_R100_SAVE",
    p_R100_repair_btn:"F_R100_REPAIR",
    p_R100_comp_btn:"F_R100_COMP",
    p_R100_changeRepair_btn:"F_R100_CHANGE_REPAIR",
    p_R100_clear_btn : "F_R100_CLEAR",
    p_R100_check_btn : "F_R100_CHECK",
    p_R100_printRepair_btn :"F_R100_PRINT",

    p_R200_query_btn:"F_R200_QUERY",
    p_R200_output_btn:"F_R200_OUTPUT",

    p_4100_query_btn:"F_4100_QUERY",
    p_4100_save_btn:"F_4100_SAVE",
    p_4100_del_btn:"F_4100_DELETE",
    p_4100_import_btn:"F_4100_IMPORT",
    p_4100_download_btn:"F_4100_DOWNLOAD",

    p_4900_save_btn:"F_4900_SAVE",
    p_4900_cancel_btn:"F_4900_CANCEL",

    p_4A00_import_btn:"F_4A00_IMPORT",
    p_4A00_save_btn:"F_4A00_SAVE",


    p_5100_query_btn:"F_5100_QUERY_SO",
    p_5100_save_btn:"F_5100_SAVE_SO",
    p_5100_update_btn:"F_5100_UPDATE_SO",
    p_5100_del_btn:"F_5100_DEL_SO",
    p_5100_clear_btn:"F_5100_CLEAR_SO",

    p_5200_query_btn:"F_5200_QUERY_WO",
    p_5200_save_btn:"F_5200_SAVE_WO",
    p_5200_update_btn:"F_5200_UPDATE_WO",
    p_5200_del_btn:"F_5200_DEL_WO",
    p_5200_clear_btn:"F_5200_CLEAR_WO",
    p_5200_bind_btn:"F_5200_BIND_WO",

	p_6100_query_btn:"F_6100_QUERY",
    p_6100_add_btn:"F_6100_ADD",
    p_6100_update_btn:"F_6100_UPDATE",
    p_6100_copy_btn:"F_6100_COPY",
    p_6100_delete_btn:"F_6100_DELETE",
    p_6100_save_btn:"F_6100_SAVE",
    p_6100_rollback_btn:"F_6100_ROLLBACK",
    p_6100_clear_btn:"F_6100_CLEAR",
    p_6100_ok_btn:"F_6100_OK",
    p_6100_hold_btn:"F_6100_HOLD",
    p_6100_add_pathItem_btn:"F_6100_ADD_PATHITEM",

    p_6100_upd_pathItem_btn:"F_6100_UPD_PATHITEM",
    p_6100_del_pathItem_btn:"F_6100_DEL_PATHITEM",

    p_6300_query_btn:"F_6300_QUERY",
	p_6300_add_btn:"F_6300_ADD_DATA",
	p_6300_addDataCate_btn:"F_6300_ADD_DATA_CATE",
    p_6300_updateDataCate_btn:"F_6300_UPDATE_DATA_CATE",
	p_6300_deleteDataCate_btn:"F_6300_DELETE_DATA_CATE",

    p_6400_query_btn:"F_6400_QUERY",
    p_6400_delete_btn:"F_6400_DELETE",
    p_6400_add_btn:"F_6400_ADD",
    p_6400_update_btn:"F_6400_UPDATE",
    p_6400_copy_btn:"F_6400_COPY",
    p_6400_save_btn:"F_6400_SAVE",
    p_6400_rollback_btn:"F_6400_ROLLBACK",
    p_6400_clear_btn:"F_6400_CLEAR",

    p_6500_query_btn:"F_6500_QUERY",
    p_6500_delete_btn:"F_6500_DELETE",
    p_6500_add_btn:"F_6500_ADD",
    p_6500_update_btn:"F_6500_UPDATE",
    p_6500_copy_btn:"F_6500_COPY",
    p_6500_save_btn:"F_6500_SAVE",
    p_6500_rollback_btn:"F_6500_ROLLBACK",
    p_6500_clear_btn:"F_6500_CLEAR",

    p_6700_query_btn:"F_6700_QUERY",
    p_6700_add_btn:"F_6700_ADD",
    p_6700_update_btn:"F_6700_UPDATE",
    p_6700_copy_btn:"F_6700_COPY",
    p_6700_delete_btn:"F_6700_DELETE",
    p_6700_save_btn:"F_6700_SAVE",
    p_6700_rollback_btn:"F_6700_ROLLBACK",
    p_6700_clear_btn:"F_6700_CLEAR",

    p_6800_query_btn:"F_6800_QUERY",
    p_6800_delete_btn:"F_6800_DELETE",
    p_6800_add_btn:"F_6800_ADD",
    p_6800_update_btn:"F_6800_UPDATE",
    p_6800_copy_btn:"F_6800_COPY",
    p_6800_save_btn:"F_6800_SAVE",
    p_6800_rollback_btn:"F_6800_ROLLBACK",
    p_6800_clear_btn:"F_6800_CLEAR",

    p_6900_query_btn:"F_6900_QUERY",
    p_6900_del_btn:"F_6900_DELETE",
    p_6900_add_btn:"F_6900_ADD",
    p_6900_update_btn:"F_6900_UPDATE",
    p_6900_copy_btn:"F_6900_COPY",
    p_6900_save_btn:"F_6900_SAVE",
    p_6900_rollback_btn:"F_6900_ROLLBACK",
    p_6900_clear_btn:"F_6900_CLEAR",
    p_6900_add_PamItem_btn:"F_6900_ADD_PAMITEM",
    p_6900_upd_PamItem_btn:"F_6900_UPD_PAMITEM",
    p_6900_del_PamItem_btn:"F_6900_DEL_PAMITEM",

    p_6A00_query_btn:"F_6A00_QUERY",
    p_6A00_del_btn:"F_6A00_DELETE",
    p_6A00_add_btn:"F_6A00_ADD",
    p_6A00_save_btn:"F_6A00_SAVE",
    p_6A00_clear_btn:"F_6A00_CLEAR",
    p_6A00_add_bisMItem_btn:"F_6A00_ADD_BISMITEM",
    p_6A00_upd_bisMItem_btn:"F_6A00_UPD_BISMITEM",
    p_6A00_del_bisMItem_btn:"F_6A00_DEL_BISMITEM",
    p_6A00_save_bisMItem_btn:"F_6A00_SAVE_BISMITEM",

    p_6E00_query_btn:"F_6A00_QUERY",
    p_6E00_del_btn:"F_6A00_DELETE",
    p_6E00_add_btn:"F_6A00_ADD",
    p_6E00_save_btn:"F_6A00_SAVE",
    p_6E00_clear_btn:"F_6A00_CLEAR",
    p_6E00_add_bisMItem_btn:"F_6A00_ADD_BISMITEM",
    p_6E00_upd_bisMItem_btn:"F_6A00_UPD_BISMITEM",
    p_6E00_del_bisMItem_btn:"F_6A00_DEL_BISMITEM",
    p_6E00_save_bisMItem_btn:"F_6A00_SAVE_BISMITEM",
    p_6E00_import_btn: "F_6E00_IMPORT",
    p_6E00_export_btn: "F_6E00_EXPORT",
    p_6E00_download_btn: "F_6E00_DOWNLOAD",

    p_6C00_query_btn:"F_6C00_QUERY",
    p_6C00_add_btn:"F_6C00_ADD",
    p_6C00_update_btn:"F_6C00_UPDATE",
    p_6C00_copy_btn:"F_6C00_COPY",
    p_6C00_delete_btn:"F_6C00_DELETE",
    p_6C00_save_btn:"F_6C00_SAVE",
    p_6C00_rollback_btn:"F_6C00_ROLLBACK",
    p_6C00_clear_btn:"F_6C00_CLEAR",

    p_7100_f1_query_btn:"F_7100_QUERY",
    p_7100_f4_del_btn:"F_7100_DELETE",
    p_7100_f6_add_btn:"F_7100_ADD",
    p_7100_f5_upd_btn:"F_7100_UPDATE",

    p_7200_f8_btn:"F_7200_REPORT",
    p_7200_clear_btn:"F_7200_CLEAR",

    p_7300_f1_btn:"F_7300_QUERY",
    p_7300_f2_filter_btn:"F_7300_FILTER",
    p_7300_f3_refresh_btn:"F_7300_REFRESH",
    p_7300_f5_btn:"F_7300_F5",
    p_7300_f10_btn:"F_7300_F10",
    p_7300_f11_btn:"F_7300_FLL",
    p_7300_f12_btn:"F_7300_F12",
    p_7300_analysis_btn:"F_7300_ANALYSLS",

    p_7400_query_btn : "F_7400_QUERY",
    p_7400_output_btn : "F_7400_EXPORT",

    p_7500_query_btn : "F_7500_QUERY",
    p_7500_agent_btn : "F_7500_PROXY",
    p_7500_handle_btn : "F_7500_DEAL",
    p_7500_clear_btn : "F_7500_EMPTY",

    p_7600_save_btn : "F_7600_SAVE",

    p_9100_queryBox_btn:"F_9100_QUERY",
    p_9100_prdHisLog_btn:"F_9100_HISLOG",

    p_9200_query_btn:"F_9200_QUERY",
    p_9200_export_btn:"F_9200_EXPORT",

    p_9300_query_btn:"F_9300_QUERY",

    p_9400_query_btn:"F_9400_QUERY",

    p_9500_query_btn:"F_9500_QUERY",

    p_9500_query_btn:"F_9600_QUERY",


    p_A100_query_btn:"F_A100_QUERY",
    p_A100_rtn_pwd_btn:"F_A100_REN_PWD",
    p_A100_registe_btn:"F_A100_REGISTE",
    p_A100_save_btn:"F_A100_SAVE",

    p_A200_query_btn:"F_A200_QUERY",
    p_A200_delete_btn :"F_A200_DELETE",
    p_A200_update_btn:"F_A200_UPDATE",
    p_A200_add_btn:"F_A200_ADD",
    p_A200_register_btn:"F_A200_REGISTER",

    p_A300_query_btn:"F_A300_QUERY",
    p_A300_register_btn:"F_A300_REGISTER",

    p_A400_query_btn:"F_A400_QUERY",
    p_A400_registe_btn :"F_A400_REGISTE",
    p_A400_addGrp_btn:"F_A400_ADDGRP",
    p_A400_delete_btn:"F_A400_DELETE",
    p_A400_update_btn:"F_A400_UPDATE",


//	p_6400_f4_del_btn:"F_6400_DELEE_MDL",
//	p_6400_f5_upd_btn:"F_6400_UPDATE_MDL",
//	p_6400_f6_add_btn:"F_6400_ADD_MDL",
//	p_6400_f9_save_btn:"F_6400_SAVE_DML",
//	p_6500_f4_del_btn:"F_6500_DELETE_OPE",
//	p_6500_f9_save_btn:"F_6500_SAVE_OPE",
//	p_6700_f4_del_btn:"F_6700_DELETE_MATERIAL",
//	p_6700_f9_save_btn:"F_6700_SAVE_MATERIAL",
//	p_6800_f4_del_btn:"F_6800_DELETE_EQPT",
//	p_6800_f9_save_btn:"F_6800_SAVE_EQPT",
//	p_6B00_f4_del_btn:"F_6B00_DELETE_BOX",
//	p_6B00_f8_regist_btn:"6B00_CREATE_BOX",
//	p_6C00_f4_del_btn : "F_6C00_DELETE_CUS_INFO",
//	p_6C00_f8_register_btn : "F_6C00_REGISTER_CUS_INFO",
//	p_6D00_f4_del_btn:"F_6D00_DELETE_LAYOUT_GROUP",
//	p_6D00_f9_save_btn:"F_6D00_SAVE_LAYOUT_GROUP",
}