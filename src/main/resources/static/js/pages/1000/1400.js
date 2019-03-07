/**
 *
 */
$(document).ready(function () {
    $("form").submit(function () {
        return false;
    });

    var VAL = {
        EVT_USR: $("#userId").text(),
        NORMAL: "0000000",
        DISABLED_ATTR: {
            "disabled": true
        },
        ENABLED_ATTR: {
            "disabled": false
        }
    };

    var domObj = {
        W: $(window)
    };


    function initInnerOrder() {
        var options = {
            scroll: true,   //支持滚动条
            fixed: true,
            viewrecords: true,
            emptyrecords: true,
            colModel: [{
                name: 'lot_id',
                index: 'lot_id',
                label: "批次号",
                width: 200
            }, {
                name: 'ins_grade',
                index: 'ins_grade',
                label: "等级",
                width: 110
            }, {
                name: 'ins_power',
                index: 'ins_power',
                label: "功率档",
                width: 110
            }, {
                name: 'ins_color',
                index: 'ins_color',
                label: "颜色档",
                width: 110
            }],
            pager: "insPg",//表格分页
            onSelectRow: function (id) {
                $("#lotId").attr(VAL.DISABLED_ATTR);
                var rowData = $("#insGrd").jqGrid("getRowData", id);
                $("#lotId").val(rowData.lot_id);
                $("#insPower").val(rowData.ins_power);
                $("#insColor").val(rowData.ins_color);
                $("#insGrade").val(rowData.ins_grade);
            }
        }

        $("#insGrd").ddGrid(options);
    };

    var buttonFnc = {
        queryFnc: function () {
            var lot_id = $("#lotId").val();
            var inObj = {
                trx_id: "FBPRETLOT",
                action_flg: "Q",
                lot_id: lot_id,
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === VAL.NORMAL) {
                setGridInfo(outObj.oary, "#insGrd");
            }
        },
        //更新或者新增
        saveFnc: function () {
            // 可编辑说明为新增，不可编辑说明为修改
            var lot_id = $("#lotId").val();
            var ins_power = $("#insPower").val();
            var ins_grade = $("#insGrade").val();
            var ins_color = $("#insColor").val();

            if (!lot_id) {
                showErrorDialog("", "请填写批次号!");
                return false;
            }
            if (!ins_grade) {
                showErrorDialog("", "请输入等级!");
                return false;
            }
            if (!ins_power) {
                showErrorDialog("", "请输入功率档!");
                return false;
            }
            if (!ins_color) {
                showErrorDialog("", "请输入颜色档!");
                return false;
            }

            var inObj = {
                trx_id: "FBPRETLOT",
                action_flg: "S",
                lot_id: lot_id,
                ins_power: ins_power,
                ins_grade: ins_grade,
                ins_color: ins_color,
                evt_usr: VAL.EVT_USR
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === VAL.NORMAL) {
                buttonFnc.clearFnc();
                buttonFnc.queryFnc();
                showSuccessDialog("保存成功");
            }
        },

        clearFnc: function () {
            $("input").val("");
            $("#lotId").attr(VAL.ENABLED_ATTR);
        },

        delFnc: function () {
            var selRowId, rowData, iary, inObj, outObj;
            // 获得选中的行ID
            selRowId = $("#insGrd").jqGrid("getGridParam", "selrow");
            if (!selRowId) {
                showErrorDialog("", "请选择需要删除的数据！");
                return false;
            }
            // 删除按钮绑定删除事件
            $("#del_btn").showCallBackWarnningDialog({
                errMsg: "是否删除该数据,请确认!!!!",
                callbackFn: function (data) {
                    if (data.result == true) {
                        // 获得选中行的数据
                        rowData = $("#insGrd").jqGrid("getRowData", selRowId);
                        inObj = {
                            trx_id: "FBPRETLOT",
                            action_flg: "Z",
                            lot_id: rowData.lot_id,
                            evt_usr: VAL.EVT_USR
                        };
                        outObj = comTrxSubSendPostJson(inObj);
                        if (outObj.rtn_code === VAL.NORMAL) {
                            showSuccessDialog("删除成功");
                            // $("#insGrd").jqGrid("delRowData", selRowId);

                            $("input").val("");
                             // buttonFnc.addFnc();
                             buttonFnc.queryFnc();
                            // $("#lotId").attr(VAL.ENABLED_ATTR);
                        }
                    }
                }
            });
        }
    };

    var iniButtonAction = function () {
        $("#query_btn").bind('click', buttonFnc.queryFnc);
        // $("#add_btn").bind('click', buttonFnc.addFnc);
        $("#clear_btn").bind('click', buttonFnc.clearFnc);
        $("#save_btn").bind('click', buttonFnc.saveFnc);
        // $("#del_btn").bind('click', buttonFnc.delFnc);
    };
    domObj.W.resize(function () {
        resizeFnc();
    });


    //页面初始化函数
    function pageInit() {
        initInnerOrder();
        resizeFnc();
        iniButtonAction();
    }

    pageInit();

    //jqGrid表格自适应
    function resizeFnc() {
        $('#insGrd').changeTableLocation({
            widthOffset: 50,     //调整表格宽度
            heightOffset: 153,   //调整表格高度
        });

        var tabs = ['.cardBoxForm']
        tabs.forEach(function (v) {
            $(v).changeTabHeight({
                heightOffset: 60   //合并表格边框线
            });
        });
        var nodeNames = ['.ui-jqgrid-bdiv'];

        nodeNames.forEach(function (v) {
            $(v).setNiceScrollType({});   //设置滚动条样式
        });
    };
});