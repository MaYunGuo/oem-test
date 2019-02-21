/**
 * Format date value
 *
 * @param format
 */
Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth() + 1,
        // month
        "d+" : this.getDate(),
        // day
        "h+" : this.getHours(),
        // hour
        "m+" : this.getMinutes(),
        // minute
        "s+" : this.getSeconds(),
        // second
        "q+" : Math.floor((this.getMonth() + 3) / 3),
        // quarter
        "S" : this.getMilliseconds()
        // millisecond
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for ( var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

function checkSession(){
    var url = "jcom/findSession";
    var rtnFlg = false ;
    jQuery.ajax({
        type:"post",
        url:url,
        timeout:60000,
        async:false,
        beforeSend:function () {
        },
        complete:function () {
        },
        success:function (data) {
            var userId,sessionUser;
            userId= $("#userId").text();
            sessionUser = data.user_id;

            if(userId == sessionUser){
                rtnFlg=  true;
            }
        }
    })
    return rtnFlg;
}
function comTrxSubSendPostJson(inTrxObj, showErrDlg) {
//	if(!checkSession()){
//		showErrorDialog("","登陆用户已经变更，请刷新页面重新获取个人信息");
//		return false;
//	}
    var qurl = "sendMsg.do";
    var inTrxStr = JSON.stringify(inTrxObj);
    var outTrxObj = null;
    jQuery.ajax({
        type:"post",
        url:qurl,
        timeout:60000, // TODO 1min
        data:{
            trxId : inTrxObj.trx_id,
            strInMsg:inTrxStr
        },
        async:false, // false代表等待ajax执行完毕后才执行alert("ajax执行完毕")语句;
        beforeSend:function () {
            // $("#loadingImgDiv").show();
        },
        complete:function () {// ajaxStop改为ajaxComplete也是一样的
            // $("#loadingImgDiv").hide();
        },
        success:function (data) {
            outTrxObj =  JSON.parse(data);
            var rtn_code = outTrxObj.rtn_code;
            if (rtn_code != "0000000") {
                if(showErrDlg &&
                    showErrDlg == "N" ){
                    ;
                }else{
                    // showErrorDialog(rtn_code, outTrxObj);
                    showErrorDialog(rtn_code,outTrxObj.rtn_mesg);
                    // alert(rtn_code);
                }
            }
        },
        error : function(xhr, stat, e){
            console.error(xhr);

        }

    });
    return outTrxObj;
}


/**
 * Set jqgrid infomation
 *
 * @param {[type]}
 *            data [data]
 * @param {[type]}
 *            smpGrid [jqgrid ID] 当isIngorePage等于true时 ，忽略分页效果，显示所有记录数
 */
function setGridInfo(data,smpGrid,isIngorePage,hasPage) {
    console.time("-clearGridData");
    $(smpGrid).jqGrid("clearGridData");
    console.timeEnd("-clearGridData");
    if (data != null && data != undefined) {
        if (data.length) {
            if(typeof(hasPage)==="undefined" || hasPage === false){
                if($(smpGrid).jqGrid("getGridParam","rowNum")< data.length){
                    $(smpGrid).setGridParam({rowNum:data.length});
                }
            }
            console.time("-setGridParam");
            $(smpGrid).jqGrid('setGridParam', {
                datatype : 'local',
                data     : data
            }).trigger("reloadGrid");
            console.timeEnd("-setGridParam");
        } else {
            $(smpGrid).jqGrid("addRowData", "1", data);
        }
    }
}
function setGridInfoForPaging(oubObj,data, smpGrid){
    smpGrid.jqGrid("clearGridData");
    if (data != null && data != undefined) {
        smpGrid.jqGrid('setGridParam', {
            datatype : 'local',
            data     : data,
            localReader:{
                root: function () {return data},
                page: function(object){ return oubObj.page},
                total:function(object){ return oubObj.total},
                records:function(object){ return oubObj.records},
                repeatitems : false
            },
        }).trigger("reloadGrid");
    }
}
function comParseFloat( str ){
    if(str == null||str == undefined ){
        return 0;
    }
    return parseFloat( parseFloat( str ).toFixed(3) );
}
function comParseInt( str ){
    if( str == null||str == undefined ||str == false ){
        return 0;
    }
    return parseInt( str , 10 );// 以10进制计算
}
function getCurrentTime(){
    var data = new Date();
    var vYear = data.getFullYear();
    var vMon = data.getMonth() + 1;
    var vDay = data.getDate();
    var h = data.getHours();
    var m = data.getMinutes();
    var se = data.getSeconds();
    var stime=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay)+" "+(h<10 ? "0"+ h : h)+":"+(m<10 ? "0" + m : m)+":"+(se<10 ? "0" +se : se);
    return stime;
}
function comCheckMaxLenth(str,maxLen){
    if( comGetStrLen(str) > maxLen ){
        return false;
    }
    return true;
}
/*******************************************************************************
 * 判断长度,中文长度加2，英文长度加1
 ******************************************************************************/
