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

        $funcGrpListGrd : $("#funcGrpListGrd"),
        $funcGrpListListDiv : $("#funcGrpListListDiv"),
        funcGrpListPg : "funcGrpListPg",
        $funcListGrd : $("#funcListGrd"),
        $funcListDiv : $("#funcListDiv"),
        funcListPg : "funcListPg",

        buttons : {
            $query_btn 		: $("#query_btn"),
            $registe_btn    : $("#registe_btn"),
            $addGrp_btn     : $("#addGrp_btn"),
            $delete_btn       : $("#delete_btn"),
            $update_btn       : $("#update_btn")
        }
    };

    var controlsFunc = {
        iniFuncGrpGrd : function(){
            var itemInfoCM =
                [{  name  : 'group_id'    ,  index : 'group_id', 	 label :  GROUP_ID_TAG  ,width : 170 },
                    {  name  : 'group_name'  ,  index : 'group_name',    label : GROUP_NAME_TAG,width : 170 },
                    {  name  : 'system_id'  ,  index : 'system_id',    label : SYSTEM_ID_TAG,width : 200 },
                    {  name  : 'admin_flg'  ,  index : 'admin_flg',    label : ADMIN_FLG_TAG,width : 120 }
                    // {  name  : 'access_flg'  ,  index : 'access_flg',    label : ACCESS_FLG_TAG,width : 80 }
                ];
            /*domObj.$funcGrpListGrd.jqGrid({
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
                pager : domObj.funcGrpListPg,
                onSelectRow : function(id) {
                    controlsFunc.onSelFuncGrpGrdFnc(id);
                }
            });*/
            //调用封装的ddGrid方法
            var options1 = {
                scroll: true,   //支持滚动条
                fixed: true,
                shrinkToFit : true,
                viewrecords : true,
                colModel : itemInfoCM,
                pager : domObj.funcGrpListPg,
                onSelectRow : function(id) {
                    controlsFunc.onSelFuncGrpGrdFnc(id);
                }
            }
            domObj.$funcGrpListGrd.ddGrid(options1);
        },
        iniFuncGrd : function(){
            var itemInfoCM =
                [{  name  : 'func_code'     , index : 'func_code',  label :  FUNC_ID_TAG  ,			width : 180 },
                    {  name  : 'func_name'   ,   index : 'func_name',  label :  FUNC_NAME_TAG  ,		width : 180 },
                    {  name  : 'system_id'    ,  index : 'system_id',  label :  SYSTEM_ID_TAG  ,		width : 180 }];
            /*domObj.$funcListGrd.jqGrid({
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
                multiselect : true,
                pager : domObj.funcListPg,
                onSelectRow : function(id) {
                }
            });*/
            //调用封装的ddGrid方法
            var options2 = {
                scroll: true,   //支持滚动条
                fixed: true,
                shrinkToFit : true,
                viewrecords : true,
                colModel : itemInfoCM,
                multiselect : true,
                pager : domObj.funcListPg,
                onSelectRow : function(id) {
                }
            }
            domObj.$funcListGrd.ddGrid(options2);
        },
        onSelFuncGrpGrdFnc: function(id){
            var rowData = domObj.$funcGrpListGrd.jqGrid('getRowData',id);
            var systemId = rowData.system_id;
            var inObj = {
                trx_id : VAL.T_FAPUASGRP,
                action_flg : 'F',
                system_id : systemId
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === VAL.NORMAL) {
                setGridInfo(outObj.oaryB,"#funcListGrd");
            }
            var inTrxObj = {
                trx_id : VAL.T_FAPUASGRP,
                action_flg: 'C',
                iaryB : [{
                    group_id : rowData.group_id
                }]
            };
            var outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if (outTrxObj.rtn_code === VAL.NORMAL) {
                var rowIds = domObj.$funcListGrd.jqGrid('getDataIDs')
                var rows = domObj.$funcListGrd.jqGrid('getRowData');
                var oaryB = outTrxObj.oaryB;
                var func_codes = [];
                for (var j = 0; j < oaryB.length; j++) {
                    var  func_code = oaryB[j].func_code;
                    func_codes.push(func_code);
                }
                for (var i = 0; i < rows.length; i++) {
                    if ($.inArray(rows[i].func_code,func_codes) != -1) {
                        domObj.$funcListGrd.setSelection(rowIds[i],false);
                    }
                }
            }
        }

    };

    var btnFnc = {
        queryFunc:function(){

            $("#funcGrpSelectDialog").modal({
                backdrop:true,
                keyboard:false,
                show:false
            });
            $("#funcGrpSelectDialog").unbind('shown.bs.modal');
            $("#funcGrpSelectDialog_queryBtn").unbind('click');
            $("#funcGrpSelectDialog").bind('shown.bs.modal');
            $("#funcGrpSelectDialog").modal("show");

            $("#funcGrpSelectDialog_queryBtn").bind('click',dialogGrpFnc);
            $("#funcGrpSelectDialog_idTxt").attr({'disabled':false});
            $("#funcGrpSelectDialog_idTxt").val("");
        },
        addGrpFunc: function (action_flg){
            if(action_flg == "A"){
                $("#addGrpDialog").modal({
                    backdrop:true,
                    keyboard:false,
                    show:false
                });
                $("#addGrpDialog").unbind('shown.bs.modal');
                $("#addGrpDialog_addBtn").unbind('click');
                $("#addGrpDialog").bind('shown.bs.modal');
                $("#addGrpDialog").modal("show");
                $("#admin_flg").prop("checked",false);
                $("#access_flg").prop("checked",false);
                $("#addGrpDialog_addBtn").bind('click',dialogAddGrpFnc);
                $("#addGrpDialog_idTxt").attr({'disabled':false});
                $("#addGrpDialog_nameTxt").attr({'disabled':false});
                $("#addGrpDialog_idTxt").val("");
                $("#addGrpDialog_nameTxt").val("");

                iniControlFunc();
            }else if(action_flg == "U"){
                var row_id =domObj.$funcGrpListGrd.jqGrid('getGridParam','selrow');
                var rowData = domObj.$funcGrpListGrd.jqGrid("getRowData",row_id);
                $("#addGrpDialog").modal({
                    backdrop:true,
                    keyboard:false,
                    show:false
                });
                $("#addGrpDialog").unbind('shown.bs.modal');
                $("#addGrpDialog_addBtn").unbind('click');
                $("#addGrpDialog").bind('shown.bs.modal');
                $("#addGrpDialog").modal("show");
                $("#admin_flg").prop("checked",false);
                $("#access_flg").prop("checked",false);

                $("#addGrpDialog_addBtn").bind('click',dialogAddGrpFnc);
                $("#addGrpDialog_idTxt").attr({'disabled':true});
                $("#addGrpDialog_idTxt").val(rowData.group_id);
                $("#addGrpDialog_nameTxt").val(rowData.group_name);
                iniControlFunc();
                SelectDom.setSelect($("#addGrpDialog_systemIdSel"), rowData.system_id);
                if(rowData.admin_flg=="Y"){
                    $("#admin_flg").prop("checked",true);
                }
            }
            $("#addGrpDialog_systemIdSel").select2({
                theme : "bootstrap",
                width : 233
            });
        },
        registerFunc: function () {
            var funcCodeRowData,func_code,iary=[];
            var funcGrpId = domObj.$funcGrpListGrd.jqGrid('getGridParam','selrow');
            if (!funcGrpId) {
                showErrorDialog('','请选择功能组！');
                return;
            }
            var funcGrpRowData = domObj.$funcGrpListGrd.jqGrid('getRowData',funcGrpId);
            var group_id = funcGrpRowData.group_id;
            var funcCodeIds = domObj.$funcListGrd.jqGrid('getGridParam','selarrrow');
            for (var i = 0; i < funcCodeIds.length; i++) {
                funcCodeRowData = domObj.$funcListGrd.jqGrid('getRowData',funcCodeIds[i]);
                func_code = funcCodeRowData.func_code;
                var iaryB = {
                    func_code   : func_code
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
        del_func:function () {
            var inObj, outObj;
            var row_id =domObj.$funcGrpListGrd.jqGrid('getGridParam','selrow');
            if(row_id == null){
                showErrorDialog("","请选择需要删除的群组！");
                return;
            }
            var rowData = domObj.$funcGrpListGrd.jqGrid("getRowData",row_id);
            iary = {
                group_id: rowData.group_id
            }
            domObj.buttons.$delete_btn.showCallBackWarnningDialog({
                errMsg: "是否删除群组代码为:[" + rowData.group_id + "],请确认!!!!",
                callbackFn: function (data) {
                    if (data.result == true) {
                        inObj = {
                            trx_id: VAL.T_FAPUASGRP,
                            action_flg: "T",
                            group_id: rowData.group_id
                        }
                        outObj = comTrxSubSendPostJson(inObj)
                        if (outObj.rtn_code == _NORMAL) {
                            showSuccessDialog("删除功能群组成功！");
                            domObj.$funcGrpListGrd.jqGrid('delRowData', row_id);
                        }
                    }
                }
            })
        },
        update_func:function () {
            var row_id =domObj.$funcGrpListGrd.jqGrid('getGridParam','selrow');
            if(row_id == null){
                showErrorDialog("","请选择需要修改的群组！");
                return;
            }
            btnFnc.addGrpFunc("U");
        }
    };

    function dialogGrpFnc(group_id) {
        var iary = {};
        var group_id = $("#funcGrpSelectDialog_idTxt").val();
        if (group_id != "") {
            iary.group_id = group_id;
        }

        var inTrxObj = {
            trx_id: VAL.T_FAPUASGRP,
            action_flg: "G",
            iaryB: [iary]
        }
        var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
        if(  outTrxObj.rtn_code == _NORMAL ) {
            setGridInfo(outTrxObj.oaryB,"#funcGrpListGrd");
            $('#funcGrpSelectDialog').modal("hide");
        }
    }
    function dialogAddGrpFnc() {
        var admin_flg = 'N', access_flg = 'N', iary = {};
        var group_id = $("#addGrpDialog_idTxt").val();
        var system_id = $("#addGrpDialog_systemIdSel").val();
        var group_name = $("#addGrpDialog_nameTxt").val();
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
            access_flg: access_flg
        }
        if($("#addGrpDialog_idTxt").attr("disabled") != "disabled"){
            var inTrxObj = {
                trx_id: VAL.T_FAPUASGRP,
                action_flg: "J",
                group_id: group_id,
                iaryB: [iary]
            }
            var outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if (outTrxObj.rtn_code == _NORMAL) {
                showSuccessDialog("功能组添加成功！");
                $('#addGrpDialog').modal("hide");
                var rowIds = domObj.$funcGrpListGrd.jqGrid("getDataIDs");
                var newRowId = rowIds.length > 0 ? (rowIds[rowIds.length - 1]) + 1 : "1";
                var rowData={
                    group_id: group_id,
                    group_name: group_name,
                    system_id : system_id,
                    admin_flg: admin_flg,
                    access_flg: access_flg
                }
                domObj.$funcGrpListGrd.jqGrid("addRowData", newRowId,rowData);
                domObj.$funcGrpListGrd.setSelection(newRowId, true);
            }
        }else{
            var row_id =domObj.$funcGrpListGrd.jqGrid('getGridParam','selrow');
            var inTrxObj = {
                trx_id: VAL.T_FAPUASGRP,
                action_flg: "P",
                group_id: group_id,
                iaryB: [iary]
            }
            var outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if (outTrxObj.rtn_code == _NORMAL) {
                showSuccessDialog("功能组修改成功！");
                $('#addGrpDialog').modal("hide");
                var rowData={
                    group_id: group_id,
                    group_name: group_name,
                    system_id : system_id,
                    admin_flg: admin_flg,
                    access_flg: access_flg
                }
                domObj.$funcGrpListGrd.jqGrid("setRowData", row_id, rowData);
            }
        }

    }
    /*function checkboxChangeFnc() {
     if ($("#admin_flg").is(":checked")) {
     $("#access_flg").attr("checked",false);
     $("#access_flg").attr("disabled","disabled");
     } else {
     $("#access_flg").removeAttr("disabled");
     }
     }*/

    function iniClearFunc() {
        domObj.$funcListGrd.jqGrid("clearGridData");
        domObj.$funcGrpListGrd.jqGrid("clearGridData");
    }
    function iniControlFunc(){
        comAddValueByDataCateFnc("#addGrpDialog_systemIdSel","SYTM","data_ext","data_desc",true);
    }
    function iniButtonAction() {
        domObj.buttons.$query_btn.click(function () {
            btnFnc.queryFunc();
        });
        domObj.buttons.$registe_btn.click(function () {
            btnFnc.registerFunc();
        });
        domObj.buttons.$addGrp_btn.click(function () {
            btnFnc.addGrpFunc("A");
        });
        domObj.buttons.$delete_btn.click(function () {
            btnFnc.del_func();
        });
        domObj.buttons.$update_btn.click(function () {
            btnFnc.update_func();
        })
        $("#funcGrpSelectDialog_idTxt").keydown(function (event) {
            if (event.keyCode == 13) {
                var group_id = $("#funcGrpSelectDialog_idTxt").val();
                dialogGrpFnc(group_id);
            }
        });
        /*$("#admin_flg").change(function () {
         checkboxChangeFnc();
         });*/
        $("#flg_from").find('input[type=checkbox]').bind('click',function () {
            $("#flg_from").find('input[type=checkbox]').not(this).attr("checked",false);
        });
    }

    var otherActionBind = function () {
        //Stop from auto commit
        $("form").submit(function () {
            return false;
        });

    };

    function initFunc() {
        iniClearFunc();
        controlsFunc.iniFuncGrpGrd();
        controlsFunc.iniFuncGrd();
        iniButtonAction();
        otherActionBind();
    }

    initFunc();
    //表格自适应
    function resizeFnc(){
        /*var offsetBottom, divWidth,offsetBottom1, divWidth1;
        divWidth = $("#funcGrpListDiv").width();
        offsetBottom =  $(window).height() - $("#funcGrpListDiv").offset().top;
        $("#funcGrpListDiv").height(offsetBottom * 0.95);
        $("#funcGrpListGrd").setGridWidth(divWidth * 0.95);
        $("#funcGrpListGrd").setGridHeight(offsetBottom * 0.99 - 101);
        //2
        divWidth1 = $("#funcListDiv").width();
        offsetBottom1 =  $(window).height() - $("#funcListDiv").offset().top;
        $("#funcListDiv").height(offsetBottom1 * 0.95);
        $("#funcListGrd").setGridWidth(divWidth1 * 0.95);
        $("#funcListGrd").setGridHeight(offsetBottom1 * 0.99 - 101);*/
        $('#funcGrpListGrd').changeTableLocation({
            widthOffset: 50,     //调整表格宽度
            heightOffset: 153,   //调整表格高度
        });
        $('#funcListGrd').changeTableLocation({
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