/**
 * Created by jay on 14/11/24.
 */
var createDivZone = function(options){
        'use strict';

        var $farthDiv = options.$farthDiv || null,
            rowCnt = options.rowCnt || 0,
            columnCnt = options.columnCnt || 0,
            divWidth = options.divWidth || 360,
            divHeight = options.divHeight || divWidth,
            topSumInfoAry = options.topSumInfoAry || [],
            topSumInfoAryLen = topSumInfoAry.length,
            topTitle = options.topTitle || '',
            bottomText = options.bottomText || '',
            defDataAry = options.defDataAry || [],
            defDataAryLen = defDataAry.length;

        var x, y,
            tmpHtml = '',
            tmpHtmlTopDiv = '',
            tmpHtmlTopSumDiv = '',
            tmpHtmlTopTitleDiv = '',
            tmpHtmlTbInColNoDivZone = '',
            tmpHtmlTbInCenterLeftDivZone = '',
            tmpHtmlBottomDiv = '',
            defDataGroupMap = {};

        //Def data process
        defDataGroupMap = _.countBy(defDataAry, function(itemAry){
            return itemAry[0] + '@' + itemAry[1];
        });

        console.log(defDataGroupMap);

        //顶部汇总table
        tmpHtmlTopSumDiv += "<div class='topSumDiv'>" +
            "<table class='topSumTb tCen'  border='0' cellspacing='0' cellpadding='0'>";

        for (x = 0; x < 2; x++) {
            tmpHtmlTopSumDiv += '<tr>';
            for (y = 0; y < topSumInfoAryLen; y++) {
                tmpHtmlTopSumDiv += "<td>" + topSumInfoAry[y][x] + "</td>";
            }
            tmpHtmlTopSumDiv += '</tr>';
        }
        tmpHtmlTopSumDiv += "</table></div>";

        //顶部标题
        tmpHtmlTopTitleDiv += "<div class='topTitleDiv tCen'>"+ topTitle + "</div>";

        tmpHtmlTopDiv = "<div class='topDiv'>" +
            tmpHtmlTopSumDiv + tmpHtmlTopTitleDiv +
            "</div>";

        //行number
        tmpHtmlTbInColNoDivZone += "<table class='tbInColNoDivZone tCen'><tr>";
        tmpHtmlTbInColNoDivZone += "<td class='fistTdInColNoDivZone'></td>";
        for (y = 1; y <= columnCnt; y++) {
            tmpHtmlTbInColNoDivZone += "<td>" + y + "</td>";
        }
        tmpHtmlTbInColNoDivZone += "</tr></table>";

        //中部左侧列number
        tmpHtmlTbInCenterLeftDivZone += "<table class='tbInCenterLeftDivZone tCen'>";
        for (x = 1; x <= rowCnt; x++) {
            tmpHtmlTbInCenterLeftDivZone += "<tr><td>" + x + "</td></tr>";
        }
        tmpHtmlTbInCenterLeftDivZone += "</table>";

        //底部文字
        tmpHtmlBottomDiv += "<div class='bottomDiv tCen'>" + bottomText +
            "</div>";

        //主体
        tmpHtml += "<div class='divZone'>" + tmpHtmlTopDiv +
            "<div class='colNoDivZone'>" + tmpHtmlTbInColNoDivZone +
            "</div>" +
            "<div class='divZoneCenter'>" +
                "<div class='divZoneCenterLeft'>" + tmpHtmlTbInCenterLeftDivZone +
                "</div>" +
                "<div class='divZoneCenterRight'>" +
                    "<table class='tbZone' border='0' cellspacing='0' cellpadding='0'>";

        for (x = 1; x <= rowCnt; x++) {
            tmpHtml += "<tr>";
            for (y = 1; y <= columnCnt; y++) {
                tmpHtml += "<td>";
                if(defDataGroupMap.hasOwnProperty(x + '@' + y)){
                    tmpHtml += defDataGroupMap[x + '@' + y];
                }else{
                    tmpHtml += ' ';
                }
                tmpHtml += "</td>";
            }
            tmpHtml += "</tr>";
        }
        tmpHtml += "</table></div></div>" + tmpHtmlBottomDiv +
            "</div>";

        $farthDiv.append(tmpHtml);

        $('.divZone:last').css('width', divWidth + 'px')
            .css('height', divHeight + 'px');

        var $curTbZone = $('.tbZone:last'),
//            $tdInCurTbZone = $('.tbZone:last td'),
            $trInCurTbZone = $('.tbZone:last tr'),
            trHeight = parseInt($curTbZone.css('height'), 10)/(rowCnt) + 'px',
            trWidth =  parseInt($curTbZone.css('width'), 10)/(columnCnt) + 'px';

        $trInCurTbZone.css('height',trHeight);
//        $tdInCurTbZone.css('width',trWidth).css('height',trHeight);
        console.log(trHeight + '-' + trWidth);
    };

//    createDivZone({
//        $farthDiv : $('#mainDivZone'),
//        rowCnt : 4,
//        columnCnt : 7,
////        divWidth : 260,
//        topSumInfoAry : testTopSum1,
//        topTitle : '来料Mapping图',
//        bottomText : 'ITO端子 TFT面'
//    });
//
//    createDivZone({
//        $farthDiv : $('#mainDivZone'),
//        rowCnt : 4,
//        columnCnt : 7,
//        divWidth : 360,
//        topSumInfoAry : testTopSum2,
//        topTitle : '薄化段Mapping图',
//        bottomText : 'ITO端子 TFT面',
//        defDataAry : testDefAry1
//    });
