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
        $startTimeText : $("#startTimeText"),
        $endTimeText   : $("#endTimeText"),
        jgird :{
            $lotInfoDiv  : $("#lotInfoListDiv"),
            $lotInfoGrid : $("#lotInfoListGrd"),
            $lotInfoPag  : "#lotInfoListPg"
        },
        dialog : {
            $addLotInfoDialog : $("#addLotInfoDialog"),
            $addLotIdText     : $("#addLotIdText"),
            $addPowerText     : $("#addPowerText"),
            $addIscText       : $("#addIscText"),
            $addVocText       : $("#addVocText"),
            $addImpText       : $("#addImpText"),
            $addVmpText       : $("#addVmpText"),
            $addFfText        : $("#addFfText"),
            $addTemperText    : $("#addTemperText"),
            $addCalText       : $("#addCalText"),
            $addMeasTimeText  : $("#addMeasTimeText"),
            $addImgFile       : $("#addImgFile"),
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
        initQueryTime:function () {
            laydate.render({
                elem: '#startTimeText',
                type: 'datetime',
                max:'nowTime',
                format: 'yyyy-MM-dd HH:mm:ss',
                btns: ['clear', 'confirm'],
            });
            laydate.render({
                elem: '#endTimeText',
                type: 'datetime',
                max:'nowTime',
                format: 'yyyy-MM-dd HH:mm:ss',
                btns: ['clear', 'confirm'],
            });
        },
        initLotInfoGrd: function () {
            var itemInfoCM =
                [{name: 'id', index: 'id', hidden: true},
                    {name: 'lot_no', index: 'lot_no', label: LOT_ID_TAG, width: 180},
                    {name: 'iv_power', index: 'iv_power', label: LOT_IV_POWER_TAG, width: 160},
                    {name: 'iv_isc', index: 'iv_isc', label: LOT_IV_ISC_TAG, width: 160},
                    {name: 'iv_voc', index: 'iv_voc', label: LOT_IV_VOC_TAG, width: 160},
                    {name: 'iv_imp', index: 'iv_imp', label: LOT_IV_IMP_TAG, width: 160},
                    {name: 'iv_vmp', index: 'iv_vmp', label: LOT_IV_VMP_TAG, width: 160},
                    {name: 'iv_ff', index: 'iv_ff', label: LOT_IV_FF_TAG, width: 160},
                    {name: 'iv_tmper', index: 'iv_tmper', label: LOT_IV_TEMPER_RAG, width: 160},
                    {name: 'iv_adj_versioni', index: 'iv_adj_versioni', label: LOT_IV_CAL_TAG, width: 160},
                    {name: 'iv_timestamp', index: 'iv_timestamp', label: LOT_IV_TIMESTAMP, width: 160}];
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
        queryFnc : function (lot_id, start_time, end_time) {
            domObj.jgird.$lotInfoGrid.jqGrid("clearGridData");
            var inObj ={
                 trx_id  : VAL.FBPRETLOT,
                 evt_usr : VAL.EVT_USR,
                 action_flg: "Q",

            }
            var iary = {};
            if(lot_id){
                iary.lot_no = lot_id;
            }
            if(start_time){
                iary.start_time = start_time;
            }
            if(end_time){
                iary.end_time = end_time;
            }
            if(!$.isEmptyObject(iary)){
                inObj.iary = [iary];
            }

            var outObj = comTrxSubSendPostJson(inObj);
            if(outObj.rtn_code == _NORMAL){
                setGridInfo(outObj.oary, domObj.jgird.$lotInfoGrid);
            }
        },
        addFnc : function () {
             domObj.dialog.$addLotIdText.val(_SPACE);
             domObj.dialog.$addPowerText.val(_SPACE);
             domObj.dialog.$addIscText.val(_SPACE);
             domObj.dialog.$addVocText.val(_SPACE);
             domObj.dialog.$addImpText.val(_SPACE);
             domObj.dialog.$addVmpText.val(_SPACE);
             domObj.dialog.$addFfText.val(_SPACE);
             domObj.dialog.$addTemperText.val(_SPACE);
             domObj.dialog.$addCalText.val(_SPACE);
             domObj.dialog.$addMeasTimeText.val(_SPACE);
             domObj.dialog.$addImgFile.val(_SPACE);
             initFnc.initTime();
             domObj.dialog.$addLotInfoDialog.modal('show');
        },

        //更新或者新增
        saveFnc: function () {

            var lot_id = domObj.dialog.$addLotIdText.val();
            var lot_power = domObj.dialog.$addPowerText.val();
            var lot_isc = domObj.dialog.$addIscText.val();
            var lot_voc = domObj.dialog.$addVocText.val();
            var lot_imp =  domObj.dialog.$addImpText.val();
            var lot_vmp = domObj.dialog.$addVmpText.val();
            var lot_ff = domObj.dialog.$addFfText.val();
            var lot_temper = domObj.dialog.$addTemperText.val();
            var lot_cal = domObj.dialog.$addCalText.val();
            var lot_measTime = domObj.dialog.$addMeasTimeText.val();
            var lot_img = document.getElementById("addImgFile").files[0]; // js 获取文件对象
            if (!lot_id) {
                showErrorDialog("", "请填写批次号!");
                return false;
            }

            if (!lot_power || !ComRegex.isNumber(lot_power)) {
                showErrorDialog("", "[" + lot_power + "]不是一个有效的数字,错误");
                return false;
            }

            if (!lot_isc || !ComRegex.isNumber(lot_isc)) {
                showErrorDialog("", "[" + lot_isc + "]不是一个有效的数字,错误");
                return false;
            }

            if (!lot_voc || !ComRegex.isNumber(lot_voc)) {
                showErrorDialog("", "[" + lot_voc + "]不是一个有效的数字,错误");
                return false;
            }

            if (!lot_imp || !ComRegex.isNumber(lot_imp)) {
                showErrorDialog("", "[" + lot_imp + "]不是一个有效的数字,错误");
                return false;
            }

            if (!lot_vmp || !ComRegex.isNumber(lot_vmp)) {
                showErrorDialog("", "[" + lot_vmp + "]不是一个有效的数字,错误");
                return false;
            }

            if (!lot_ff || !ComRegex.isNumber(lot_ff)) {
                showErrorDialog("", "[" + lot_ff + "]不是一个有效的数字,错误");
                return false;
            }

            if (!lot_temper || !ComRegex.isNumber(lot_temper)) {
                showErrorDialog("", "[" + lot_temper + "]不是一个有效的数字,错误");
                return false;
            }
            if(!lot_cal){
                showErrorDialog("", "校准版不能为空！");
                return false;
            }
            if(!lot_measTime){
                showErrorDialog("", "量测时间不能为空！");
                return false;
            }
            if(!lot_img){
                showErrorDialog("", "IV图片不能为空！");
                return false;
            }

            var imgInObj ={
                usr_id  : VAL.EVT_USR,
                img_typ  : "IV",
                lot_no   : lot_id,
                img_file : lot_img
            }
            var imgOutObj = comUplaod("uploadImg.do", imgInObj);
            if(imgOutObj.rtn_code !=  _NORMAL){
                showErrorDialog(imgOutObj.rtn_code,imgOutObj.rtn_mesg);
                return false;
            }

            var iary = {
                lot_no   : lot_id,
                iv_power : lot_power,
                iv_isc   : lot_isc,
                iv_voc   : lot_voc,
                iv_imp   : lot_imp,
                iv_vmp   : lot_vmp,
                iv_ff    : lot_ff,
                iv_tmper : lot_temper,
                iv_adj_versioni:lot_cal,
                iv_timestamp: lot_measTime

            }
            var inObj = {
                trx_id: VAL.FBPRETLOT,
                evt_usr: VAL.EVT_USR,
                action_flg: "A",
                iary : [iary]
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === _NORMAL) {
                showSuccessDialog("保存成功");
                domObj.dialog.$addLotInfoDialog.modal('hide');
                buttonFnc.queryFnc(lot_id,null,null);
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
                action_flg  : "A",
                data_type   : "I",
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
            $("#fileName").val("IV数据模板.xlsx");
            $("#downForm").submit();
        }


    };

    var iniButtonAction = function () {
        domObj.$query_btn.click(function () {
            var lot_id = domObj.$lotIdText.val();
            var start_time = domObj.$startTimeText.val();
            var end_time = domObj.$endTimeText.val();
            buttonFnc.queryFnc(lot_id, start_time, end_time);
        });
        domObj.$add_btn.click(function () {
            buttonFnc.addFnc();
        });
        domObj.$import_btn.click(function () {
            buttonFnc.importBtnFnc();
        });
        domObj.dialog.$addSureBtn.click(function () {
            buttonFnc.saveFnc();
        });
        domObj.dialog.$uploadSureBtn.click(function () {
            buttonFnc.importSureFnc();
        });
        domObj.$downLoad_btn.click(function () {
           buttonFnc.downLoadFnc();
        });
    };


    function init(){
        initFnc.initLotInfoGrd();
        initFnc.initQueryTime();
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