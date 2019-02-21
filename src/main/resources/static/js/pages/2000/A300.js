$(document).ready(function(){
	var VAL = {
			T_FBPBISDAT : "FBPBISDAT",
			T_FAPUASGRP : "FAPUASGRP",
			T_FBPBISTOL : "FBPBISTOL",
			T_FBPBISOPE : "FBPBISOPE",
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
			$uasListGrd : $("#uasListGrd"),
			$uasListDiv : $("#uasListDiv"),
			uasListPg : "uasListPg",
			$lineListGrd : $("#lineListGrd"),
			$lineListDiv : $("#lineListDiv"),
			lineListPg : "lineListPg",
			$opeListGrd : $("#opeListGrd"),
			$opeListDiv : $("#opeListDiv"),
			opeListPg : "opeListPg",
            $evt_usr: $("#evt_usr"),
			
			buttons : {
                $query_btn 		: $("#query_btn"),
                $registe_btn    : $("#registe_btn"),
                $addUas_btn     : $("#addUas_btn"),
                $delete_btn       : $("#delete_btn"),
                $update_btn       : $("#update_btn")
			}
		};

    var btnFnc = {
        queryFunc:function(){
            $("#uasSelectDialog").modal({
                backdrop:true,
                keyboard:false,
                show:false
            });
            $("#uasSelectDialog").unbind('shown.bs.modal');
            $("#uasSelectDialog_queryBtn").unbind('click');
            $("#uasSelectDialog").bind('shown.bs.modal');
            $("#uasSelectDialog").modal("show");

            $("#uasSelectDialog_queryBtn").bind('click',dialogUasFnc);
            $("#uasSelectDialog_idTxt").attr({'disabled':false});
            $("#uasSelectDialog_idTxt").val("");
        },
        del_func:function () {
            var inObj, outObj;
            var row_id =domObj.$uasListGrd.jqGrid('getGridParam','selrow');
            if(row_id == null){
                showErrorDialog("","请选择需要删除的权限组！");
                return;
            }
            var rowData = domObj.$uasListGrd.jqGrid("getRowData",row_id);
            iary = {
                group_id: rowData.group_id
            }
            domObj.buttons.$delete_btn.showCallBackWarnningDialog({
                errMsg: "是否删除权限组代码为:[" + rowData.group_id + "],请确认!!!!",
                callbackFn: function (data) {
                    if (data.result == true) {
                        inObj = {
                            trx_id: VAL.T_FAPUASGRP,
                            action_flg: "T",
                            group_id : rowData.group_id,
                        }
                        outObj = comTrxSubSendPostJson(inObj)
                        if (outObj.rtn_code == _NORMAL) {
                            showSuccessDialog("删除权限组成功！");
                            domObj.$uasListGrd.jqGrid('delRowData', row_id);
                        }
                    }
                }
            })
        },
        update_func:function () {
            var row_id =domObj.$uasListGrd.jqGrid('getGridParam','selrow');
            if(row_id == null){
                showErrorDialog("","请选择需要修改权限组！");
                return;
            }
            btnFnc.addUasFunc("U");
        },
        addUasFunc: function (action_flg){
            if(action_flg == "A"){
                $("#addUasDialog").modal({
                    backdrop:'static',
                    keyboard:false,
                    show:false
                });
                $("#addUasDialog").unbind('shown.bs.modal');
                $("#addUasDialog_addBtn").unbind('click');
                $("#addUasDialog").bind('shown.bs.modal');
                $("#addUasDialog").modal("show");
                $("#admin_flg").prop("checked",false);
                $("#access_flg").prop("checked",false);
                $("#addUasDialog_addBtn").bind('click',dialogAddUasFnc);
                $("#addUasDialog_idTxt").attr({'disabled':false});
                $("#addUasDialog_nameTxt").attr({'disabled':false});
                $("#addUasDialog_idTxt").val("");
                $("#addUasDialog_nameTxt").val("");

                iniControlFunc();
                iniControlFunc2();
            }else if(action_flg == "U"){
                var row_id =domObj.$uasListGrd.jqGrid('getGridParam','selrow');
                var rowData = domObj.$uasListGrd.jqGrid("getRowData",row_id);
                $("#addUasDialog").modal({
                    backdrop:'static',
                    keyboard:false,
                    show:false
                });
                $("#addUasDialog").unbind('shown.bs.modal');
                $("#addUasDialog_addBtn").unbind('click');
                $("#addUasDialog").bind('shown.bs.modal');
                $("#addUasDialog").modal("show");
                $("#admin_flg").prop("checked",false);
                $("#access_flg").prop("checked",false);
                $("#addUasDialog_addBtn").bind('click',dialogAddUasFnc);
                $("#addUasDialog_idTxt").attr({'disabled':true});
                $("#addUasDialog_idTxt").val(rowData.group_id);
                $("#addUasDialog_nameTxt").val(rowData.group_name);
                iniControlFunc();
                iniControlFunc2();
                SelectDom.setSelect($("#addUasDialog_systemIdSel"), rowData.system_id);
                SelectDom.setSelect($("#addUasDialog_fabIdSel"), rowData.fab_id);
                /*SelectDom.setSelect($("#addUasDialog_lineOrOpeSel"), rowData.line_or_ope);
                SelectDom.setSelect($("#addUasDialog_lineOpeSel"), rowData.line_ope);*/
                if(rowData.admin_flg=="Y"){
                    $("#admin_flg").prop("checked",true);
                }
            }
            $("#addUasDialog_systemIdSel").select2({
                theme : "bootstrap",
                width : 233
            });
            $("#addUasDialog_fabIdSel").select2({
                theme : "bootstrap",
                width : 233
            });
            /*$("#addUasDialog_lineOrOpeSel").select2({
                theme : "bootstrap",
                width : 233
            });*/
            /*$("#addUasDialog_lineOpeSel").select2({
                theme : "bootstrap",
                width : 233
            });*/
        },
        registerFunc : function (){
            var lineGrdRowData, opeGrdRowData,ope_id,data_ext1,iary=[];
            var uasGrdId = domObj.$uasListGrd.jqGrid('getGridParam','selrow');
            if (!uasGrdId) {
                showErrorDialog('','请选择权限组');
                return;
            }
            var uasGrdRowData = domObj.$uasListGrd.jqGrid('getRowData',uasGrdId);
            var group_id = uasGrdRowData.group_id;
            var lineGrdIds = domObj.$lineListGrd.jqGrid('getGridParam','selarrrow');
            var opeGrdIds = domObj.$opeListGrd.jqGrid('getGridParam','selarrrow');

            for (var i = 0; i < lineGrdIds.length; i++) {
                lineGrdRowData = domObj.$lineListGrd.jqGrid('getRowData',lineGrdIds[i]);
                data_ext1 = lineGrdRowData.data_ext;
                var iaryB = {
                    func_code : data_ext1,
                    uas_type  : 'lo',
                };
                iary.push(iaryB);
            }
            for (var i = 0; i < opeGrdIds.length; i++) {
                opeGrdRowData = domObj.$opeListGrd.jqGrid('getRowData',opeGrdIds[i]);
                ope_id = opeGrdRowData.ope_id;
                var iaryB = {
                    func_code : ope_id,
                    uas_type  : 'lo',
                };
                iary.push(iaryB);
            }
            var inObj = {
                trx_id : VAL.T_FAPUASGRP,
                action_flg : 'E',
                group_id : group_id,
                evt_usr : VAL.EVT_USR,
                iaryB : iary
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === VAL.NORMAL) {
                showSuccessDialog("登记成功!");
            }
        },
    };

	var controlsFunc = {
        iniUasGrd : function(){
				var itemInfoCM = [
				    {  name  : 'group_id'    ,  index : 'group_id', 	 label :  '权限组代码'  ,width : 130 },
                    {  name  : 'group_name'  ,  index : 'group_name',    label : '权限组名称',width : 150 },
                    {  name  : 'system_id'  ,  index : 'system_id',    label : SYSTEM_ID_TAG,width : 130 },
                    {  name  : 'fab_id'  ,   index : 'fab_id',          label : '权限组厂别',width : 130 },
                    /*{  name  : 'line_or_ope'  ,   index : 'line_or_ope', label : '权限组类别',width : 130 },
                      {  name  : 'line_ope'  ,   index : 'line_ope',       label : '权限组权限',width : 130 },*/
                    {  name  : 'admin_flg'  ,  index : 'admin_flg',    label : ADMIN_FLG_TAG,width : 120 }
               ];
				/*domObj.$uasListGrd.jqGrid({
					datatype : "local",
					autoheight : true,
					mtype : "POST",
					autowidth : true,//宽度根据父元素自适应
					shrinkToFit : true,
					scroll : true,
					resizable : true,
					rownumbers : true,
					loadonce : true,
					viewrecords : true,
					colModel : itemInfoCM,
					pager : domObj.uasListPg,
					onSelectRow : function(id) {
						controlsFunc.onSelUasGrdFnc(id);
					}
				});*/
            //调用封装的ddGrid方法
            var options1 = {
                scroll: true,   //支持滚动条
                fixed: true,
                shrinkToFit : true,
                viewrecords : true,
                colModel : itemInfoCM,
                pager : domObj.uasListPg,
                onSelectRow : function(id) {
                    controlsFunc.onSelUasGrdFnc(id);
                }
            }
            domObj.$uasListGrd.ddGrid(options1);
			},
        iniLineGrd : function(){
            var itemInfoCM = [
                {  name  : 'data_ext'    ,  index : 'data_ext',  label :  '线别代码'  ,width : 210 },
                {  name  : 'data_desc'    ,  index : 'data_desc',   label : '线别描述',width : 210 }
            ];
            /*domObj.$lineListGrd.jqGrid({
                datatype : "local",
                autoheight : true,
                mtype : "POST",
                height : 420,
                width : 456,
                autowidth : true,//宽度根据父元素自适应
                shrinkToFit : true,
                scroll : true,
                resizable : true,
                rownumbers : true,
                loadonce : true,
                viewrecords : true,
                multiselect : true,
                colModel : itemInfoCM,
                pager : domObj.lineListPg,
                onSelectRow : function(id) {
                }
            });*/
            //调用封装的ddGrid方法
            var options2 = {
                scroll: true,   //支持滚动条
                fixed: true,
                shrinkToFit : true,
                viewrecords : true,
                multiselect : true,
                colModel : itemInfoCM,
                pager : domObj.lineListPg,
                onSelectRow : function(id) {
                }
            }
            domObj.$lineListGrd.ddGrid(options2);
        },
        iniOpeGrd : function(){
            var itemInfoCM = [
                {  name  : 'ope_id'    ,  index : 'ope_id',  label :  OPE_ID_TAG  ,width : 210 },
                {  name  : 'ope_dsc'    ,  index : 'ope_dsc',   label : OPE_DSC_TAG,width : 210 }
            ];
            /*domObj.$opeListGrd.jqGrid({
                datatype : "local",
                autoheight : true,
                mtype : "POST",
                height : 420,
                width : 456,
                autowidth : true,//宽度根据父元素自适应
                shrinkToFit : true,
                scroll : true,
                resizable : true,
                rownumbers : true,
                loadonce : true,
                viewrecords : true,
                multiselect : true,
                colModel : itemInfoCM,
                pager : domObj.opeListPg,
                onSelectRow : function(id) {
                }
            });*/
            //调用封装的ddGrid方法
            var options3 = {
                scroll: true,   //支持滚动条
                fixed: true,
                shrinkToFit : true,
                viewrecords : true,
                multiselect : true,
                colModel : itemInfoCM,
                pager : domObj.opeListPg,
                onSelectRow : function(id) {
                }
            }
            domObj.$opeListGrd.ddGrid(options3);
        },
        onSelUasGrdFnc: function(id){
            var rowData = domObj.$uasListGrd.jqGrid('getRowData',id);

            var inLineObj = {
                trx_id : VAL.T_FBPBISDAT,
                action_flg : 'Q',
                iary : [{
                    data_cate: 'AREA'
                }],
            };
            var outLineObj = comTrxSubSendPostJson(inLineObj);
            if (outLineObj.rtn_code === VAL.NORMAL) {
                setGridInfo(outLineObj.oary,"#lineListGrd");
            }
            var inOpeObj = {
                trx_id : VAL.T_FBPBISOPE,
                action_flg : 'L',
                evt_usr : VAL.EVT_USR
            };
            var outOpeObj = comTrxSubSendPostJson(inOpeObj);
            if (outOpeObj.rtn_code === VAL.NORMAL) {
                setGridInfo(outOpeObj.oary,"#opeListGrd");
            }
            var inTrxObj = {
                trx_id : VAL.T_FAPUASGRP,
                action_flg: 'C',
                iaryB : [{
                    group_id : rowData.group_id,
                    uas_type:'lo'
                }]
            };
            var outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if (outTrxObj.rtn_code === VAL.NORMAL) {
                var lineRowIds = domObj.$lineListGrd.jqGrid('getDataIDs')
                var lineRows = domObj.$lineListGrd.jqGrid('getRowData');
                var opeRowIds = domObj.$opeListGrd.jqGrid('getDataIDs')
                var opeRows = domObj.$opeListGrd.jqGrid('getRowData');

                var oaryB = outTrxObj.oaryB;
                var func_codes = [];
                for (var j = 0; j < oaryB.length; j++) {
                    var  func_code = oaryB[j].func_code;
                    func_codes.push(func_code);
                };
                for (var i = 0; i < lineRows.length; i++) {
                    if ($.inArray(lineRows[i].data_ext,func_codes) != -1) {
                        domObj.$lineListGrd.setSelection(lineRowIds[i],false);
                    }
                };
                for (var i = 0; i < opeRows.length; i++) {
                    if ($.inArray(opeRows[i].ope_id,func_codes) != -1) {
                        domObj.$opeListGrd.setSelection(opeRowIds[i],false);
                    }
                };
            }
        },

    };
	
	function dialogUasFnc(){
		var iary = {uas_type:'lo'};
		var group_id =$("#uasSelectDialog_idTxt").val();
    	if(group_id !=""){
    		iary.group_id  = group_id ;
    	}

        var inTrxObj = {
            trx_id: VAL.T_FAPUASGRP,
            action_flg: "G",
            iaryB: [iary]
        }
    	 
    	 var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
    	 if(  outTrxObj.rtn_code == _NORMAL ) {
    		 setGridInfo(outTrxObj.oaryB,"#uasListGrd");
    		 $('#uasSelectDialog').modal("hide");
    	 }
    }

    function dialogAddUasFnc() {
        var admin_flg = 'N', access_flg = 'N';
        var group_id = $("#addUasDialog_idTxt").val();
        var system_id = $("#addUasDialog_systemIdSel").val();
        var group_name = $("#addUasDialog_nameTxt").val();
        var fab_id = $("#addUasDialog_fabIdSel").val();
        /*var line_or_ope = $("#addUasDialog_lineOrOpeSel").val();
        var line_ope = $("#addUasDialog_lineOpeSel").val();*/
        if(!group_id){
            showErrorDialog("","请输入组代码！");
            return;
        }
        if(!group_name){
            showErrorDialog("","请输入组名称！");
            return;
        }
        if(!system_id){
            showErrorDialog("","请选择系统名称！");
            return;
        }
        if ($("#admin_flg").attr("checked")) {
            admin_flg = 'Y';
        }
        if ($("#access_flg").attr("checked")) {
            access_flg = 'Y';
        }
        iary = {
            group_name: group_name,
            system_id : system_id,
            admin_flg: admin_flg,
            access_flg: access_flg,
            fab_id : fab_id,
            //line_or_ope:line_or_ope,
            //line_ope:line_ope,
            uas_type:'lo'
        }
        if($("#addUasDialog_idTxt").attr("disabled") != "disabled"){
            var inTrxObj = {
                trx_id: VAL.T_FAPUASGRP,
                action_flg: "J",
                group_id: group_id,
                iaryB: [iary]
            }
            var outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if (outTrxObj.rtn_code == _NORMAL) {
                showSuccessDialog("权限组添加成功！");
                $('#addUasDialog').modal("hide");
                var rowIds = domObj.$uasListGrd.jqGrid("getDataIDs");
                var newRowId = rowIds.length > 0 ? (rowIds[rowIds.length - 1]) + 1 : "1";
                var rowData={
                    group_id: group_id,
                    group_name: group_name,
                    system_id : system_id,
                    fab_id: fab_id,
                    admin_flg: admin_flg,
                    access_flg: access_flg,
                    //line_or_ope: line_or_ope,
                    //line_ope: line_ope
                }
                domObj.$uasListGrd.jqGrid("addRowData", newRowId,rowData);
                domObj.$uasListGrd.setSelection(newRowId, true);
            }
        }else{
            var row_id =domObj.$uasListGrd.jqGrid('getGridParam','selrow');
            var inTrxObj = {
                trx_id: VAL.T_FAPUASGRP,
                action_flg: "P",
                group_id: group_id,
                iaryB: [iary]
            }
            var outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if (outTrxObj.rtn_code == _NORMAL) {
                showSuccessDialog("权限组修改成功！");
                $('#addUasDialog').modal("hide");
                var rowData={
                    group_id: group_id,
                    group_name: group_name,
                    system_id : system_id,
                    fab_id: fab_id,
                    //line_ope:line_ope,
                    //line_or_ope:line_or_ope,
                    admin_flg: admin_flg,
                    access_flg: access_flg
                }
                domObj.$uasListGrd.jqGrid("setRowData", row_id, rowData);
            }
        }

    }
	
	function iniClearFunc(){
		domObj.$uasListGrd.jqGrid("clearGridData");
	}

    function iniControlFunc(){
        comAddValueByDataCateFnc("#addUasDialog_systemIdSel","SYTM","data_ext","data_desc",true);
    }
    function iniControlFunc2(){
        comAddValueByDataCateFnc("#addUasDialog_fabIdSel","FBID","data_ext","data_desc",true);
    }
    /*function iniControlFunc3(){
        comAddValueByDataCateFnc("#addUasDialog_lineOrOpeSel","LORO","data_ext","data_desc",true);
    }
    function iniControlFunc4(){
        comAddValueByDataCateFnc("#addUasDialog_lineOpeSel","LOOA","data_ext","data_desc",true);
    }*/
	
	function iniButtonAction(){
        domObj.buttons.$query_btn.click(function () {
            btnFnc.queryFunc();
        });
        domObj.buttons.$registe_btn.click(function () {
            btnFnc.registerFunc();
        });
        domObj.buttons.$addUas_btn.click(function () {
            btnFnc.addUasFunc("A");
        });
        domObj.buttons.$delete_btn.click(function () {
            btnFnc.del_func();
        });
        domObj.buttons.$update_btn.click(function () {
            btnFnc.update_func();
        })
		$("#uasSelectDialog_idTxt").keydown(function(event){
			if (event.keyCode == 13 ) {
	        	var group_id =$("#uasSelectDialog_idTxt").val();
	        	dialogUasFnc(group_id);
			}
	    });
        $("#flg_from").find('input[type=checkbox]').bind('click',function () {
            $("#flg_from").find('input[type=checkbox]').not(this).attr("checked",false);
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
		controlsFunc.iniUasGrd();
        controlsFunc.iniLineGrd();
		controlsFunc.iniOpeGrd();
		//controlsFunc.iniToolGrd();
		//controlsFunc.iniDestShopGrd();
		iniButtonAction();
		otherActionBind();
	}
	initFunc();
    //表格自适应
    function resizeFnc(){
        /*var offsetBottom, divWidth,offsetBottom0, divWidth0,offsetBottom1, divWidth1,offsetBottom2, divWidth2,offsetBottom3, divWidth3;
        divWidth = $("#uasListDiv").width();
        offsetBottom =  $(window).height() - $("#uasListDiv").offset().top;
        $("#uasListDiv").height(offsetBottom * 0.95);
        $("#uasListGrd").setGridWidth(divWidth * 0.95);
        $("#uasListGrd").setGridHeight(offsetBottom * 0.99 - 101);

        //4
        divWidth0 = $("#divTotal").width();
        offsetBottom0 =  $(window).height() - $("#uasListDiv").offset().top;
        $("#divTotal").height(offsetBottom0 * 0.95);
        $("#lineListGrd").setGridWidth(divWidth0 * 0.95);
        $("#lineListGrd").setGridHeight(offsetBottom0 * 0.99 - 101);

        //2
        divWidth1 = $("#divTotal").width();
        offsetBottom1 =  $(window).height() - $("#uasListDiv").offset().top;
        $("#divTotal").height(offsetBottom1 * 0.95);
        $("#opeListGrd").setGridWidth(divWidth1 * 0.95);
        $("#opeListGrd").setGridHeight(offsetBottom1 * 0.99 - 101);*/
        $('#uasListGrd').changeTableLocation({
            widthOffset: 50,     //调整表格宽度
            heightOffset: 153,   //调整表格高度
        });
        $('#lineListGrd').changeTableLocation({
            widthOffset: 50,     //调整表格宽度
            heightOffset: 153,   //调整表格高度
        });
        $('#opeListGrd').changeTableLocation({
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