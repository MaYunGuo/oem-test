var _destListTool = {
    myGDestMap : {},
	ini : function() {
        'use strict';
		var i,
            inObj,
            outObj,
            tblCnt,
            tmpDestId,
            tmpDestDesc;

		inObj = {
			trx_id     : 'XPLSTDAT',
			action_flg : 'Q',
			iary : [{
				data_cate : 'LSWH'
			}]
		};
		outObj = comTrxSubSendPostJson(inObj);
		if (outObj.rtn_code === "0000000") {
			tblCnt = parseInt(outObj.tbl_cnt, 10);
            if(tblCnt > 0){
                for (i = 0; i < tblCnt; i++) {
                    tmpDestId = outObj.oary[i].data_id;
                    tmpDestDesc = outObj.oary[i].data_desc;

                    this.myGDestMap[tmpDestId] = tmpDestDesc;
                }

                return this.myGDestMap;
            }
		}

        return null;
	},
    /**
     * 给数组添加dest_desc属性
     * @param tarAry 需要处理的数组
     * @param defaultDestIdProperty 需要处理的数组中仓位属相名， 默认为dest_shop
     * @param defaultDestMap 标准仓位-描述定义
     * @param defaultDescProperty 需要生成的属性名，默认为dest_desc
     */
	addDestDesc : function(tarAry, defaultDestIdProperty, defaultDestMap, defaultDescProperty){
        var i,
            realAry = [],
            destMap = this.myGDestMap || defaultDestMap || {},
            destIdProperty = defaultDestIdProperty || 'dest_shop',
            tarProperty = defaultDescProperty || 'dest_desc';

        if($.isArray(tarAry)){
            realAry = tarAry;
        }else{
            realAry.push(tarAry);
        }

        for(i = realAry.length - 1; i >= 0; i--){
        	if (realAry[i] != undefined){
        		if(realAry[i].hasOwnProperty(destIdProperty) &&
                    destMap.hasOwnProperty(realAry[i][destIdProperty])){
                    realAry[i][tarProperty] = destMap[realAry[i][destIdProperty]];
                }
        	}
        }
        return realAry;
    }
};