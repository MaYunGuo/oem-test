$(document).ready(function(){
        //获取

        var userId = $("#spanCookie1").text();
        if (userId == "undefined" || userId == ""){
            //window.location.href="http://localhost:8080/mes-bz-web-login/";
            window.location.href="index.jsp";
        }
    //公告
    var listAnnounceFunc = function () {
        var inTrxObj = {
            trx_id: "FIPINQANN",
            action_flg: 'Q'
        };
        var outTrxObj = comTrxSubSendPostJson(inTrxObj);
        if (outTrxObj.rtn_code == "0000000") {
            var announceCount = outTrxObj.count;
            if(announceCount>0){
                for (var i = 0; i < announceCount; i++) {
                    setAnnounceFunc(outTrxObj.oary[i].announce_no, outTrxObj.oary[i].announce_text);
                }
            }

        }
        // inTrxObj = {
        //     trx_id: "XPLSTDAT",
        //     action_flg: "Q",
        //     iary: {
        //         data_cate: "SPCL"
        //     }
        // };
        // outTrxObj = comTrxSubSendPostJson(inTrxObj);
        // var href = outTrxObj.oary ? outTrxObj.oary.data_desc : "";
        // if (outTrxObj.rtn_code === "0000000" && href) {
        //     $("#spcPage").attr("href", href);
        // }
    };

    var setAnnounceFunc = function (announce_no, announce_text) {
        if ('01' == announce_no) {
            $('#mainInfoTxt').val(announce_text);
        } else if ('02' == announce_no) {
            $('#leftInfoTxt').val(announce_text);
        } else if ('03' == announce_no) {
            $('#rightInfoTxt').val(announce_text);
        }
    };
    var updateAnounceFunc = function (announce_no, announce_text) {
        var inTrxObj = {
            trx_id: "FIPINQANN",
            action_flg: 'S',
            announce_no: announce_no,
            announce_text: announce_text,
            evt_usr: userId
        };
        var outTrxObj = comTrxSubSendPostJson(inTrxObj);
        if (outTrxObj.rtn_code == "0000000") {
            showSuccessDialog("更新成功！")
        } else {
            showErrorDialog("", "公告更新失败！");
        }
    };

    $('#updateAnnounce1Btn').click(function () {
        updateAnounceFunc("01", $('#mainInfoTxt').val());
    });
    $('#updateAnnounce2Btn').click(function () {
        updateAnounceFunc("02", $('#leftInfoTxt').val());
    });
    $('#updateAnnounce3Btn').click(function () {
        updateAnounceFunc("03", $('#rightInfoTxt').val());
    });
    listAnnounceFunc();
    });