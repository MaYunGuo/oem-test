
  /**************************************************************************/
  /*                                                                        */
  /*  System  Name :  ICIM                                                  */
  /*                                                                        */
  /*  Description  :  Bis_data Management                                   */
  /*                                                                        */
  /*  MODIFICATION HISTORY                                                  */
  /*    Date     Ver     Name          Description                          */
  /* ---------- ----- ----------- ----------------------------------------- */
  /* 2017/09/06 N0.00                   Initial release                     */
  /*                                                                        */
  /**************************************************************************/

$(document).ready(function() {
	
    var VAL = { //val
        T_FBPBISDATA : "FBPBISDATA", //t_fbpbisdat
        EVT_USR : $("#userId").text(), //evt_usr
        NORMAL : "0000000", //normal
    };
    
    /**
     * All controls's jquery object/text
	 * 所有控件的jquery对象文本
     * @type {Object}
     */
	var controlsQuery = { 
		W   : $(window),
		
		$dataCateSel : $("#dataCateSel"),
		
		mainGrd : {
            grdId : $("#dataListGrd"),
            grdPgText : "#dataListPg",
            fatherDiv : $("#dataListDiv")
        }
	};

    /**
     * All button's jquery object
	 * 所有按钮的jquery对象
     * @type {Object}
     */
    var btnQuery = {
        query_btn 	: $("#query_btn"),
        add_btn 	: $("#add_btn"),
        addDataCate_btn : $("#addDataCate_btn"),
        updateDataCate_btn : $("#updateDataCate_btn"),
        deleteDataCate_btn : $("#deleteDataCate_btn"),
        
        deleteDatacateDialog_deleteDateCateBtn : $("#deleteDatacateDialog_deleteDateCateBtn")
    };
	
    /**
     * All tool functions
	 * 所有工具功能
     * @type {Object}
     */
    var toolFunc = {
	   	resizeFnc : function(){ 
	    	comResize(controlsQuery.W,controlsQuery.mainGrd.fatherDiv,controlsQuery.mainGrd.grdId);
	    },
	    initFnc : function(){
	        $("select").empty();
	    },
	    /**
    	 * 增加修改和删除按钮67
    	 * 说明:(1) addGridButton :在Grid中添加了两个Button: "修改" , "删除"
    	 *     (2) modifyFnc     :点击修改时,调用此函数.
    	 *     (3) deleteFnc     :点击删除时,调用此函数.
    	 */
    	addGridButton : function(){
    		var ids = controlsQuery.mainGrd.grdId.jqGrid('getDataIDs');
    		for(var i=0; i<ids.length; i++){
    			var id=ids[i];   
    			var modify = "<button id=" + "'mod" + ids[i] + "'" + " style='color:#f60'>修改</button>";  
    			var deleteItem = "<button id=" + "'del" + ids[i] + "'" + " style='color:#f60'>删除</button>";  
    			controlsQuery.mainGrd.grdId.jqGrid('setRowData', ids[i], { modifyItem: modify,deleteItem:deleteItem});
    			$("#mod" + ids[i]).click( toolFunc.modifyFnc );
    			$("#del" + ids[i]).click( toolFunc.deleteFnc );
    		}  
    	},
    	modifyFnc : function(){
    		var rowData  = controlsQuery.mainGrd.grdId.jqGrid("getRowData",this.id.substr(3));
    		btnQuery.add_btn.showBisDataDialog({
    			action_flg  : "U",
    			data_seq_id : rowData.data_seq_id,
    			data_cate   : rowData.data_cate,
    			data_id     : rowData.data_id,
    			data_ext    : rowData.data_ext,
    			data_item   : rowData.data_item,
    			ext_1       : rowData.ext_1,
    			ext_2       : rowData.ext_2,
    			ext_3       : rowData.ext_3,
    			ext_4       : rowData.ext_4,
    			ext_5       : rowData.ext_5,
    			ext_6       : rowData.ext_6,
    			ext_7       : rowData.ext_7,
    			ext_8       : rowData.ext_8,
    			ext_9       : rowData.ext_9,
    			ext_10      : rowData.ext_10,
    			data_desc   : rowData.data_desc,
    			evt_usr     : VAL.EVT_USR,
    			callbackFn  : function(data) {
    				if(data.result==true){
    					showMessengerSuccessDialog("修改参数成功", 3);
    					btnFunc.query_func();
    				}
    			}
    		});
    		//屏蔽其他事件
    		return false;
    	},
    	deleteFnc : function(){
    		var obj = this ;
    		btnQuery.add_btn.showCallBackWarnningDialog({
    			errMsg  : "是否删除参数,请确认!!!!",
    			callbackFn : function(data) {
    				if(data.result==true){
    					var rowData  = controlsQuery.mainGrd.grdId.jqGrid("getRowData",obj.id.substr(3));
    					var iary = [{
    							data_seq_id : rowData.data_seq_id,
    							data_cate   : rowData.data_cate,
    							data_id     : rowData.data_id,
    							data_ext    : rowData.data_ext
    					}];
    					var inTrxObj = {
    							trx_id     : VAL.T_FBPBISDATA ,
    							action_flg : "D"        ,
    							evt_usr    : VAL.EVT_USR,
    							iary       : iary 
    					};
    					var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
    					if(  outTrxObj.rtn_code == _NORMAL ) {
    						showMessengerSuccessDialog("删除参数成功", 3);
    						btnFunc.query_func();
    					}  
    				}
    			}
    		});
    		return false ;
    	},
	    //获取所有参数类型
	    iniCATESelect : function(data_cate){
	    	controlsQuery.$dataCateSel.empty();

    		var iary = [{
    				data_cate  : "CATE"
    		}];
    		var inTrxObj = {
    				trx_id     : VAL.T_FBPBISDATA ,
    				action_flg : "Q",
                    evt_usr : VAL.EVT_USR,
    				iary       : iary
    		};

    		var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
    		if( outTrxObj.rtn_code == _NORMAL ) {
    			var dataCnt = comParseInt( outTrxObj.tbl_cnt);
    			for(var i=0;i<dataCnt;i++){
    				if( outTrxObj.oary[i].data_id != "UFUG" ){
    					controlsQuery.$dataCateSel.append("<option value='" + outTrxObj.oary[i].data_id + "'>"+ outTrxObj.oary[i].data_id + "：" + outTrxObj.oary[i].data_desc +"</option>");
    				}						
    			}
    			
    			controlsQuery.$dataCateSel.select2({
    				theme : "bootstrap"
    			});
    			if(data_cate){
    				controlsQuery.$dataCateSel.val(data_cate).trigger("change");
    			}else{
    				btnFunc.query_func();
    				toolFunc.translateFnc();
    			}
    		}
	    },
    	/**
    	 * 获取参数列设定
    	 */
    	translateFnc : function(){
    		var tbl_cnt,
    			iary,
    	        inTrxObj,
    	        outTrxObj,
    	        hideAry=[],
    	        showAry=[];
    		var crGrid = controlsQuery.mainGrd.grdId;
    		
    		crGrid.jqGrid("setLabel","data_id",DATA_ID_TAG); 
    		crGrid.jqGrid("setLabel","data_ext",DATA_EXT_TAG);
            crGrid.jqGrid("setLabel","data_item",DATA_ITEM_TAG);
            crGrid.jqGrid("setLabel","data_desc",DATA_DESC_TAG);
            crGrid.jqGrid("setLabel","ext_1",EXT_1_TAG);
            crGrid.jqGrid("setLabel","ext_2",EXT_2_TAG);
            crGrid.jqGrid("setLabel","ext_3",EXT_3_TAG);
            crGrid.jqGrid("setLabel","ext_4",EXT_4_TAG);
            crGrid.jqGrid("setLabel","ext_5",EXT_5_TAG);
            crGrid.jqGrid("setLabel","ext_6",EXT_6_TAG);
            crGrid.jqGrid("setLabel","ext_7",EXT_7_TAG);
            crGrid.jqGrid("setLabel","ext_8",EXT_8_TAG);
            crGrid.jqGrid("setLabel","ext_9",EXT_9_TAG);
            crGrid.jqGrid("setLabel","ext_10",EXT_10_TAG);
            hideAry = ["data_id","data_ext","data_item","data_desc","ext_1","ext_2","ext_3","ext_4","ext_5","ext_6","ext_7","ext_8","ext_9","ext_10"];
    	    crGrid.jqGrid("hideCol",hideAry);
    	    
    		iary = [{
    				data_cate : "CODE",
    				data_id   : $.trim(controlsQuery.$dataCateSel.val())
    		}];
    		inTrxObj = {
    				trx_id     : VAL.T_FBPBISDATA ,
    				action_flg : "Q"        ,
                    evt_usr    : VAL.EVT_USR,
    				iary       : iary
    		};
    		outTrxObj = comTrxSubSendPostJson(inTrxObj);
    		if( outTrxObj.rtn_code == _NORMAL ) {
    			tbl_cnt = outTrxObj.tbl_cnt;
    			for(var i=0;i<tbl_cnt;i++){
    	            var oary = outTrxObj.oary[i];
    	            switch(oary.data_ext.trim()){
    	              case "DATA_ID":
    	                   crGrid.jqGrid("setLabel","data_id",oary.data_desc.trim());
    	   					showAry.push("data_id");
    	                   break;
    	              case "DATA_EXT":
    	                   crGrid.jqGrid("setLabel","data_ext",oary.data_desc.trim());
    	   					showAry.push("data_ext");
    	                   break;
    	              case "DATA_ITEM":
    	                   crGrid.jqGrid("setLabel","data_item",oary.data_desc.trim());
    	   					showAry.push("data_item");
    	                   break;
    	              case "DATA_DESC":
    	                   crGrid.jqGrid("setLabel","data_desc",oary.data_desc.trim());
    	   					showAry.push("data_desc");
    	                   break;
    	              case "EXT_1":
    	                   crGrid.jqGrid("setLabel","ext_1",oary.data_desc.trim());
    	   					showAry.push("ext_1");
    	                   break;
    	              case "EXT_2":
    	                   crGrid.jqGrid("setLabel","ext_2",oary.data_desc.trim());
    	   					showAry.push("ext_2");
    	                   break;
    	              case "EXT_3":
    	                   crGrid.jqGrid("setLabel","ext_3",oary.data_desc.trim());
    	   					showAry.push("ext_3");
    	                   break;
    	              case "EXT_4":
    	                   crGrid.jqGrid("setLabel","ext_4",oary.data_desc.trim());
    	   					showAry.push("ext_4");	                   
    	                   break;
    	              case "EXT_5":
    	                   crGrid.jqGrid("setLabel","ext_5",oary.data_desc.trim());
    	   					showAry.push("ext_5");
    	                   break;
                        case "EXT_6":
                            crGrid.jqGrid("setLabel","ext_6",oary.data_desc.trim());
                            showAry.push("ext_6");
                            break;
                        case "EXT_7":
                            crGrid.jqGrid("setLabel","ext_7",oary.data_desc.trim());
                            showAry.push("ext_7");
                            break;
                        case "EXT_8":
                            crGrid.jqGrid("setLabel","ext_8",oary.data_desc.trim());
                            showAry.push("ext_8");
                            break;
                        case "EXT_9":
                            crGrid.jqGrid("setLabel","ext_9",oary.data_desc.trim());
                            showAry.push("ext_9");
                            break;
                        case "EXT_10":
                            crGrid.jqGrid("setLabel","ext_10",oary.data_desc.trim());
                            showAry.push("ext_10");
                            break;
                    }
    			}
    			crGrid.jqGrid("showCol",showAry);
    		}
    	}
    };
    
    /**
     * All button click function
     * @type {Object}
     */
    var btnFunc = {
    	/**
    	 * 获取参数类型设定
    	 */
    	query_func : function(){
    		var iary = [{
				data_cate : $.trim(controlsQuery.$dataCateSel.val())
			}];
			var inTrxObj = {
					trx_id     : VAL.T_FBPBISDATA ,
					action_flg : "Q"        ,
                    evt_usr    : VAL.EVT_USR,
			        iary       : iary 
			};
			var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
			if(  outTrxObj.rtn_code == _NORMAL ) {
				setGridInfo(outTrxObj.oary,"#dataListGrd");
				toolFunc.addGridButton();
			}
    	},
    	/**
    	 * 新增参数设定
    	 */
    	add_func : function(){
    		btnQuery.add_btn.showBisDataDialog({
    			action_flg:"A",
    			data_cate : $.trim(controlsQuery.$dataCateSel.val()),
    			evt_usr   : VAL.EVT_USR,
    			callbackFn : function(data) {
    				if(data.result==true){
    					showMessengerSuccessDialog("新增参数成功", 3);
    					btnFunc.query_func();
    				}
    			}
    		});
    	},
    	/**
    	 * 添加参数类型
    	 */
    	addOrUpdateDataCateFnc : function(action_flg){
    		$("#addDataCateDialog_dataCateTxt").val("");
    		$("#addDataCateDialog_dataDescTxt").val("");
      
    		$("#addDataCateDialog_dsc_data_IdTxt").val("");
    		$("#addDataCateDialog_dsc_data_ExtTxt").val("");
    		$("#addDataCateDialog_dsc_data_ItemTxt").val("");
    		$("#addDataCateDialog_dsc_ext_1Txt").val("");
    		$("#addDataCateDialog_dsc_ext_2Txt").val("");
    		$("#addDataCateDialog_dsc_ext_3Txt").val("");
    		$("#addDataCateDialog_dsc_ext_4Txt").val("");
    		$("#addDataCateDialog_dsc_ext_5Txt").val("");
    		$("#addDataCateDialog_dsc_ext_6Txt").val("");
    		$("#addDataCateDialog_dsc_ext_7Txt").val("");
    		$("#addDataCateDialog_dsc_ext_8Txt").val("");
    		$("#addDataCateDialog_dsc_ext_9Txt").val("");
    		$("#addDataCateDialog_dsc_ext_10Txt").val("");
    		$("#addDataCateDialog_dsc_data_DscTxt").val("");
      
    		$("#addDatacateDialog_addDateCateBtn").unbind('click');
    		if(action_flg=="N"){
    			$("#addDataCateDialog_title").text("添加参数类型");
    			$("#addDataCateDialog_dataCateTxt").attr({
    				'disabled' : false
    			});
    		}else{
    			$("#addDataCateDialog_title").text("修改参数类型");
    			$("#addDataCateDialog_dataCateTxt").attr({
    				'disabled' : true
    			});
    			$("#addDataCateDialog_dataCateTxt").val($("#dataCateSel").val());
    			$("#addDataCateDialog_dataDescTxt").val($("#dataCateSel").find("option:selected").text().substring(5));
    			var iary = [{
    					data_cate : "CODE",
    					data_id   : $("#addDataCateDialog_dataCateTxt").val()
    			}];
    			var inTrxObj = {
    					trx_id     : VAL.T_FBPBISDATA ,
    					action_flg : "Q"        ,
                        evt_usr : VAL.EVT_USR,
    					iary       : iary
    			};
    			outTrxObj = comTrxSubSendPostJson(inTrxObj);
    			if( outTrxObj.rtn_code == _NORMAL ) {
    				tbl_cnt = outTrxObj.tbl_cnt;
    				for(var i=0;i<tbl_cnt;i++){
    		            var oary = outTrxObj.oary[i];
    		            switch(oary.data_ext.trim()){
    		              case "DATA_ID":
    		                   $("#addDataCateDialog_dsc_data_IdTxt").val(oary.data_desc.trim());
    		                   break;
    		              case "DATA_EXT":
    		                   $("#addDataCateDialog_dsc_data_ExtTxt").val(oary.data_desc.trim());
    		                   break;
    		              case "DATA_ITEM":
    		                   $("#addDataCateDialog_dsc_data_ItemTxt").val(oary.data_desc.trim());
    		                   break;
    		              case "DATA_DESC":
    		                   $("#addDataCateDialog_dsc_data_DscTxt").val(oary.data_desc.trim());
    		                   break;
    		              case "EXT_1":
    		                   $("#addDataCateDialog_dsc_ext_1Txt").val(oary.data_desc.trim());
    		                   break;
    		              case "EXT_2":
    		                   $("#addDataCateDialog_dsc_ext_2Txt").val(oary.data_desc.trim());
    		                   break;
    		              case "EXT_3":
    		                   $("#addDataCateDialog_dsc_ext_3Txt").val(oary.data_desc.trim());
    		                   break;
    		              case "EXT_4":
    		                   $("#addDataCateDialog_dsc_ext_4Txt").val(oary.data_desc.trim());
    		                   break;
    		              case "EXT_5":
    		                   $("#addDataCateDialog_dsc_ext_5Txt").val(oary.data_desc.trim());
    		                   break;
                            case "EXT_6":
                                $("#addDataCateDialog_dsc_ext_6Txt").val(oary.data_desc.trim());
                                break;
                            case "EXT_7":
                                $("#addDataCateDialog_dsc_ext_7Txt").val(oary.data_desc.trim());
                                break;
                            case "EXT_8":
                                $("#addDataCateDialog_dsc_ext_8Txt").val(oary.data_desc.trim());
                                break;
                            case "EXT_9":
                                $("#addDataCateDialog_dsc_ext_9Txt").val(oary.data_desc.trim());
                                break;
                            case "EXT_10":
                                $("#addDataCateDialog_dsc_ext_10Txt").val(oary.data_desc.trim());
                                break;
                        }
    				}
    			}
    		}
    		$("#addDatacateDialog_addDateCateBtn").bind('click',function(){
    			var data_cate = $.trim($("#addDataCateDialog_dataCateTxt").val());
    			var data_desc = $.trim($("#addDataCateDialog_dataDescTxt").val());
    			if( !data_cate ){
    				showErrorDialog("003","参数类型必须填写");
    				return false;
    			}
    			if( !data_desc ){
    				showErrorDialog("003","参数描述必须填写");
    				return false;
    			}
    			if( comCheckMaxLenth( data_cate , 4 ) == false ){
    				showErrorDialog("003","参数类型大于最大长度4");
    				return false;
    			}

    			var iary = [{
    					data_cate      : data_cate   ,
    					data_desc      : data_desc   ,
    					dsc_data_id    : $.trim($("#addDataCateDialog_dsc_data_IdTxt").val())      ,
    					dsc_data_ext   : $.trim($("#addDataCateDialog_dsc_data_ExtTxt").val())     ,
    					dsc_data_item  : $.trim($("#addDataCateDialog_dsc_data_ItemTxt").val())    ,
    					dsc_ext_1      : $.trim($("#addDataCateDialog_dsc_ext_1Txt").val())        ,
    					dsc_ext_2      : $.trim($("#addDataCateDialog_dsc_ext_2Txt").val())        ,
    					dsc_ext_3      : $.trim($("#addDataCateDialog_dsc_ext_3Txt").val())        ,
    					dsc_ext_4      : $.trim($("#addDataCateDialog_dsc_ext_4Txt").val())        ,
    					dsc_ext_5      : $.trim($("#addDataCateDialog_dsc_ext_5Txt").val())        ,
    					dsc_ext_6      : $.trim($("#addDataCateDialog_dsc_ext_6Txt").val())        ,
    					dsc_ext_7      : $.trim($("#addDataCateDialog_dsc_ext_7Txt").val())        ,
    					dsc_ext_8      : $.trim($("#addDataCateDialog_dsc_ext_8Txt").val())        ,
    					dsc_ext_9      : $.trim($("#addDataCateDialog_dsc_ext_9Txt").val())        ,
    					dsc_ext_10      : $.trim($("#addDataCateDialog_dsc_ext_10Txt").val())        ,
    					dsc_data_dsc   : $.trim($("#addDataCateDialog_dsc_data_DscTxt").val())
    			}];
    			var inTrxObj = {
    					trx_id     : VAL.T_FBPBISDATA ,
    					action_flg : action_flg ,
						evt_usr    : VAL.EVT_USR,
    					iary       : iary
    			};
    			var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
    			if(  outTrxObj.rtn_code == _NORMAL ) {
    				if(action_flg=="N"){
    					showMessengerSuccessDialog("新增参数类型成功", 3);
    				}else{
    					showMessengerSuccessDialog("修改参数类型成功", 3);
    				}
    				$('#addDataCateDialog').modal('hide');
    				toolFunc.iniCATESelect(data_cate);
    			}
    		});
    		$('#addDataCateDialog').modal({
    			backdrop:true ,
    			keyboard:false,
    			show:true
    		});
    	},
    	/**
    	 * 删除参数类型
    	 */
    	deleteDataCateFnc : function(){
    		function getDeleteDataCateDialogDataCateFnc(){
    			$("#deleteDataCateDialog_dataCateSel").empty();
    			var iary = [{
    					data_cate : "CATE"
    			}];
    			var inTrxObj = {
    					trx_id     : VAL.T_FBPBISDATA ,
    					action_flg : "Q"        ,
                        evt_usr : VAL.EVT_USR,
    					iary       : iary 
    			};
    			var outTrxObj = comTrxSubSendPostJson(inTrxObj);
    			if( outTrxObj.rtn_code == _NORMAL ) {
    				var dataCnt = comParseInt( outTrxObj.tbl_cnt);
    				var oary = dataCnt > 1 ? outTrxObj.oary : [outTrxObj.oary];

    				for(var i=0;i<dataCnt;i++){
    					if( oary[i].data_id != "UFUG" ){
    						$("#deleteDataCateDialog_dataCateSel").append("<option value='" + oary[i].data_id + "'>" + oary[i].data_id + "：" + oary[i].data_desc +"</option>");
    					}
    				} 

    				$("#deleteDataCateDialog_dataCateSel").select2({
    					theme : "bootstrap",
    					width : 300
    				});
    			}
    		}

    		function dialogDeleteDataCateFnc(){
    			$("#deleteDatacateDialog_deleteDateCateBtn").showCallBackWarnningDialog({
    				errMsg  : "是否删除操作类型,请确认!!!!",
    				callbackFn : function(data) {
    					if(data.result==true){
    			            var iary = [{
    			            		data_cate:$("#deleteDataCateDialog_dataCateSel").val()
    			            }];
    			            var inTrxObj = {
    			            		trx_id     : VAL.T_FBPBISDATA ,
    			            		action_flg : "C"        ,
        							evt_usr    : VAL.EVT_USR,
    			            		iary       : iary
    			            };
    			            var outTrxObj = comTrxSubSendPostJson(inTrxObj);
    			            if( outTrxObj.rtn_code == _NORMAL ) {
    			            	showMessengerSuccessDialog("删除参数类型成功", 3);
    			                getDeleteDataCateDialogDataCateFnc();
    			                toolFunc.iniCATESelect();
    			            }
    					}
    				} 
    			});
    		}

    		$("#deleteDataCateDialog_dataCateSel").empty();
    		    
    		/*****
    			title :dialog的重复提交问题。
    			reason: 多次执行modal('show')时,会多次绑定click事件。
    			这样会带来点击一次click，执行多次提交的bug.
    			solve :dialog弹出前,将unbind('click'),再bind('click'),只绑定一个click事件.
    		 *****/
    		$("#deleteDatacateDialog_deleteDateCateBtn").unbind('click');
    		$("#deleteDatacateDialog_deleteDateCateBtn").bind('click',dialogDeleteDataCateFnc);

    		$("#deleteDataCateDialog").modal({
    			backdrop:true  ,
    			keyboard:false ,
    			show:true      
    		});
    		
    		getDeleteDataCateDialogDataCateFnc();
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
            pager: controlsQuery.mainGrd.grdPgText,  //表格分页
            colModel : [{name: 'modifyItem'   , index: 'modifyItem'    , label: MODIFY_BTN_TAG,     sortable: false  ,width: 50 },
                {name: 'deleteItem'   , index: 'deleteItem'    , label: DELETE_BTN_TAG,     sortable: false  ,width: 50 },
                {name: 'data_cate'    , index: 'data_cate'     , label: DATA_CATE_TAG,      sortable: false  ,width: 60 ,hidden:true},
                {name: 'data_id'      , index: 'data_id'       , label: DATA_ID_TAG,        sortable: false  ,width: 80 },
                {name: 'data_ext'     , index: 'data_ext'      , label: DATA_EXT_TAG,       sortable: false  ,width: 200},
                {name: 'data_item'    , index: 'data_item'     , label: DATA_ITEM_TAG,      sortable: false  ,width: 200},
                {name: 'ext_1'        , index: 'ext_1'         , label: EXT_1_TAG,          sortable: false  ,width: 200},
                {name: 'ext_2'        , index: 'ext_2'         , label: EXT_2_TAG,          sortable: false  ,width: 200},
                {name: 'ext_3'        , index: 'ext_3'         , label: EXT_3_TAG,          sortable: false  ,width: 200},
                {name: 'ext_4'        , index: 'ext_4'         , label: EXT_4_TAG,          sortable: false  ,width: 200},
                {name: 'ext_5'        , index: 'ext_5'         , label: EXT_5_TAG,          sortable: false  ,width: 200},
                {name: 'ext_6'        , index: 'ext_6'         , label: EXT_6_TAG,          sortable: false  ,width: 200},
                {name: 'ext_7'        , index: 'ext_7'         , label: EXT_7_TAG,          sortable: false  ,width: 200},
                {name: 'ext_8'        , index: 'ext_8'         , label: EXT_8_TAG,          sortable: false  ,width: 200},
                {name: 'ext_9'        , index: 'ext_9'         , label: EXT_9_TAG,          sortable: false  ,width: 200},
                {name: 'ext_10'        , index: 'ext_10'         , label: EXT_10_TAG,          sortable: false  ,width: 200},
                {name: 'data_seq_id'  , index: 'data_seq_id'   , label: DATA_SEQ_ID_TAG,    sortable: false  ,width: 60 ,hidden:true},
                {name: 'data_desc'    , index: 'data_desc'     , label: DATA_DESC_TAG,      sortable: false  ,width: 300}],
            loadComplete: function(xhr){
                toolFunc.addGridButton();
            },
            loadComplete: function () {
                $("table[role='grid']").each(function () {//jqgrid 创建的表格都有role属性为grid
                    $('.' + $(this).attr("class") + ' tr:first th:first').css("width", "35"); //使表头的序号列宽度为40
                    $('.' + $(this).attr("class") + ' tr:first td:first').css("width", "35"); // 使表体的序号列宽度为40
                });
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
        btnQuery.add_btn.click(function(){
        	btnFunc.add_func();
        });
        btnQuery.addDataCate_btn.click(function(){
        	btnFunc.addOrUpdateDataCateFnc("N");
        });
        btnQuery.updateDataCate_btn.click(function(){
        	btnFunc.addOrUpdateDataCateFnc("R");
        });
        btnQuery.deleteDataCate_btn.click(function(){
        	btnFunc.deleteDataCateFnc();
        });
    };

    /**
     * Ini contorl's data
     */
    var iniContorlData = function(){
    	toolFunc.initFnc();
        toolFunc.iniCATESelect();
        toolFunc.resizeFnc();
    };

    
    var otherActionBind = function(){
        //Stop from auto commit
        $("form").submit(function(){
            return false;
        });
        
        controlsQuery.W.resize(function() {
        	toolFunc.resizeFnc();
    	});
        
        controlsQuery.$dataCateSel.change(function(){
        	btnFunc.query_func();
    		toolFunc.translateFnc();
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
    //表格自适应
    function resizeFnc() {
        $('#dataListGrd').changeTableLocation({
            widthOffset: 50,     //调整表格宽度
            heightOffset: 200,   //调整表格高度
        });

        var tabs = ['.cardBoxForm']
        tabs.forEach(function(v) {
            $(v).changeTabHeight({
                heightOffset: 60   //合并表格边框线
            });
        });
    };
    resizeFnc();
    $(window).resize(function () {
        resizeFnc();
    });

    var nodeNames = ['.ui-jqgrid-bdiv'];
    nodeNames.forEach(function(v) {
        $(v).setNiceScrollType({});   //设置滚动条样式
    });
});