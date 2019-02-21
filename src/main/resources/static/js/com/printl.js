var Label = function() {
	var str = '<applet id="LabelApplet4JX" mayscript="mayscript" codebase="." code="com.print.LabelApplet4JX.class" name="LabelApplet4JX" alt="打印" archive="<%=basePath%>jar/print.jar, <%=basePath%>jar/barcode4j.jar, <%=basePath%>jar/jackson-all-1.9.11.jar, <%=basePath%>jar/poi-3.6.jar, <%=basePath%>jar/jacob.jar" width="0" height="0"></applet>';
	if ($('#LabelApplet4JX').length > 0) {
		$('#LabelApplet4JX').remove();
	}
	str = str.replace(/<%=basePath%>/g, basePath);
	$(str).appendTo('body');
	this.print = function(boxID,modelName,pnlCnt,shtCnt,totalCnt,strDate,productSpec,shtAry) {
		var app = document.LabelApplet4JX;
		app.print(boxID,modelName,pnlCnt,shtCnt,totalCnt,strDate,productSpec,shtAry);
	};
	this.PrintJX = function(customer_id,mode_id,date,prd_spec,wo_id,woCnt,CntAry,boxRule,
							totalCnt,boxAry,layout_cnt) {
		var app = document.LabelApplet4JX;
		app.PrintJX(customer_id,mode_id,date,prd_spec,wo_id,woCnt,CntAry,boxRule,
							totalCnt,boxAry,layout_cnt);
	};
	this.PrintBacth = function(batch_id) {
		var app = document.LabelApplet4JX;
		app.PrintBacth(batch_id);
	};
	this.PrintJX4BS = function(customer_id,mode_id,date,prd_spec,wo_id,woCnt,CntAry,boxRule,
			totalCnt,boxAry,layout_cnt,mtrl_id,habk_id) {
		var app = document.LabelApplet4JX;
		app.PrintJX4BS(customer_id,mode_id,date,prd_spec,wo_id,woCnt,CntAry,boxRule,
					totalCnt,boxAry,layout_cnt,mtrl_id,habk_id);
	};
	this.PrintWG4PPBOX = function(customer_id,mode_id,date,prd_spec,wo_id,woCnt,CntAry,numberAry,
			totalCnt,boxAry,layout_cnt,mtrl_id,habk_id,destAry) {
		var app = document.LabelApplet4JX;
		app.PrintWG4PPBOX(customer_id,mode_id,date,prd_spec,wo_id,woCnt,CntAry,numberAry,
					totalCnt,boxAry,layout_cnt,mtrl_id,habk_id,destAry);
	};
	this.PrintLabelForDM = function(printer,soId, cusId, compDate,overDueDate, mdl_id, toThickness,cusInfoFst,cusInfoSnd,prdQty,NgQty,boxId, prdGrade,userId,title) {
		var app = document.LabelApplet4JX;
		app.PrintLabelForDM(printer,soId, cusId, compDate,overDueDate, mdl_id, toThickness,cusInfoFst,cusInfoSnd,prdQty,NgQty,boxId, prdGrade,userId,title);
	};
	this.PrintJBorDMQA = function(stdQty,cusId,woId,boxId,toThickness,prdCnt,modelCnt,totalModelCnt,mdlId,prdAry,mtrlBoxAry,gradeAry,
			lDefcnt1Ary,lDefcnt2Ary,lDefcnt3Ary,lDefcnt4Ary,lDefcnt5Ary,lDefcnt6Ary,lDefcnt7Ary,lDefcnt8Ary,lCntAry,
			zDefcnt1Ary,zDefcnt2Ary,zDefcnt3Ary,zDefcnt4Ary,zDefcnt5Ary,zDefcnt6Ary,zDefcnt7Ary,zDefcnt8Ary,zCntAry) {
		var app = document.LabelApplet4JX;
		app.PrintJBorDMQA(stdQty,cusId,woId,boxId,toThickness,prdCnt,modelCnt,totalModelCnt,mdlId,prdAry,mtrlBoxAry,gradeAry,
				lDefcnt1Ary,lDefcnt2Ary,lDefcnt3Ary,lDefcnt4Ary,lDefcnt5Ary,lDefcnt6Ary,lDefcnt7Ary,lDefcnt8Ary,lCntAry,
				zDefcnt1Ary,zDefcnt2Ary,zDefcnt3Ary,zDefcnt4Ary,zDefcnt5Ary,zDefcnt6Ary,zDefcnt7Ary,zDefcnt8Ary,zCntAry);
	};
	this.PrintJBorDMQA3 = function(printer,str) {
		var app = document.LabelApplet4JX;
		app.PrintJBorDMQA3(printer,str);
	};
	this.PrintJBorDMQA2 = function(printer,str) {
		var app = document.LabelApplet4JX;
		app.PrintJBorDMQA2(printer,str);
	};
	this.PrintJBorDMQA003 = function(printer,str) {
		var app = document.LabelApplet4JX;
		app.PrintJBorDMQA003(printer,str);
	};
	this.PrintJBQA006 = function(printer,str) {
		var app = document.LabelApplet4JX;
		app.PrintJBQA006(printer,str);
	};
	this.PrintJBorDMQA008 = function(printer,str) {
		var app = document.LabelApplet4JX;
		app.PrintJBorDMQA008(printer,str);
	};
	this.PrintJBorDMQA063 = function(printer,str) {
		var app = document.LabelApplet4JX;
		app.PrintJBorDMQA063(printer,str);
	};
	this.PrintJBQA098 = function(printer,str) {
		var app = document.LabelApplet4JX;
		app.PrintJBQA098(printer,str);
	};
	this.PrintDMQA098 = function(printer,str) {
		var app = document.LabelApplet4JX;
		app.PrintDMQA098(printer,str);
	};
	this.PrintJBorDMQA115 = function(printer,str) {
		var app = document.LabelApplet4JX;
		app.PrintJBorDMQA115(printer,str);
	};
	this.PrintJBorDMQAHN = function(printer,str) {
		var app = document.LabelApplet4JX;
		app.PrintJBorDMQAHN(printer,str);
	};
	this.PrintYL = function(customer_id,mode_id,date,prd_spec,wo_id,woCnt,CntAry,boxRule,
			totalCnt,boxAry,layout_cnt,mtrl_id,habk_id) {
		var app = document.LabelApplet4JX;
		app.PrintYL(customer_id,mode_id,date,prd_spec,wo_id,woCnt,CntAry,boxRule,
					totalCnt,boxAry,layout_cnt,mtrl_id,habk_id);
	};
	this.PrintFor028 = function(printer,cusid, woid, mtrid,lotid, checktime, endtime,soid,proid,wxwoid,cnt,user,content) {
		var app = document.LabelApplet4JX;
		app.PrintFor028(printer,cusid, woid, mtrid,lotid, checktime, endtime,soid,proid,wxwoid,cnt,user,content);
	};
	this.PrintFor088 = function(printer,box_id,product_id,  ppbox_id,  time, user_id, cnt, t_thickness,c_thickness) {
		var app = document.LabelApplet4JX;
		app.PrintFor088(printer,box_id,product_id,  ppbox_id,  time, user_id, cnt, t_thickness,c_thickness);
	};
	this.PrintForoncell088 = function(printer,box_id,product_id,time,user_id,cnt,t_thickness,c_thickness) {
		var app = document.LabelApplet4JX;
		app.PrintForoncell088(printer,box_id,product_id,time,user_id,cnt,t_thickness,c_thickness);
	};
	this.PrintFor008 = function(printer,mdlid,date,boxid, cnt,mtrl,grade) {
		var app = document.LabelApplet4JX;
		app.PrintFor008(printer,mdlid,date,boxid, cnt,mtrl,grade);
	};
	this.printyl = function(customer_id,mode_id,date,prd_spec,wo_id,woCnt,CntAry,boxRule,
			totalCnt,boxAry,layout_cnt,mtrl_id,habk_id,cuswo) {
		var app = document.LabelApplet4JX;
		app.printyl(customer_id,mode_id,date,prd_spec,wo_id,woCnt,CntAry,boxRule,
					totalCnt,boxAry,layout_cnt,mtrl_id,habk_id,cuswo);
	};
	this.PrintLabelForDM006 = function(printer,cusInfoFst, mdl_id,compDate,overDueDate,prdQty) {
		var app = document.LabelApplet4JX;
		app.PrintLabelForDM006(printer,cusInfoFst, mdl_id, compDate,overDueDate, prdQty);
	};
	this.PrintLabelForDM098 = function(printer,  boxId,  productId1,  productId2,
			 prdQty, thickness, compDate, dmUser, soId, prdStat, prdType, overDueDate,jsonAry) {
		var app = document.LabelApplet4JX;
		app.PrintLabelForDM098(printer,  boxId,  productId1,  productId2,
				 prdQty, thickness, compDate, dmUser, soId, prdStat, prdType, overDueDate,jsonAry);
	};
	this.PrintLabelForDM003 = function(printer, boxId,mdl_id, mtrlId,toThickness, prdQty, compDate,  okCnt,  Substrate, mtrlPart,tcn) {
		var app = document.LabelApplet4JX;
		app.PrintLabelForDM003(printer, boxId,mdl_id, mtrlId,toThickness, prdQty, compDate,  okCnt,  Substrate, mtrlPart,tcn);
	};
	this.PrintLabelForDM007 = function(printer, mtrlId,mtrlBoxId, prdQty,boxId) {
		var app = document.LabelApplet4JX;
		app.PrintLabelForDM007(printer, mtrlId,mtrlBoxId, prdQty,boxId);
	};
	this.PrintWhout = function(printer,str) {
		var app = document.LabelApplet4JX;
		app.PrintWhout(printer,str);
	};
	this.PrintLabelForWhot007 = function(printer, mtrlId, BoxQty,totalQty,palletId) {
		var app = document.LabelApplet4JX;
		app.PrintLabelForWhot007(printer, mtrlId, BoxQty,totalQty,palletId);
	};
	this.PrintLabelForWhot003 = function(printer, palletId, mdlId,mtrlId,totalCnt,oktotalCnt,substrate,
			tcnNo,soId,date,boxCnt,type) {
		var app = document.LabelApplet4JX;
		app.PrintLabelForWhot003(printer, palletId, mdlId,mtrlId,totalCnt,oktotalCnt,substrate,
				tcnNo,soId,date,boxCnt,type);
	};
	this.PrintLabelForWhotBoxList003 = function(printer, jsonAry) {
		var app = document.LabelApplet4JX;
		app.PrintLabelForWhotBoxList003(printer, jsonAry);
	};
	this.PrintLabelForBox = function(boxID) {
		var app = document.LabelApplet4JX;
		app.PrintLabelForBox(boxID);
	};
	this.PrintHCT058 = function(printer, ps, mkr, woId, wocate, mtrlId, qty,jgyq, date, outdate, boxId, thickness, dir, user,note) {
		var app = document.LabelApplet4JX;
		app.PrintHCT058(printer, ps, mkr, woId, wocate, mtrlId, qty,jgyq, date, outdate, boxId, thickness, dir, user,note);
	};
	this.PrintForHCT058ShtList = function(printer,title,jsonAry) {
		var app = document.LabelApplet4JX;
		app.PrintForHCT058ShtList(printer,title,jsonAry);
	};
	this.PrintHCToncell088 = function(printer, boxId,thickness,time,qty,userID,product) {
		var app = document.LabelApplet4JX;
		app.PrintHCToncell088(printer, boxId,thickness,time,qty,userID,product);
	};
	this.PrintHCT088 = function(printer, soId,overDate, outwoId,qty, mdltyp,cusId,pm,boxId, blqty, user, date, mdlId, woId,okyield, qauser,bt) {
		var app = document.LabelApplet4JX;
		app.PrintHCT088(printer, soId,overDate, outwoId,qty, mdltyp,cusId,pm,boxId, blqty, user, date, mdlId, woId,okyield, qauser,bt);
	};
	this.PrintForHc098 = function(printer, gys,boxId, cusName,mode, date,size,indate,mtrllot, orderno, mode2, cnt, allcnt, lotno,procate, jsonAry) {
		var app = document.LabelApplet4JX;
		app.PrintForHc098(printer, gys,boxId, cusName,mode, date,size,indate,mtrllot, orderno, mode2, cnt, allcnt, lotno,procate, jsonAry);
	};
	this.PrintHCT0981 = function(printer, gys,boxId, cusName,mode, date,size,indate,mtrllot, orderno, mode2, cnt, allcnt, lotno,procate) {
		var app = document.LabelApplet4JX;
		app.PrintHCT0981(printer, gys,boxId, cusName,mode, date,size,indate,mtrllot, orderno, mode2, cnt, allcnt, lotno,procate);
	};
	this.PrintHCT0982 = function(printer ,boxId, jsonAry) {
		var app = document.LabelApplet4JX;
		app.PrintHCT0982(printer,boxId, jsonAry);
	};
	this.PrintHCT068 = function(printer,soId, cusId, compDate,title, mdl_id, toThickness,cusInfoFst,cusInfoSnd,prdQty,NgQty,boxId, prdGrade,userId,woId) {
		var app = document.LabelApplet4JX;
		app.PrintHCT068(printer,soId, cusId, compDate,title, mdl_id, toThickness,cusInfoFst,cusInfoSnd,prdQty,NgQty,boxId, prdGrade,userId,woId);
	};
	this.PrintWhotHct = function(printer,note,mdlId,realSo,prdCnt) {
		var app = document.LabelApplet4JX;
		app.PrintWhotHct(printer,note,mdlId,realSo,prdCnt);
	};
};