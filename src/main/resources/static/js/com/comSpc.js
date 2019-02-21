

function comSendSpcJson( url, inTrxObj, showErrDlg) {
//	url:"spc/findSPCGroupMain.action",
    var qurl = url ;
    // var inTrxStr = JSON.stringify(inTrxObj);
    var outTrxObj = null;
    jQuery.ajax({
        type:"post",
        url:qurl,
        timeout:60000, //TODO 1min
        data: inTrxObj,
        async:false, //false代表等待ajax执行完毕后才执行alert("ajax执行完毕")语句;
        beforeSend:function () {
            // $("#loadingImgDiv").show();
        },
        complete:function () {// ajaxStop改为ajaxComplete也是一样的
            // $("#loadingImgDiv").hide();
        },
        success:function (data) {
            outTrxObj =  data.outTrxObj ;
        },
        error : function(xhr, stat, e){
            console.error(xhr);

        }

    });
    return outTrxObj;
}


