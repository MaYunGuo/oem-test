var TimestampUtil = {
	formatTimestamp : function(objArr, prop) {
		var prop, obj, val, i, cnt,loopFlg;
		if (!objArr || objArr.length <= 0) {
			return false;
		}
		if (objArr && !this.isArray(objArr)) {
			objArr = [ objArr ];
		}
		cnt = objArr.length;
		
		loopFlg = ( typeof (prop) === "undefined" ? true : false );
		
		for (i = 0; i < cnt; i++) {
			obj = objArr[i];
			if(loopFlg){
				for (prop in obj) {
					if (obj.hasOwnProperty(prop) && prop.indexOf("timestamp") != -1) {
						val = obj[prop];
						if (val && val.length > 19) {
							obj[prop] = val.substr(0, 19);
						}
					}
				}
			}else{
				if (obj.hasOwnProperty(prop)) {
					val = obj[prop];
					if (val && val.length > 19) {
						obj[prop] = val.substr(0, 19);
					}
				}
			}

		}
		return objArr;
	},
	convertTimestamp2Date : function(timestamp) {
		timestamp = timestamp.replace(/-/g," ");
		var date = new Date(timestamp.substring(0, 10));
		date.setHours(timestamp.substring(11, 13));
		date.setMinutes(timestamp.substring(14, 16));
		date.setSeconds(timestamp.substring(17, 19));
		return date;
	},
	getCurrentTime: function (){
	  var data = new Date();
	  var vYear = data.getFullYear();
	  var vMon = data.getMonth() + 1;
	  var vDay = data.getDate();
	  var h = data.getHours(); 
	  var m = data.getMinutes(); 
	  var se = data.getSeconds(); 
	  var stime=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay)+" "+(h<10 ? "0"+ h : h)+":"+(m<10 ? "0" + m : m)+":"+(se<10 ? "0" +se : se);
	  return stime;
	},
	isArray : function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
}