/**
 * Posts data.
 * 
 * @param data
 */
function postData(data) {

	var formId = "form-" + new Date().getTime();
	var dataId = formId + "-data";
	var html = '<form id="' + formId
	        + '" style="position:absolute;z-index:-1122;" method="post" action="generateExcel.do">';
	html += '<input id="' + dataId + '" name="data" type="hidden">';
	html += '</form>';

	if ($("#" + formId).length > 0) {
		$("#" + formId).remove();
	}

	$(html).appendTo("body");
	$("#" + dataId).val(data);
	$("#" + formId).submit();
	$("#" + formId).remove();

}

/**
 * Generates excel by the data of grid.
 * 
 * @param grid CSS selector of the <code>table</code> element, such as
 *            #selector, .selector, etc.
 */
function generateExcel(grid) {

	var colNames = $(grid).jqGrid("getGridParam", "colNames");

	// Filter the HTML entry columns.
	var re = /[<>]+/;

	for (var i = 0; i < colNames.length; i += 1) {
		if (re.test(colNames[i]) || colNames[i] === "") {
			colNames.splice(i, 1);
		}
	}

	var matrix = [];
	matrix.push(colNames);

	var data = $(grid).jqGrid("getRowData");

	for (var j = 0; j < data.length; j += 1) {
		var row = [];

		// Extract the value fields.
		for ( var k in data[j]) {
			row.push(data[j][k]);
		}

		matrix.push(row);
	}

	postData(JSON.stringify(matrix));

}

/**
 * Adds a generate excel button to the grid's paging bar. <strong>This method
 * must be invoked after the jQGrid's navGrid method, or the navGrid method
 * would not take effect.</strong>
 * 
 * @param grid destination grid selector
 * @param pager the paging bar selector of the grid
 */
function addGenerateButton(grid, pager) {
	$("#grid").jqGrid('navGrid', "#pager", {
	    add : false,
	    edit : false,
	    del : false,
	    search : false,
	    refresh : false
	});
	$(grid).jqGrid('navButtonAdd', pager, {
	    caption : "",
	    buttonicon : "ui-icon-document-excel",
	    onClickButton : function() {
		    generateExcel(grid);
	    },
	    position : "last",
	    title : "导出数据",
	    cursor : "pointer"
	});
}

/**
 * 导出excel，除了jqGrid的修改和删除按钮
 * @param grid
 */
function exportExcel(grid) {

	var colNames = $(grid).jqGrid("getGridParam", "colNames");

	// Filter the HTML entry columns.
	var re = /[<>]+/;

	for (var i = 0; i < colNames.length; i += 1) {
		if (re.test(colNames[i]) || colNames[i] === "") {
			colNames.splice(i, 3);
		}
	}

	var matrix = [];
	matrix.push(colNames);

	var data = $(grid).jqGrid("getRowData");

	for (var j = 0; j < data.length; j += 1) {
		var row = [];

		// Extract the value fields.
		for ( var k in data[j]) {
			if(k!="deleteItem" && k!="modifyItem"){
				row.push(data[j][k]);
			}
		}

		matrix.push(row);
	}

	postData(JSON.stringify(matrix));

}