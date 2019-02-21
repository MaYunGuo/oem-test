;(function($){
    $.fn.extend({
    	"selectBayIDUnion" : function(options){

          var defaults = {
             callbackFn : null
          } 
          if (!this.length) {
             return this;
          }
          $userClick = this;//TODO Maybe we should return 'this', make sure this item can be use after this function.
          var bayid = null;
          var pfcd = null;
          if ($("#jqgridBayDialog").length > 0) {
             $("#jqgridBayDialog").remove();
          }
          if ($("#jqgridEqptDialog").length > 0) {
             $("#jqgridEqptDialog").remove();
          }
          var config = $.extend(defaults, options || {});
          var str = '<div id="jqgridBayDialog" title="'+SELECT_BAYAREA_TAG+'"> ';
          str += '<table id="jqgridBayTbl" style="font-size:1.15em;"></table>';
          str += '<div id="jqgridBayPg"></div>';
          str += '</div>';
          $(str).appendTo('body');
          str = '<div id="jqgridEqptDialog" title="'+SELECT_TOOL_TAG+'"> ';
          str += '<table id="jqgridEqptTbl" style="font-size:1.15em;"></table>';
          str += '<div id="jqgridEqptPg"></div>';
          str += '</div>';
          $(str).appendTo('body');
          
         
          var ary = new Array();
          var resultObj={
        		  bayID:null,
        		  eqptID:null
          }
         // var bayObj = null;
           function eqptSelFun() {
                var selectedEqptId = $("#jqgridEqptTbl").getGridParam("selrow");
                var selectEqptRow  = $("#jqgridEqptTbl").getRowData(selectedEqptId);
                var name1       = selectEqptRow['tool_id'];
                ary[1] = name1;
                $("#jqgridEqptDialog").dialog("close");
                resultObj.bayID =ary[0];
                resultObj.eqptID=ary[1];
                  if (typeof config.callbackFn == 'function') { 
                          config.callbackFn(resultObj); 
                       }
           };
           
           function baySelFun(){
                var selectedId = $("#jqgridBayTbl").getGridParam("selrow");
                var selectRow = $("#jqgridBayTbl").getRowData(selectedId);
                var name = selectRow['bay_id'];
           };
           
          $("#jqgridEqptDialog").dialog({
             autoOpen  : false,
             modal     : true,
             bgiframe  : true,
             resizable : false,
             height    : 550,
             width     : 390,
             position  : [400, 150],//400-> left, 150-> top
             buttons   : [{
                  text : SELECT_TOOL_TAG,
                  click: eqptSelFun
                  
             },{             
            	  text : CANCEL_TAG,
                  click: function() {
                   $(this).dialog("close");
                    
                }
             }],
             // 
             open : function(event, ui) {
                $("#jqgridEqptTbl").jqGrid({
                   datatype    : "local",
                   mtype       : "POST",
                   width       : 370,
                   height      : 350,
                   resizable   : true,
                   shrinkToFit : false,
                   scroll      : true,
                   ondblClickRow : eqptSelFun,
                   colModel    : [
                               { name : 'tool_id'  , index : 'tool_id'  , label: TOOL_ID_TAG   , width : 160 , align : "center" },
                               { name : 'tool_dsc' , index : 'tool_dsc' , label: TOOL_DSC_TAG , width : 180 , align : "center" , sortable : "true" }
                               ],
                   viewrecords : true, // 
                   pager       : '#jqgridEqptPg',
                   sortname    : 'tool_id',
                   sortorder   : "desc",
                   loadonce    : true,
                   jsonReader  : {
                      repeatitems : false
                   }
                  
                });
                var inTrxObj1 = {
                   trx_id       : "XPLSTEQP",
                   action_flg   : 'I'       ,
                   bay_id       : ary[0]   
                }
                var outTrxObj1 = comTrxSubSendPostJson(inTrxObj1);
                if (outTrxObj1.rtn_code != "0000000") {
                   return false;
                }
                 setGridInfo(outTrxObj1.oary,"#jqgridEqptTbl");
             }
          });
          $("#jqgridBayDialog").dialog({
             autoOpen  : false,
             modal     : true,
             bgiframe  : true,
             resizable : false,
             height    : 550,
             width     : 400,
             position  : [400, 150],//400-> left, 150-> top
             buttons   : [{
                  text : SELECT_BAYAREA_TAG,
                  click: baySelFun
             }, {
                  text : CANCEL_TAG,
                  click: function() {
                   $(this).dialog("close");
                }
             }],
             // 
             open : function(event, ui) {
                $("#jqgridBayTbl").jqGrid({
                   datatype    : "local",
                   mtype       : "POST",
                   width       : 370,
                   height      : 360,
                   resizable   : true,
                   shrinkToFit : false,
                   scroll      : true,
                   ondblClickRow : baySelFun,
                   colModel    : [
                               { name : 'bay_id'  , index : 'bay_id'  , label: BAY_AREA_TAG  , width : 160 , align : "center" },
                               { name : 'bay_dsc' , index : 'bay_dsc' , label: BAY_DSC_TAG   , width : 160 , align : "center" , sortable : "true"} 
                               ],
                   viewrecords : true, // 
                   pager       : '#jqgridBayPg',
                   sortname    : 'bay_id',
                   sortorder   : "desc",
                   loadonce    : true,
                   jsonReader  : {
                      repeatitems : false
                   },
                    onSelectRow : function (id) {
                             bayID = $(this).getCell(id, 'bay_id');
                             ary[0] = bayID;
                             baySelFun();
                            $("#jqgridBayDialog").dialog("close");
                            $("#jqgridEqptDialog").dialog("open");
                       }
                });
                var inTrxObj = {
                   trx_id      : "XPLSTBAY",
                   action_flg  : 'I'
                }
                var outTrxObj = comTrxSubSendPostJson(inTrxObj);
                if (outTrxObj.rtn_code != "0000000") {
                   return false;
                }
                 setGridInfo(outTrxObj.oary,"#jqgridBayTbl");
                }
             });
          $("#jqgridBayDialog").dialog("open");
        
       }
    });
})(jQuery);

