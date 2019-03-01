$(document).ready(function(){
    var VAL = {
        T_FUPFNCMAGE : "FUPFNCMAGE",
        T_FBPBISDATA : "FBPBISDATA",
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
        $funcListGrd  : $("#funcListGrd"),
        $funcListDiv  : $("#funcListDiv"),
        funcListPg    : "funcListPg",

        buttons : {
            $query_btn 		: $("#query_btn"),
            $registe_btn    : $("#registe_btn"),
            $addGrp_btn     : $("#addGrp_btn"),
            $deleteGrp_btn  : $("#deleteGrp_btn"),
            $updateGrp_btn  : $("#updateGrp_btn"),
            $addCode_btn    : $("#addCode_btn"),
            $updateCode_btn : $("#updateCode_btn"),
            $deleteCode_btn : $("#deleteCode_btn")
        },
        dialogs :{
           $funcGrpSelectDialog : $("#funcGrpSelectDialog"),
           $funcGrpSelectDialog_idTxt : $("#funcGrpSelectDialog_idTxt"),
           $funcGrpSelectDialog_queryBtn : $("#funcGrpSelectDialog_queryBtn"),

           $addGrpDialog : $("#addGrpDialog"),
           $addGrpDialog_idTxt : $("#addGrpDialog_idTxt"),
           $addGrpDialog_nameTxt : $("#addGrpDialog_nameTxt"),
           $addGrpDialog_systemIdSel : $("#addGrpDialog_systemIdSel"),
           $addGrpDialog_addBtn : $("#addGrpDialog_addBtn"),

           $addCodeDialog       : $("#addCodeDialog"),
           $addCodeDialog_idTxt : $("#addCodeDialog_idTxt"),
           $addCodeDialog_nameTxt : $("#addCodeDialog_nameTxt"),
           $addCodeDialog_systemIdSel : $("#addCodeDialog_systemIdSel"),
           $addCodeDialog_addBtn : $("#addCodeDialog_addBtn"),
        }
    };

    var controlsFunc = {

        inSystemIdFnc:function () {


        },
        iniFuncGrpGrd : function(){
            var itemInfoCM =
                [   {  name  : 'group_id'    ,  index : 'group_id', 	 label :  GROUP_ID_TAG  ,width : 170 },
                    {  name  : 'group_name'  ,  index : 'group_name',    label : GROUP_NAME_TAG ,width : 170 },
                    {  name  : 'system_id'   ,  index : 'system_id',     label : SYSTEM_ID_TAG  ,width : 200 }
                ];
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
                [   {  name  : 'func_code'     , index : 'func_code',  label :  FUNC_ID_TAG  ,			width : 180 },
                    {  name  : 'func_name'     , index : 'func_name',  label :  FUNC_NAME_TAG  ,		width : 180 },
                    {  name  : 'system_id'     , index : 'system_id',  label :  SYSTEM_ID_TAG  ,		width : 180 }];
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
                trx_id : VAL.T_FUPFNCMAGE,
                action_flg : 'I',
                iaryB   :[{
                    system_id : systemId
                }]
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === VAL.NORMAL) {
                setGridInfo(outObj.oaryB, domObj.$funcListGrd);
            }
            var inTrxObj = {
                trx_id : VAL.T_FUPFNCMAGE,
                action_flg: 'Q',
                iaryA : [{
                    group_id : rowData.group_id
                }]
            };
            var outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if (outTrxObj.rtn_code === VAL.NORMAL) {
                var funcCodeList = outTrxObj.oaryA[0].funcList;
                var rowIds = domObj.$funcListGrd.jqGrid('getDataIDs');
                if(rowIds.length ==0){
                   reutrn;
                }
                for(var i=0;i<rowIds.length;i++){
                    var rowData = domObj.$funcListGrd.jqGrid('getRowData',rowIds[i]);
                    if ($.inArray(rowData.func_code,funcCodeList) != -1) {
                        domObj.$funcListGrd.setSelection(rowIds[i],false);
                    }
                }
            }
        }

    };

    var btnFnc = {
        queryFunc:function(){
             domObj.dialogs.$funcGrpSelectDialog.modal('show');
             domObj.dialogs.$funcGrpSelectDialog_idTxt.val("");
        },
        addGrpFunc: function (action_flg){
            var inTrxObj = {
                trx_id: VAL.T_FBPBISDATA,
                action_flg: 'Q',
                iary: [{
                    data_cate : 'SYSM'
                }]
            };
            var outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if (outTrxObj.rtn_code == "0000000") {
                SelectDom.addSelectArr(domObj.dialogs.$addGrpDialog_systemIdSel, outTrxObj.oary, "data_ext", "data_desc", "", true, false);
            }
            domObj.dialogs.$addGrpDialog.modal("show");

            if(action_flg == "A"){
                domObj.dialogs.$addGrpDialog_idTxt.val("");
                domObj.dialogs.$addGrpDialog_nameTxt.val("");
                domObj.dialogs.$addGrpDialog_idTxt.attr({'disabled':false});
            }else if(action_flg == "U"){
                var row_id =domObj.$funcGrpListGrd.jqGrid('getGridParam','selrow');
                if(!row_id){
                    showErrorDialog("","请选择要修改的权限群组");
                    return false;
                }
                var rowData = domObj.$funcGrpListGrd.jqGrid("getRowData",row_id);
                domObj.dialogs.$addGrpDialog_idTxt.attr({'disabled':true});
                domObj.dialogs.$addGrpDialog_idTxt.val(rowData.group_id);
                domObj.dialogs.$addGrpDialog_nameTxt.val(rowData.group_name);
                SelectDom.setSelect(domObj.dialogs.$addGrpDialog_systemIdSel, rowData.system_id);
            }
        },
        addCode_func:function (action_flg) {
            var inTrxObj = {
                trx_id: VAL.T_FBPBISDATA,
                action_flg: 'Q',
                iary: [{
                    data_cate : 'SYSM'
                }]
            };
            var outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if (outTrxObj.rtn_code == "0000000") {
                SelectDom.addSelectArr(domObj.dialogs.$addCodeDialog_systemIdSel, outTrxObj.oary, "data_ext", "data_desc", "", true, false);
            }
            domObj.dialogs.$addCodeDialog.modal("show");

            if(action_flg == "A"){
                domObj.dialogs.$addCodeDialog_idTxt.val("");
                domObj.dialogs.$addCodeDialog_nameTxt.val("");
                domObj.dialogs.$addCodeDialog_idTxt.attr({'disabled':false});
            }else if(action_flg == "U"){
                var row_id =domObj.$funcListGrd.jqGrid('getGridParam','selrow');
                if(!row_id){
                    showErrorDialog("","请选择要修改的权限代码");
                    return false;
                }
                var rowData = domObj.$funcListGrd.jqGrid("getRowData",row_id);
                domObj.dialogs.$addCodeDialog_idTxt.attr({'disabled':true});
                domObj.dialogs.$addCodeDialog_idTxt.val(rowData.func_code);
                domObj.dialogs.$addCodeDialog_nameTxt.val(rowData.func_name);
                SelectDom.setSelect(domObj.dialogs.$addCodeDialog_systemIdSel, rowData.system_id);
            }
        },
        registerFunc: function () {
            var funcGrpId = domObj.$funcGrpListGrd.jqGrid('getGridParam','selrow');
            if (!funcGrpId) {
                showErrorDialog('','请选择功能组！');
                return;
            }
            var funcGrpRowData = domObj.$funcGrpListGrd.jqGrid('getRowData',funcGrpId);
            var iaryA = [{
                group_id   : funcGrpRowData.group_id,
                group_name : funcGrpRowData.group_name
            }];
            var iaryB = new Array();
            var funcCodeRowData,func_code;
            var funcCodeIds = domObj.$funcListGrd.jqGrid('getGridParam','selarrrow');
            for (var i = 0; i < funcCodeIds.length; i++) {
                funcCodeRowData = domObj.$funcListGrd.jqGrid('getRowData',funcCodeIds[i]);
                func_code = funcCodeRowData.func_code;
                var iary = {
                    func_code   : func_code
                };
                iaryB.push(iary);
            }
            var inObj = {
                trx_id : VAL.T_FUPFNCMAGE,
                action_flg : 'B',
                evt_usr : VAL.EVT_USR,
                iaryA : iaryA,
                iaryB : iaryB
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === VAL.NORMAL) {
                showSuccessDialog("登记成功!");
            }
        },
        delGrp_func:function () {
            var inObj, outObj;
            var row_id =domObj.$funcGrpListGrd.jqGrid('getGridParam','selrow');
            if(row_id == null){
                showErrorDialog("","请选择需要删除的群组！");
                return;
            }
            var rowData = domObj.$funcGrpListGrd.jqGrid("getRowData",row_id);
            var iaryA = {
                group_id: rowData.group_id
            }
            domObj.buttons.$deleteGrp_btn.showCallBackWarnningDialog({
                errMsg: "是否删除权限群组为:[" + rowData.group_id + "],请确认!!!!",
                callbackFn: function (data) {
                    if (data.result == true) {
                        inObj = {
                            trx_id     : VAL.T_FUPFNCMAGE,
                            action_flg : "D",
                            evt_usr    : VAL.EVT_USR,
                            iaryA      : [iaryA]
                        }
                        outObj = comTrxSubSendPostJson(inObj);
                        if (outObj.rtn_code == _NORMAL) {
                            showSuccessDialog("删除功能群组成功！");
                            domObj.$funcGrpListGrd.jqGrid('delRowData', row_id);
                        }
                    }
                }
            })
        },
        delCode_func :function () {
            var row_id =domObj.$funcListGrd.jqGrid('getGridParam','selrow');
            if(row_id == null){
                showErrorDialog("","请选择需要删除的群组！");
                return;
            }
            var rowData = domObj.$funcListGrd.jqGrid("getRowData",row_id);
            var iaryB = {
                func_code: rowData.func_code
            }
            domObj.buttons.$deleteCode_btn.showCallBackWarnningDialog({
                errMsg: "是否删除权限代码为:[" + rowData.group_id + "],请确认!!!!",
                callbackFn: function (data) {
                    if (data.result == true) {
                        inObj = {
                            trx_id     : VAL.T_FUPFNCMAGE,
                            action_flg : "R",
                            evt_usr    : VAL.EVT_USR,
                            iaryB      : [iaryB]
                        }
                        outObj = comTrxSubSendPostJson(inObj)
                        if (outObj.rtn_code == _NORMAL) {
                            showSuccessDialog("删除权限代码成功！");
                            domObj.$funcListGrd.jqGrid('delRowData', row_id);
                        }
                    }
                }
            })
        },
        updateGrp_func:function () {
            var row_id =domObj.$funcGrpListGrd.jqGrid('getGridParam','selrow');
            if(row_id == null){
                showErrorDialog("","请选择需要修改的群组！");
                return;
            }
            btnFnc.addGrpFunc("U");
        },
        updateCode_func : function () {
            var row_id = domObj.$funcListGrd.jqGrid("getGridParam", 'selrow');
            if(row_id == null){
                showErrorDialog("","请选择需要修改的权限代码！");
                return;
            }
            btnFnc.addCode_func("U");
        },
        addGrpDialog_func :function () {
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
            var iaryA = {
                group_id   : group_id,
                group_name : group_name,
                system_id  : system_id
            }
            if($("#addGrpDialog_idTxt").attr("disabled") != "disabled"){
                var inTrxObj = {
                    trx_id     : VAL.T_FUPFNCMAGE,
                    action_flg : "A",
                    evt_usr    : VAL.EVT_USR,
                    iaryA      : [iaryA]
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
                        system_id : system_id
                    }
                    domObj.$funcGrpListGrd.jqGrid("addRowData", newRowId,rowData);
                    domObj.$funcGrpListGrd.setSelection(newRowId, true);
                }
            }else{
                var row_id =domObj.$funcGrpListGrd.jqGrid('getGridParam','selrow');
                var inTrxObj = {
                    trx_id: VAL.T_FUPFNCMAGE,
                    action_flg: "U",
                    evt_usr    : VAL.EVT_USR,
                    iaryA: [iaryA]
                }
                var outTrxObj = comTrxSubSendPostJson(inTrxObj);
                if (outTrxObj.rtn_code == _NORMAL) {
                    showSuccessDialog("功能组修改成功！");
                    domObj.dialogs.$addGrpDialog.modal("hide");
                    var rowData={
                        group_id: group_id,
                        group_name: group_name,
                        system_id : system_id
                    }
                    domObj.$funcGrpListGrd.jqGrid("setRowData", row_id, rowData);
                }
            }
        },
        addCodeDialog_func :function () {
            var func_code = domObj.dialogs.$addCodeDialog_idTxt.val();
            var func_name = domObj.dialogs.$addCodeDialog_nameTxt.val();
            var system_id = domObj.dialogs.$addCodeDialog_systemIdSel.val();
            if(!func_code){
                showErrorDialog("","请输入权限代码！");
                return;
            }
            if(!func_name){
                showErrorDialog("","请输入权限名称！");
                return;
            }
            if(!system_id){
                showErrorDialog("","请选择系统名称！");
                return;
            }
            var iaryB = {
                func_code   : func_code,
                func_name   : func_name,
                system_id   : system_id
            }
            if(!domObj.dialogs.$addCodeDialog_idTxt.prop("disabled")){
                var inTrxObj = {
                    trx_id     : VAL.T_FUPFNCMAGE,
                    action_flg : "C",
                    evt_usr    : VAL.EVT_USR,
                    iaryB      : [iaryB]
                }
                var outTrxObj = comTrxSubSendPostJson(inTrxObj);
                if (outTrxObj.rtn_code == _NORMAL) {
                    showSuccessDialog("权限代码添加成功！");
                    domObj.dialogs.$addCodeDialog.modal("hide");
                    var rowIds = domObj.$funcGrpListGrd.jqGrid("getDataIDs");
                    var newRowId = rowIds.length > 0 ? (rowIds[rowIds.length - 1]) + 1 : "1";
                    var rowData={
                        func_code   : func_code,
                        func_name   : func_name,
                        system_id   : system_id
                    }
                    domObj.$funcListGrd.jqGrid("addRowData", newRowId,rowData);
                    domObj.$funcListGrd.setSelection(newRowId, true);
                }
            }else{
                var row_id =domObj.$funcListGrd.jqGrid('getGridParam','selrow');
                var inTrxObj = {
                    trx_id: VAL.T_FUPFNCMAGE,
                    action_flg: "M",
                    evt_usr    : VAL.EVT_USR,
                    iaryB: [iaryB]
                }
                var outTrxObj = comTrxSubSendPostJson(inTrxObj);
                if (outTrxObj.rtn_code == _NORMAL) {
                    showSuccessDialog("权限代码修改成功！");
                    domObj.dialogs.$addCodeDialog.modal("hide");
                    var rowData={
                        func_code   : func_code,
                        func_name   : func_name,
                        system_id   : system_id
                    }
                    domObj.$funcListGrd.jqGrid("setRowData", row_id, rowData);
                }
            }
        },
        queryGrpDialog_func :function (group_id) {
            var inTrxObj = {
                trx_id: VAL.T_FUPFNCMAGE,
                action_flg: "Q",
            }
            var group_id = $("#funcGrpSelectDialog_idTxt").val();
            if(group_id){
                var iaryA = [{
                    group_id : group_id
                }];
                inTrxObj.airyA = iaryA;
            }
            var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if(  outTrxObj.rtn_code == _NORMAL ) {
                setGridInfo(outTrxObj.oaryA,domObj.$funcGrpListGrd);
                $('#funcGrpSelectDialog').modal("hide");
            }
        }
    };

    function iniClearFunc() {
        domObj.$funcListGrd.jqGrid("clearGridData");
        domObj.$funcGrpListGrd.jqGrid("clearGridData");
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
        domObj.buttons.$deleteGrp_btn.click(function () {
            btnFnc.delGrp_func();
        });
        domObj.buttons.$updateGrp_btn.click(function () {
            btnFnc.updateGrp_func();
        });
        domObj.buttons.$addCode_btn.click(function () {
            btnFnc.addCode_func("A");
        });
        domObj.buttons.$updateCode_btn.click(function () {
            btnFnc.updateCode_func();
        });
        domObj.buttons.$deleteCode_btn.click(function () {
            btnFnc.delCode_func();
        })

        domObj.dialogs.$funcGrpSelectDialog_queryBtn.click(function () {
            btnFnc.queryGrpDialog_func();
        })
        domObj.dialogs.$addGrpDialog_addBtn.click(function () {
            btnFnc.addGrpDialog_func();
        });
        domObj.dialogs.$addCodeDialog_addBtn.click(function () {
            btnFnc.addCodeDialog_func();
        })
        $("#funcGrpSelectDialog_idTxt").keydown(function (event) {
            if (event.keyCode == 13) {
                var group_id = $("#funcGrpSelectDialog_idTxt").val();
                btnFnc.queryGrpDialog_func(group_id);
            }
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
        domObj.$funcGrpListGrd.changeTableLocation({
            widthOffset: 50,     //调整表格宽度
            heightOffset: 153,   //调整表格高度
        });
        domObj.$funcListGrd.changeTableLocation({
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