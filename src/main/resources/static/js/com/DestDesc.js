/**
 * 仓位翻译类 select * from BIS_DATA WHERE DATA_CATE ='DEST' AND DATA_EXT IN( 'XXX') 结果
 * data_id : "C204" , data_desc : "2厂直接切割原料仓"
 */
var DestTrans = {
	addTrans : function(dataExt) {
		var inObj, outObj, i, tblCnt, obj;
		inObj = {
			trx_id : "XPLSTDAT",
			action_flg : "I",
			iary : [{
				data_cate : "LSWH",
				data_ext : dataExt
			}]
		};
		outObj = comTrxSubSendPostJson(inObj);
		if (outObj.rtn_code === "0000000" && outObj.tbl_cnt > 0) {
			tblCnt = outObj.tbl_cnt;

			DestTrans[dataExt] = {};
			obj = DestTrans[dataExt];
			for (i = 0; i < tblCnt; i++) {
				oary = tblCnt > 1 ? outObj.oary[i] : outObj.oary;
				obj[oary.data_id] = oary.data_desc;
			}
		}
	},
	getTran : function(cate,key) {
		return DestTrans[cate][key];
	}
}