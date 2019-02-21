var CheckBoxDom = {
	setCheckBox : function($domObj, checkFlg) {
		if (checkFlg) {
			$domObj.attr("checked", "true");
		} else {
			$domObj.removeAttr("checked");
		}
	},
	isChecked : function($domObj) {
		return ($domObj.attr("checked") === "checked" ? true : false);
	}
};