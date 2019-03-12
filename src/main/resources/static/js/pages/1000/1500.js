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
            multiselect: true,
            multiboxonly:true,
            colModel: [
                {
                    name: 'lot_no',
                    index: 'lot_no',
                    label: "批次号",
                    width: 110
                }, {
                    name: 'iv_timestamp',
                    index: 'iv_timestamp',
                    label: "IV测试时间",
                    width: 200
                }, {
                    name: 'final_grade',
                    index: 'final_grade',
                    label: "等级",
                    width: 200
                }, {
                    name: 'final_power_lvl',
                    index: 'final_power_lvl',
                    label: "功率档",
                    width: 200
                }, {
                    name: 'final_color_lvl',
                    index: 'final_color_lvl',
                    label: "颜色档",
                    width: 200
                }],
            pager: "pickPg",//表格分页
            // onSelectRow: function (id) {
            //     $("#boxId").attr(VAL.DISABLED_ATTR);
            //     var rowData = $("#pickGrd").jqGrid("getRowData", id);
            //     $("#boxId").val(rowData.box_id);
            // }
        }
        $("#pickGrd").ddGrid(options);
    };

    var buttonFnc = {
        queryFnc: function () {
            // var box_id = $("#boxId").val();
            var lot_id = $("#lotId").val();
            var inObj = {
                trx_id: "FBPRETLOT",
                action_flg: "Q",
                lot_no: lot_id
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === VAL.NORMAL) {
                setGridInfo(outObj.oary, "#pickGrd");
            }
        },
        //更新或者新增
        saveFnc: function () {
            // 可编辑说明为新增，不可编辑说明为修改
            var box_id = $("#boxId").val();
            var rowIds = $("#pickGrd").jqGrid('getGridParam', 'selarrrow');
            if (rowIds.length === 0) {
                showErrorDialog("", "请选择需要绑定箱号的数据！");
                return false;
            }

            if (!box_id) {
                showErrorDialog("", "请填写箱号!");
                return false;
            }
            var iary = [];
            for (var i = 0; i < rowIds.length; i++) {
                var rowData = $("#pickGrd").jqGrid('getRowData', rowIds[i]);
                iary.push({
                    lot_no: rowData.lot_no
                });
            }
            var inObj = {
                trx_id: "FBPRETLOT",
                action_flg: "Y",
                box_no: box_id,
                iary:iary,
                evt_usr: VAL.EVT_USR
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === VAL.NORMAL) {
                // buttonFnc.clearFnc();
                $("input").val("");
                buttonFnc.queryFnc();
                showSuccessDialog("保存成功");
            }
        },

    };

    var iniButtonAction = function () {
        $("#query_btn").bind('click', buttonFnc.queryFnc);
        // $("#add_btn").bind('click', buttonFnc.addFnc);
        // $("#clear_btn").bind('click', buttonFnc.clearFnc);
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
        $('#pickGrd').changeTableLocation({
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