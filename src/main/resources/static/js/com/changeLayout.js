/**
 * Created by ADMIN on 2018/4/25.
 */
;(function ($) {
    $.fn.extend({
        "ddGrid": function (option) {
            var defaults = {
                url: "",
                datatype: "local",
                mtype: "POST",
                autowidth: true,
                altRows: true,
                altclass: 'altClass',
                sortorder: 'asc',
                shrinkToFit: false,
                autoScroll: false,
                resizable: true,
                loadonce: true,
                rownumbers: true,
                rownumWidth: 30,// 行号所在列的宽度
                rowNum: 50
                /* emptyrecords: true*/
            };

            option = $.extend(defaults, option);

            $(this).jqGrid(option);
        },
        "setSameValue":function(options){
            var defaults = {
                elementHeight: 0
            };

            options = $.extend(defaults, options);

            var finalHeight = options.elementHeight;

            $(this).height(finalHeight);
        },
        "changeTabHeight": function (TabOptions) {
            var defaults = {
                widthPercent: 1,
                heightPercent: 1,
                hwidthOffset: 0,
                heightOffset: 0
            }

            TabOptions = $.extend(defaults, TabOptions);

            var heightOffset = TabOptions.heightOffset;

            $(this).height($(this).find('.tab-content').height() + heightOffset);
        },
        "changeFormLocation": function (formOptions) {
            var defaults = {
                formTopSubtraction: 0
            }

            formOptions = $.extend(defaults, formOptions);

            var finalSubtractionValue = formOptions.formTopSubtraction;

            var formTopOffset =  $(window).height() - $(this).offset().top - finalSubtractionValue;
            $(this).find('.tab-content').height(formTopOffset);
        },
        "changeTableLocation": function (tableOptions) {
            var selector = "#gbox_" + $(this)[0].id;
            var $fatherDiv = $(selector).parent();
            var $tabElement = $fatherDiv.parents(".cardBox");
            var $pgElement = $(selector).find(".ui-jqgrid-pager");

            var defaults = {
                tableDiv: $fatherDiv,
                tableTab: $tabElement,
                tablePg: $pgElement,
                widthPercent: 1,
                heightPercent: 1, //高度比例
                widthOffset: 0,//父级div和表体宽度的差值
                heightOffset: 0,//父级div和表体高度的差值
                sameWidth: 0,//
                sameHeight: 0,
            }

            tableOptions = $.extend(defaults, tableOptions);


            var tableW, tableH;
            tableH = $(window).height() - $tabElement.offset().top;
            tableW = $tabElement.width();

            $fatherDiv.height('');


            var weightPercent = tableOptions.widthPercent;
            var heightPercent = tableOptions.heightPercent;

            var offsetDvalueW = tableOptions.widthOffset;
            var offsetDvalueH = tableOptions.heightOffset;

            var fatherH = $(window).height() - $tabElement.parents().find('.cardBox').eq(0).offset().top - 20;

            var finalWeight = weightPercent == 1 ? tableW * weightPercent - offsetDvalueW : tableW - offsetDvalueW;
            var finalHeight = heightPercent == 1 ? tableH - offsetDvalueH : fatherH * heightPercent - offsetDvalueH;



            var sameHeight = tableOptions.sameHeight;
            var sameWidth = tableOptions.sameWidth;
            sameWidth == 0 ? $(this).setGridWidth(finalWeight) : $(this).setGridWidth(sameWidth);
            sameHeight == 0 ? $(this).setGridHeight(finalHeight) : $(this).setGridHeight(sameHeight);

            var changeWidthFullValue = ['ui-jqgrid-view', 'ui-jqgrid-hdiv', 'ui-jqgrid-bdiv'];
            /*changeWidthFullValue.forEach(v => {
                $('.' + v).width('100%');
            });*/
            changeWidthFullValue.forEach(function(v){
                $('.' + v).width('100%');
            })
            $(selector).width('98%');
            $pgElement.width('100%');
        },
        "setNiceScrollType": function (options) {
            var defaults = {
                cursorcolor: '#A6C9E2',
                cursoropacitymax: 1,
                touchbehavior: false,
                cursorwidth: '5px',
                cursorborder: '0',
                cursorborderradius: '5px',
                autohidemode: true,
                railpadding: {top: 0, right: 5, left: 0, bottom: 0},
            }
            options = $.extend(defaults, options);
            $(this).niceScroll(options);
        }
    })
})(jQuery);