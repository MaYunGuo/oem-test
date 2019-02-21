/**
 * 通用翻译类 select * from BIS_DATA WHERE DATA_CATE ='TRNS' AND DATA_EXT = 'XXX' 结果
 * data_item : "WAIT" , data_desc : "等待"
 */
var TransUtil = {
	VAL : {
		T_XPBISOPE : "XPBISOPE",
		NORMAL : "0000000"
	},
	sendXplstData : function(dataCate) {
		var inObj = {
			trx_id : "XPLSTDAT",
			action_flg : "Q",
			iary : [{
				data_cate : dataCate
			}]
		};
		outObj = comTrxSubSendPostJson(inObj);
		return outObj.rtn_code === this.VAL.NORMAL ? outObj : false;
	},
	isArray : function (obj) {  
		  return Object.prototype.toString.call(obj) === '[object Array]';   
	},
	opeObjs : {},
	addOpeDsc : function() {
		var inObj, outObj;

		inObj = {
			trx_id : this.VAL.T_XPBISOPE,
			action_flg : 'L'
		};
		outObj = comTrxSubSendPostJson(inObj);
		if (outObj.rtn_code == this.VAL.NORMAL) {
			this.opeObjs = outObj.oary;
		}
	},
	getOpeDsc : function(opeID, opeVer) {
		var i, oary;
		for (i = 0; i < this.opeObjs.length; i++) {
			oary = this.opeObjs[i];
			if (typeof(opeVer) === "undefined") {
				if (opeID == oary.ope_id) {
					return oary.ope_dsc
				}
			} else {
				if (opeID == oary.ope_id && opeVer == oary.ope_ver) {
					return oary.ope_dsc
				}
			}
		}
		return opeID;
	},
	prdStatObj : {},
	addPrdStat : function() {
		this.prdStatObj = {
			WAIT : "等待入账",
			INPR : "制程中",
			SHIP_2 : "半成品入库",
			SHIP_4 : "转仓中",
			SHIP_1 : "成品入库",
			SHIP_0 : "成品入库",
			COMP : "完成",
			SHTC : "出货",
			SCRP : "报废",
			EMPT : "空",
			WFRL : "等待释放",
			RELS : "已下线",
			HOLD : "保留"
		};
	},
	getPrdStat : function(prdStat, bnkFlg) {
		var chnPrdStat;
		if (typeof(bnkFlg) === "undefined") {
			chnPrdStat = this.prdStatObj[prdStat];
		} else {
			chnPrdStat = this.prdStatObj[prdStat + "_" + bnkFlg];
		}
		return chnPrdStat ? chnPrdStat : prdStat;
	},
	woStatObj:{},
	addWoStat:function(){
		this.woStatObj = {
			WAIT : "正常",
			CLOS : "关闭"
		};
	},
	getWoStat:function(woStat){
		var chnWoStat;
		chnWoStat = this.woStatObj[woStat];
		return chnWoStat ? chnWoStat : woStat;
	},
	woCateObj:{},
	addWoCate:function(){
		var outObj = this.sendXplstData("WOAB");
		this.woCateObj = this.isArray(outObj.oary) ? outObj.oary : [outObj.oary]; 
	},
	getWoCate:function(woCate){
		return this.woCateObj[woCate] ? this.woCateObj[woCate] : woCate;
	},
	dpsStatObj:{
//		DN状态
//		WAIT : "刚创建"
//		RELS : "已经有投产的产品和交货单绑定（出货单实际投入数量大于1"。
//		WFCL : "已全部绑定，出货单的预计投入等于实际投入，等待关闭"。
//		CLOS : "关闭:已入库"。
	},
	addDpsStat:function(){
		this.dpsStatObj = {
			WAIT:"等待",
			RELS:"已投产绑定",
			WFCL:"已全部绑定",
			CLOS:"关闭"
		};
	},
	getDpsStat:function(dpsStat){
		return this.dpsStatObj[dpsStat];
	},
	mdlCateObj:{},
	addMdlCate:function(){
		this.mdlCateObj = {
			ABC:"全部",
			A:"减薄",
			B:"镀膜",
			C:"切割"
		};
	},
	getMdlCate:function(mdlCate){
		return this.mdlCateObj[mdlCate];
	}
};