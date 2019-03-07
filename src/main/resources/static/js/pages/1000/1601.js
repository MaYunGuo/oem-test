/**************************************************************************/
/*                                                                        */
/*  System  Name :  ICIM                                                  */
/*                                                                        */
/*  Description  :  OQC ship Management                                   */
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
        $box_id: $("#box_id"),
        $ship_code: $("#ship_code"),
        $fileinput: $("#fileinput"),

        button: {
            $query_btn: $("#query_btn"),
            $ok_btn: $("#ok_btn"),
            $ng_btn: $("#ng_btn"),
            $import_btn: $("#import_btn"),
            $download_btn: $("#download_btn"),
            $uploadDialog_sureBtn: $("#uploadDialog_sureBtn"),
            $uploadDialog_cancelBtn: $("#uploadDialog_cancelBtn"),
        },
        grid: {
            $uploadDialog: $("#uploadDialog"),
        }
    };


    var btnFunc = {
        query_func: function () {
            var box_id = domObj.$box_id.val();
            if (!box_id || "" == box_id) {
                showErrorDialog("", "请输入箱号！");
                return false;
            }
            var iary = {
                box_id: box_id,
            }

            var inObj = {
                trx_id: VAL.T_FBPRETBOX,
                action_flg: 'Q',
                qry_type:"Ship",
                iary: [iary]
            }
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code == _NORMAL) {
                if (0 == outObj.tbl_cnt) {
                    showErrorDialog("", "请输入正确的箱号！");
                    return false;
                }
                domObj.$ship_code.val(outObj.oary[0].ship_flg);
            }
        },
        set_ship_func: function (ship_flg) {
            var box_id = domObj.$box_id.val();
            if (!box_id || "" == box_id) {
                showErrorDialog("", "请输入箱号！");
                return false;
            }
            ;
            var iary = {
                box_id: box_id,
            };

            var inObj = {
                trx_id: VAL.T_FBPRETBOX,
                action_flg: 'Q',
                qry_type:"Ship",
                iary: [iary]
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code == _NORMAL) {
                if (0 == outObj.tbl_cnt) {
                    showErrorDialog("", "请输入正确的箱号！");
                    return false;
                }
                ;
                if ("Y"== outObj.oary[0].ship_flg) {
                    showErrorDialog("", "该箱号 已经出货!");
                    return false;
                }
                ;
                //没有判定过的箱子才开始进行判定
                var iary = {
                    box_id: box_id,
                    ship_flg: ship_flg,
                }
                var inObj2 = {
                    trx_id: VAL.T_FBPRETBOX,
                    action_flg: 'S',
                    iary: [iary]
                };
                var outObj2 = comTrxSubSendPostJson(inObj2);
                if (outObj2.rtn_code == _NORMAL) {
                    showSuccessDialog("出货成功!");
                }
            }
        },
        import_func: function () {
            $('#uploadFileName').val(null);
            $('#fileinput').val(null);
            $('#uploadDialog').modal({
                backdrop: 'static',
                keyboard: false,
                show: false
            });
            $('#uploadDialog').unbind('shown.bs.modal');
            // $('#mountGrdDialog_sureBtn').unbind('click');
            $('#uploadDialog').bind('shown.bs.modal');
            $('#uploadDialog').modal("show");
            //模态框查询按钮绑定查询函数
            // $('#uploadDialog_sureBtn').click(btnFunc.upload_func);
            $("#upload_btn").unbind("click").bind('click', function () {
                document.querySelector('#fileinput').click();
            });
            $('#uploadDialog_sureBtn').unbind("click").bind('click', function () {
                showErrorDialog("", "请选择文件！");
            });

            $('#fileinput').fileupload({
                url: "upload.do",
                formData: {trx_id: VAL.T_FBPRETBOX, action_flg: 'U',data_type:"M1601"},
                dataType: 'json',
                limitMultiFileUploads: 1,
                add: function (e, data) {
                    $('#uploadFileName').val(data.files[0].name);
                    $('#uploadDialog_sureBtn').unbind("click").bind('click', function () {
                        var fileinput = domObj.$fileinput.val();
                        if (!fileinput) {
                            showErrorDialog("", "请选择文件！");
                            return false;
                        }
                        data.submit();
                        $('#uploadDialog').modal("hide");
                    });
                },
                done: function (e, result) {
                    if (result.result.rtn_code == _NORMAL) {
                        showSuccessDialog("上传成功");
                    } else {
                        showErrorDialog("",result.result.rtn_mesg);
                    }

                },
                fail: function (e, data) {
                    // $('#versionId').val();
                    showErrorDialog("解析失败", "请检查文档内容格式!");
                }


            });


        },
        upload_func: function () {


            var fileinput = domObj.$fileinput.val();
            if (!fileinput) {
                showErrorDialog("", "请选择文件！");
                return false;
            }

            $("#trx_id").val(VAL.T_FBPRETBOX);
            $("#action_flg").val('U');

            $("#downForm").submit();
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code == _NORMAL) {
                $('#uploadDialog').modal("hide");
                if (null != outObj.rtn_mesg) {
                    showErrorDialog("", outObj.rtn_mesg);
                } else {
                    showSuccessDialog("上传成功！");
                }
            }
        },
        download_func: function () {
            var filePath = "E:/workspace_oem/oem-jn/src/main/resources/static/excelModel"
            var fileName = "出货模板.xlsx";

            if ($("#downForm").length > 0) {
                $("#downForm").remove();
            }
            var str = '<form id="downForm" action="download.do" method="post">';
            str = str + '<input type="hidden" name="filePath" id= "filePath" />';
            str = str + '<input type="hidden" name="fileName" id= "fileName" />';
            str = str + "</form>";

            $(str).appendTo("body");
            $("#filePath").val(filePath);
            $("#fileName").val(fileName);
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
            btnFunc.set_ship_func("Y");
        });
        // domObj.button.$ng_btn.click(function () {
        //     btnFunc.set_ship_func("N");
        // });
        domObj.button.$import_btn.click(function () {
            btnFunc.import_func();
        });
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
});