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




/**
 * All controls's jquery object/text
 * 所有控件的jquery对象文本
 * @type {Object}
 */


function showImg(img_typ, lot_no, oem_id){
    var imgInObj ={
        lot_no  : lot_no,
        oem_id  : oem_id,
        img_typ : img_typ
    }
    var imgOutObj = comUplaod("checkImg.do", imgInObj);
    if(imgOutObj.rtn_code !=  _NORMAL){
        showErrorDialog("","没有找到批次[" + lot_no +"]的" + img_typ +"图片");
        return false;
    }
    var width =  $("#imgDialog").width()*0.3;
    var height = $("#imgDialog").height()*0.6;

    var img_path = imgOutObj.rtn_mesg;
    $("#imgPath").attr("src", _SPACE);
    $("#titleSpan").text(_SPACE);

    $("#imgPath").attr("width", width);
    $("#imgPath").attr("height", height);
    $("#imgPath").attr("src", "showImg.do?imgPath=" + img_path);
    $("#titleSpan").text(img_typ + "图片展示");
    $("#imgDialog").modal('show');
};
function showMtrl(lot_no, oem_id){
   var inObj = {
       trx_id : "FBPRETMTRL",
       action_flg : "Q",
       iary : [{
           lot_no : lot_no,
           oem_id : oem_id,
       }]
   }
   var outObj = comTrxSubSendPostJson(inObj);
   if(outObj.rtn_code == _NORMAL){
       setGridInfo(outObj.oary, $("#mtrlListGrd"));
       $("#mtrlDialog").modal('show');
   }
}


