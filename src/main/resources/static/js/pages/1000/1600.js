/**************************************************************************/
/*                                                                        */
/*  System  Name :  ICIM                                                  */
/*                                                                        */
/*  Description  :  OQC Management                                   */
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
        $judge_code: $("#judge_code"),
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
                iary: [iary]
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code == _NORMAL) {
                if (0 == outObj.tbl_cnt) {
                    showErrorDialog("", "请输入正确的箱号！");
                    return false;
                }
                ;
                if (null != outObj.oary[0].oqc_grade) {
                    showErrorDialog("", "该箱号已经被判定为" + outObj.oary[0].oqc_grade);
                    return false;
                }
                ;
                //没有判定过的箱子才开始进行判定
                var iary = {
                    box_id: box_id,
                    oqc_grade: oqc_grade,
                }
                var inObj2 = {
                    trx_id: VAL.T_FBPRETBOX,
                    action_flg: 'O',
                    iary: [iary]
                };
                var outObj2 = comTrxSubSendPostJson(inObj2);
                if (outObj2.rtn_code == _NORMAL) {
                    showSuccessDialog("判定成功!");
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
                formData: {trx_id: VAL.T_FBPRETBOX, action_flg: 'U'},
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
            var fileName = "OQC模板.xlsx";

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
            btnFunc.set_grade_func("OK");
        });
        domObj.button.$ng_btn.click(function () {
            btnFunc.set_grade_func("NG");
        });
        domObj.button.$import_btn.click(function () {
            btnFunc.import_func();
        });
        domObj.button.$download_btn.click(function () {
            btnFunc.download_func();
        });
    };

    // /**
    //  * Ini contorl's data
    //  */
    // var iniContorlData = function () {
    //     toolFunc.initFnc();
    //     toolFunc.iniCATESelect();
    //     toolFunc.resizeFnc();
    // };
    //
    //
    // var otherActionBind = function () {
    //     //Stop from auto commit
    //     $("form").submit(function () {
    //         return false;
    //     });
    //
    //     controlsQuery.W.resize(function () {
    //         toolFunc.resizeFnc();
    //     });
    //
    //     controlsQuery.$dataCateSel.change(function () {
    //         btnFunc.query_func();
    //         toolFunc.translateFnc();
    //     });
    // };

    /**
     * Ini view, data and action bind
     */
    var initializationFunc = function () {
        // iniGridInfo();
        iniButtonAction();
        // otherActionBind();
        // iniContorlData();
    };

    initializationFunc();
    //表格自适应
    // function resizeFnc() {
    //     $('#dataListGrd').changeTableLocation({
    //         widthOffset: 50,     //调整表格宽度
    //         heightOffset: 200,   //调整表格高度
    //     });
    //
    //     var tabs = ['.cardBoxForm']
    //     tabs.forEach(function (v) {
    //         $(v).changeTabHeight({
    //             heightOffset: 60   //合并表格边框线
    //         });
    //     });
    // };
    // resizeFnc();
    // $(window).resize(function () {
    //     resizeFnc();
    // });

    // var nodeNames = ['.ui-jqgrid-bdiv'];
    // nodeNames.forEach(function (v) {
    //     $(v).setNiceScrollType({});   //设置滚动条样式
    // });
});