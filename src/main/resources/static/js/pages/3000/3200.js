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
        T_FBPBISDATA : "FBPBISDATA",
        EVT_USR: $("#userId").text(), //evt_usr
    };

    /**
     * All controls's jquery object/text
     * 所有控件的jquery对象文本
     * @type {Object}
     */
    var domObj = {
        W: $(window),
        $import_btn : $("#import_btn"),
        $imgTypSel  : $("#imgTypeSl"),
        $uploadFile : $("#uploadFile"),
    };

    var initFunc = {
        initImgType :function () {
            var iary = {
                data_cate: "IMTP",
            };
            var inTrxObj = {
                trx_id     : VAL.T_FBPBISDATA,
                action_flg : 'Q',
                iary       : [iary]
            };
            var outTrxObj = comTrxSubSendPostJson(inTrxObj);
            if (outTrxObj.rtn_code == "0000000") {
                SelectDom.addSelectArr(domObj.$imgTypSel, outTrxObj.oary, "data_ext", "data_desc", "", true, false);
            }
        },
    }

    var btnFunc = {
        import_func: function () {
            var img_typ = domObj.$imgTypSel.find("option:selected").val();
            if(!img_typ){
                showErrorDialog("","请选择图片类型");
                return false;
            }

            var file_cnt = domObj.$uploadFile[0].files.length;
            if(file_cnt==0){
                showErrorDialog("","请选择要上传的图片");
            }



            var imgFiles = new Array();
            for(var i=0;i<file_cnt;i++) {
                var img_file = domObj.$uploadFile[0].files[i]; // js 获取文件对象
                imgFiles.push(img_file);
            }

            var imgInObj ={
                usr_id    : VAL.EVT_USR,
                img_typ   : img_typ,
            }

            var outObj = batchUplodImg("batchUploadImg.do", imgInObj, imgFiles);
            if(outObj.rtn_code != _NORMAL){
                showErrorDialog(outObj.rtn_code, outObj.rtn_mesg);
                return false;
            }
            showSuccessDialog("图片上传成功");
        },
    }

    /**
     * Bind button click action
     */
    var iniButtonAction = function () {
        domObj.$import_btn.click(function () {
            btnFunc.import_func();
        });
    };
    /**
     * Ini view, data and action bind
     */
    var initializationFunc = function () {
        initFunc.initImgType();
        iniButtonAction();
    };
    var batchUplodImg = function (url, inTrx, imgFiles) {
        var data = new FormData();
        $.each(inTrx,function(name,value) {
            data.append(name, value);
        });
        if(imgFiles.length >0){
           for(var i=0;i<imgFiles.length;i++){
               data.append("img_files", imgFiles[i]);
           }
        }

        var outTrx = null;
        $.ajax({
            type : "POST",
            url : url,
            async : false,// 同步
            data : data,
            cache: false,
            contentType: false,    //不可缺
            processData: false,    //不可缺
            success:function (data) {
                outTrx = JSON.parse(data);
            },
            error : function(xhr, stat, e){
                console.error(xhr);
            }
        })
        return outTrx;
    }

    initializationFunc();
    //表格自适应
});