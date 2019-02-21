var FabSn = {
	cb : null,	
	showSelectWorderDialog : function(fabSn, outObj, cb) {
		FabSn.cb = cb;
		var callBackData = {};
		var str = "<div id='fabSnInfoDialog' title='请选择要操作的产品' > <table id='fabSnGrd' ></table></div>";
		if ($("#fabSnInfoDiv").length > 0) {
			$("#fabSnInfoDiv").remove();
		}
		$(str).appendTo('body');
		$("#fabSnInfoDialog").dialog({
			autoOpen : false,
			modal : true, //  
			width : 330,
			bgiframe : true, // ie6select
			show : "clip",
			hide : "clip",
//			buttons : {
//				"OK" : function() {
//					selectPrdFnc();
//				}
//			},
			open : function(event, ui) {
				$("#fabSnGrd").jqGrid({
					url : "",
					datatype : "local",
					mtype : "POST",
					width : 300,
					height : 200,
					shrinkToFit : false,
					scroll : true,
					rownumbers : true,
					rowNum : 20,
					rownumWidth : 20,
					loadonce : true,
					colModel : [ {
						name : 'prd_seq_id',
						index : 'prd_seq_id',
						label : '产品ID',
						width : PRD_SEQ_ID_CLM,
						hidden : true
					}, {
						name : 'fab_sn',
						index : 'fab_sn',
						label : '产品ID',
						width : 100
					}, {
						name : 'wo_id',
						index : 'wo_id',
						label : '内部订单',
						width : 200,
					}] ,
					onSelectRow : selectPrdFnc
				});
				setGridInfo(outObj,"#fabSnGrd",true);
			}
		});
		$("#fabSnInfoDialog").dialog("open");
		
		function selectPrdFnc(){
			var cb = FabSn.cb;
			if (typeof (cb) == "function") {
				var rowId,rowData,callBackData;
				var $fabSnGrd =$("#fabSnGrd"); 
				rowId = $fabSnGrd.jqGrid("getGridParam","selrow");
				if(!rowId){
					showErrorDialog("","请选择产品");
					return false;
				}
				rowData = $fabSnGrd.jqGrid("getRowData",rowId);
				$("#fabSnInfoDialog").dialog("close");
				cb(rowData);
			}
		}

	}
}
