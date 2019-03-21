/**
 *
 */
$(document).ready(function () {
    $("form").submit(function () {
        return false;
    });

    var VAL = {
        EVT_USR: $("#userId").text(),
        FBPRETMTRL : "FBPRETMTRL",
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
        $mtrlIdText   : $("#mtrlIdText"),
        $lotIdText    : $("#lotIdText"),
        jgird :{
            $mtrlInfoDiv  : $("#mtrlInfoListDiv"),
            $mtrlInfoGrid : $("#mtrlInfoListGrd"),
            $mtrlInfoPag  : "#mtrlInfoListPg"
        },
        dialog : {
            $uploadDialog  : $("#uploadDialog"),
            $uploadFile    : $("#uploadFile"),
            $uploadSureBtn : $("#uploadSureBtn")
        },
    };

    function iniDateTimePicker() {
        laydate.render({
            elem: '#addMeasTimeText',
            type: 'datetime'
        });

    }
    var initFnc = {
        initTime: function () {
            laydate.render({
                elem: '#addMeasTimeText',
                type: 'datetime',
                format: 'yyyy-MM-dd HH:mm:ss',
                btns: ['clear', 'confirm'],
            });
        },
        initLotInfoGrd: function () {
            var itemInfoCM =
                [
                    {name: 'id',               index: 'id',                hidden: true},
                    {name: 'mtrl_no',          index: 'mtrl_no',          label: MTRL_ID_TAG,    sortable: false, width: 100},
                    {name: 'lot_no',           index: 'lot_no',           label: LOT_ID_TAG,     sortable: false, width: 100},
                    {name: 'oem_id',           index: 'oem_id',           hidden:true                                      },
                    {name: 'oem_name',         index: 'oem_name',         label: LOT_OEM_ID_TAG, sortable: false, width: 120},
                    {name: 'mtrl_vender',      index: 'mtrl_vender',      label: CUS_ID_TAG,     sortable: false, width: 100},
                    {name: 'mtrl_power',       index: 'mtrl_power',       label: EFFC_TAG,       sortable: false, width: 100},
                    {name: 'mtrl_color',       index: 'mtrl_color',       label: COLOR_TAG,      sortable: false, width: 100},
                    {name: 'mtrl_model',       index: 'mtrl_model',       label: MODEL_TAG,      sortable: false, width: 100},
                    {name: 'update_user',      index: 'update_user',      label: UPDATE_USR_TAG, sortable: false, width: 100},
                    {name: 'update_timestamp', index: 'update_timestamp', label: UPDATE_TIMESTAMP_TAG, sortable: false, width: 100}
                ];
            //调用封装的ddGrid方法
            var options = {
                scroll: true,   //支持滚动条
                fixed: true,
                shrinkToFit: true,
                viewrecords: true,
                colModel: itemInfoCM,
                pager: domObj.$mtrlInfoPag,
            }
            domObj.jgird.$mtrlInfoGrid.ddGrid(options);
        },
    }

    var buttonFnc = {
        queryFnc : function () {
            var inObj ={
                 trx_id  : VAL.FBPRETMTRL,
                 evt_usr : VAL.EVT_USR,
                 action_flg: "Q",

            }
            var mtrl_no = domObj.$mtrlIdText.val();
            var lot_no = domObj.$lotIdText.val();
            var iary = {};
            if(mtrl_no){
                iary.mtrl_no = mtrl_no;
            }
            if(lot_no){
                iary.lot_no = lot_no;
            }
            if(!$.isEmptyObject(iary)){
                inObj.iary = [iary];
            }
            var outObj = comTrxSubSendPostJson(inObj);
            if(outObj.rtn_code == _NORMAL){
                setGridInfo(outObj.oary, domObj.jgird.$mtrlInfoGrid);
            }
        },
        importBtnFnc : function () {
            domObj.dialog.$uploadFile.val(_SPACE);
            domObj.dialog.$uploadDialog.modal('show');
        },
        importSureFnc :function () {
            var excel_file = document.getElementById("uploadFile").files[0]; // js 获取文件对象
            if (!excel_file) {
                showErrorDialog("","请选择要上传的文件");
                return false;
            }
            var inObj ={
                trx_id      : VAL.FBPRETMTRL,
                action_flg  : "A",
                data_type   : "M",
                evt_usr     : VAL.EVT_USR,
                upload_file : excel_file
            }
            var outObj = comUplaod("uploadExcel.do", inObj);
            if(outObj.rtn_code != _NORMAL){
                showErrorDialog(outObj.rtn_code, outObj.rtn_mesg);
                return false;
            }
            domObj.dialog.$uploadDialog.modal('hide');
            showSuccessDialog("导入成功");
            setGridInfo(outObj.oary, domObj.jgird.$lotInfoGrid);

        },
        downLoadFnc :function () {
            if ($("#downForm").length > 0) {
                $("#downForm").remove();
            }
            var str = '<form id="downForm" action="download.do" method="post">';
            str = str + '<input type="hidden" name="fileName" id= "fileName" />';
            str = str + "</form>";
            $(str).appendTo("body");
            $("#fileName").val("扣料信息模板.xlsx");
            $("#downForm").submit();
        }
    };

    var iniButtonAction = function () {
        domObj.$query_btn.click(function () {
            buttonFnc.queryFnc();
        });
        domObj.$import_btn.click(function () {
            buttonFnc.importBtnFnc();
        });
        domObj.$downLoad_btn.click(function () {
           buttonFnc.downLoadFnc();
        });
    };


    function init(){
        initFnc.initLotInfoGrd();
        iniButtonAction();
        $('input').val(_SPACE);
    }

    init();

    //表格自适应
    function resizeFnc(){
        domObj.jgird.$mtrlInfoGrid.changeTableLocation({
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