function comGetStrLen(str) {
    var strlen = 0;
    var l = str.length;
    for (var i = 0; i < l; i++) {
        // 全角字符
        if (str.charCodeAt(i) < 0 ||  str.charCodeAt(i) > 255)
            strlen = strlen + 2;
        else
            strlen++;
    }
    return strlen  ;
}
/*******************************************************************************
 * 判断是否包含中文
 ******************************************************************************/
function comCheckNotHasChn(str)  {
    var patrn= /[u4E00-u9FA5]|[uFE30-uFFA0]/gi;
    if (patrn.exec(str)){
        return false;
    }else{
        return true;
    }
}

function addValueByDataCateFnc(selectObj,data_cate,dataItem, firstSpace){
    var selectTxt = $(selectObj).find("option:selected").text();
    $(selectObj).empty();
    var iary = {
        data_cate : data_cate
    };
    var inTrxObj = {
        trx_id      : 'FBPBISDATA' ,
        action_flg : 'Q'        ,
        iary        : [iary]
    };
    var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
    if(  outTrxObj.rtn_code == "0000000" ) {
        if(firstSpace === true){
            $(selectObj).append("<option ></option>");
        }
        var tbl_cnt = comParseInt( outTrxObj.tbl_cnt);
        if( tbl_cnt == 1 ){
            $(selectObj).append("<option value="+ outTrxObj.oary[0][dataItem] +">"+ outTrxObj.oary[0][dataItem] +"</option>")
        }else if(tbl_cnt>1){
            for(var i=0;i<tbl_cnt;i++){
                $(selectObj).append("<option value="+ outTrxObj.oary[i][dataItem] +">"+ outTrxObj.oary[i][dataItem] +"</option>");
            }

        }
    }
    $(selectObj).val(selectTxt);
    $(selectObj).select2({
        theme : "bootstrap"
    });
}

function getGridNewRowID(jqGridID){
    var rowIDs = $(jqGridID).jqGrid("getDataIDs");
    if(rowIDs.length==0){
        return 1;
    }
    return parseInt(rowIDs[rowIDs.length-1],10) + 1 ;
}

function getGridNewFirstRowID(jqGridID){
    var rowIDs = $(jqGridID).jqGrid("getDataIDs");
    if(rowIDs.length==0){
        return 1;
    }
    return rowIDs[0] + 1 ;
}

