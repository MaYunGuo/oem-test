$(document).ready(function(){
    var VAL = {
        T_FUPUSRMAGE : "FUPUSRMAGE",
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

        $usrListGrd : $("#usrListGrd"),
        $usrListDiv : $("#usrListDiv"),
        usrListPg : "usrListPg",

        $usrIdTxt   :  $("#usrIdTxt  "),
        $usrNameTxt :  $("#usrNameTxt"),
        $usrTypeSel :  $("#usrTypeSel"),
        $usrFtySel  :  $("#usrFtySel" ),
        $phoneTxt   :  $("#phoneTxt  "),
        $telTxt     :  $("#telTxt    "),
        $mailTxt    :  $("#mailTxt   "),
		$adminFlg   :  $("#adminFlg  "),
        $validFlg   :  $("#validFlg  "),

        buttons : {
            $query_btn 		: $("#query_btn"),
            $delete_btn 	: $("#delete_btn"),
            $update_btn     : $("#update_btn"),
            $add_btn        : $("#add_btn"),
            $register_btn   : $("#register_btn")
        }
    };

    var controlsFunc = {
        iniUsrGrd : function(){
            var itemInfoCM =
                [{  name  : 'usr_id'      ,  index : 'usr_id'   ,   label :  USER_ID_TAG   ,width : 180 },
				 {  name  : 'usr_name'    ,  index : 'usr_name' ,   label :  USER_NAME_TAG ,width : 160 }];
            //调用封装的ddGrid方法
            var options = {
                scroll: true,   //支持滚动条
                fixed: true,
                shrinkToFit:true,
                viewrecords : true,
                colModel : itemInfoCM,
                pager : domObj.usrListPg,
                onSelectRow : function(id) {
                    controlsFunc.selRowFnc(id);
                }
            }
            domObj.$usrListGrd.ddGrid(options);
        },
        selRowFnc : function (id){
            var rowData, inObj, outObj, oary, oaryF;
            $("input").attr(VAL.DISABLED_ATTR);
            $("select").attr(VAL.DISABLED_ATTR);

            rowData = domObj.$usrListGrd.jqGrid("getRowData", id);
            usr_id = rowData.usr_id;

            inObj = {
                trx_id : VAL.T_FUPUSRMAGE,
                action_flg : "Q",
                evt_usr : VAL.EVT_USR,
                iaryA : [{
                    usr_id : usr_id
                }]
            };
            outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code == VAL.NORMAL) {
                oary = outObj.oaryA[0];
                if (!oary) {
                    return false;
                }

                domObj.$usrIdTxt.val(oary.usr_id);
                domObj.$usrNameTxt.val(oary.usr_name);
                domObj.$phoneTxt.val(oary.usr_phone);
                domObj.$mailTxt.val(oary.usr_mail);
                SelectDom.setSelect(domObj.$usrTypeSel, oary.usr_type);
                SelectDom.setSelect(domObj.$usrFtySel, oary.usr_fty);
                if (oary.valid_flg === "Y") {
                    domObj.$validFlg.attr('checked','checked');
                }else {
                    domObj.$validFlg.attr('checked',false);
                }
                if (oary.admin_flg === "Y") {
                    domObj.$adminFlg.attr('checked','checked');
                }else{
                    domObj.$adminFlg.attr('checked',false);
                }
            }
        },
        iniUsrTypeSel : function () {
            var iary = {
                data_cate: "URTP",
            };

            var inTrxObj = {
                trx_id: VAL.T_FBPBISDATA,
                action_flg: 'Q',
                iary: [iary]
            };
            var outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if (outTrxObj.rtn_code == "0000000") {
                SelectDom.addSelectArr(domObj.$usrTypeSel, outTrxObj.oary, "data_ext", "data_desc", "", true, false);
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
        deleteFunc : function(){
            var selectRowId = domObj.$usrListGrd.jqGrid("getGridParam","selrow");
            if(!selectRowId){
                showErrorDialog("","请选择要删除的用户信息！");
                return false;
            }
            var rowData = domObj.$usrListGrd.jqGrid("getRowData",selectRowId);
            $("#f1_query_btn").showCallBackWarnningDialog({
                errMsg  : "是否删除代码为:["+ rowData.usr_id +"]的用户,请确认!!!!",
                callbackFn : function(data) {
                    if(data.result==true){
                        var iary = [{
                            usr_id : rowData.usr_id
                        }]
                        var inTrxObj={
                            trx_id     : VAL.T_FUPUSRMAGE,
                            action_flg : "D"  ,
                            evt_usr    : VAL.EVT_USR,
                            iaryA       : iary
                        }
                        var outTrxObj = comTrxSubSendPostJson(inTrxObj);
                        if(outTrxObj.rtn_code === _NORMAL){
                            showSuccessDialog("用户信息删除成功！！！");
                            domObj.$usrListGrd.jqGrid("delRowData",selectRowId);
                            $("input").val("");
//	        	                $("select").empty();
                            SelectDom.setSelect($("select"), "", "");
                        }
                    }
                }
            });
        },
        addFunc : function(){
            if(domObj.$usrIdTxt.attr("disabled") != "disabled"){
                showErrorDialog("", "已经在新增中，请勿重复新增");
                return false;
            }
            SelectDom.setSelect($("select"), "", "");
            $("input").attr(VAL.ENABLED_ATTR);
            $("select").attr(VAL.ENABLED_ATTR);
            domObj.$usrFtySel.attr(VAL.DISABLED_ATTR);
            $(":input").val("");
            $(":checkbox").removeAttr("checked");
            domObj.$usrIdTxt.focus();
        },
        registerFunc : function(){
            var actionFlg, inObj, iary, newRowId,validFlg='N',adminFlg='N',fab='';
            actionFlg = domObj.$usrIdTxt.attr("disabled") === "disabled"
                ? "U"
                : "A";
            var usrId   = domObj.$usrIdTxt  .val();
            var usrName = domObj.$usrNameTxt.val();
            var usrType = domObj.$usrTypeSel.val();
            var usrFty  = domObj.$usrFtySel.val();
            var phone   = domObj.$phoneTxt  .val();
            var mail    = domObj.$mailTxt   .val();
            if (domObj.$validFlg.attr("checked")) {
                validFlg   = 'Y';
            }
            if (domObj.$adminFlg.attr("checked")) {
                adminFlg   = 'Y';
            }
            if (!usrId) {
                showErrorDialog("", "用户工号不能为空");
                return false;
            }
            if (!usrName) {
                showErrorDialog("", "用户姓名不能为空");
                return false;
            }
            //可以使用CheckBox属性改进
            iary = {
                usr_id		 :    usrId   ,
                usr_name	 :    usrName ,
                usr_type     :    usrType ,
                usr_fty      :    usrFty  ,
                usr_phone    :    phone   ,
                usr_mail     :    mail    ,
                valid_flg 	 :    validFlg,
                admin_flg    :    adminFlg,
            }
            inObj = {
                trx_id : VAL.T_FUPUSRMAGE,
                action_flg : actionFlg,
                evt_usr : VAL.EVT_USR,
                iaryA : [iary]
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code == VAL.NORMAL) {

                $("input").attr(VAL.DISABLED_ATTR);
                $("select").attr(VAL.DISABLED_ATTR);

                if (actionFlg == "A") {
                    var rowIds = domObj.$usrListGrd.jqGrid("getDataIDs");
                    newRowId = rowIds.length > 0 ? (rowIds[rowIds.length - 1]) + 1 : "1";
                    domObj.$usrListGrd.jqGrid("addRowData", newRowId,iary);
                    domObj.$usrListGrd.setSelection(newRowId, true);
                    controlsFunc.selRowFnc(newRowId);
                    showSuccessDialog("新增用户信息成功");
                } else if (actionFlg == "U") {
                    var rowid = domObj.$usrListGrd.jqGrid('getGridParam','selrow');
                    controlsFunc.selRowFnc(rowid);
                    showSuccessDialog("用户信息更新成功");
                }
            }

        },
        updateFunc : function() {
            var selRowId = domObj.$usrListGrd.jqGrid("getGridParam","selrow");
            if (!selRowId) {
                showErrorDialog("", "请选择需要修改的用户信息");
                return false;
            }
            $("input:not(#usrIdTxt)").attr(VAL.ENABLED_ATTR);
            domObj.$deptSel.attr(VAL.ENABLED_ATTR);
//				$("#select").attr(VAL.ENABLED_ATTR);
        }
    };
    function dialogUsrFnc(usr_id){
        var iary = {};
        var usr_id =$("#usrSelectDialog_idTxt").val();
        if(usr_id !=""){
            iary.usr_id  = usr_id ;
        }

        var inTrxObj ={
            trx_id     : VAL.T_FUPUSRMAGE ,
            action_flg : "Q"        ,
            evt_usr    : VAL.EVT_USR,
            iary       : [iary]
        }

        var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
        if(  outTrxObj.rtn_code == _NORMAL ) {
            setGridInfo(outTrxObj.oaryA,domObj.$usrListGrd);
            $('#usrSelectDialog').modal("hide");
        }
    }

    function iniClearFunc(){
        $("input").val("");
        $("select").empty();
        domObj.$usrListGrd.jqGrid("clearGridData");
        $("input").attr(VAL.DISABLED_ATTR);
        $("select").attr(VAL.DISABLED_ATTR);
    }

    function iniButtonAction(){
        domObj.buttons.$query_btn.click(function(){
            btnFnc.queryFunc();
        });
        domObj.buttons.$delete_btn.click(function(){
            btnFnc.deleteFunc();
        });
        domObj.buttons.$update_btn.click(function(){
            btnFnc.updateFunc();
        });
        domObj.buttons.$add_btn.click(function(){
            btnFnc.addFunc();
        });
        domObj.buttons.$register_btn.click(function(){
            btnFnc.registerFunc();
        });
        domObj.$usrTypeSel.change(function () {
            var usr_type = domObj.$usrTypeSel.find("option:selected").val();
            if(usr_type == "O"){
                domObj.$usrFtySel.attr(VAL.ENABLED_ATTR);
            }
        })
        $("#usrSelectDialog_idTxt").keydown(function(event){
            if (event.keyCode == 13 ) {
                var usr_id =$("#usrSelectDialog_idTxt").val();
                dialogUsrFnc(usr_id);
            }
        });
    }
    function iniDatePicker(){
        laydate.render({
            elem: '#regDateTxt',
            type: 'datetime',
            format: 'yyyy-MM-dd',
            btns: ['clear', 'confirm'],
        });
    }
    var otherActionBind = function(){

        $("form").submit(function(){
            return false;
        });

    };
    function initFunc(){
        iniClearFunc();
        iniDatePicker();
        controlsFunc.iniUsrGrd();
        controlsFunc.iniUsrTypeSel();
        iniButtonAction();
        otherActionBind();
    }
    initFunc();

    //表格自适应
    function resizeFnc(){
        domObj.$usrListGrd.changeTableLocation({
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