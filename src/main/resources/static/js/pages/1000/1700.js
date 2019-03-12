/**************************************************************************/
/*                                                                        */
/*  System  Name :  ICIM                                                  */
/*                                                                        */
/*  Description  :  OQC Grade Management                                   */
/*                                                                        */
/*  MODIFICATION HISTORY                                                  */
/*    Date     Ver     Name          Description                          */
/* ---------- ----- ----------- ----------------------------------------- */
/* 2019/03/06 N0.00                   Initial release                     */
/*                                                                        */
/**************************************************************************/

$(document).ready(function () {

    var VAL = { //val
        T_FBPRETBOX: "FBPRETBOX",
        EVT_USR: $("#userId").text(), //evt_usr
        NORMAL: "0000000", //normal
    };

    /**
     * All controls's jquery object/text
     * 所有控件的jquery对象文本
     * @type {Object}
     */
    var domObj = {
        W: $(window),
        $box_no: $("#box_no"),
        $lot_no: $("#lot_no"),
        $row_id: $("#row_id"),
        $data_type: $("#data_type"),

        button: {
            $query_btn: $("#query_btn"),
        },
        grid: {
            $dataListDiv: $("#dataListDiv"),
            $dataListGrd: $("#dataListGrd"),
            $dataListPg: $("#dataListPg"),


            $mtrlListDiv: $("#mtrlListDiv"),
            $mtrlListGrd: $("#mtrlListGrd"),
            $mtrlListPg: $("#mtrlListPg"),
        }
    };

    var iniMtrlGridInfo = function () {
        var colModel = [{name: 'lot_no', index: 'lot_no', label: "批次号", sortable: false, width: 60},
            {name: 'mtrl_no', index: 'mtrl_no', label: "物料号", sortable: false, width: 60},
            {name: 'oem_id', index: 'oem_id', label: "代工厂编号", sortable: false, width: 80,},
            {name: 'vender', index: 'vender', label: "厂家", sortable: false, width: 80},
            {name: 'power', index: 'power', label: "效率", sortable: false, width: 80},
            {name: 'color', index: 'color', label: "颜色", sortable: false, width: 80},
            {name: 'model_no', index: 'model_no', label: "型号", sortable: false, width: 80},
            {name: 'update_timestamp', index: 'update_timestamp', label: "修改时间", sortable: false, width: 80},
            {name: 'update_user', index: 'update_user', label: "修改用户User_id", sortable: false, width: 80},
            {name: 'db_timestamp', index: 'db_timestamp', label: "解析插入时间", sortable: false, width: 80}];

        domObj.grid.$mtrlListGrd.jqGrid({
            datatype: "local",
            autoheight: true,
            mtype: "POST",
            height: 370,
            autowidth: true,//宽度根据父元素自适应
            shrinkToFit: false,
            scroll: true,
            resizable: true,
            rownumbers: true,
            loadonce: true,
            viewrecords: true,
            colModel: colModel,
//				multiselect : true,
            pager: domObj.grid.$mtrlListPg,
        });
    };



    var iniGridInfo = function () {
        var colModel = [{name: 'box_no', index: 'box_no', label: "箱号", sortable: false, width: 60},
            {name: 'lot_no', index: 'lot_no', label: "批次号", sortable: false, width: 60},
            {name: 'iv_power', index: 'iv_power', label: "功率", sortable: false, width: 80,},
            {name: 'iv_isc', index: 'iv_isc', label: "ISC", sortable: false, width: 80},
            {name: 'iv_voc', index: 'iv_voc', label: "VOC", sortable: false, width: 80},
            {name: 'iv_imp', index: 'iv_imp', label: "IMP", sortable: false, width: 80},
            {name: 'iv_vmp', index: 'iv_vmp', label: "VMP", sortable: false, width: 80},
            {name: 'iv_ff', index: 'iv_ff', label: "FF", sortable: false, width: 80},
            {name: 'iv_tmper', index: 'iv_tmper', label: "温度", sortable: false, width: 80},
            {name: 'iv_adj_versioni', index: 'iv_adj_versioni', label: "校准版", sortable: false, width: 80},
            {name: 'iv_timestamp', index: 'Iv_timestamp', label: "IV测试时间", sortable: false, width: 200},
            {name: 'final_grade', index: 'Final_grade', label: "等级", sortable: false, width: 80},
            {name: 'final_power_lvl', index: 'Final_power_lvl', label: "功率档", sortable: false, width: 80},
            {name: 'final_color_lvl', index: 'Final_color_lvl', label: "颜色档", sortable: false, width: 80},
            {name: 'oqc_grade', index: 'oqc_grade', label: "OQC", sortable: false, width: 80},
            {name: 'ship_statu', index: 'ship_statu', label: "出货", sortable: false, width: 80},
            {name: 'oem_mtrl_use', index: 'oem_mtrl_use', label: "扣料信息", sortable: false, width: 60,},
            {name: 'oem_image_path1', index: 'oem_image_path1', label: "IV图片", sortable: false, width: 60},
            {name: 'oem_image_path2', index: 'oem_image_path2', label: "EL3图片", sortable: false, width: 60}];

        domObj.grid.$dataListGrd.jqGrid({
            datatype: "local",
            autoheight: true,
            mtype: "POST",
            height: 370,
            autowidth: true,//宽度根据父元素自适应
            shrinkToFit: false,
            scroll: true,
            resizable: true,
            rownumbers: true,
            loadonce: true,
            viewrecords: true,
            colModel: colModel,
//				multiselect : true,
            pager: domObj.grid.$dataListPg,
            gridComplete: function () {
            },
            // onSelectRow: function (id) {
            // },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                $("#mtrlListGrd").jqGrid("clearGridData");
                var rowData =  $("#"+rowid+">td");
                var id=rowData[1].innerHTML+"_"+rowData[2].innerHTML+"_";
                if (iCol == 17) {//显示扣料信息
                    if("null"==$("#"+id+"1").val()){
                        showErrorDialog("","信息为空！");
                        return false;
                    }
                    var data1=JSON.parse($("#"+id+"1").val());
                    for(var i=0;i<data1.length;i++){
                        var lot_no=data1[i].lot_no;
                        var mtrl_no=data1[i].mtrl_no;
                        var oem_id=data1[i].oem_id;
                        var vender=data1[i].vender;
                        var power=data1[i].power;
                        var color=data1[i].color;
                        var model_no=data1[i].model_no;
                        var update_timestamp=data1[i].update_timestamp;
                        var update_user=data1[i].update_user;
                        var db_timestamp=data1[i].db_timestamp;

                        var dataGrid = {
                        lot_no:lot_no,
                        mtrl_no:mtrl_no,
                        oem_id:oem_id,
                        vender:vender,
                         power:power,
                        color:color,
                        model_no:model_no,
                        update_timestamp:update_timestamp,
                        update_user:update_user,
                        db_timestamp:db_timestamp,
                        };
                        var newRowID = getGridNewRowID("#mtrlListGrd");
                        $("#mtrlListGrd").jqGrid("addRowData", newRowID, dataGrid);
                    };

                    //显示弹窗
                    $('#mtrlDialog').modal({
                        backdrop: 'static',
                        keyboard: false,
                        show: false
                    });
                    $('#mtrlDialog').unbind('shown.bs.modal');
                    $('#mtrlDialog').bind('shown.bs.modal');
                    $('#mtrlDialog').modal("show");

                } else if (iCol == 18) {//显示IV图片
                    if("null"==$("#"+id+"2").val()){
                        showErrorDialog("","信息为空！");
                        return false;
                    };
                    var data2=JSON.parse($("#"+id+"2").val());
                    if(data2.img_ope!="IV") {
                        showErrorDialog("", "信息为空！");
                        return false;
                    }
                    var ivPath=data2.path;
                    $('#imgDialog').modal({
                        backdrop: 'static',
                        keyboard: false,
                        show: false
                    });
                    $('#imgDialog').unbind('shown.bs.modal');
                    $('#imgDialog').bind('shown.bs.modal');
                    $("#imgPath").attr("src",null);
                    $("#imgPath").attr("src",ivPath);
                    $('#imgDialog').modal("show");
                } else if (iCol == 19) {//显示EL3图片
                    if("null"==$("#"+id+"3").val()){
                        showErrorDialog("","信息为空！");
                        return false;
                    };
                    var data3=JSON.parse($("#"+id+"3").val());
                    if(data3.img_ope!="EL3") {
                        showErrorDialog("", "信息为空！");
                        return false;
                    }
                    var el3Path=data3.path;
                    $('#imgDialog').modal({
                        backdrop: 'static',
                        keyboard: false,
                        show: false
                    });
                    $('#imgDialog').unbind('shown.bs.modal');
                    $('#imgDialog').bind('shown.bs.modal');
                    $("#imgPath").attr("src",null);
                    $("#imgPath").attr("src",el3Path);
                    $('#imgDialog').modal("show");

                }
            }

        });
    };


    var btnFunc = {
        img_show_func: function (imgPath) {

            if ($("#downForm").length > 0) {
                $("#downForm").remove();
            }
            var str = '<img src="'+imgPath+'">';
            $(str).appendTo("body");
        },
        query_func: function () {
            $("#dataListGrd").jqGrid("clearGridData");
            var box_id = domObj.$box_no.val();
            var lot_id = domObj.$lot_no.val();
            if (!box_id && !lot_id) {
                showErrorDialog("", "请输入箱号或批次号！");
                return false;
            }
            ;
            var iary = {
                box_no: box_id,
                lot_no: lot_id,
            };
            var inObj = {
                trx_id: VAL.T_FBPRETBOX,
                action_flg: 'A',
                iary: [iary]
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code == _NORMAL) {
                if (0 == outObj.tbl_cnt) {
                    showErrorDialog("", "请输入正确的箱号或批次号！");
                    return false;
                }
                ;
                //更新表格
                for (var i = 0; i < outObj.tbl_cnt; i++) {
                    //box 信息
                    var box_no = outObj.oary[i].box_no;
                    var oqc_grade = outObj.oary[i].oqc_grade;
                    var ship_statu = outObj.oary[i].ship_statu;

                    for (var j = 0; j < outObj.oary[i].lotList.length; j++) {
                        //lot 信息
                        var lot_no = outObj.oary[i].lotList[j].lot_no;
                        var iv_power = outObj.oary[i].lotList[j].iv_power;
                        var iv_isc = outObj.oary[i].lotList[j].iv_isc;
                        var iv_voc = outObj.oary[i].lotList[j].iv_voc;
                        var iv_imp = outObj.oary[i].lotList[j].iv_imp;
                        var iv_vmp = outObj.oary[i].lotList[j].iv_vmp;
                        var iv_ff = outObj.oary[i].lotList[j].iv_ff;
                        var iv_tmper = outObj.oary[i].lotList[j].iv_tmper;
                        var iv_adj_versioni = outObj.oary[i].lotList[j].iv_adj_versioni;
                        var iv_timestamp = outObj.oary[i].lotList[j].iv_timestamp;
                        var final_grade = outObj.oary[i].lotList[j].final_grade;
                        var final_power_lvl = outObj.oary[i].lotList[j].final_power_lvl;
                        var final_color_lvl = outObj.oary[i].lotList[j].final_color_lvl;
                        // var oqc_grade=outObj.oary[i].lotList[j].oqc_grade;
                        // var ship_statu=outObj.oary[i].lotList[j].ship_statu;

                        var id=box_no+"_"+lot_no+"_";

                        var oem_mtrl_use = (null==outObj.oary[i].lotList[j].mtrlUseList||outObj.oary[i].lotList[j].mtrlUseList.length==0)
                            ?"<u>查看</u><input id='"+id+"1' value='null'hidden>"
                            :"<u>查看</u><input id='"+id+"1' value='"+JSON.stringify(outObj.oary[i].lotList[j].mtrlUseList)+"'hidden>";
                        var oem_image_path1 = null==outObj.oary[i].lotList[j].imagePathList
                            ?"<u>查看</u><input id='"+id+"2' value='null'hidden>"
                            :"<u>查看</u><input id='"+id+"2' value='"+JSON.stringify(outObj.oary[i].lotList[j].imagePathList)+"'hidden>";
                        var oem_image_path2 = null==outObj.oary[i].lotList[j].imagePathList
                            ?"<u>查看</u><input id='"+id+"3' value='null'hidden>"
                            :"<u>查看</u><input id='"+id+"3' value='"+JSON.stringify(outObj.oary[i].lotList[j].imagePathList)+"'hidden>";
                        // var oem_mtrl_use=outObj.oary[i].lotList[j].oem_mtrl_use;
                        // var oem_image_path1=outObj.oary[i].lotList[j].oem_image_path1;
                        // var oem_image_path2=outObj.oary[i].lotList[j].oem_image_path2;

                        var data = {
                            box_no: box_no,
                            lot_no: lot_no,
                            iv_power: iv_power,
                            iv_isc: iv_isc,
                            iv_voc: iv_voc,
                            iv_imp: iv_imp,
                            iv_vmp: iv_vmp,
                            iv_ff: iv_ff,
                            iv_tmper: iv_tmper,
                            iv_adj_versioni: iv_adj_versioni,
                            iv_timestamp: iv_timestamp,
                            final_grade: final_grade,
                            final_power_lvl: final_power_lvl,
                            final_color_lvl: final_color_lvl,
                            oqc_grade: oqc_grade,
                            ship_statu: ship_statu,
                            oem_mtrl_use: oem_mtrl_use,
                            oem_image_path1: oem_image_path1,
                            oem_image_path2: oem_image_path2,
                        };
                        var newRowID = getGridNewRowID("#dataListGrd");
                        $("#dataListGrd").jqGrid("addRowData", newRowID, data);
                    }
                }
            }
        },
    }

    /**
     * Bind button click action
     */
    var iniButtonAction = function () {
        domObj.button.$query_btn.click(function () {
            btnFunc.query_func();
        });
    };
    /**
     * Ini view, data and action bind
     */
    var initFunc = function () {
        iniMtrlGridInfo();
        iniGridInfo();
        iniButtonAction();
    };

    initFunc();

    //表格自适应
    function resizeFnc() {
        var offsetBottom, grdDivWidth,
            offsetBottom1, grdDivWidth1;
        grdDivWidth = $("#tab1").width();
        offsetBottom = $(window).height() - $("#tab1").offset().top;

        $("#dataListDiv").width(grdDivWidth * 0.98);
        $("#dataListDiv").height(offsetBottom * 0.99);
        $("#dataListGrd").setGridWidth(grdDivWidth * 0.97);
        $("#dataListGrd").setGridHeight(offsetBottom * 0.95 - 51);


    };
    resizeFnc();
    $(window).resize(function () {
        resizeFnc();
    });
});