function setSelectObjByinTrx(selectObj,inTrxObj,item){
    var selectTxt = $(selectObj).find("option:selected").text();
    $(selectObj).empty();
    var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
    if(  outTrxObj.rtn_code == "0000000" ) {
        var tbl_cnt = comParseInt( outTrxObj.tbl_cnt);
        if( tbl_cnt == 1 ){
            $(selectObj).append("<option value="+ outTrxObj.oary[0][item] +">"+ outTrxObj.oary[0][item] +"</option>")
        }else if(tbl_cnt>1){
            for(var i=0;i<tbl_cnt;i++){
                $(selectObj).append("<option value="+ outTrxObj.oary[i][item] +">"+ outTrxObj.oary[i][item] +"</option>");
            }
        }
    }
    $(selectObj).val(selectTxt);
    $(selectObj).select2({
        theme : "bootstrap"
    });
}

// function setSelectPthBySwt(selectObj,inTrxObj,item,emptySel){
// 	  var selectTxt = $(selectObj).find("option:selected").text();
// 	   $(selectObj).empty();
// 	   var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
// 	   if(  outTrxObj.rtn_code == "0000000" ) {
// 	        var tbl_cnt = comParseInt( outTrxObj.tbl_cnt);
// 	        if(tbl_cnt == 0){
// 	        	var tbl_cnt_a = comParseInt( outTrxObj.tbl_cnt_a);
// 	        	if (emptySel) {
// 					$(selectObj).append("<option value=''></option>");
// 				}
// 	        	if( tbl_cnt_a == 1 ){
// 	  	            $(selectObj).append("<option value="+ outTrxObj.oaryA[0][item] +">"+ outTrxObj.oaryA[0][item] +"</option>")
// 	  	        }else if(tbl_cnt_a>1){
// 	  	          for(var i=0;i<tbl_cnt_a;i++){
// 	  	            $(selectObj).append("<option value="+ outTrxObj.oaryA[i][item] +">"+ outTrxObj.oaryA[i][item] +"</option>");
// 	  	          }
// 	  	        }
// 	        }else if( tbl_cnt == 1 ){
// 	          $(selectObj).append("<option value="+ outTrxObj.oaryA[0][item] +">"+ outTrxObj.oaryA[0][item] +"</option>")
// 	        }else if(tbl_cnt>1){
// 	          for(var i=0;i<tbl_cnt;i++){
// 	            $(selectObj).append("<option value="+ outTrxObj.oaryA[i][item] +">"+ outTrxObj.oaryA[i][item] +"</option>");
// 	          }
// 	        }
// 	   }
// 	  $(selectObj).val(selectTxt);
// 	  $(selectObj).select2({
// 	  	theme : "bootstrap"
// 	  });
// 	}

function _setSelectDate(dataCnt, arr, value, text, selectID, firstSpace){
    var i,
        realCnt,
        queryObj;

    queryObj = $(selectID);
    queryObj.empty();

    if(firstSpace === true){
        queryObj.append("<option ></option>");
    }
    realCnt = parseInt( dataCnt, 10);

    if( realCnt == 1 ){
        if( arr.hasOwnProperty(value) &&
            arr.hasOwnProperty(text) ){
            queryObj.append("<option value="+ arr[value] +">"+ arr[text] +"</option>");
        }
    }else if( realCnt > 1 ){
        for( i = 0; i < realCnt; i++ ){
            if( arr[i].hasOwnProperty(value) &&
                arr[i].hasOwnProperty(text) ){
                queryObj.append("<option value="+ arr[i][value] +">"+ arr[i][text] +"</option>");
            }
        }
    }
    queryObj.select2({
        theme : "bootstrap"
    });
}
function _setOpeSelectDate(dataCnt, arr, selVal, selVal2, selTxt, queryObj, firstSpace){
    var i, realCnt;

    queryObj.empty();
    if(firstSpace === true){
        queryObj.append("<option ></option>");
    }
    realCnt = parseInt( dataCnt, 10);

    if( realCnt == 1 ){
        if( arr.hasOwnProperty(selVal)){
            queryObj.append("<option value="+ arr[selVal] + "@" + arr[selVal2] + ">"+ arr[selTxt] +"</option>");
        }
    }else if( realCnt > 1 ){
        for( i = 0; i < realCnt; i++ ){
            if( arr[i].hasOwnProperty(selVal)){
                queryObj.append("<option value="+ arr[i][selVal] + "@" + arr[i][selVal2] + ">"+ arr[i][selTxt] +"</option>");
            }
        }
    }
    queryObj.select2({
        theme : "bootstrap"
    });
}
//opeid+opever+procid+toolgid
function _setOpeSelectDateMore(dataCnt, arr, selVal, selVal2, selVal3,selVal4,selTxt, queryObj, firstSpace){
    var i, realCnt;

    queryObj.empty();
    if(firstSpace === true){
        queryObj.append("<option ></option>");
    }
    realCnt = parseInt( dataCnt, 10);

    if( realCnt == 1 ){
        if( arr.hasOwnProperty(selVal)){
            queryObj.append("<option value="+ arr[selVal] + "@" + arr[selVal2] + "@" + arr[selVal3] +"@" + arr[selVal4] +">"+ arr[selTxt] +"</option>");
        }
    }else if( realCnt > 1 ){
        for( i = 0; i < realCnt; i++ ){
            if( arr[i].hasOwnProperty(selVal)){
                queryObj.append("<option value="+ arr[i][selVal] + "@" + arr[i][selVal2] + "@" + arr[i][selVal3] +"@" + arr[i][selVal4] +">"+ arr[i][selTxt] +"</option>");
            }
        }
    }
    queryObj.select2({
        theme : "bootstrap"
    });
}

