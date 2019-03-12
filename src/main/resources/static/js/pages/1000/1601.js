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
            $box_no: $("#box_no"),
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

                $shipListDiv: $("#shipListDiv"),
                $shipListGrd: $("#shipListGrd"),
                $shipListPg: $("#shipListPg"),
            }
        };

        var iniGridInfo = function () {
            var colModel = [{name: 'box_no', index: 'box_no', label: "箱号", sortable: false, width: 400,key:true},
                {name: 'oqc_grade', index: 'oqc_grade', label: "OQC判定结果", sortable: false, width: 400},
                {name: 'ship_statu', index: 'ship_statu', label: "出货状态", sortable: false, width: 400,}];

            domObj.grid.$shipListGrd.jqGrid({
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
				// sortname:"box_no",
				multiselect : true,//复选框
                pager: domObj.grid.$shipListPg,
                gridComplete: function () {
                },
                onSelectRow: function (id) {
                },
                // onCellSelect: function (rowid, iCol, cellcontent, e) {
                // },
                // beforeSelectRow: function (rowid, e) {
                // },
            });
        }


        //获取当前表格的所有数据
        function getShipListAllData() {
            var o = domObj.grid.$shipListGrd;
            //获取当前显示的数据
            var rows = o.jqGrid('getRowData');
            var rowNum = o.jqGrid('getGridParam', 'rowNum');
            // 获取显示配置记录数量
            var total = o.jqGrid('getGridParam', 'records');
            // 获取查询得到的总记录数量
            // 设置rowNum为总记录数量并且刷新jqGrid，使所有记录现出来调用getRowData方法才能获取到所有数据
            o.jqGrid('setGridParam', {rowNum: total}).trigger('reloadGrid');
            var rows = o.jqGrid('getRowData');
            // 此时获取表格所有匹配的
            o.jqGrid('setGridParam', {rowNum: rowNum}).trigger('reloadGrid');
            // 还原原来显示的记录数量
            return rows;
        }


        var btnFunc = {
            query_func: function () {
                var box_id = domObj.$box_no.val();

                //去重
                var nowData=getShipListAllData();
                for(var i=0;i<nowData.length;i++){
                    if(box_id==nowData[i].box_no){
                        showErrorDialog("", "箱号重复！");
                        return false;
                    }
                }

                if (!box_id || "" == box_id) {
                    showErrorDialog("", "请输入箱号！");
                    return false;
                }
                var iary = {
                    box_no: box_id,
                }

                var inObj = {
                    trx_id: VAL.T_FBPRETBOX,
                    action_flg: 'Q',
                    qry_type: "Ship",
                    iary: [iary]
                }
                var outObj = comTrxSubSendPostJson(inObj);
                if (outObj.rtn_code == _NORMAL) {
                    if (0 == outObj.tbl_cnt) {
                        showErrorDialog("", "请输入正确的箱号！");
                        return false;
                    }
                    var data = {
                        box_no: outObj.oary[0].box_no,
                        oqc_grade: outObj.oary[0].oqc_grade,
                        ship_statu: outObj.oary[0].ship_statu,
                    }
                    $("#shipListGrd").jqGrid("addRowData", data.box_no, data);
                }
            },
            set_ship_func: function (ship_statu) {
                //获取选中行的id数组
                var ids = $("#shipListGrd").jqGrid("getGridParam", "selarrrow");
                if(ids==null||ids.length==0){
                    showErrorDialog("", "请先选择箱号!");
                    return false;
                }
                var iary = [];
                for (var i = 0; i < ids.length; i++) {
                    if($("#shipListGrd").getCell(ids[i], "ship_statu")=="Y"){
                        showErrorDialog("", "箱号 "+$("#shipListGrd").getCell(ids[i], "box_no")+" 已经出货!");
                        return false;
                    }
                    //选中行的时间
                    var data ={
                        box_no:$("#shipListGrd").getCell(ids[i], "box_no"),
                    }
                    iary.push(data);
                }
                    //没有出货的箱子才可以出货
                    var inObj = {
                        trx_id: VAL.T_FBPRETBOX,
                        action_flg: 'S',
                        iary: iary
                    };
                    var outObj = comTrxSubSendPostJson(inObj);
                    if (outObj.rtn_code == _NORMAL) {
                        //刷新表格
                        for (var i = 0; i < ids.length; i++) {
                            $("#shipListGrd").jqGrid('setCell',ids[i],"ship_statu","Y");
                        }
                        var nowData=getShipListAllData();
                        $('#shipListGrd').jqGrid("clearGridData");
                        for(var j=0;j<nowData.length;j++){
                            $("#shipListGrd").jqGrid("addRowData", nowData[j].box_no, nowData[j])
                        }

                        // var idslength=ids.length;
                        // for (var i = 0; i < idslength; i++) {
                        //     var rowData = $("#shipListGrd").jqGrid('getRowData',i);
                        //     rowData.ship_statu="Y";
                        //     $("#shipListGrd").jqGrid("delRowData", i);
                        //     $("#shipListGrd").jqGrid("addRowData", i, rowData);
                            // $("#shipListGrd").jqGrid('setCell',ids[i],"ship_statu","Y");
                            // $('#shipListGrd').jqGrid('saveRow',ids[i],true);
                            // $('#shipListGrd').jqGrid('saveCell',ids[i],"ship_statu");
                            // var nowData=getShipListAllData();
                            // $('#shipListGrd').jqGrid("clearGridData");


                        // }
                        showSuccessDialog("出货成功!");
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
                    formData: {trx_id: VAL.T_FBPRETBOX, action_flg: 'U', data_type: "M1601"},
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
                            showErrorDialog("", result.result.rtn_mesg);
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
            // domObj.$box_no.keydown(function (e) {
            //     if (e.which == 13) {//回车事件
            //         btnFunc.moveOut_query_func();
            //     }
            // });
            domObj.button.$query_btn.click(function () {
                btnFunc.query_func();
            });
            domObj.button.$ok_btn.click(function () {
                btnFunc.set_ship_func("Y");
            });
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
            iniGridInfo();
            iniButtonAction();
        };

        initializationFunc();
    }
);