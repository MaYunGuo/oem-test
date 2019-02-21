/**
 * 通用正则类
 */
var ComRegex = {
	isInt : function(str) {
		return /^\d+$/.test(str);
	},
	isDouble : function(str) {
		return /^\d+\.\d+$/.test(str);
	},
	isNumber : function(str) {
		// return isInt(str) || isDouble(str) ;
		return /(^\d+$)|(^\d+\.\d+$)/.test(str);
	}
};
/**
 * 检查是否是整型
 */
$("input[type='text'].intCss").blur(function() {
			var $this = $(this);
			var val = $this.val();
			if (val && !ComRegex.isInt(val)) {
				showErrorDialog("", "[" + val + "]不是一个有效的整数,错误");
				$this.val("");
			}
		});
/**
 * 检查是否是浮点型
 */
$("input[type='text'].doubleCss").blur(function() {
			var $this = $(this);
			var val = $this.val();
			if (val && !ComRegex.isDouble(val)) {
				showErrorDialog("", "[" + val + "]不是一个有效的浮点数字,错误");
				$this.val("");
			}
		});
/**
 * 检查是否是数字(整型+浮点)
 */
$("input[type='text'].numberCss").blur(function() {
			var $this = $(this);
			var val1 = $this.val();
			if(val1.indexOf("-")!=-1){
				val=val1.substring(1);
			}else{
				val=val1;
			}
			if (val && !ComRegex.isNumber(val)) {
				showErrorDialog("", "[" + val + "]不是一个有效的数字,错误");
				$this.val("");
			}
		});
