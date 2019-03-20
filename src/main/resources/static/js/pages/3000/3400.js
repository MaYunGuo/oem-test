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
        // T_FBPBISDATA: "FBPBISDATA",
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
        $judge_code: $("#judge_code"),
        $fileinput: $("#fileinput"),

        button: {
            $query_btn: $("#query_btn"),
            $ok_btn: $("#ok_btn"),
            $ng_btn: $("#ng_btn"),
            $import_btn: $("#import_btn"),
            $download_btn: $("#download_btn"),

        },
        dialog : {
            $uploadDialog  : $("#uploadDialog"),
            $uploadFile    : $("#uploadFile"),
            $uploadSureBtn : $("#uploadSureBtn")
        }
    };


    var btnFunc = {
        query_func: function () {
            var box_no = domObj.$box_no.val();
            if (!box_no || "" == box_no) {
                showErrorDialog("", "请输入箱号！");
                return false;
            }
            var iary = {
                box_no: box_no,
            }

            var inObj = {
                trx_id: VAL.T_FBPRETBOX,
                action_flg: 'Q',
                evt_usr : VAL.EVT_USR,
                iary: [iary]
            }
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code == _NORMAL) {
                if (0 == outObj.tbl_cnt) {
                    showErrorDialog("", "请输入正确的箱号！");
                    return false;
                }
                domObj.$judge_code.val(outObj.oary[0].oqc_grade);
            }
        },
        set_grade_func: function (oqc_grade) {
            var box_no = domObj.$box_no.val();
            if (!box_no || "" == box_no) {
                showErrorDialog("", "请输入箱号！");
                return false;
            }
            //没有判定过的箱子才开始进行判定
            var iary = {
                box_no: box_no,
                oqc_grade: oqc_grade,
            }
            var inObj = {
                trx_id     : VAL.T_FBPRETBOX,
                action_flg : 'O',
                evt_usr    : VAL.EVT_USR,
                iary       : [iary]
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code == _NORMAL) {
                showSuccessDialog("判定成功!");
                var oary = $.isArray(outObj.oary)? outObj.oary :[outObj.oary];
                domObj.$box_no.val(oary[0].box_no);
                domObj.$judge_code.val(oary[0].oqc_grade);
            }
        },
        import_func: function () {
             domObj.dialog.$uploadFile.val(_SPACE);
             domObj.dialog.$uploadDialog.modal('show');
        },
        upload_func: function () {
            var excel_file = document.getElementById("uploadFile").files[0]; // js 获取文件对象
            if (!excel_file) {
                showErrorDialog("","请选择要上传的文件");
                return false;
            }
            var inObj ={
                trx_id      : VAL.T_FBPRETBOX,
                action_flg  : "O",
                evt_usr     : VAL.EVT_USR,
                data_type   : "O",
                upload_file : excel_file
            }
            var outObj = comUplaod("uploadExcel.do", inObj);
            if(outObj.rtn_code != _NORMAL){
                showErrorDialog(outObj.rtn_code, outObj.rtn_mesg);
                return false;
            }
            var oary = $.isArray(outObj.oary) ? outObj.oary : [outObj.oary];
            domObj.$box_no.val(oary[0].box_no);
            domObj.$judge_code.val(oary[0].oqc_grade);
            domObj.dialog.$uploadDialog.modal('hide');
        },
        download_func: function () {
            if ($("#downForm").length > 0) {
                $("#downForm").remove();
            }
            var str = '<form id="downForm" action="download.do" method="post">';
            str = str + '<input type="hidden" name="filePath" id= "filePath" />';
            str = str + '<input type="hidden" name="fileName" id= "fileName" />';
            str = str + "</form>";

            $(str).appendTo("body");
            $("#fileName").val("OQC模板.xlsx");
            $("#downForm").submit();
        }
    }

    /**
     * Bind button click action
     */
    var iniButtonAction = function () {
        domObj.button.$query_btn.click(function () {
            btnFunc.query_func();
        });
        domObj.button.$ok_btn.click(function () {
            btnFunc.set_grade_func("OK");
        });
        domObj.button.$ng_btn.click(function () {
            btnFunc.set_grade_func("NG");
        });
        domObj.button.$import_btn.click(function () {
            btnFunc.import_func();
        });
        domObj.dialog.$uploadSureBtn.click(function () {
            btnFunc.upload_func();
        })
        domObj.button.$download_btn.click(function () {
            btnFunc.download_func();
        });
    };
    /**
     * Ini view, data and action bind
     */
    var initializationFunc = function () {
        iniButtonAction();
    };

    initializationFunc();
    //表格自适应
});