/**
 * 根据data对象设定select
 * @param $selectObj 需要处理的select元素的jquery对象
 * @param dataObj    data表的查询对象
 * @param valueItem  select的value值对应的栏位
 * @param txtItem    select的text值对应的栏位
 * @param firstSpace 首元素是否为空true标示需为空
 * @private
 */
function _setSelectByBISDataObj($selectObj, dataObj, valueItem, txtItem, firstSpace){
    var inObj,
        outObj,
        i,
        tbl_cnt,
        tmpHtml,
        selectValue = $selectObj.find("option:selected").val();

    $selectObj.empty();
    inObj = {
        trx_id      : 'FBPBISDATA' ,
        action_flg  : 'Q'        ,
        iary        : [dataObj]
    };
    outObj = comTrxSubSendPostJson(inObj);
    if(outObj.rtn_code == '0000000'){
        if(firstSpace === true){
            tmpHtml = '<option ></option>';
        }else{
            tmpHtml = '';
        }

        tbl_cnt = comParseInt(outObj.tbl_cnt);
        if( tbl_cnt == 1 ){
            if( outObj.oary.hasOwnProperty(valueItem) &&
                outObj.oary.hasOwnProperty(txtItem) ){
                tmpHtml += '<option value='+ outObj.oary[valueItem] +'>'+ outObj.oary[txtItem] +'</option>';
            }
        }else if( tbl_cnt > 1 ){
            for( i = 0; i < tbl_cnt; i++ ){
                if( outObj.oary[i].hasOwnProperty(valueItem) &&
                    outObj.oary[i].hasOwnProperty(txtItem) ){
                    tmpHtml += '<option value='+ outObj.oary[i][valueItem] +'>'+ outObj.oary[i][txtItem] +'</option>';
                }
            }
        }
        $selectObj.append(tmpHtml);
        if(selectValue){
            $selectObj.val(selectValue);
        }
    }
    $selectObj.select2({
        theme : "bootstrap"
    });
}

