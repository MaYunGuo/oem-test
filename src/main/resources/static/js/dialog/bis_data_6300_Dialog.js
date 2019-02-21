/**************************************************************************/
/*                                                                        */
/*  System  Name :  ICIM                                                  */
/*                                                                        */
/*  Description  :  Bis_data Add Data_cate                                */
/*                                                                        */
/*  MODIFICATION HISTORY                                                  */
/*    Date     Ver     Name          Description                          */
/* ---------- ----- ----------- ----------------------------------------- */
/* 2017/04/07 N0.00   Congjin.Mao      Initial release                    */
/*                                                                        */
/**************************************************************************/

(function($) {
$.fn.extend({
			/**************************************
		 ******* 当调用dialog时，需要方式事件被多次执行 ==>使用unbind,bind方法
		 ******* shown方法也要unbind ==> bind ==> modal("show"),防止options的值没有传入
		 ******* 
		 **************************************/
		"showBisDataDialog" : function(options) {
			//定义返回类型和返回json格式
			var _NORMAL = "0000000";
			var action_flg = options.action_flg;
			var data_seq_id = options.data_seq_id;
			var data_cate = options.data_cate;
			var data_id = options.data_id;
			var data_ext = options.data_ext;
			var data_item = options.data_item;
			var ext_1 = options.ext_1;
			var ext_2 = options.ext_2;
			var ext_3 = options.ext_3;
			var ext_4 = options.ext_4;
			var ext_5 = options.ext_5;
			var ext_6 = options.ext_6;
			var ext_7 = options.ext_7;
			var ext_8 = options.ext_8;
			var ext_9 = options.ext_9;
			var ext_10= options.ext_10;
			var data_desc = options.data_desc;
			var evt_usr = options.evt_usr;

			var defaults = {
				callbackFn : null
			};
			var config = $.extend(defaults, options || {});
			var resultObj = {
				result : false
			};

			/*** 将Div实例化为modal窗体 ***/
			$('#bis_data_Dialog').modal({
				backdrop : true,
				keyboard : false,
				show : false
			});
			/***
			(1)show:false 则需要执行modal('show')方法
			(2)需要unbind('show')，避免 未获取options传过来的数据之前,就showDialog 

			 ***/
			// $('#bis_data_Dialog').modal('show');
			function translateFnc() {
				var dia_class = $(".dia_class"), 
					dia_dataIDLbl = $("#dia_dataIDLbl"), 
					dia_dataExtLbl = $("#dia_dataExtLbl"), 
					dia_dataItemLbl = $("#dia_dataItemLbl"), 
					dia_dataDescLbl = $("#dia_dataDescLbl"), 
					dia_ext1Lbl = $("#dia_ext1Lbl"), 
					dia_ext2Lbl = $("#dia_ext2Lbl"), 
					dia_ext3Lbl = $("#dia_ext3Lbl"), 
					dia_ext4Lbl = $("#dia_ext4Lbl"), 
					dia_ext5Lbl = $("#dia_ext5Lbl"), 
					dia_ext6Lbl = $("#dia_ext6Lbl"),
					dia_ext7Lbl = $("#dia_ext7Lbl"),
					dia_ext8Lbl = $("#dia_ext8Lbl"),
					dia_ext9Lbl = $("#dia_ext9Lbl"),
					dia_ext10Lbl = $("#dia_ext10Lbl"),
					tbl_cnt,
					iary, 
					inTrxObj, 
					outTrxObj;

				//隐藏div
				dia_class.hide();
				
				dia_dataIDLbl.text(DATA_ID_TAG);
				dia_dataExtLbl.text(DATA_EXT_TAG);
				dia_dataItemLbl.text(DATA_ITEM_TAG);
				dia_dataDescLbl.text(DATA_DESC_TAG);
				dia_ext1Lbl.text(EXT_1_TAG);
				dia_ext2Lbl.text(EXT_2_TAG);
				dia_ext3Lbl.text(EXT_3_TAG);
				dia_ext4Lbl.text(EXT_4_TAG);
				dia_ext5Lbl.text(EXT_5_TAG);
				dia_ext6Lbl.text(EXT_6_TAG);
				dia_ext7Lbl.text(EXT_7_TAG);
				dia_ext8Lbl.text(EXT_8_TAG);
				dia_ext9Lbl.text(EXT_9_TAG);
				dia_ext10Lbl.text(EXT_10_TAG);

				iary = [{
					data_cate : "CODE",
					data_id : $("#dia_dataCateTxt").val()
				}];
				inTrxObj = {
					trx_id : "FBPBISDATA",
					action_flg : "Q",
					iary : iary,
					tbl_cnt : 1
				};
				outTrxObj = comTrxSubSendPostJson(inTrxObj);
				if (outTrxObj.rtn_code == _NORMAL) {
					tbl_cnt = outTrxObj.tbl_cnt;
					for (var i = 0; i < tbl_cnt; i++) {
						var oary = outTrxObj.oary[i];
						
						switch (oary.data_ext) {
						case "DATA_ID":
							dia_dataIDLbl.text(oary.data_desc);
							$("#dia_dataIDDiv").show();
							break;
						case "DATA_EXT":
							dia_dataExtLbl.text(oary.data_desc);
							$("#dia_dataExtDiv").show();
							break;
						case "DATA_ITEM":
							dia_dataItemLbl.text(oary.data_desc);
							$("#dia_dataItemDiv").show();
							break;
						case "DATA_DESC":
							dia_dataDescLbl.text(oary.data_desc);
							$("#dia_dataDescDiv").show();
							break;
						case "EXT_1":
							dia_ext1Lbl.text(oary.data_desc);
							$("#dia_ext1Div").show();
							break;
						case "EXT_2":
							dia_ext2Lbl.text(oary.data_desc);
							$("#dia_ext2Div").show();
							break;
						case "EXT_3":
							dia_ext3Lbl.text(oary.data_desc);
							$("#dia_ext3Div").show();
							break;
						case "EXT_4":
							dia_ext4Lbl.text(oary.data_desc);
							$("#dia_ext4Div").show();
							break;
						case "EXT_5":
							dia_ext5Lbl.text(oary.data_desc);
							$("#dia_ext5Div").show();
							break;
                            case "EXT_6":
                                dia_ext6Lbl.text(oary.data_desc);
                                $("#dia_ext6Div").show();
                                break;
                            case "EXT_7":
                                dia_ext7Lbl.text(oary.data_desc);
                                $("#dia_ext7Div").show();
                                break;
                            case "EXT_8":
                                dia_ext8Lbl.text(oary.data_desc);
                                $("#dia_ext8Div").show();
                                break;
                            case "EXT_9":
                                dia_ext9Lbl.text(oary.data_desc);
                                $("#dia_ext9Div").show();
                                break;
                            case "EXT_10":
                                dia_ext10Lbl.text(oary.data_desc);
                                $("#dia_ext10Div").show();
                                break;
						}
					}
				}
			}
			function dialogShowFnc() {
				diaLogDataCateSelFnc();
				if (action_flg == "A") {
					$("#bis_data_Dialog_title").text("新增参数");
//					$("#dia_dataIdTxt").attr({'disabled':false});
//					$("#dia_dataExtTxt").attr({'disabled':false});
					$("#dia_dataIdTxt").val("");
					$("#dia_dataExtTxt").val("");
					$("#dia_dataItemTxt").val("");
					$("#dia_ext1Txt").val("");
					$("#dia_ext2Txt").val("");
					$("#dia_ext3Txt").val("");
					$("#dia_ext4Txt").val("");
					$("#dia_ext5Txt").val("");
					$("#dia_ext6Txt").val("");
					$("#dia_ext7Txt").val("");
					$("#dia_ext8Txt").val("");
					$("#dia_ext9Txt").val("");
					$("#dia_ext10Txt").val("");
					$("#dia_dataDescTxt").val("");
				} else if (action_flg == "U") {
					$("#bis_data_Dialog_title").text("修改参数");
//					$("#dia_dataIdTxt").attr({'disabled':true});
//	                $("#dia_dataExtTxt").attr({'disabled':true});
					$("#dia_dataIdTxt").val(data_id);
					$("#dia_dataExtTxt").val(data_ext);
					$("#dia_dataItemTxt").val(data_item);
					$("#dia_ext1Txt").val(ext_1);
					$("#dia_ext2Txt").val(ext_2);
					$("#dia_ext3Txt").val(ext_3);
					$("#dia_ext4Txt").val(ext_4);
					$("#dia_ext5Txt").val(ext_5);
					$("#dia_ext6Txt").val(ext_6);
					$("#dia_ext7Txt").val(ext_7);
					$("#dia_ext8Txt").val(ext_8);
					$("#dia_ext9Txt").val(ext_9);
					$("#dia_ext10Txt").val(ext_10);
					$("#dia_dataDescTxt").val(data_desc);
				}
				translateFnc();
			}
			function diaLogDataCateSelFnc() {
				var iary = [{
					data_cate : "CATE",
					data_id : data_cate
				}];
				var inTrxObj = {
					trx_id : "FBPBISDATA",
					action_flg : "Q",
					iary : iary
				};
				var outTrxObj = comTrxSubSendPostJson(inTrxObj);
				if (outTrxObj.rtn_code == _NORMAL) {
					$("#dia_dataCateTxt").val(data_cate);
					$("#dia_cateDescSpn").text(outTrxObj.oary[0].data_desc);
				}
			}
			function diaLogf5UpdateFnc() {
				var iary = {
					data_seq_id : data_seq_id,
					data_cate : $("#dia_dataCateTxt").val()
				};
				
				if($("#dia_dataIDDiv").is(':visible')){
					if(!$.trim($("#dia_dataIdTxt").val())){
						showErrorDialog("001",$("#dia_dataIDLbl").text() + "不能为空");
			            $("#dia_dataIdTxt").focus();
			            return false;
					}else{
						iary.data_id = $.trim($("#dia_dataIdTxt").val());
					}
				}
				
				if($("#dia_dataExtDiv").is(':visible')){
					if(!$.trim($("#dia_dataExtTxt").val())){
						showErrorDialog("002",$("#dia_dataExtLbl").text() + "不能为空");
			            $("#dia_dataExtTxt").focus();
			            return false;
					}else{
						iary.data_ext = $.trim($("#dia_dataExtTxt").val());
					}
				}
				
				if($("#dia_dataItemDiv").is(':visible')){
					if(!$.trim($("#dia_dataItemTxt").val())){
						showErrorDialog("003",$("#dia_dataItemLbl").text() + "不能为空");
			            $("#dia_dataItemTxt").focus();
			            return false;
					}else{
						iary.data_item = $.trim($("#dia_dataItemTxt").val());
					}
				}
				
				if($("#dia_ext1Div").is(':visible')){
					// if(!$.trim($("#dia_ext1Txt").val())){
					// 	showErrorDialog("004",$("#dia_ext1Lbl").text() + "不能为空");
			         //    $("#dia_ext1Txt").focus();
			         //    return false;
					// }else{
						iary.ext_1 = $.trim($("#dia_ext1Txt").val());
					// }
				}
				
				if($("#dia_ext2Div").is(':visible')){
					// if(!$.trim($("#dia_ext2Txt").val())){
					// 	showErrorDialog("005",$("#dia_ext2Lbl").text() + "不能为空");
			         //    $("#dia_ext2Txt").focus();
			         //    return false;
					// }else{
						iary.ext_2 = $.trim($("#dia_ext2Txt").val());
					// }
				}
				
				if($("#dia_ext3Div").is(':visible')){
					// if(!$.trim($("#dia_ext3Txt").val())){
					// 	showErrorDialog("006",$("#dia_ext3Lbl").text() + "不能为空");
			         //    $("#dia_ext3Txt").focus();
			         //    return false;
					// }else{
						iary.ext_3 = $.trim($("#dia_ext3Txt").val());
					// }
				}
						
				if($("#dia_ext4Div").is(':visible')){
					// if(!$.trim($("#dia_ext4Txt").val())){
					// 	showErrorDialog("007",$("#dia_ext4Lbl").text
					// 		() + "不能为空");
			         //    $("#dia_ext4Txt").focus();
			         //    return false;
					// }else{
						iary.ext_4 = $.trim($("#dia_ext4Txt").val());
					// }
				}
				
				if($("#dia_ext5Div").is(':visible')){
					// if(!$.trim($("#dia_ext5Txt").val())){
					// 	showErrorDialog("008",$("#dia_ext5Lbl").text() + "不能为空");
					//     $("#dia_ext5Txt").focus();
					//     return false;
					// }else{
						iary.ext_5 = $.trim($("#dia_ext5Txt").val());
					// }
				}

                if($("#dia_ext6Div").is(':visible')){
                    // if(!$.trim($("#dia_ext6Txt").val())){
                    //     showErrorDialog("008",$("#dia_ext6Lbl").text() + "不能为空");
                    //     $("#dia_ext6Txt").focus();
                    //     return false;
                    // }else{
                        iary.ext_6 = $.trim($("#dia_ext6Txt").val());
                    // }
                }

                if($("#dia_ext7Div").is(':visible')){
                    // if(!$.trim($("#dia_ext7Txt").val())){
                    //     showErrorDialog("008",$("#dia_ext7Lbl").text() + "不能为空");
                    //     $("#dia_ext7Txt").focus();
                    //     return false;
                    // }else{
                        iary.ext_7 = $.trim($("#dia_ext7Txt").val());
                    // }
                }

                if($("#dia_ext8Div").is(':visible')){
                    // if(!$.trim($("#dia_ext8Txt").val())){
                    //     showErrorDialog("008",$("#dia_ext8Lbl").text() + "不能为空");
                    //     $("#dia_ext8Txt").focus();
                    //     return false;
                    // }else{
                        iary.ext_8 = $.trim($("#dia_ext8Txt").val());
                    // }
                }

                if($("#dia_ext9Div").is(':visible')){
                    // if(!$.trim($("#dia_ext9Txt").val())){
                    //     showErrorDialog("008",$("#dia_ext9Lbl").text() + "不能为空");
                    //     $("#dia_ext9Txt").focus();
                    //     return false;
                    // }else{
                        iary.ext_9 = $.trim($("#dia_ext9Txt").val());
                    // }
                }

                if($("#dia_ext10Div").is(':visible')){
                    // if(!$.trim($("#dia_ext10Txt").val())){
                    //     showErrorDialog("008",$("#dia_ext10Lbl").text() + "不能为空");
                    //     $("#dia_ext10Txt").focus();
                    //     return false;
                    // }else{
                        iary.ext_10 = $.trim($("#dia_ext10Txt").val());
                    // }
                }


				
				if($("#dia_dataDescDiv").is(':visible')){
					if(!$.trim($("#dia_dataDescTxt").val())){
						showErrorDialog("009",$("#dia_dataDescLbl").text() + "不能为空");
			            $("#dia_dataDescTxt").focus();
			            return false;
					}else{
						iary.data_desc = $.trim($("#dia_dataDescTxt").val());
					}
				}
				
				var inTrxObj = {
					trx_id : "FBPBISDATA",
					action_flg : action_flg,
					evt_usr    : evt_usr,
					iary : [iary],
					tbl_cnt : 1
				};
				var outTrxObj = comTrxSubSendPostJson(inTrxObj);
				if (outTrxObj.rtn_code == _NORMAL) {
					resultObj.result = true;
					if (typeof config.callbackFn == 'function') {
						config.callbackFn(resultObj);
					}
					if (action_flg == "A") {
						$("#dia_dataIdTxt").val("");
						$("#dia_dataExtTxt").val("");
						$("#dia_dataItemTxt").val("");
						$("#dia_ext1Txt").val("");
						$("#dia_ext2Txt").val("");
						$("#dia_ext3Txt").val("");
						$("#dia_ext4Txt").val("");
						$("#dia_ext5Txt").val("");
						$("#dia_ext6Txt").val("");
						$("#dia_ext7Txt").val("");
						$("#dia_ext8Txt").val("");
						$("#dia_ext9Txt").val("");
						$("#dia_ext10Txt").val("");
						$("#dia_dataDescTxt").val("");
					} else if (action_flg == "U") {
						$('#bis_data_Dialog').modal("hide");
					}
				}
			}
			/*****
			    当多次弹出对话框的同时也会多次绑定click事件。
			    解决办法: 在show Dialog时将click unbind全部掉
			              然后再绑定，这样就只剩下一个click事件了。
			 **********/
			$('#bis_data_Dialog').unbind('shown.bs.modal');
			$("#bisDataDialog_f5update_Btn").unbind('click');

			$('#bis_data_Dialog').modal("show");
			dialogShowFnc();
			$("#bisDataDialog_f5update_Btn").bind('click',
					diaLogf5UpdateFnc);
			/*****
			  弹出提示,当获取焦点时
			  需要包括: bootstrap-tooltip.js
			 ******/
			$('[rel=tooltip]').tooltip({
				placement : "bottom",
				trigger : "focus",
				animation : true,

			});
		}
	});
})(jQuery);