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
        $add_btn      : $("#add_btn"),
        $import_btn   : $("#import_btn"),
        $downLoad_btn : $("#downLoad_btn"),
        $lotIdText    : $("#lotIdText"),
        jgird :{
            $lotInfoDiv  : $("#lotInfoListDiv"),
            $lotInfoGrid : $("#lotInfoListGrd"),
            $lotInfoPag  : "#lotInfoListPg"
        },
        dialog : {
            $addLotInfoDialog : $("#addLotInfoDialog"),
            $addLotIdText     : $("#addLotIdText"),
            $addPowerText     : $("#addPowerText"),
            $addColorText     : $("#addColorText"),
            $addGradeText     : $("#addGradeText"),
            $addCancelBtn     : $("#addCancelBtn"),
            $addSureBtn       : $("#addSureBtn"),

            $uploadDialog  : $("#uploadDialog"),
            $uploadFile    : $("#uploadFile"),
            $uploadSureBtn : $("#uploadSureBtn")
        },
    };

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
            var itemInfoCM = [
                    {name: 'lot_no'     , index: 'lot_no',              label: LOT_ID_TAG,        width: 130},
                    {name: 'iv_power', index: 'iv_power',               label: LOT_IV_POWER_TAG,  width: 120},
                    {name: 'iv_isc', index: 'iv_isc',                   label: LOT_IV_ISC_TAG,    width: 120},
                    {name: 'iv_voc', index: 'iv_voc',                   label: LOT_IV_VOC_TAG,    width: 120},
                    {name: 'iv_imp', index: 'iv_imp',                   label: LOT_IV_IMP_TAG,    width: 120},
                    {name: 'iv_vmp', index: 'iv_vmp',                   label: LOT_IV_VMP_TAG,    width: 120},
                    {name: 'iv_ff', index: 'iv_ff',                     label: LOT_IV_FF_TAG,     width: 120},
                    {name: 'iv_tmper', index: 'iv_tmper',               label: LOT_IV_TEMPER_RAG, width: 150},
                    {name: 'iv_adj_versioni', index: 'iv_adj_versioni', label: LOT_IV_CAL_TAG,    width: 120},
                    {name: 'iv_timestamp', index: 'iv_timestamp',       label: LOT_IV_TIMESTAMP,  width: 120},
                    {name: 'final_power', index: 'final_power',         label: LOT_FIN_POWER_TAG, width: 120},
                    {name: 'final_color', index: 'final_color',         label: LOT_FIN_COLOR_TAG, width: 120},
                    {name: 'final_grade', index: 'final_grade',         label: LOT_FIN_GRADE_TAG, width: 120}
             ];
            //调用封装的ddGrid方法
            var options = {
                scroll: true,   //支持滚动条
                fixed: true,
                shrinkToFit: true,
                viewrecords: true,
                colModel: itemInfoCM,
                pager: domObj.jgird.$lotInfoPag,
            }
            domObj.jgird.$lotInfoGrid.ddGrid(options);
        },
    }

    var buttonFnc = {
        queryFnc : function (lot_id) {
            var inObj ={
                trx_id  : VAL.FBPRETLOT,
                evt_usr : VAL.EVT_USR,
                action_flg: "Q",

            }
            if(lot_id){
                inObj.iary = [{
                    lot_no : lot_id
                }];
            }
            return comTrxSubSendPostJson(inObj);
        },
        addFnc : function () {
            domObj.dialog.$addLotIdText.val(_SPACE);
            domObj.dialog.$addPowerText.val(_SPACE);
            domObj.dialog.$addColorText.val(_SPACE);
            domObj.dialog.$addGradeText.val(_SPACE);
            domObj.dialog.$addLotInfoDialog.modal('show');
        },

        //更新或者新增
        saveFnc: function () {

            var lot_id = domObj.dialog.$addLotIdText.val();
            var fin_power = domObj.dialog.$addPowerText.val();
            var fin_color = domObj.dialog.$addColorText.val();
            var fin_grade = domObj.dialog.$addGradeText.val();

            if (!lot_id) {
                showErrorDialog("", "请填写批次号!");
                return false;
            }

            if (!fin_power || !ComRegex.isNumber(fin_power)) {
                showErrorDialog("", "[" + fin_power + "]不是一个有效的数字,错误");
                return false;
            }

            if (!fin_color) {
                showErrorDialog("", "请输入终检颜色信息!");
                return false;
            }

            if (!fin_grade) {
                showErrorDialog("", "请输入终检等级信息");
                return false;
            }

            var iary = {
                lot_no      : lot_id,
                final_power : fin_power,
                final_color : fin_color,
                final_grade : fin_grade
            }
            var inObj = {
                trx_id: VAL.FBPRETLOT,
                evt_usr: VAL.EVT_USR,
                action_flg: "U",
                iary : [iary]
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === _NORMAL) {
                showSuccessDialog("保存成功");
                domObj.dialog.$addLotInfoDialog.modal('hide');
                var dataObj = buttonFnc.queryFnc(lot_id);
                if(dataObj.rtn_code == _NORMAL){
                    setGridInfo(dataObj.oary, domObj.jgird.$lotInfoGrid);
                }
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
                trx_id      : VAL.FBPRETLOT,
                action_flg  : "U",
                data_type   : "F",
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
            $("#fileName").val("终检数据模板.xlsx");
            $("#downForm").submit();
        }

    };

    var iniButtonAction = function () {
        domObj.$query_btn.click(function () {
            domObj.jgird.$lotInfoGrid.jqGrid("clearGridData");
            var lot_id = domObj.$lotIdText.val();
            var dataObj = buttonFnc.queryFnc(lot_id);
            if(dataObj.rtn_code == _NORMAL){
                setGridInfo(dataObj.oary, domObj.jgird.$lotInfoGrid);
            }
        });
        domObj.$add_btn.click(function () {
            buttonFnc.addFnc();
        });
        domObj.$import_btn.click(function () {
            buttonFnc.importBtnFnc();
        });
        domObj.dialog.$uploadSureBtn.click(function () {
            buttonFnc.importSureFnc();
        });
        domObj.dialog.$addSureBtn.click(function () {
            buttonFnc.saveFnc();
        });
        domObj.$downLoad_btn.click(function () {
            buttonFnc.downLoadFnc();
        });


        domObj.dialog.$addLotIdText.keydown(function (event) {
            if (event.keyCode == 13) {
                //执行操作
                var lot_id = domObj.dialog.$addLotIdText.val();
                if(lot_id){
                    var dataObj = buttonFnc.queryFnc(lot_id);
                    if(dataObj.rtn_code == _NORMAL){
                        var oary = dataObj.oary;
                        if(oary.length == 0){
                           showErrorDialog("","批次号[" + lot_id +"]信息不存在，请确认");
                           return false;
                        }
                    }
                }
            }
        });
        domObj.dialog.$addLotIdText.blur(function () {
            //执行操作
            var lot_id = domObj.dialog.$addLotIdText.val();
            if(lot_id){
                var dataObj = buttonFnc.queryFnc(lot_id);
                if(dataObj.rtn_code == _NORMAL){
                    var oary = dataObj.oary;
                    if(oary.length == 0){
                        showErrorDialog("","批次号[" + lot_id +"]信息不存在，请确认");
                        return false;
                    }
                }
            }
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
        domObj.jgird.$lotInfoGrid.changeTableLocation({
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