function setSelectObjValueTxtByData(selectObj,data_cate,valueItem,txtItem){
    var selectTxt   = $(selectObj).find("option:selected").text();
    var selectValue = $(selectObj).find("option:selected").val();
    $(selectObj).empty();
    var iary = {
        data_cate : data_cate
    };
    var inTrxObj = {
        trx_id      : 'FBPBISDATA' ,
        action_flg : 'Q'        ,
        iary        : [iary]
    };
    var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
    if(  outTrxObj.rtn_code == "0000000" ) {
        var tbl_cnt = comParseInt( outTrxObj.tbl_cnt);
        if( tbl_cnt == 1 ){
            if(outTrxObj.oary[valueItem]!=undefined&&outTrxObj.oary[txtItem]!=undefined){
                $(selectObj).append("<option value="+ outTrxObj.oary[0][valueItem] +">"+ outTrxObj.oary[0][txtItem] +"</option>")
            }

        }else if(tbl_cnt>1){
            for(var i=0;i<tbl_cnt;i++){
                if(outTrxObj.oary[i][valueItem]!=undefined&&outTrxObj.oary[i][txtItem]!=undefined){
                    $(selectObj).append("<option value="+ outTrxObj.oary[i][valueItem] +">"+ outTrxObj.oary[i][txtItem] +"</option>");
                }
            }

        }
    }
    $(selectObj).val(selectValue);
    $(selectObj).select2({
        theme : "bootstrap"
    });
}

function comAddValueByDataCateFnc(selectObj,data_cate,valItem,txtItem, firstSpace,star){
    $(selectObj).empty();
    var iary = {
        data_cate : data_cate
    };
    var inTrxObj = {
        trx_id      : 'FBPBISDATA' ,
        action_flg : 'Q'        ,
        iary        : [iary]
    };
    var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
    if(  outTrxObj.rtn_code == "0000000" ) {
        if(firstSpace === true){
            $(selectObj).append("<option ></option>");
        }
        if(star === true){
            $(selectObj).append("<option value="+ "*" +">"+ "*" +"</option>")
        }
        var tbl_cnt = comParseInt( outTrxObj.tbl_cnt);
        if( tbl_cnt == 1 ){
            $(selectObj).append("<option value="+ outTrxObj.oary[0][valItem]+">"+ outTrxObj.oary[0][txtItem] +"</option>");
        }else if(tbl_cnt>1){
            for(var i=0;i<tbl_cnt;i++){
                $(selectObj).append("<option value="+ outTrxObj.oary[i][valItem] +">"+ outTrxObj.oary[i][txtItem] +"</option>");
            }

        }
        $(selectObj).select2({
            theme : "bootstrap"
        });
    }
    $(selectObj).val("");
    $(selectObj).select2({theme : "bootstrap"});
}

/**
 * 根据权限查询线别
 * */
function comAddValueByDataCateFnc2(selectObj,data_cate,valItem,txtItem, firstSpace,star,evt_user){
    $(selectObj).empty();
    var iary = {
        data_cate : data_cate
    };
    var inTrxObj = {
        trx_id      : 'FBPBISDATA' ,
        action_flg : 'Q'        ,
        iary        : [iary],
        evt_usr: evt_user
    };
    var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
    if(  outTrxObj.rtn_code == "0000000" ) {
        if(firstSpace === true){
            $(selectObj).append("<option ></option>");
        }
        if(star === true){
            $(selectObj).append("<option value="+ "*" +">"+ "*" +"</option>")
        }
        var tbl_cnt = comParseInt( outTrxObj.tbl_cnt);
        if( tbl_cnt == 1 ){
            $(selectObj).append("<option value="+ outTrxObj.oary[0][valItem]+">"+ outTrxObj.oary[0][txtItem] +"</option>");
        }else if(tbl_cnt>1){
            for(var i=0;i<tbl_cnt;i++){
                $(selectObj).append("<option value="+ outTrxObj.oary[i][valItem] +">"+ outTrxObj.oary[i][txtItem] +"</option>");
            }

        }
        $(selectObj).select2({
            theme : "bootstrap"
        });
    }
    $(selectObj).val("");
    $(selectObj).select2({theme : "bootstrap"});
}



