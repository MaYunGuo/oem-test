var spcThicknessRule = {
		SOURCE_THICKNESS : "S",
		TARGET_THICKNESS : "T",
		OTHER_THICKNESS  : "O",
		
		reportSPC : function(inSpcObj,mesId,opeId,woId,lotId,cb){
			
			//if current process's mes_id is not CDPC, only report spc by normal process then return
			if(mesId !== "CDPC"){
				var outSpcObj = comTrxSubSendPostJson(inSpcObj)
				if(typeof(cb) === "function"){
					cb(outSpcObj);
				}
				return ;
			}
			//query wo info then get wo's mdl_cate
			var inObj = {
				trx_id : "FDPAPLYWO",
				action_flg : "Q",
				iary : [{
					wo_id : woId
				}]
			};
			var outWoObj = comTrxSubSendPostJson(inObj);
			if(outWoObj.rtn_code !== "0000000"){
				return false;
			}
			var mdlCate = outWoObj.oary[0].mdl_cate_fk;
			
			//get ope's spc rule
			var rule  = spcThicknessRule[opeId];
			
			var thicknessType ;
			
			if(!rule){
				thicknessType = spcThicknessRule.TARGET_THICKNESS;
				inSpcObj.target_thickness = outWoObj.oary[0].to_thickness;
			}else if(spcThicknessRule.contains(rule.sourceMdlCate,mdlCate)){
				thicknessType = spcThicknessRule.SOURCE_THICKNESS; 
				inSpcObj.target_thickness = outWoObj.oary[0].from_thickness;
			}else if(spcThicknessRule.contains(rule.targetMdlCate,mdlCate)){
				thicknessType = spcThicknessRule.TARGET_THICKNESS;
				inSpcObj.target_thickness = outWoObj.oary[0].to_thickness;
			}else{
				thicknessType = spcThicknessRule.OTHER_THICKNESS;
				return false;
			}
			if(lotId){inSpcObj.lot_id = lotId;}
			
			inSpcObj.cdpc_flg = "Y";
			inSpcObj.thickness_type = thicknessType ;
			
			//send cdpc spc
			var outSpcObj = comTrxSubSendPostJson(inSpcObj);
			
			//call back 
			if(typeof(cb) === "function"){
				cb(outSpcObj);
			}
		},
		contains : function(arr,item){
			var i,cnt;
			if(!arr){
				return false;
			}
			cnt = arr.length;
			for(i=0;i<cnt;i++){
				if(arr[i] === item){
					return true;
				}
			}
			return false;
		}

};

spcThicknessRule["J001"]={
		sourceMdlCate : ["A","AB","AC","ABC","B","BC","C"],
		targetMdlCate: []
};

spcThicknessRule["J002"]={
		sourceMdlCate : ["A","AB","AC","ABC","B","BC","C"],
		targetMdlCate: []
};

spcThicknessRule["J003"]={
		sourceMdlCate : ["A","AB","AC","ABC","B","BC","C"],
		targetMdlCate: []
};

spcThicknessRule["J004"]={
		sourceMdlCate : ["A","AB","AC","ABC","B","BC","C"],
		targetMdlCate: []
};

spcThicknessRule["J005"]={
		sourceMdlCate : [],
		targetMdlCate: ["A","AB","AC","ABC","B","BC","C"]
};

spcThicknessRule["J006"]={
		sourceMdlCate : ["B","BC"],
		targetMdlCate: ["A","AB","ABC"]
};

spcThicknessRule["J007"]={
		sourceMdlCate : ["B","BC"],
		targetMdlCate: ["A","AB","ABC"]
};

spcThicknessRule["J008"]={
		sourceMdlCate : ["B","BC"],
		targetMdlCate: ["A","AB","ABC"]
};

spcThicknessRule["J009"]={
		sourceMdlCate : ["B","BC"],
		targetMdlCate: ["A","AB","ABC"]
};



spcThicknessRule["D001"]={
		sourceMdlCate : ["B","BC"],
		targetMdlCate: ["AB","ABC"]
};

spcThicknessRule["D002"]={
		sourceMdlCate : ["B","BC"],
		targetMdlCate: ["AB","ABC"]
};

spcThicknessRule["D003"]={
		sourceMdlCate : ["B","BC"],
		targetMdlCate: ["AB","ABC"]
};

spcThicknessRule["D004"]={
		sourceMdlCate : ["B","BC"],
		targetMdlCate: ["AB","ABC"]
};

spcThicknessRule["D005"]={
		sourceMdlCate : ["B","BC"],
		targetMdlCate: ["AB","ABC"]
};

