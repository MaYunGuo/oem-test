$(document).ready(function(){
	var VAL = {
			T_FAPUASGRP : "FAPUASGRP",
			NORMAL : "0000000",
            EVT_USR : $("#userId").text(),
			DISABLED_ATTR : {
				"disabled" : true
			},
			ENABLED_ATTR : {
				"disabled" : false
			}
		};
	var domObj = {
			W   : $(window),
			
			$usrListGrd : $("#usrListGrd"),
			$usrListDiv : $("#usrListDiv"),
			usrListPg : "usrListPg",
			$usrAutListGrd : $("#usrAutListGrd"),
			$usrAutListDiv : $("#usrAutListDiv"),
			usrAutListPg : "usrAutListPg",
			
			buttons : {
				$query_btn 		: $("#query_btn"),
		        $rtn_pwd_btn 	: $("#rtn_pwd_btn"),
		        $registe_btn    : $("#registe_btn")
			}
		};

	var controlsFunc = {
			iniUsrGrd : function(){
				var itemInfoCM = 
					   [{  name  : 'usr_id'    ,  index : 'usr_id',  label :  USER_ID_TAG  ,width : 180 },
						{  name  : 'usr_name'  ,  index : 'usr_name',   label : USER_NAME_TAG,width : 160 }];
                //调用封装的ddGrid方法
                var options1 = {
                    scroll: true,   //支持滚动条
                    fixed: true,
                    shrinkToFit:true,
                    viewrecords : true,
                    colModel : itemInfoCM,
                    pager : domObj.usrListPg,
                    onSelectRow : function(id) {
                        controlsFunc.onSelUserGrdFnc(id);
                    }
                }
                domObj.$usrListGrd.ddGrid(options1);
			},
			iniUsrAutGrd : function(){
				var itemInfoCM =
                    [{  name  : 'group_id'    ,  index : 'group_id', 	 label :  GROUP_ID_TAG  ,width : 190 },
                        {  name  : 'group_name'  ,  index : 'group_name',    label : GROUP_NAME_TAG,width : 190 },
                        {  name  : 'system_id'  ,  index : 'system_id',    label : SYSTEM_ID_TAG,width : 130 },
                        {  name  : 'admin_flg'  ,  index : 'admin_flg',    label : ADMIN_FLG_TAG,width : 100 },
                        {  name  : 'access_flg'  ,  index : 'access_flg',    label : ACCESS_FLG_TAG,width : 100 }
                    ];
                //调用封装的ddGrid方法
                var options2 = {
                    scroll: true,   //支持滚动条
                    fixed: true,
                    shrinkToFit:true,
                    viewrecords : true,
                    colModel : itemInfoCM,
                    multiselect : true,
                    pager : domObj.usrAutListPg,
                    onSelectRow : function(id) {
                    }
                }
                domObj.$usrAutListGrd.ddGrid(options2);
			},
			onSelUserGrdFnc: function(id){
				var rowData = domObj.$usrListGrd.jqGrid('getRowData',id);
				var inObj = {
						trx_id : VAL.T_FAPUASGRP,
						action_flg : 'L'
				};
				var outObj = comTrxSubSendPostJson(inObj);
				if (outObj.rtn_code === VAL.NORMAL) {
					setGridInfo(outObj.oaryB,"#usrAutListGrd");
				}
				var inTrxObj = {
						trx_id : VAL.T_FAPUASGRP,
						action_flg: 'B',
						iaryB : [{
							usr_id_fk : rowData.usr_id,
							system_id: rowData.system_id
						}]
				};
				var outTrxObj = comTrxSubSendPostJson(inTrxObj);
				if (outTrxObj.rtn_code === VAL.NORMAL) {
					var rowIds = domObj.$usrAutListGrd.jqGrid('getDataIDs')
					var rows = domObj.$usrAutListGrd.jqGrid('getRowData');
					var oaryB = outTrxObj.oaryB;
					var group_ids = [];
					for (var j = 0; j < oaryB.length; j++) {
						var  group_id = oaryB[j].group_id;
						group_ids.push(group_id);
					}
					for (var i = 0; i < rows.length; i++) {
						if ($.inArray(rows[i].group_id,group_ids) != -1) {
							 domObj.$usrAutListGrd.setSelection(rowIds[i],false);
						}
					}
				}
			}
			
	};
	
	var btnFnc = {
			queryFunc:function(){
				
				$("#usrSelectDialog").modal({
						backdrop:true,
						keyboard:false,
						show:false
				});
				$("#usrSelectDialog").unbind('shown.bs.modal');
				$("#usrSelectDialog_queryBtn").unbind('click');
				$("#usrSelectDialog").bind('shown.bs.modal');
				$("#usrSelectDialog").modal("show");
				
				var usr_id =$("#usrSelectDialog_idTxt").val();
				$("#usrSelectDialog_queryBtn").bind('click',dialogUsrFnc);
				$("#usrSelectDialog_idTxt").attr({'disabled':false});
		    	$("#usrSelectDialog_idTxt").val("");
			},
			updPwdFunc : function(){
				var rowId = domObj.$usrListGrd.jqGrid('getGridParam','selrow');
				if (!rowId) {
					showErrorDialog("","先选择需要修改密码的用户！");
					return;
				}
				var rowData = domObj.$usrListGrd.jqGrid('getRowData',rowId);
				
				$("#usrPwdUpdDialog").modal({
						backdrop:true,
						keyboard:false,
						show:false
				});
				$("#usrPwdUpdDialog").unbind('shown.bs.modal');
				$("#usrPwdUpdDialog_registeBtn").unbind('click');
				$("#usrPwdUpdDialog").bind('shown.bs.modal');
				$("#usrPwdUpdDialog").modal("show");
				$("#usrPwdUpdDialog_usrIdTxt").val(rowData.usr_id);
				$("#usrPwdUpdDialog_usrNameTxt").val(rowData.usr_name);
				$("#usrPwdUpdDialog_usrIdTxt").attr(VAL.DISABLED_ATTR);
				$("#usrPwdUpdDialog_usrNameTxt").attr(VAL.DISABLED_ATTR);
				$("#usrPwdUpdDialog_newPwdTxt").val("");
				$("#usrPwdUpdDialog_registeBtn").bind('click',dialogPwdUpdFnc);
			},
			registerFunc: function () {
				var authGrdRowData,group_id,iary=[],system_id;
				var usrGrdId = domObj.$usrListGrd.jqGrid('getGridParam','selrow');
				if (!usrGrdId) {
					showErrorDialog('','请选择用户');
					return;
				}
				var usrGrdRowData = domObj.$usrListGrd.jqGrid('getRowData',usrGrdId);
				var usr_id_fk = usrGrdRowData.usr_id;
				var authGrdIds = domObj.$usrAutListGrd.jqGrid('getGridParam','selarrrow');
				for (var i = 0; i < authGrdIds.length; i++) {
					authGrdRowData = domObj.$usrAutListGrd.jqGrid('getRowData',authGrdIds[i]);
					group_id = authGrdRowData.group_id;
                    system_id =  authGrdRowData.system_id;
					var iaryB = {
							group_id : group_id,
                            system_id : system_id
					};
					iary.push(iaryB);
				}
				var inObj = {
						trx_id : VAL.T_FAPUASGRP,
						action_flg : 'R',
						evt_usr : VAL.EVT_USR,
						iaryB : iary,
                   		usr_id_fk   : usr_id_fk
				};
				var outObj = comTrxSubSendPostJson(inObj);
				if (outObj.rtn_code === VAL.NORMAL) {
					showSuccessDialog("登记成功!");
				}
			}
	};
	
	function dialogPwdUpdFnc(){
		var usr_key = $("#usrPwdUpdDialog_newPwdTxt").val();
		var usr_id = $("#usrPwdUpdDialog_usrIdTxt").val();
		
		if (usr_key === "") {
			return false;
		}
		var iary = {
				usr_id  : usr_id,
				usr_key : usr_key
		};
		var inObj = {
				trx_id : VAL.T_FAPUASGRP,
				action_flg : "U",
				iary : [iary]
		};
		var outObj = comTrxSubSendPostJson(inObj);
		if (outObj.rtn_code === VAL.NORMAL) {
			showSuccessDialog("用户密码更新成功");
			$("#usrPwdUpdDialog").modal("hide");
		}
	}
	
	function dialogUsrFnc(usr_id){
		var iary = {};
		var usr_id =$("#usrSelectDialog_idTxt").val();
    	if(usr_id !=""){
    		iary.usr_id  = usr_id ;
    	}
    	
    	 var inTrxObj ={
    			 trx_id     : VAL.T_FAPUASGRP ,
    			 action_flg : "Q"        ,
    			 iary       : [iary]
    	 }
    	 
    	 var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
    	 if(  outTrxObj.rtn_code == _NORMAL ) {
    		 setGridInfo(outTrxObj.oary,"#usrListGrd");
             domObj.$usrAutListGrd.jqGrid("clearGridData");
    		 $('#usrSelectDialog').modal("hide");
    	 }
    }
	
	function iniClearFunc(){
		domObj.$usrListGrd.jqGrid("clearGridData");
		domObj.$usrAutListGrd.jqGrid("clearGridData");
	}
	
	function iniButtonAction(){
		domObj.buttons.$query_btn.click(function(){
			btnFnc.queryFunc();
		});
		domObj.buttons.$rtn_pwd_btn.click(function(){
			btnFnc.updPwdFunc();
		});
		domObj.buttons.$registe_btn.click(function(){
			btnFnc.registerFunc();
		});
		$("#usrSelectDialog_idTxt").keydown(function(event){
			if (event.keyCode == 13 ) {
	        	var usr_id =$("#usrSelectDialog_idTxt").val();
	        	dialogUsrFnc(usr_id);
			}
	    });
	}
	
	 var otherActionBind = function(){
	        //Stop from auto commit
	        $("form").submit(function(){
	            return false;
	        });
	       
	    };
	function initFunc(){
		iniClearFunc();
		controlsFunc.iniUsrGrd();
		controlsFunc.iniUsrAutGrd();
		iniButtonAction();
		otherActionBind();
	}
	initFunc();
    //表格自适应
    function resizeFnc(){
        /*var offsetBottom, divWidth,offsetBottom1, divWidth1;
        divWidth = $("#usrListDiv").width();
        offsetBottom =  $(window).height() - $("#usrListDiv").offset().top;
        $("#usrListDiv").height(offsetBottom * 0.95);
        $("#usrListGrd").setGridWidth(divWidth * 0.95);
        $("#usrListGrd").setGridHeight(offsetBottom * 0.99 - 101);
        //2
        divWidth1 = $("#usrAutListDiv").width();
        offsetBottom1 =  $(window).height() - $("#usrAutListDiv").offset().top;
        $("#usrAutListDiv").height(offsetBottom1 * 0.95);
        $("#usrAutListGrd").setGridWidth(divWidth1 * 0.95);
        $("#usrAutListGrd").setGridHeight(offsetBottom1 * 0.99 - 101);*/
        $('#usrListGrd').changeTableLocation({
            widthOffset: 50,     //调整表格宽度
            heightOffset: 153,   //调整表格高度
        });
        $('#usrAutListGrd').changeTableLocation({
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
    resizeFnc();
    $(window).resize(function() {
        resizeFnc();
    });

    var nodeNames = ['.ui-jqgrid-bdiv'];
    nodeNames.forEach(function(v) {
        $(v).setNiceScrollType({});   //设置滚动条样式
    });
});