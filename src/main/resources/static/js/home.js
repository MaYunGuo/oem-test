$(document).ready(function(){

    var VAL = { //val
        T_FIPINQANN : "FIPINQANN", //t_fbpbisdat
        EVT_USR : $("#userId").text(), //evt_usr
        NORMAL : "0000000", //normal
    };
    var sessionTimeOut = function () {
        var evt_usr = VAL.EVT_USR;
        if(!evt_usr){
            window.location.href="logout.do";
        }
    }
    //公告
    var listAnnounceFunc = function () {
        var leftObj = {
            trx_id: "FIPINQANN",
            action_flg: 'Q',
            announce_no: "02",
        };
        var leftOutObj = comTrxSubSendPostJson(leftObj);
        if (leftOutObj.rtn_code == _NORMAL) {
            setAnnounceFunc("02", leftOutObj.oary);
        }

        var rightObj = {
            trx_id: "FIPINQANN",
            action_flg: 'Q',
            announce_no: "03",
        };
        var rightOutObj = comTrxSubSendPostJson(rightObj);
        if (rightOutObj.rtn_code == _NORMAL) {
            setAnnounceFunc("03", rightOutObj.oary);
        }
    };

    var setAnnounceFunc = function (announce_no, data) {

        var htmlObj = "<ul>";
        for(var i=0;i<data.length;i++){
            htmlObj += "<li>" + data[i].announce_text + "</li>";
        }
        htmlObj += "</ul>";
        if ('01' == announce_no) {
            $('#mainInfoTxt').val(announce_text);
        } else if ('02' == announce_no) {
            $("#leftDetail marquee").empty();
            $("#leftDetail marquee").append(htmlObj);
        } else if ('03' == announce_no) {
            $("#rightDetail marquee").empty();
            $("#rightDetail marquee").append(htmlObj);
        }
    };

    var updateAnounceFunc = function (announce_no, obj) {
        var texts = $.trim(obj.val()).split("\n");
        var iary = new Array();
        for(var i=0;i<texts.length;i++){
           var item = {
               announce_seq : i+1,
               announce_text : texts[i],
           }
           iary.push(item);
        }
        var inTrxObj = {
            trx_id     : VAL.T_FIPINQANN,
            evt_usr    : VAL.EVT_USR,
            action_flg : 'S',
            announce_no: announce_no,
            iary       : iary
        };
        var outTrxObj = comTrxSubSendPostJson(inTrxObj);
        if (outTrxObj.rtn_code == _NORMAL) {
            showSuccessDialog("更新成功！");
            setAnnounceFunc(announce_no, outTrxObj.oary);
        } else {
            showErrorDialog("", "公告更新失败！");
        }
    };

    $('#updateAnnounce2Btn').click(function () {
        updateAnounceFunc("02", $('#leftInfoTxt'));
    });
    $('#updateAnnounce3Btn').click(function () {
        updateAnounceFunc("03", $('#rightInfoTxt'));
    });
    sessionTimeOut();
    listAnnounceFunc();
    });