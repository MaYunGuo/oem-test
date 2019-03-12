/**
 *
 */
$(document).ready(function () {
    $("form").submit(function () {
        return false;
    });

    var VAL = {
        EVT_USR: $("#userId").text(),
        NORMAL: "0000000",
        DISABLED_ATTR: {
            "disabled": true
        },
        ENABLED_ATTR: {
            "disabled": false
        }
    };

    var domObj = {
        W: $(window)
    };

    function iniDateTimePicker() {
        laydate.render({
            elem: '#meas_timestamp',
            type: 'datetime'
        });
    }


    var buttonFnc = {
        //更新或者新增
        saveFnc: function () {
            var lot_id = $("#lotId").val();
            var power = $("#power").val();
            var isc = $("#isc").val();
            var voc = $("#voc").val();
            var imp = $("#imp").val();
            var vmp = $("#vmp").val();
            var ff = $("#ff").val();
            var temp = $("#temp").val();
            var cal = $("#cal").val();
            var meas_timestamp = $("#meas_timestamp").val();
            if (!lot_id) {
                showErrorDialog("", "请填写批次号!");
                return false;
            }

            if (power && !ComRegex.isNumber(power)) {
                showErrorDialog("", "[" + power + "]不是一个有效的数字,错误");
                return false;
            }

            if (isc && !ComRegex.isNumber(isc)) {
                showErrorDialog("", "[" + isc + "]不是一个有效的数字,错误");
                return false;
            }

            if (voc && !ComRegex.isNumber(voc)) {
                showErrorDialog("", "[" + voc + "]不是一个有效的数字,错误");
                return false;
            }

            if (imp && !ComRegex.isNumber(imp)) {
                showErrorDialog("", "[" + imp + "]不是一个有效的数字,错误");
                return false;
            }

            if (vmp && !ComRegex.isNumber(vmp)) {
                showErrorDialog("", "[" + vmp + "]不是一个有效的数字,错误");
                return false;
            }

            if (ff && !ComRegex.isNumber(ff)) {
                showErrorDialog("", "[" + ff + "]不是一个有效的数字,错误");
                return false;
            }

            if (temp && !ComRegex.isNumber(temp)) {
                showErrorDialog("", "[" + temp + "]不是一个有效的数字,错误");
                return false;
            }
            if(!cal){
                showErrorDialog("", "校准版不能为空！");
                return false;
            }
            var inObj = {
                trx_id: "FBPRETLOT",
                action_flg: "A",
                lot_no: lot_id,
                evt_usr: VAL.EVT_USR,
                iv_power: power,
                iv_isc: isc,
                iv_voc: voc,
                iv_imp: imp,
                iv_vmp: vmp,
                iv_ff: ff,
                iv_tmper: temp,
                iv_adj_versioni:cal,
                iv_timestamp: meas_timestamp
            };
            var outObj = comTrxSubSendPostJson(inObj);
            if (outObj.rtn_code === VAL.NORMAL) {
                    showSuccessDialog("保存成功");
                    $("input").val("");
            }
        },
    };

    var iniButtonAction = function () {
        $("#save_btn").bind('click', buttonFnc.saveFnc);
    };
    //页面初始化函数
    function pageInit() {
        iniButtonAction();
        iniDateTimePicker();
    }
    pageInit();
});