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

        var VAL = {
            T_FBPRETBOX: "FBPRETBOX",
            EVT_USR: $("#userId").text(), //evt_usr
        };

        /**
         * All controls's jquery object/text
         * 所有控件的jquery对象文本
         * @type {Object}
         */
        var domObj = {
            W: $(window),
            $box_no    : $("#box_no"),
            $ship_code : $("#ship_code"),

            button: {
                $query_btn    : $("#query_btn"),
                $ship_btn     : $("#ship_btn"),
                $import_btn   : $("#import_btn"),
                $download_btn : $("#download_btn"),
            },
            grid: {
                $shipListDiv : $("#shipListDiv"),
                $shipListGrd : $("#shipListGrd"),
                $shipListPg  : "#shipListPg",
            },
            dialog : {
                $uploadDialog  : $("#uploadDialog"),
                $uploadFile    : $("#uploadFile"),
                $uploadSureBtn : $("#uploadSureBtn")
            }
        };

        var iniGridInfo = function () {
            var colModel = [
                   {name: 'box_no',     index: 'box_no',     label: BOX_ID_TAG,         sortable: false, width: 400,key:true},
                   {name: 'oqc_grade',  index: 'oqc_grade',  label: BOX_OQC_GRADE_TAG,  sortable: false, width: 400},
                   {name: 'ship_statu', index: 'ship_statu', label: BOX_SHIP_STAT_TAG,  sortable: false, width: 400,}
             ];

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
				multiselect : true,//复选框
                pager: domObj.grid.$shipListPg,
            });
        }

        var btnFunc = {
            query_func: function (box_no) {

                var inObj = {
                    trx_id     : VAL.T_FBPRETBOX,
                    action_flg : 'Q',
                    evt_usr    : VAL.EVT_USR,

                }
                if(box_no){
                   var iary ={
                       box_no : box_no
                   };
                   inObj.iary = [iary];
                }
                return comTrxSubSendPostJson(inObj);

            },
            set_ship_func: function () {
                //获取选中行的id数组
                var ids = $("#shipListGrd").jqGrid("getGridParam", "selarrrow");
                if(ids.length==0){
                    showErrorDialog("", "请先选择箱号!");
                    return false;
                }
                var iary = new Array();
                for (var i = 0; i < ids.length; i++) {
                    var rowData = domObj.grid.$shipListGrd.jqGrid("getRowData", ids[i]);
                    var data ={
                        box_no:rowData.box_no,
                    }
                    iary.push(data);
                }
                //没有出货的箱子才可以出货
                var inObj = {
                    trx_id     : VAL.T_FBPRETBOX,
                    action_flg : 'S',
                    evt_usr    : VAL.EVT_USR,
                    iary       : iary
                };
                var outObj = comTrxSubSendPostJson(inObj);
                if (outObj.rtn_code == _NORMAL) {
                    showSuccessDialog("出货成功!");
                    var oary = outObj.oary;
                    setGridInfo(oary, domObj.grid.$shipListGrd);
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
                    action_flg  : "S",
                    evt_usr     : VAL.EVT_USR,
                    data_type   : "S",
                    upload_file : excel_file
                }
                var outObj = comUplaod("uploadExcel.do", inObj);
                if(outObj.rtn_code != _NORMAL){
                    showErrorDialog(outObj.rtn_code, outObj.rtn_mesg);
                    return false;
                }
                domObj.dialog.$uploadDialog.modal('hide');
                showSuccessDialog("数据上传成功");
                var oary = $.isArray(outObj.oary) ? outObj.oary : [outObj.oary];
                setGridInfo(oary, domObj.grid.$shipListGrd);

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
                $("#fileName").val("出货模板.xlsx");
                $("#downForm").submit();
            }
        }

        /**
         * Bind button click action
         */
        var iniButtonAction = function () {
            domObj.button.$query_btn.click(function () {
                domObj.grid.$shipListGrd.jqGrid("clearGridData");
                var box_no = domObj.$box_no.val();
                var outObj = btnFunc.query_func(box_no);
                if(outObj.rtn_code == _NORMAL){
                    if(outObj.tbl_cnt ==0){
                        showErrorDialog("","没有找到箱号信息");
                        return false;
                    }
                    setGridInfo(outObj.oary, domObj.grid.$shipListGrd);
                }
            });
            domObj.button.$ship_btn.click(function () {
                btnFunc.set_ship_func();
            });
            domObj.button.$import_btn.click(function () {
                btnFunc.import_func();
            });
            domObj.dialog.$uploadSureBtn.click(function () {
                btnFunc.upload_func();
            });
            domObj.button.$download_btn.click(function () {
                btnFunc.download_func();
            });
            domObj.$box_no.keydown(function (event) {
                if(event.keyCode == 13){
                   var box_no = domObj.$box_no.val();
                   if(box_no){
                       var outObj = btnFunc.query_func(box_no);
                       if(outObj.rtn_code == _NORMAL){
                           if(outObj.tbl_cnt ==0){
                               showErrorDialog("","没有找到箱号信息");
                               return false;
                           }
                           var oary = $.isArray(outObj.oary)? outObj.oary :[outObj.oary];
                           domObj.grid.$shipListGrd.jqGrid("addRowData", oary[0].box_no, oary[0], "last");
                           domObj.grid.$shipListGrd.jqGrid('setSelection',oary[0].box_no);
                       }
                   }
                }
            })
        };

        /**
         * Ini view, data and action bind
         */
        var initializationFunc = function () {
            iniGridInfo();
            iniButtonAction();
        };

        initializationFunc();
        resizeFnc();

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

        $(window).resize(function() {
            resizeFnc();
        });

        var nodeNames = ['.ui-jqgrid-bdiv'];
        nodeNames.forEach(function(v) {
            $(v).setNiceScrollType({});   //设置滚动条样式
        });
});