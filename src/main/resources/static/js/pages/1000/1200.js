
  /**************************************************************************/
  /*                                                                        */
  /*  System  Name :  ICIM                                                  */
  /*                                                                        */
  /*  Description  :  Operation Station Management                          */
  /*                                                                        */
  /*  MODIFICATION HISTORY                                                  */
  /*    Date     Ver     Name          Description                          */
  /* ---------- ----- ----------- ----------------------------------------- */
  /* 2017/10/12 N0.00                   Initial release                     */
  /*                                                                        */
  /**************************************************************************/

$(document).ready(function() {

	var VAL = {
			T_FBPBISFATY : "FBPBISFATY",
			NORMAL : "0000000",
       		EVT_USER   : $("#userId").text(),
			DISABLED_ATTR : {
				"disabled" : true
			},
			ENABLED_ATTR : {
				"disabled" : false
			}
		};

    /**
     * All controls's jquery object/text
     * @type {Object}
     */
	var controlsQuery = { 
		W   : $(window),
		$fatyIdText   : $("#fatyIdText"),
		$fatyNameText : $("#fatyNameText"),
		$anlsRateText : $("#anlsRateText"),
		$fatyMailText : $("#fatyMailText"),
		$anlsUnitSel  : $("#anlsUnitSel"),
		mainGrd   :{
            grdId     : $("#fatyListGrd")   ,
            grdPgText : "#fatyListPg"       ,
            fatherDiv : $("#fatyListDiv")
        },
		dialog :{
			queryDialog : $("#queryFatyDialog"),
			queryDialog_fatyIdText : $("#queryFatyDialog_fatyIdTxt"),
			queryDialog_cancelBtn  : $("#queryFatyDialog_cancelBtn"),
			qyeryDialgo_queryBtn   : $("#queryFatyDialog_queryBtn"),
		}
	};

    /**
     * All button's jquery object
     * @type {Object}
     */
    var btnQuery = {
        query_btn  : $("#query_btn"),
        delete_btn : $("#delete_btn"),
        add_btn    : $("#add_btn"),
        save_btn   : $("#save_btn"),
        update_btn : $("#update_btn"),
        copy_btn   : $("#copy_btn"),
        rollback_btn : $("#rollback_btn"),
        clear_btn  : $("#clear_btn")
    };
	
    /**
     * All tool functions
     * @type {Object}
     */
    var toolFunc = {
	    initFnc : function(){

	        $("input").val("");
	        $("select").empty();
	        $("#fatyConditionForm input").attr(VAL.DISABLED_ATTR);
			$("#fatyConditionForm select").attr(VAL.DISABLED_ATTR);
	    },
		iniAnlsUnitFnc:function () {
            comAddValueByDataCateFnc("#anlsUnitSel","ASUT","data_ext","data_desc",true);
        },

		com_get_1st_inf : function(){
			var rowIds = controlsQuery.mainGrd.grdId.jqGrid('getDataIDs');
			if(rowIds.length>0){
				controlsQuery.mainGrd.grdId.setSelection(rowIds[0], true);
			}
		},

		opeGridSelRowFnc : function(rowId) {
            $("input").val("");
            SelectDom.setSelect($("select"), "","");
			if(controlsQuery.$fatyNameText.attr("disabled") != "disabled"){
				showErrorDialog("", "目前是编辑状态，不可进行其它操作！");
				return false;
			}
			var rowData, mdlId, iary, inObj, outObj, oary, i, tblCnt, oaryArr;
			$("input").attr(VAL.DISABLED_ATTR);
			$("select").attr(VAL.DISABLED_ATTR);
			
			var rowData = controlsQuery.mainGrd.grdId.jqGrid("getRowData", rowId);
            faty_id = rowData.faty_id;

			var inObj = {
				trx_id : VAL.T_FBPBISFATY,
				action_flg : "Q",
                evt_usr : VAL.EVT_USR,
				iary : [{
					faty_id : faty_id
				}]
			};
			var outObj = comTrxSubSendPostJson(inObj);
			if (outObj.rtn_code == VAL.NORMAL) {
				var oary = outObj.oary[0];
				if(!oary){
                    return false;
				}
				controlsQuery.$fatyIdText.val(oary.faty_id.trim());
                controlsQuery.$fatyNameText.val(oary.faty_name.trim());
                controlsQuery.$anlsRateText.val(oary.anls_rate);
                SelectDom.setSelect(controlsQuery.$anlsUnitSel, oary.anls_unit.trim());
			}
		}
    };
    
    /**
     * All button click function
     * @type {Object}
     */
    var btnFunc = {
    	query_func : function(){
			if(controlsQuery.$fatyNameText.prop("disabled") != true){
				showErrorDialog("", "目前是编辑状态，不可进行其它操作！");
				return false;
			}
            controlsQuery.dialog.queryDialog.modal("show");
            controlsQuery.dialog.queryDialog_fatyIdText.val("");
    	},
    	delete_func : function(){
			if(controlsQuery.$fatyNameText.attr("disabled") != "disabled"){
				showErrorDialog("", "目前是编辑状态，不可进行其它操作！");
				return false;
			}
    		var selectRowId = controlsQuery.mainGrd.grdId.jqGrid("getGridParam","selrow");
    	    if(!selectRowId){
    	    	showErrorDialog("001","请选择需要删除的工厂！");
    	    	return false;
    	    } 
    	    var rowData = controlsQuery.mainGrd.grdId.jqGrid("getRowData",selectRowId);
    	    $("#f1_query_btn").showCallBackWarnningDialog({
    	    	errMsg  : "是否删除代码为:["+ rowData.faty_id +"]的工厂，请确认!!!!",
    	    	callbackFn : function(data) {
    	    		if(data.result==true){
    	    			var iary = [{
    	    					faty_id : rowData.faty_id,
    	    			}]
    	    			var inTrxObj={
    	    					trx_id     : VAL.T_FBPBISFATY,
    	    					action_flg : "D"  ,
                                evt_usr : VAL.EVT_USR,
    	    					iary       : iary
    	    			}
    	    			var outTrxObj = comTrxSubSendPostJson(inTrxObj);
    	    			if(outTrxObj.rtn_code === _NORMAL){
    	    				showSuccessDialog("工厂代码为:["+ rowData.faty_id +"]的删除成功！！！");
    	    				controlsQuery.mainGrd.grdId.jqGrid("delRowData",selectRowId);
        	                $("#fatyConditionForm input").val("");
        	                SelectDom.setSelect($("select"), "", "");
    	    			}
    	    		}
    	    	}
    	    });
    	},
    	add_func : function(){
    		if(controlsQuery.$fatyIdText.attr("disabled") != "disabled"){
				showErrorDialog("", "已经在新增中，请勿重复新增");
				return false;
			}
			if(controlsQuery.$fatyNameText.attr("disabled") != "disabled"){
				showErrorDialog("", "目前是编辑状态，不可进行其它操作！");
				return false;
			}
    		$("input[type='text']").val("");
            SelectDom.setSelect($("select"),"","");
    		iniContorlData;
            $("#fatyConditionForm input").attr(VAL.ENABLED_ATTR);
            $("#fatyConditionForm select").attr(VAL.ENABLED_ATTR);
    		controlsQuery.$fatyNameText.focus();
    	},
    	save_func : function(){
    		var actionFlg = controlsQuery.$fatyIdText.attr("disabled") === "disabled" ? "U" : "A";
    		var faty_id = controlsQuery.$fatyIdText.val().trim();
    		var faty_name = controlsQuery.$fatyNameText.val().trim();
    		var anls_rate = controlsQuery.$anlsRateText.val().trim();
    		var anls_unit = controlsQuery.$anlsUnitSel.val().trim();
    		if (!faty_id) {
				showErrorDialog("", "工厂代码不能为空");
				return false;
			}
            if (!faty_name) {
                showErrorDialog("", "工厂名称不能为空");
                return false;
            }
    		if (!anls_rate) {
				showErrorDialog("", "解析频率不能为空");
				return false;
			}
    		if (!anls_unit) {
				showErrorDialog("", "请选择接戏频率单位");
				return false;
			}

    		var iary = {
    			faty_id   : faty_id,
    			faty_name : faty_name,
    			anls_rate : anls_rate,
    			anls_unit : anls_unit,
    		}
    		var inObj = {
    				trx_id : VAL.T_FBPBISFATY,
    				action_flg : actionFlg,
    				evt_usr : VAL.EVT_USER,
    				iary : [iary]
    			};
    		var outObj = comTrxSubSendPostJson(inObj);
    		if (outObj.rtn_code == VAL.NORMAL) {
				
				$("input").attr(VAL.DISABLED_ATTR);
				$("select").attr(VAL.DISABLED_ATTR);
				
				if (actionFlg == "A") {
                    var data = $("#opeListGrd").jqGrid('getRowData');
                    var newRowId = data.length+1;
					controlsQuery.mainGrd.grdId.jqGrid("addRowData", newRowId,iary);
					controlsQuery.mainGrd.grdId.setSelection(newRowId, true); 
					showSuccessDialog("新增工厂信息成功");
					
				} else if (actionFlg == "U") {
					var rowid = controlsQuery.mainGrd.grdId.jqGrid('getGridParam','selrow');
					toolFunc.opeGridSelRowFnc(rowid);
					showSuccessDialog("站点信息更新成功");
				}
                $("#fatyConditionForm input").attr(VAL.DISABLED_ATTR);
                $("#fatyConditionForm select").attr(VAL.DISABLED_ATTR);
			}
    		
    	},
    	update_func : function() {
			if(controlsQuery.$fatyNameText.attr("disabled") != "disabled"){
				showErrorDialog("", "目前是编辑状态，不可进行其它操作！");
				return false;
			}
			var selRowId = controlsQuery.mainGrd.grdId.jqGrid("getGridParam","selrow");
			if (!selRowId) {
				showErrorDialog("", "请选择需要修改的站点信息");
				return false;
			}
			$("#fatyConditionForm input:not(#fatyIdText)").attr(VAL.ENABLED_ATTR);
			$("#fatyConditionForm select").attr(VAL.ENABLED_ATTR);
			controlsQuery.$fatyNameText.focus();
		},
		copy_func:function(){
			if($("#opeDscTxt").attr("disabled") != "disabled"){
				showErrorDialog("", "目前是编辑状态，不可进行其它操作！");
				return false;
			}
			var selRowId = controlsQuery.mainGrd.grdId.jqGrid("getGridParam","selrow");
			if (!selRowId) {
				showErrorDialog("", "请选择需要复制的站点信息");
				return false;
			}
            $("#fatyConditionForm input").attr(VAL.DISABLED_ATTR);
            $("#fatyConditionForm select").attr(VAL.DISABLED_ATTR);
			controlsQuery.$fatyNameText.focus();
		},
		rollback_func : function(){
			if($("#opeDscTxt").attr("disabled") == "disabled"){
				showErrorDialog("", "没有编辑，无需撤回");
				return false;
			}
			var outObj,opeId,iary ={};
			opeId = $("#opeIDTxt").val();
			if(opeId){
				iary.opeId = opeId;
			}
			var inObj_Query = {
						trx_id : VAL.T_FBPBISFATY,
						action_flg : 'Q',
                        evt_usr : VAL.EVT_USR,
						iary : [iary]
					};
            $("#fatyConditionForm input").attr(VAL.DISABLED_ATTR);
            $("#fatyConditionForm select").attr(VAL.DISABLED_ATTR);
			outObj = comTrxSubSendPostJson(inObj_Query);
			if (outObj.rtn_code === VAL.NORMAL) {
				setGridInfo(outObj.oary, controlsQuery.mainGrd.grdId);
				controlsQuery.dialog.queryDialog.modal("hide");
				toolFunc.com_get_1st_inf();
			}
		},
		clear_func : function() {
			$("input[type='text']").val("");
			SelectDom.setSelect($("select"), "", "");
            SelectDom.setSelect(controlsQuery.$deptIDSel, "", "");
            SelectDom.setSelect(controlsQuery.$toolgIDSel, "", "");
            controlsQuery.mainGrd.grdId.jqGrid("clearGridData");
            $("#fatyConditionForm input").attr(VAL.DISABLED_ATTR);
            $("#fatyConditionForm select").attr(VAL.DISABLED_ATTR);
		},
		dialog_qyeryFnc:function () {
            var iary = {};
            var queryFatyId = controlsQuery.dialog.queryDialog_fatyIdText.val();
            var inTrxObj ={
                trx_id     : VAL.T_FBPBISFATY ,
                action_flg : "Q"        ,
                evt_usr : VAL.EVT_USR,
                iary       : [{
                    faty_id: queryFatyId
                }]
            }

            var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if(  outTrxObj.rtn_code == _NORMAL ) {
                setGridInfo(outTrxObj.oary,controlsQuery.mainGrd.grdId);
                controlsQuery.dialog.queryDialog.modal("hide");
            }
        }
    };
    
    /**
     * grid  initialization
     */
    var iniGridInfo = function(){
        //调用封装的ddGrid方法
        var options = {
            scroll: true,   //支持滚动条
            fixed: true,
            viewrecords : true,
            shrinkToFit:false,
            pager: controlsQuery.mainGrd.grdPgText,  //表格分页
            colModel : [{name: 'faty_id'       , index: 'faty_id'      , label: FATY_ID_TAG      , width: 200 },
                        {name: 'faty_name'     , index: 'faty_name'    , label: FATY_NAME_TAG    , width: 280 }],
            pager : controlsQuery.mainGrd.grdPgText,
            onSelectRow : function(id) {
                toolFunc.opeGridSelRowFnc(id);
            }
        }
        controlsQuery.mainGrd.grdId.ddGrid(options);
    };
    
    /**
     * Bind button click action
     */
    var iniButtonAction = function(){
        btnQuery.query_btn.click(function(){
            btnFunc.query_func();
        });
        btnQuery.delete_btn.click(function(){
            btnFunc.delete_func();
        });
        btnQuery.add_btn.click(function(){
            btnFunc.add_func();
        });
        btnQuery.save_btn.click(function(){
            btnFunc.save_func();
        });
        btnQuery.update_btn.click(function(){
            btnFunc.update_func();
        });
        btnQuery.copy_btn.click(function(){
            btnFunc.copy_func();
        });
        btnQuery.rollback_btn.click(function(){
            btnFunc.rollback_func();
        });
        btnQuery.clear_btn.click(function(){
            btnFunc.clear_func();
        });
        controlsQuery.dialog.qyeryDialgo_queryBtn.click(function () {
			btnFunc.dialog_qyeryFnc();
        })
    };

    /**
     * Ini contorl's data
     */
    var iniContorlData = function(){
    	toolFunc.initFnc();
    	toolFunc.iniAnlsUnitFnc();
    };
    
    var clear = function(){
    	controlsQuery.mainGrd.grdId.jqGrid("clearGridData");
		$("input[type='text']").val("");
		$("select").empty();
    };
    
    var otherActionBind = function(){
        //Stop from auto commit
        $("form").submit(function(){
            return false;
        });
    };
    
    /**
     * Ini view, data and action bind
     */
    var initializationFunc = function(){
    	iniGridInfo();
        iniButtonAction();
        otherActionBind();
        iniContorlData();
    };
    initializationFunc();
    resizeFnc();
    //表格自适应
    function resizeFnc() {
        controlsQuery.mainGrd.grdId.changeTableLocation({
            widthOffset: 50,     //调整表格宽度
            heightOffset: 153,   //调整表格高度
        });

        var tabs = ['.cardBoxForm']
        tabs.forEach(function(v) {
            $(v).changeTabHeight({
                heightOffset: 60   //合并表格边框线
            });
        });
    };

    $(window).resize(function () {
        resizeFnc();
    });

    var nodeNames = ['.ui-jqgrid-bdiv'];
    nodeNames.forEach(function(v) {
        $(v).setNiceScrollType({});   //设置滚动条样式
    });
})