function comAddValueByDataCateFnc(selectObj,data_cate,valItem,txtItem, firstSpace,star){
    $(selectObj).empty();
    var iary = {
        data_cate : data_cate
    };
    var inTrxObj = {
        trx_id      : 'FBPBISDATA' ,
        action_flg : 'Q'        ,
        iary        : [iary]
    };
    var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
    if(  outTrxObj.rtn_code == "0000000" ) {
        if(firstSpace === true){
            $(selectObj).append("<option ></option>");
        }
        if(star === true){
            $(selectObj).append("<option value="+ "*" +">"+ "*" +"</option>")
        }
        var tbl_cnt = comParseInt( outTrxObj.tbl_cnt);
        if( tbl_cnt == 1 ){
            $(selectObj).append("<option value="+ outTrxObj.oary[0][valItem]+">"+ outTrxObj.oary[0][txtItem] +"</option>");
        }else if(tbl_cnt>1){
            for(var i=0;i<tbl_cnt;i++){
                $(selectObj).append("<option value="+ outTrxObj.oary[i][valItem] +">"+ outTrxObj.oary[i][txtItem] +"</option>");
            }

        }
        $(selectObj).select2({
            theme : "bootstrap"
        });
    }
    $(selectObj).val("");
    $(selectObj).select2({theme : "bootstrap"});
}

function comAddValueByDataCateLYCTFnc(selectObj,data_cate,valItem,txtItem, firstSpace){
    $(selectObj).empty();
    var iary = {
        data_cate : data_cate
    };
    var inTrxObj = {
        trx_id      : 'FBPBISDAT' ,
        action_flg : 'Q'        ,
        iary        : [iary]
    };
    var  outTrxObj = comTrxSubSendPostJson(inTrxObj);
    if(  outTrxObj.rtn_code == "0000000" ) {
        if(firstSpace === true){
            $(selectObj).append("<option ></option>");
        }
        var tbl_cnt = comParseInt( outTrxObj.tbl_cnt);
        if( tbl_cnt == 1 ){
            $(selectObj).append("<option value="+ outTrxObj.oary[0][valItem] +">"+ outTrxObj.oary[0][txtItem] +"</option>")
        }else if(tbl_cnt>1){
            for(var i=0;i<tbl_cnt;i++){
                $(selectObj).append("<option value="+ outTrxObj.oary[i][valItem] +">"+ outTrxObj.oary[i][txtItem] +"</option>");
            }

        }
        $(selectObj).select2({
            theme : "bootstrap"
        });
    }
    $(selectObj).val("");
    $(selectObj).select2({theme : "bootstrap"});
}

function getGridNewRowIDInt(jqGridID) {
    var rowIDs = $(jqGridID).jqGrid("getDataIDs");
    if (rowIDs.length == 0) {
        return 1;
    }
    return parseInt(rowIDs[rowIDs.length - 1],10 ) + 1;
}

/**
 * 在Grid中查找行，找到的行背景色置为绿色，并滚动到视野内
 * @param fatherDivId grid所在的父元素ID，要能找到唯一的grid
 * @param $grid grid对象（jquery对象）
 * @param findItem 需要查找的内容在grid中的列名
 * @param findStr 需要查找的内容
 * @returns {{has: boolean, rowId: null}}
 * @private
 */
function _findRowInGrid(fatherDivId, $grid, findItem, findStr){
    var i,
        rowIds,
        rowCnt,
        $curRowElement,
        curRowData,
        scrollHeight,
        findResult = {
            has : false,
            rowId : null
        };

    rowIds = $grid.jqGrid('getDataIDs');
    rowCnt = rowIds.length;
    if(rowCnt > 0){
        for(i = 0; i < rowCnt; i++) {
            $curRowElement = $("#" + rowIds[i]);
            $curRowElement.removeClass('bg-found').addClass('ui-widget-content');
            curRowData = $grid.jqGrid('getRowData', rowIds[i]);
            if( !findResult.has &&
                curRowData.hasOwnProperty(findItem) &&
                curRowData[findItem] == findStr ){
                $curRowElement.removeClass('ui-widget-content').addClass('bg-found');
                findResult.has = true;
                findResult.rowId = rowIds[i];

                //scroll
                scrollHeight = ($curRowElement[0].rowIndex-1) * $curRowElement.height();
                $('#' + fatherDivId + ' div.ui-jqgrid-bdiv').scrollTop(scrollHeight);
            }
        }
    }

    return findResult;
}

