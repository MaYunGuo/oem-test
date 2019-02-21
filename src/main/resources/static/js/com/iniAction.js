/**
 * Created with JetBrains WebStorm.
 * User: jipeng
 * Date: 14-5-4
 * Time: 下午9:33
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {
    //To Upcase
    $('input[type="text"]').keyup(function(evt){
//        $(this).val($(this).val().toUpperCase());
    });

    //键盘事件监听
    function KeyDown(){
        var KeyObject = function(keyCode){
            this.keyCode = keyCode;
        };
        var filterKeys = [
            // new KeyObject(13),//Enter
            new KeyObject(112),//F1
            new KeyObject(113),
            new KeyObject(114),
            new KeyObject(115),
            //new KeyObject(116),// F5刷新  ,
            new KeyObject(117),
            new KeyObject(118),
            new KeyObject(119),
            new KeyObject(120),
            new KeyObject(121),
            new KeyObject(122)
            //new KeyObject(123) //F12
            //  new KeyObject(83, true)// Ctrl+S
        ];
        window.onhelp=function(){
            return false;
        };//屏蔽F1帮助
        document.onkeydown=function(event){
            for (var i = 0, len = filterKeys.length; i < len; i++) {
                var fk = filterKeys[i];

                if(event.keyCode==fk.keyCode){
                    if (navigator.userAgent.indexOf("MSIE") > 0){
                        event.keyCode=0;
                        event.returnValue=false;
                    }else {
                        event.preventDefault();  //阻止网页打开
                        event.stopPropagation();
                    }
                }
                //屏蔽Ctrl+A
                if(event.ctrlKey&&event.keyCode==65){
                    event.preventDefault();  //阻止网页打开
                    event.stopPropagation();
                }
                if(event.altKey&&event.keyCode==13){
                    event.preventDefault();  //阻止网页打开
                    event.stopPropagation();
                }
            }
        }
    }

    KeyDown();
    $("select").select2({
       	theme : "bootstrap"
   	});

});