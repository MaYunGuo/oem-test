var SelectDom = {
	isEmptyContent : function($selectDomObj) {
		var val, txt;
		val = $selectDomObj.val();
		txt = $selectDomObj.find("option:selected").text();
		if (!val) {
			return true;
		} else if (!txt) {
			return true;
		} else if (txt === " ") {
			return true;
		}
		return false;
	},
	hasTxt : function($selectDomObj, txt) {

		var $options, optCnt, i;

		$options = $($selectDomObj.selector + " option");
		optCnt = $options.length;

		for (i = 0; i < optCnt; i++) {
			if ($options[i].text === txt) {
				break;
			}
		}

		return i < optCnt ? true : false;
	},
	hasValue : function($selectDomObj, val) {
		var slector = $selectDomObj.selector;
		return $(slector + " option[value='" + val + "']").length > 0 ? true : false;
	},
	initWithValTxt: function($selectDomObj,val,txt){
		$selectDomObj.empty();
		this.addSelect($selectDomObj, val, txt);
	},
	initWithSpace : function($selectDomObj) {
		$selectDomObj.empty();
		$selectDomObj.append("<option></option>");
		$selectDomObj.select2({
	    	theme : "bootstrap"
	    });
	},
	addSelect : function($selectDomObj, val, txt) {
		txt = (typeof (txt) === "undefined" ? val : txt);
		if (val && !this.hasValue($selectDomObj, val)) {
			$selectDomObj.append("<option value=" + val + ">" + txt + "</option>");
		}
		$selectDomObj.select2({
	    	theme : "bootstrap"
	    });
	},
	setSelect : function($selectDomObj, val, txt) {
		if (val !== "" && !val) {
			return false;
		}
		if (this.hasValue($selectDomObj, val)) {
			$selectDomObj.val(val).trigger("change");
		}else if(this.hasTxt($selectDomObj, txt)){
			this.setSelectByTxt($selectDomObj,val,txt);
		}else{
			txt = txt === "" ? " " : txt
			this.addSelect($selectDomObj, val, txt);
			$selectDomObj.val(val).trigger("change");
		}
		$selectDomObj.select2({
	    	theme : "bootstrap"
	    });
	},
	setSelectByTxt : function($selectDomObj, val, txt) {
		var $options, optCnt, i;

		$options = $($selectDomObj.selector + " option");
		optCnt = $options.length;

		for (i = 0; i < optCnt; i++) {
			if ($options[i].text === txt) {
				$selectDomObj.get(0).selectedIndex = i;
				// $selectDomObj.val($options[i].value);
			}
		}
		$selectDomObj.select2({
	    	theme : "bootstrap"
	    });

	},
	SelectBean : function($selectDomObj,Value,Text,firstSpace){
		var BeanStr="",i=0;
		if(!Value){
			return false;
		}
		$selectDomObj.empty();
		if(firstSpace === true){
			BeanStr +="<option ></option>";
	    }
		for(i=0;i<Value.length;i++){
			BeanStr += "<option value="+ Value[i] +">" + Text[Value[i]] +"</option>";
		}
		$selectDomObj.empty();
		$selectDomObj.append(BeanStr);
		
		$selectDomObj.select2({
	    	theme : "bootstrap"
	    });
	},
	addSelectArr:function($selectDom,arr,valProp,txtProp,checkExistedFlg,firstSpace,star){
		var i,options;
		if(!arr){
			return false;
		}
		if(!$.isArray(arr)){
			arr = [arr];
		}
		$selectDom.empty();
		if(firstSpace === true){
            $selectDom.append("<option ></option>");
    }
        if(star === true){
            $selectDom.append("<option value="+ "*" +">"+ "*" +"</option>")
        }
		txtProp = (typeof(txtProp)==="undefined" ? valProp :txtProp);
		if(typeof(checkExistedFlg)!=="undefined" && checkExistedFlg){
			for(i=0;i<arr.length;i++){
				this.addSelect($selectDom, arr[i][valProp], arr[i][txtProp]);
			}
		}else{
			/***
			 * 提高执行效率，避免多次给Select添加元素
			 * 使用array.join("") 代替"+"拼接字符串
			 */
			options = [];
			for(i=0;i<arr.length;i++){
				options[i] = "<option value ="+ arr[i][valProp] +">" + arr[i][txtProp] + "</option>";
			}
			$selectDom.append(options.join(""));
		}
		$selectDom.select2({
	    	theme : "bootstrap"
	    });
	},
    addSelectArr_:function($selectDom,arr,valProp,txtProp1,txtProp2,firstSpace){
        var i,options;
        if(!arr){
            return false;
        }
        if(!$.isArray(arr)){
            arr = [arr];
        }
        $selectDom.empty();
        if(firstSpace === true){
            $selectDom.append("<option ></option>");
        }
        txtProp1 = (typeof(txtProp1)==="undefined" ? valProp :txtProp1);
        txtProp2 = (typeof(txtProp2)==="undefined" ? valProp :txtProp2);
        /***
         * 提高执行效率，避免多次给Select添加元素
         * 使用array.join("") 代替"+"拼接字符串
         */
        options = [];
        for(i=0;i<arr.length;i++){
            options[i] = "<option value ="+ arr[i][valProp] +">" + arr[i][txtProp1]+":"+ arr[i][txtProp2]+ "</option>";
        }
        $selectDom.append(options.join(""));
        $selectDom.select2({
            theme : "bootstrap"
        });
    },
	setSelectArr:function($selectDomObj,arr,valProp,txtProp){
		var i,oldVal,oldTxt;
		
		if(!$.isArray(arr)){
			arr = [arr];
		}
		txtProp = (typeof(txtProp)=="undefined" ? valProp :txtProp);
		oldVal = $selectDomObj.val();
		oldTxt = $selectDomObj.find("option:selected").text();
		
		for(i=0;i<length;i++){
			this.addSelect($selectDomObj, arr[i][valProp], arr[i][txtProp]);
		}
		
		this.setSelect($selectDomObj, oldVal, oldTxt);
		$selectDomObj.select2({
	    	theme : "bootstrap"
	    });
	}

};