function _findRowInGrid1(fatherDivId, $grid, findItem, findStr){
    var i,
        rowIds,
        rowCnt,
        $curRowElement,
        curRowData,
        scrollHeight,
        findResult = {
            has : false,
            rowId : null
        };

    rowIds = $grid.jqGrid('getDataIDs');
    rowCnt = rowIds.length;
    if(rowCnt > 0){
        for(i = 0; i < rowCnt; i++) {
            $curRowElement = $("#" + rowIds[i]);
            $curRowElement.removeClass('bg-found').addClass('ui-widget-content');
            curRowData = $grid.jqGrid('getRowData', rowIds[i]);
            if( curRowData.hasOwnProperty(findItem) &&
                curRowData[findItem] == findStr ){
                $curRowElement.removeClass('ui-widget-content').addClass('bg-found');
                findResult.has = true;
                findResult.rowId = rowIds[i];

                //scroll
                scrollHeight = ($curRowElement[0].rowIndex-1) * $curRowElement.height();
                $('#' + fatherDivId + ' div.ui-jqgrid-bdiv').scrollTop(scrollHeight);
            }
        }
    }

    return findResult;
}
/**
 * 检查权限function code
 */
function checkUserFunc(funCode,chkAdmFlg) {
    var qurl = "checkUserAuthority.do";
    var authoryResult = false;
    jQuery.ajax({
        type : "post",
        url : qurl,
        timeout : 60000, // TODO 1min
        data : {
            function_code : funCode,
            check_admin_flg : chkAdmFlg
        },
        async : false, // false代表等待ajax执行完毕后才执行alert("ajax执行完毕")语句;
        success : function(data) {
            authoryResult = data;
            return authoryResult;
        },
        error : function(xhr, stat, e) {
            console.error(xhr);
        }

    });
    return authoryResult;
}
/**
 * 所有button都执行权限检查
 */
$(":button").click(function(event){
//	var pageNo = window.location.search;
    var pageNo = $.query.get("opeID");
    var btnId = this.id;
    var key ="p_"+pageNo+"_"+btnId;
    var funcCode = AuthObj[key];
    if(funcCode != undefined){
        if(checkUserFunc(funcCode,"Y")==false){
            showErrorDialog("","你没有这个按钮的权限！");
            event.stopImmediatePropagation();
        }else{

        }
    }
});

function comInitSize($w,$fatherDiv){

}
function comResize($w,$fatherDiv,$grd){
    var offsetBottom, divWidth;
    divWidth = $fatherDiv.width();
    offsetBottom = $w.height() - $fatherDiv.offset().top;
    $fatherDiv.height(offsetBottom);
    $grd.setGridWidth(divWidth);
    $grd.setGridHeight(offsetBottom * 0.99 - 51);
}

//text为两个属性
function _setSelectDate2(dataCnt, arr, value, text1,text2, selectID, firstSpace){
    var i,
        realCnt,
        queryObj;

    queryObj = $(selectID);
    queryObj.empty();

    if(firstSpace === true){
        queryObj.append("<option ></option>");
    }
    realCnt = parseInt( dataCnt, 10);

    if( realCnt == 1 ){
        if( arr.hasOwnProperty(value) &&
            arr.hasOwnProperty(text1) &&
            arr.hasOwnProperty(text2)){
            queryObj.append("<option value="+ arr[value] +">"+ arr[text1]+"@"+arr[text2] +"</option>");
        }
    }else if( realCnt > 1 ){
        for( i = 0; i < realCnt; i++ ){
            if( arr[i].hasOwnProperty(value) &&
                arr[i].hasOwnProperty(text1)&&
                arr[i].hasOwnProperty(text2)){
                queryObj.append("<option value="+ arr[i][value] +">"+ arr[i][text1]+"@"+arr[i][text2] +"</option>");
            }
        }
    }
    queryObj.select2({
        theme : "bootstrap"
    });
}


