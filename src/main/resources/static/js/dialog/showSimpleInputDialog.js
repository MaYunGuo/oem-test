(function($){
    $.fn.extend({
        /**
         *
         * @param options
         *  options.itemName: tip text
         */
    	"_showSimpleInputDialog" : function(options) {
            var defaults,
                config,
                resultObj,
                inputItemName;
            defaults = {
                callbackFn : null
            };
            config = $.extend(defaults, options || {});
            resultObj = {
                keyInResult : null
            };

            //Get text to show
            if(options.hasOwnProperty("itemName")){
                inputItemName = options.itemName
            }else{
                inputItemName = " ";
            }

            bootbox.prompt(inputItemName, function(result) {
                if (result === null) {
                    if (typeof config.callbackFn === "function") {
                        config.callbackFn(resultObj);
                    }
                } else {
                    resultObj.keyInResult = result;
                    if (typeof config.callbackFn === "function") {
                        config.callbackFn(resultObj);
                    }
                }
            });
        }
    });
})(jQuery);