/**
 *
 */
$(document).ready(function () {
    $("form").submit(function () {
        return false;
    });

    var VAL = {
        EVT_USR: $("#userId").text(),
        FBPRETLOT : "FBPRETLOT",
        DISABLED_ATTR: {
            "disabled": true
        },
        ENABLED_ATTR: {
            "disabled": false
        }
    };

    var domObj = {
        W: $(window),
        $query_btn    : $("#query_btn"),
        $import_btn   : $("#import_btn"),
        $downLoad_btn : $("#downLoad_btn"),
        $pack_btn     : $("#pack_btn"),
        $lotIdText    : $("#lotIdText"),
        $boxIdText    : $("#boxIdText"),
        grid :{
            $packListDiv  : $("#packListDiv"),
            $packListGrid : $("#packListGrd"),
            $pacListkPg   : "#pacListkPg"
        },
        dialog : {
            $uploadDialog : $("#uploadDialog"),
            $uploadFile    : $("#uploadFile"),
            $uploadSureBtn :$("#uploadSureBtn")
        }
    };

    var initFnc = {
        initGrid :function () {
            var itemInfoCM = [
                {name: 'lot_no'     ,     index: 'lot_no',              label: LOT_ID_TAG,        width: 130},
                {name: 'iv_power',        index: 'iv_power',            label: LOT_IV_POWER_TAG,  width: 120},
                {name: 'iv_isc',          index: 'iv_isc',              label: LOT_IV_ISC_TAG,    width: 120},
                {name: 'iv_voc',          index: 'iv_voc',              label: LOT_IV_VOC_TAG,    width: 120},
                {name: 'iv_imp',          index: 'iv_imp',              label: LOT_IV_IMP_TAG,    width: 120},
                {name: 'iv_vmp',          index: 'iv_vmp',              label: LOT_IV_VMP_TAG,    width: 120},
                {name: 'iv_ff',           index: 'iv_ff',               label: LOT_IV_FF_TAG,     width: 120},
                {name: 'iv_tmper',        index: 'iv_tmper',            label: LOT_IV_TEMPER_RAG, width: 150},
                {name: 'iv_adj_versioni', index: 'iv_adj_versioni',     label: LOT_IV_CAL_TAG,    width: 120},
                {name: 'iv_timestamp',    index: 'iv_timestamp',        label: LOT_IV_TIMESTAMP,  width: 120},
                {name: 'final_power',     index: 'final_power',         label: LOT_FIN_POWER_TAG, width: 120},
                {name: 'final_color',     index: 'final_color',         label: LOT_FIN_COLOR_TAG, width: 120},
                {name: 'final_grade',     index: 'final_grade',         label: LOT_FIN_GRADE_TAG, width: 120},
                {name: 'box_no',          index: 'box_no',              label: BOX_ID_TAG,        width: 140}
            ];
            //调用封装的ddGrid方法
            var options = {
                scroll: true,   //支持滚动条
                fixed: true,
                shrinkToFit: true,
                viewrecords: true,
                multiselect: true,
                colModel: itemInfoCM,
                pager: domObj.grid.$pacListkPg
            }
            domObj.grid.$packListGrid.ddGrid(options);
        },
        queryFnc: function (box_no, lot_no) {
            var inObj = {
                trx_id     : VAL.FBPRETLOT,
                action_flg : "Q",
                evt_usr    : VAL.EVT_USR,
            };

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
            if (outObj.rtn_code === _NORMAL) {
                if(outObj.oary != undefined && outObj.oary.length >0){
                    return outObj.oary;
                }
            }
            return null;
        }
    }

    var buttonFnc = {
        queryBtnFnc :function () {
            domObj.grid.$packListGrid.jqGrid("clearGridData");
            var box_no = domObj.$boxIdText.val();
            var lot_no = domObj.$lotIdText.val();
            var data = initFnc.queryFnc(box_no, lot_no);
            if(data != null){
                setGridInfo(data, domObj.grid.$packListGrid);
            }
        },
        //更新或者新增
        packBtnFnc: function () {
            // 可编辑说明为新增，不可编辑说明为修改
            var box_id = domObj.$boxIdText.val();
            if (!box_id) {
                showErrorDialog("", "请填写箱号!");
                return false;
            }

            var rowIds = domObj.grid.$packListGrid.jqGrid('getGridParam', 'selarrrow');
            if (rowIds.length === 0) {
                showErrorDialog("", "请选择需要绑定箱号的数据！");
                return false;
            }

            var iary = new Array();
            for (var i = 0; i < rowIds.length; i++) {
                var rowData = domObj.grid.$packListGrid.jqGrid('getRowData', rowIds[i]);
                iary.push({
                    box_no : box_id,
                    lot_no : rowData.lot_no
                });
            }
            var inObj = {
                trx_id     : VAL.FBPRETLOT,
                evt_usr    : VAL.EVT_USR,
                action_flg : "P",
                iary       : iary
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === _NORMAL) {
                // buttonFnc.clearFnc();
                $("input").val("");
                var data = initFnc.queryFnc(box_id,null);
                if(data != null){
                   setGridInfo(data, domObj.grid.$packListGrid);
                }
                showSuccessDialog("保存成功");
            }
        },

        importBtnFnc :function () {
            domObj.dialog.$uploadFile.val(_SPACE);
            domObj.dialog.$uploadDialog.modal('show');
        },

        uploadBtnFnc : function () {
            var excel_file = document.getElementById("uploadFile").files[0]; // js 获取文件对象
            if (!excel_file) {
                showErrorDialog("","请选择要上传的文件");
                return false;
            }
            var inObj ={
                trx_id      : VAL.FBPRETLOT,
                action_flg  : "P",
                data_type   : "P",
                evt_usr     : VAL.EVT_USR,
                upload_file : excel_file
            }
            var outObj = comUplaod("uploadExcel.do", inObj);
            if(outObj.rtn_code != _NORMAL){
                showErrorDialog(outObj.rtn_code, outObj.rtn_mesg);
                return false;
            }
            domObj.dialog.$uploadDialog.modal('hide');
            showSuccessDialog("数据上传成功");
            setGridInfo(outObj.oary, domObj.grid.$packListGrid);

        },

        downLoadFnc :function () {
            if ($("#downForm").length > 0) {
                $("#downForm").remove();
            }
            var str = '<form id="downForm" action="download.do" method="post">';
            str = str + '<input type="hidden" name="fileName" id= "fileName" />';
            str = str + "</form>";
            $(str).appendTo("body");
            $("#fileName").val("包装模板.xlsx");
            $("#downForm").submit();
        }
    };

    var iniButtonAction = function () {

       domObj.$query_btn.click(function () {
           buttonFnc.queryBtnFnc();
       });

       domObj.$pack_btn.click(function () {
           buttonFnc.packBtnFnc();
       });

       domObj.$import_btn.click(function () {
           buttonFnc.importBtnFnc();
       });
       domObj.dialog.$uploadSureBtn.click(function () {
           buttonFnc.uploadBtnFnc();
       });
       domObj.$downLoad_btn.click(function () {
           buttonFnc.downLoadFnc();
       })

       domObj.$lotIdText.keydown(function (event) {
           if(event.keyCode == 13){
               var lot_no = domObj.$lotIdText.val();
               if(lot_no){
                   var data = initFnc.queryFnc(null, lot_no);
                   if(data == null){
                       return false;
                   }
                   var rowIds = domObj.grid.$packListGrid.getDataIDs(); //获取当前显示的记录
                   if(rowIds.length > 0){
                      for(var i=0;i<rowIds.length;i++){
                          var rowData = domObj.grid.$packListGrid.jqGrid("getRowData", rowIds[i]);
                         if(rowData.lot_no == lot_no){
                             domObj.grid.$packListGrid.jqGrid("delRowData", rowIds[i]);
                             i = i-1;
                         }
                      }
                   }
                   domObj.grid.$packListGrid.jqGrid("addRowData", data[0].id,data[0],"last");
                   domObj.grid.$packListGrid.jqGrid('setSelection',data[0].id);
               }
           }
       })
    };

    domObj.W.resize(function () {
        resizeFnc();
    });


    //页面初始化函数
    function pageInit() {
        initFnc.initGrid();
        iniButtonAction();
        resizeFnc();
    }

    pageInit();
    resizeFnc();

    //表格自适应
    function resizeFnc(){
        domObj.grid.$packListGrid.changeTableLocation({
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
    $(window).resize(function() {
        resizeFnc();
    });

    var nodeNames = ['.ui-jqgrid-bdiv'];
    nodeNames.forEach(function(v) {
        $(v).setNiceScrollType({});   //设置滚动条样式
    });
});