function comSendAjax(type, url, inTrx) {
    var outTrx = null;
    $.ajax({
        type : type,
        url : url,
        timeout : 60000,
        async : false, // false代表等待ajax执行完毕后才执行success中语句;
        data : {
            strInMsg : ((inTrx == null) ? null : JSON.stringify(inTrx))
        },
        beforeSend : function() {
        },
        complete : function() {// ajaxStop改为ajaxComplete也是一样的
        },
        success : function(data) {
            outTrx = data;
        }
    });
    /*
     * $.ajax({ type : type, url : url, async : false,// 同步 headers : { 'Accept' :
     * 'application/json', 'Content-Type' : 'application/json' }, dataType :
     * 'json', data : { strInMsg : ( (inTrx == null) ? null :
     * JSON.stringify(inTrx) ) } }).done(function(data) { outTrx= data; });
     */
    return outTrx;
}
/**
 * 发送ajax:get,不带输入参数
 */
function comSendAjaxByGet(url) {
    var outTrx = null;
    $.ajax({
        type : "GET",
        url : url,
        async : false,// 同步
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        dataType : 'json',
        cache : false
    }).done(function(data) {
        outTrx = data;
    });
    return outTrx;
};

function comSendAjaxByPost(url, inTrx) {
    var outTrx = null;
    $.ajax({
        type : "POST",
        url : url,
        async : false,// 同步
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        dataType : 'json',
        data : JSON.stringify(inTrx)
    }).done(function(data) {
        outTrx = data;
    });
    return outTrx;
};
function comSendAjaxByPUT(url, inTrx) {
    var outTrx = null;
    $.ajax({
        type : "PUT",
        url : url,
        async : false,// 同步
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        dataType : 'json',
        data : JSON.stringify(inTrx)
    }).done(function(data) {
        outTrx = data;
    });
    return outTrx;
};
function comSendAjaxByDELETE(url, inTrx) {
    var outTrx = null;
    $.ajax({
        type : "DELETE",
        url : url,
        async : false,// 同步
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        dataType : 'json',
        data : JSON.stringify(inTrx)
    }).done(function(data) {
        outTrx = data;
    });
    return outTrx;
};

function CreateRouteBean(){
    var Bean = {
        BeanAry : [],
        initFnc  : function(outObj,node1,node2,node3){
            Bean.BeanAry.length=0;
            var i ;
            for(i=0;i<outObj.length;i++){
                Bean.BeanAry.push({
                    node:outObj[i][node1].trim(),
                    node_ver:outObj[i][node2].trim(),
                    node_dsc:outObj[i][node3].trim()
                });
            }
        },
        getDsc:function(id,ver){
            var i ;
            for(i=0;i<Bean.BeanAry.length;i++){
                if(id==Bean.BeanAry[i].node.trim() &&
                    ver==Bean.BeanAry[i].node_ver.trim()){
                    return Bean.BeanAry[i].node_dsc.trim();
                }
            }
            return "";
        },
        getVer:function(id){
            var i ;
            VerObj = new Array();
            for(i=0;i<Bean.BeanAry.length;i++){
                if(id.trim()==Bean.BeanAry[i].node.trim()){
                    var Ver={
                        ver : Bean.BeanAry[i].node_ver.trim()
                    }
                    VerObj.push(Ver);
                }
            }
            return VerObj;
        }
    };
    return Bean;
}

