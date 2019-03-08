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

    function iniDateTimePicker() {
        laydate.render({
            elem: '#meas_timestamp',
            type: 'datetime'
        });
    }

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
                name: 'power',
                index: 'power',
                label: "功率",
                width: 200
            }, {
                name: 'isc',
                index: 'isc',
                label: "ISC",
                width: 110
            }, {
                name: 'voc',
                index: 'voc',
                label: "VOC",
                width: 110
            }, {
                name: 'imp',
                index: 'imp',
                label: "IMP",
                width: 110
            }, {
                name: 'vmp',
                index: 'vmp',
                label: "VMP",
                width: 110
            }, {
                name: 'ff',
                index: 'ff',
                label: "FF",
                width: 110
            }, {
                name: 'temp',
                index: 'temp',
                label: "温度",
                width: 110
            }, {
                name: 'cal',
                index: 'cal',
                label: "校准版",
                width: 110
            }, {
                name: 'meas_timestamp',
                index: 'meas_timestamp',
                label: "测试时间",
                width: 200
            }],
            pager: "ivPg",//表格分页
            onSelectRow: function (id) {
                $("#lotId").attr(VAL.DISABLED_ATTR);
                var rowData = $("#ivGrd").jqGrid("getRowData", id);
                $("#lotId").val(rowData.lot_id);
                $("#power").val(rowData.power);
                $("#isc").val(rowData.isc);
                $("#voc").val(rowData.voc);
                $("#imp").val(rowData.imp);
                $("#vmp").val(rowData.vmp);
                $("#ff").val(rowData.ff);
                $("#temp").val(rowData.temp);
                $("#cal").val(rowData.cal);
                $("#meas_timestamp").val(rowData.meas_timestamp);
            }
        }

        $("#ivGrd").ddGrid(options);
    };

    var buttonFnc = {
        queryFnc: function () {
            var lot_id = $("#lotId").val();
            var cal = $("#cal").val();
            var inObj = {
                trx_id: "FBPRETLOT",
                action_flg: "Q",
                lot_id: lot_id,
                cal: cal
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === VAL.NORMAL) {
                setGridInfo(outObj.oary, "#ivGrd");
            }
        },

        //更新或者新增
        saveFnc: function () {
            var lot_id = $("#lotId").val();
            var power = $("#power").val();
            var isc = $("#isc").val();
            var voc = $("#voc").val();
            var imp = $("#imp").val();
            var vmp = $("#vmp").val();
            var ff = $("#ff").val();
            var temp = $("#temp").val();
            var cal = $("#cal").val();
            var meas_timestamp = $("#meas_timestamp").val();
            if (!lot_id) {
                showErrorDialog("", "请填写批次号!");
                return false;
            }

            if (power && !ComRegex.isNumber(power)) {
                showErrorDialog("", "[" + power + "]不是一个有效的数字,错误");
                return false;
            }

            if (isc && !ComRegex.isNumber(isc)) {
                showErrorDialog("", "[" + isc + "]不是一个有效的数字,错误");
                return false;
            }

            if (voc && !ComRegex.isNumber(voc)) {
                showErrorDialog("", "[" + voc + "]不是一个有效的数字,错误");
                return false;
            }

            if (imp && !ComRegex.isNumber(imp)) {
                showErrorDialog("", "[" + imp + "]不是一个有效的数字,错误");
                return false;
            }

            if (vmp && !ComRegex.isNumber(vmp)) {
                showErrorDialog("", "[" + vmp + "]不是一个有效的数字,错误");
                return false;
            }

            if (ff && !ComRegex.isNumber(ff)) {
                showErrorDialog("", "[" + ff + "]不是一个有效的数字,错误");
                return false;
            }

            if (temp && !ComRegex.isNumber(temp)) {
                showErrorDialog("", "[" + temp + "]不是一个有效的数字,错误");
                return false;
            }
            if(!cal){
                showErrorDialog("", "校准版不能为空！");
                return false;
            }
            var inObj = {
                trx_id: "FBPRETLOT",
                action_flg: "A",
                lot_id: lot_id,
                evt_usr: VAL.EVT_USR,
                power: power,
                isc: isc,
                voc: voc,
                imp: imp,
                vmp: vmp,
                ff: ff,
                temp: temp,
                cal:cal,
                meas_timestamp: meas_timestamp
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === VAL.NORMAL) {
                    buttonFnc.clearFnc();
                    buttonFnc.queryFnc();
                    showSuccessDialog("保存成功");
                    // $("#update_btn").attr(VAL.ENABLED_ATTR);
            }
        },
        clearFnc: function (){
            $("input").val("");
            $("#lotId").attr(VAL.ENABLED_ATTR);
        },

        delFnc: function () {
            var selRowId, rowData, iary, inObj, outObj;
            // 获得选中的行ID
            selRowId = $("#ivGrd").jqGrid("getGridParam", "selrow");
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
                        rowData = $("#ivGrd").jqGrid("getRowData", selRowId);
                        inObj = {
                            trx_id: "FBPRETLOT",
                            action_flg: "D",
                            lot_id: rowData.lot_id,
                            evt_usr: VAL.EVT_USR
                        };
                        outObj = comTrxSubSendPostJson(inObj);
                        if (outObj.rtn_code === VAL.NORMAL) {
                            showSuccessDialog("删除成功");
                            $("#ivGrd").jqGrid("delRowData", selRowId);
                            $("input").val("");
                            $("#lotId").attr(VAL.ENABLED_ATTR);
                        }
                    }
                }
            });
        }
    };

    var iniButtonAction = function () {
        $("#query_btn").bind('click', buttonFnc.queryFnc);
        // $("#update_btn").bind('click', buttonFnc.updateFnc);
        $("#save_btn").bind('click', buttonFnc.saveFnc);
        $("#clear_btn").bind('click', buttonFnc.clearFnc);
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
        iniDateTimePicker();
    }

    pageInit();

    //jqGrid表格自适应
    function resizeFnc() {
        $('#ivGrd').changeTableLocation({
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