$(document).ready(function () {

    var VAL = { //val
        T_FBPRETLOT: "FBPRETLOT",
        EVT_USR: $("#userId").text(), //evt_usr
        NORMAL: "0000000", //normal
    };

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
            $dataListPg: "#dataListPg",
        },
        dialog :{
            $mtrlDialog : $("#mtrlDialog"),
            $mtrlListGrd : $("#mtrlListGrd"),
            $mtrlListDiv: $("#mtrlListDiv"),
            $mtrlListPg: "#mtrlListPg",

            $imgDialog : $("#imgDialog"),
            $titleSpan : $("#titleSpan"),
            $imgPath   : $("#imgPath")
        }
    };

    var iniMtrlGridInfo = function () {
        var colModel = [
            {name: 'lot_no',           index: 'lot_no',           label: LOT_ID_TAG,     sortable: false, width: 120},
            {name: 'mtrl_no',          index: 'mtrl_no',          label: MTRL_ID_TAG,    sortable: false, width: 120},
            {name: 'oem_id',           index: 'oem_id',           hidden:true                                      },
            {name: 'oem_name',         index: 'oem_name',         label: LOT_OEM_ID_TAG, sortable: false, width: 120,},
            {name: 'mtrl_vender',      index: 'mtrl_vender',      label: CUS_ID_TAG,     sortable: false, width: 120},
            {name: 'mtrl_power',       index: 'mtrl_power',       label: EFFC_TAG,       sortable: false, width: 100},
            {name: 'mtrl_color',       index: 'mtrl_color',       label: COLOR_TAG,      sortable: false, width: 100},
            {name: 'mtrl_model',       index: 'mtrl_model',       label: MODEL_TAG,      sortable: false, width: 100},
            {name: 'update_usr',      index: 'update_usr',      label: UPDATE_USR_TAG, sortable: false, width:   100},
            {name: 'update_timestamp', index: 'update_timestamp', label: UPDATE_TIMESTAMP_TAG, sortable: false, width: 120},

        ];
        //调用封装的ddGrid方法
        var options = {
            datatype: "local",
            autowidth: true,//宽度根据父元素自适应
            scroll: true,   //支持滚动条
            fixed: true,
            shrinkToFit: true,
            viewrecords: true,
            colModel: colModel,
            pager: domObj.dialog.$mtrlListPg
        }
        domObj.dialog.$mtrlListGrd.ddGrid(options);
    };

    var iniGridInfo = function () {
        var colModel = [
            {name: 'box_no',          index: 'box_no',          label: BOX_ID_TAG,        sortable: false, width: 120},
            {name: 'lot_no',          index: 'lot_no',          label: LOT_ID_TAG,        sortable: false, width: 120},
            {name: 'oem_id',          index: 'oem_id',          hidden:true                                          },
            {name: 'oem_name',        index: 'oem_name',        label: LOT_OEM_ID_TAG ,   sortable: false, width: 120},
            {name: 'iv_power',        index: 'iv_power',        label: LOT_IV_POWER_TAG,  sortable: false, width: 80,},
            {name: 'iv_isc',          index: 'iv_isc',          label: LOT_IV_ISC_TAG,    sortable: false, width: 80},
            {name: 'iv_voc',          index: 'iv_voc',          label: LOT_IV_VOC_TAG,    sortable: false, width: 80},
            {name: 'iv_imp',          index: 'iv_imp',          label: LOT_IV_IMP_TAG,    sortable: false, width: 80},
            {name: 'iv_vmp',          index: 'iv_vmp',          label: LOT_IV_VMP_TAG,    sortable: false, width: 80},
            {name: 'iv_ff',           index: 'iv_ff',           label: LOT_IV_FF_TAG,     sortable: false, width: 80},
            {name: 'iv_tmper',        index: 'iv_tmper',        label: LOT_IV_TEMPER_RAG, sortable: false, width: 80},
            {name: 'iv_adj_versioni', index: 'iv_adj_versioni', label: LOT_IV_CAL_TAG,    sortable: false, width: 80},
            {name: 'iv_timestamp',    index: 'Iv_timestamp',    label: LOT_IV_TIMESTAMP,  sortable: false, width: 130},
            {name: 'final_grade',     index: 'Final_grade',     label: LOT_FIN_GRADE_TAG, sortable: false, width: 80},
            {name: 'final_power',     index: 'Final_power',     label: LOT_FIN_POWER_TAG, sortable: false, width: 80},
            {name: 'final_color',     index: 'Final_color',     label: LOT_FIN_COLOR_TAG, sortable: false, width: 80},
            {name: 'oqc_grade',       index: 'oqc_grade',       label: BOX_OQC_GRADE_TAG, sortable: false, width: 80},
            {name: 'ship_stat',       index: 'ship_stat',       label: BOX_SHIP_STAT_TAG, sortable: false, width: 80},
            {name: 'oem_mtrl_use',    index: 'oem_mtrl_use',    label: MTRL_USE_INFO_TAG, width: 80,formatter:function (value, grid, rows, stat) {
                return "<button class='btn btn-default' onclick='showMtrl(" + "\"" + rows.lot_no + "\"" + ",\""+ rows.oem_id + "\")'>查看</button>";
                }
            },
            {name :'oem_iv_img',      index: 'oem_iv_img',      label:LOT_IV_IMG_TAG,     width: 55, formatter:function (value, grid, rows, stat) {
                    var img_typ = "IV";
                    return "<button class='btn btn-default' onclick='showImg(" + "\"" + img_typ + "\"" + ",\"" + rows.lot_no + "\"" + ",\""+ rows.oem_id + "\")'>查看</button>";
                }
            },
            {
                name: 'oem_el3_img', index: 'oem_el3_img',     label: LOT_EL3_IMG_TAG,   width: 55, formatter: function (value, grid, rows, stat) {
                    var img_typ = "EL3";
                    return "<button class='btn btn-default' onclick='showImg(" + "\"" + img_typ + "\"" + ",\"" + rows.lot_no + "\"" + ",\"" + rows.oem_id + "\")'>查看</button>";
                }
            }
        ];

        //调用封装的ddGrid方法
        var options = {
            datatype: "local",
            autowidth: true,//宽度根据父元素自适应
            scroll: true,   //支持滚动条
            fixed: true,
            shrinkToFit: true,
            viewrecords: true,
            colModel: colModel,
            pager: domObj.grid.$dataListPg
        }
        domObj.grid.$dataListGrd.ddGrid(options);

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

            var inObj = {
                trx_id     : VAL.T_FBPRETLOT,
                action_flg : 'I',
                evt_usr    : VAL.EVT_USR
            };

            var box_no = domObj.$box_no.val();
            var lot_no = domObj.$lot_no.val();
            var iary = {};
            if(box_no){
                iary.box_no =box_no;
            }
            if(lot_no){
                iary.lot_no=lot_no;
            }
            if(!$.isEmptyObject(iary)){
                inObj.iary = [iary];
            }

            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code == _NORMAL) {
                if (0 == outObj.tbl_cnt) {
                    showErrorDialog("", "请输入正确的箱号或批次号！");
                    return false;
                }
                setGridInfo(outObj.oary, domObj.grid.$dataListGrd);
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
    resizeFnc();

    $(window).resize(function () {
        resizeFnc();
    });

    //表格自适应
    function resizeFnc(){
        var grdDivWidth = domObj.dialog.$mtrlDialog.width();
        var grdDivHeight = domObj.dialog.$mtrlDialog.height();
        domObj.dialog.$mtrlListDiv.width(grdDivWidth * 0.66);
        domObj.dialog.$mtrlListDiv.height(grdDivHeight * 0.4);
        domObj.dialog.$mtrlListGrd.setGridWidth(domObj.dialog.$mtrlListDiv.width() * 0.93);
        domObj.dialog.$mtrlListGrd.setGridHeight(domObj.dialog.$mtrlListDiv.height() * 0.8);

        domObj.grid.$dataListGrd.changeTableLocation({
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

    var nodeNames = ['.ui-jqgrid-bdiv'];
    nodeNames.forEach(function(v) {
        $(v).setNiceScrollType({});   //设置滚动条样式
    });
});

