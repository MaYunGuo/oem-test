$(document)
    .ready(
        function() {
            function initCookie() {
                var cookievalue;
                var arr = document.cookie.split(";");
                for(var i=0,len=arr.length;i<len;i++){
                    var item = arr[i].split("=");
                    if($.trim(item[0]) == "ssoName"){
                        cookievalue = item[1];
                    }
                }
                $("#spanCookie").text(decodeURI(cookievalue));
                $("#spanCookie1").text(decodeURI(cookievalue));
                $("#spanCookie2").text(decodeURI(cookievalue));
            }
            initCookie();

            $("#edit").click(function () {
                $("#user_id").val($("#userId").text());
                $("#pwd").val("");
            });
            $("#sureEdit").click(function () {
                if ($.trim($("#pwd").val()) != "") {
                    var newPwd = $("#pwd").val();
                    jQuery.ajax({
                        url: "editPwd.do",
                        data: {pwd: newPwd},
                        type: "post",
                        timeout:60000,
                        async:false,
                        success: function (data) {
                            if (data) {
                                $("#myModal").modal('hide');
                                showSuccessDialog("修改成功!");
                            }
                        },
                        error: function () {
                            alert("请求失败");
                        }
                    });
                }
            });
        //    login界面
            $("#edit1").click(function () {
                $("#user_id1").val($("#userId").text());
            });
            $("#sureEdit1").click(function () {
                if ($.trim($("#pwd1").val()) != "") {
                    var newPwd = $("#pwd1").val();
                    jQuery.ajax({
                        url: "editPwd.do",
                        data: {pwd: newPwd},
                        type: "post",
                        timeout:60000,
                        async:false,
                        success: function (data) {
                            if (data == 'true') {
                                showSuccessDialog("修改成功!");
                            }
                        },
                        error: function () {
                            alert("请求失败");
                        }
                    });
                }
            });
        });