function WidgetDefine(){
	
	
	this.graphWidth=120;
	this.graphHeight=60;
	
	this.graphGrap=10;

	/*this.graphFillStyle="#434434"; */   
	this.graphFillStyleFade="#F5F5F5";
	
	this.EndPointAnchors=["Top","Left","Right", "Bottom"];
	this.sourcePointAnchors=["Left","Right", "Bottom"];
	this.targetPointAnchors=["Top"];
	
	/*this.paintStrokeStyle="#567567";*/
	/*this.paintStrokeStyle="#434434";*/
	this.paintLineWidth=2;
	this.endPointsRadius=3;
	this.endPointsType="Dot";
	this.endpointPaintFillStyle="#996699";
	this.basicTypeConn="StateMachine";
	this.basicTypePainStrokeType="#669933";
	this.basicTypeLineWidth=3;
	this.basicTypeHoverStrokeType="#FF6633";
	
	
    
	this.instance=[];
	this.sourceEndpoint=[];
	this.targetEndpoint=[];
	this.endpoint=[];
	this.basicType=[];
	this.svg=[];
	this.paintStrokeStyle="";
	this.graphFillStyle=""; 
	
	 /* 初始化：
	 * 1. jsPlumb实例化
	 * 2. 设置断点样式、基本样式
	 * 3. 绑定各种连接基本事件
	 */	
	this.initFunc=function(element,color){
		
		var init=this.initConn;
		var instance=this.instance;
		
		var connColor=this.paintStrokeStyle;
		var widgetColor=this.graphFillStyle;
		
		connColor=color;
		widgetColor=color;
		
		this.paintStrokeStyle=color;
		this.graphFillStyle=color;
		
		
		//实例化Plumb
		this.instance=jsPlumb.getInstance({
			
			DragOptions: { cursor: 'pointer', zIndex: 2000 },  //不清楚
			PaintStyle : {                                     //定义连接线样式
	            lineWidth: this.paintLineWidth,
	            /*strokeStyle: this.paintStrokeStyle,*/
	            strokeStyle: connColor,
	            joinstyle: "round"

			},
			Endpoints : [ [this.endPointsType, { radius:this.endPointsRadius } ] ],

	        ConnectionOverlays: [                    //定义连接线箭头及标签样式
		                         [ "Arrow", {
		                              location: 1,
		                              visible:true,
		                              id:"ARROW",
		                              width:10,
		                              events:{
		                                 click:function() { alert("you clicked on the arrow overlay")}
		                              }
		                           } ],
		                         [ "Label", {
		                              location: 0.2,
		                              id: "label",
		                              cssClass:"labelClass",
		                              events:{
		                                 tap:function() { alert("hey"); }
		                              }
		                           }]
		                         ],
			Container:element                      //定义容器
		});
		
		/*var instanceBlindFunc=instance.bind;*/
		
		//定义源端点
		 this.sourceEndpoint={
				endpoint:this.endPointsType,
				paintStyle:{
					fillStyle:this.endpointPaintFillStyle,
					radius:this.endPointsRadius
				},
				/*connectorStyle:{strokeStyle:this.paintStrokeStyle,lineWidth:this.paintLineWidth},*/
				connectorStyle:{strokeStyle:connColor,lineWidth:this.paintLineWidth},
				isSource:true,
				maxConnections:10,
			    dragOptions:{}
		};
		
		//定义目标端点
		 this.targetEndpoint={
				endpoint:this.endPointsType,
				paintStyle:{
					fillStyle:"#567567",
					radius:this.endPointsRadius
				},
				connectorStyle:{strokeStyle:connColor,lineWidth:this.paintLineWidth},
				isTarget:true,
				maxConnections:10,
				dropOptions: { hoverClass: "hover", activeClass: "active" }
		};
		
		//定义端点，可源可目标
		this.endpoint={
				endpoint:this.endPointsType,
				/*connectorStyle:{strokeStyle:this.paintStrokeStyle,lineWidth:this.paintLineWidth},*/
				connectorStyle:{strokeStyle:connColor,lineWidth:this.paintLineWidth},
				paintStyle:{
					fillStyle:this.endpointPaintFillStyle,
					radius:this.endPointsRadius
				},
				isTarget:true, //是否可以放置（作为终点）
				isSource:true, //是否可以拖动（作为起点）
				maxConnections:10,
				dropOptions: { hoverClass: "hover", activeClass: "active" }
		} 
		 
		 /* 连接线类型*/
	    this.basicType = {
	            connector: this.basicTypeConn,
	            paintStyle: { strokeStyle: this.basicTypePainStrokeType, lineWidth: this.basicTypeLineWidth },
	            hoverPaintStyle: { strokeStyle: this.basicTypeHoverStrokeType },
	            overlays: [
	                "Arrow"
	            ]
	        };
		
	    this.instance.registerConnectionType("basic", this.basicType); //注册jsplumb实例的连接类型

		
	    this.instance.bind("click", function (conn, originalEvent) {
	         conn.toggleType("basic");
	    });
	    
	    this.instance.bind("dblclick", function (conn, originalEvent) {
	    	/*if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))*/
	    	if (confirm("Delete connection " + conn.id + "?"))
                jsPlumb.detach(conn);
	    });
		
	    this.instance.bind("connection", function (connInfo, originalEvent) {
	    	init(connInfo.connection);
	    });

	    this.instance.bind("connectionDrag", function (connection) {
	        console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
	        console.log("connection "+connection.id +" 's type is "+connection.connector.type);
	    });

	    this.instance.bind("connectionDragStop", function (connection) {
	        console.log("connection " + connection.id + " was dragged");
	        console.log(connection.id+"'s source is "+connection.source.id);
	        console.log(connection.id+"'s target is "+connection.target.id);
	    });

	    this.instance.bind("connectionMoved", function (params) {
	        console.log("connection " + params.connection.id + " was moved");
	    });  
	}
	
	 /* 图形绘制端点方法：
	 * 参数：toId 图形ID
	 *      sourceAnchors  源端点位置
	 *      targetAnchors  目标端点位置
	 */
	
	
/*		var addEndpointFunc=function(toId,sourceAnchors,targetAnchors){
		for(var i=0;i<sourceAnchors.length;i++){
			var sourceId=toId +sourceAnchors[i];
			instance.addEndpoint(toId,sourceEndpoint,{anchor:sourceAnchors[i],uuid:sourceId});
		}
		
		for(var j=0;j<targetAnchors.length;j++){
			var targetID=toId +targetAnchors[j];
			instance.addEndpoint(toId,targetEndpoint,{anchor:targetAnchors[j],uuid:targetID});
		}
	};*/
	
	 /* 绘制控件：
	 * 控件落下后绘制相应图形，目前有四种
	 * 
	 */
	
	this.drawWidget=function(element,standardAxisX,standardAxisY){
		
		var instance=this.instance;
		var graphWidth=this.graphWidth;
		var graphHeight=this.graphHeight;
		
		var graphGrap=this.graphGrap;
		var graphFillStyle=this.graphFillStyle;
		var graphFillStyleFade=this.graphFillStyleFade;
		var svg=this.svg;
		
		var endpoint=this.endpoint;
		var anchors=this.EndPointAnchors;
		var addPointFunc=this.addFunction;
		var sourceEndpoint=this.sourceEndpoint;
		var targetEndpoint=this.targetEndpoint;
/*		var sourceAnchors=this.sourcePointAnchors;
		var targetAnchors=this.targetPointAnchors;
		var addPointsFunc=this.addPointsFunc;*/
		
		
		
		var drawDiamond=this.drawDiamond;
		var drawRect=this.drawRect;
		var drawEllipse=this.drawEllipse;
		var drawText=this.drawText;
		
		// suspend drawing and initialise.		
			instance.batch(function(){

				$(element).droppable({
					drop:function(event,ui){	
						var text=ui.draggable[0].innerHTML;
						var uiId=ui.draggable[0].id;
					
/*						var divAxisX=event.pageX-240;
						var divAxisY=event.pageY-80;*/
						
						//FIXME 
						//standardAxisX,standardAxisY为在绘图区控件落下位置的基准点，即相对于整个屏幕的原点值
						var divAxisX=event.pageX-standardAxisX-graphWidth/2;
						var divAxisY=event.pageY-standardAxisY-graphHeight/2;						
						
						var guidAuto;
						
						switch(uiId){
						case "modelOne":
								
								$.ajax("generaUUID.do").done(function(data) {
										console.log(data);
										guidAuto=data;
										
										var guidDiv="P"+guidAuto;
										var guidDivId="#"+guidDiv;
										divStr="<div class='window jtk-node' id='"+guidDiv+"' style='position:absolute '></div>";
										$(element).append(divStr);
										$(guidDivId).css("top",divAxisY);
										$(guidDivId).css("left",divAxisX);
										$(guidDivId).css("width",graphWidth);
										$(guidDivId).css("height",graphHeight);
										
										
										
										addPointFunc(guidDiv,anchors,endpoint,instance);
										/*addPointsFunc(guidDiv,sourceEndpoint,sourceAnchors,targetEndpoint,targetAnchors,instance);*/
										
										svg=d3.select(guidDivId).insert("svg").attr("width",graphWidth).attr("height",graphHeight);
										
										var ellipseOut=[{cx:(graphWidth/2),cy:(graphHeight/2),rx:(graphWidth/2-graphGrap/2),ry:(graphHeight/2-graphGrap/2)}];
										drawEllipse(ellipseOut,"modelOut",graphFillStyleFade,guidDiv+"elpO",svg);
										var ellipseInner=[{cx:graphWidth/2,cy:graphHeight/2,rx:(graphWidth/2-graphGrap),ry:(graphHeight/2-graphGrap)}];
										drawEllipse(ellipseInner,"modelIn",graphFillStyle,guidDiv+"elpI",svg);
										
										var text="流程";

										drawText(graphWidth/2,graphHeight/2,text,guidDiv+"Text",svg);
										
										instance.draggable(jsPlumb.getSelector(guidDivId), { grid: [20, 20] });
									});	

							break;
						case "modelTwo":
							
							 $.ajax("generaUUID.do").done(function(data) {
									console.log(data);
									guidAuto=data;
									
									var guidDiv="R"+guidAuto;
									var guidDivId="#"+guidDiv;
									
									var divStr="<div class='window jtk-node' id='"+guidDiv+"' style='position:absolute'></div>";
									$(element).append(divStr);
									$(guidDivId).css("top",divAxisY);
									$(guidDivId).css("left",divAxisX);
									$(guidDivId).css("width",graphWidth);
									$(guidDivId).css("height",graphHeight);
									
									addPointFunc(guidDiv,anchors,endpoint,instance);
									/*addPointsFunc(guidDiv,sourceEndpoint,sourceAnchors,targetEndpoint,targetAnchors,instance);*/
									
									svg=d3.select(guidDivId).append("svg").attr("width",graphWidth).attr("height",graphHeight).attr("id","diamondSvg");
									
									var pathOut="M 0,"+graphHeight/2+" L "+graphWidth/2+",0 "+"L "+graphWidth+","+graphHeight/2+" L "+graphWidth/2+","+graphHeight+" Z";
									
									var pathIn="M "+graphGrap+","+graphHeight/2+" L "+graphWidth/2+","+graphGrap+"L "+(graphWidth-graphGrap)+","+graphHeight/2+" L "+graphWidth/2+","+(graphHeight-graphGrap)+" Z";
									
                                    /*									
                                     *just for test
                                    var pathOut="M 0,40 L 60,0 L 120,40 L 60,80 Z";
									var pathIn="M 10,40 L 60,10 L 110,40 L 60,70 Z";
									*/
									
									drawDiamond(pathOut,"modelOut",graphFillStyleFade,guidDiv+"diaO",svg);
									drawDiamond(pathIn,"modelIn",graphFillStyle,guidDiv+"diaI",svg);
									
									var text="判定";
									
									drawText(graphWidth/2,graphHeight/2,text,guidDiv+"Text",svg);
									
									instance.draggable(jsPlumb.getSelector(guidDivId), { grid: [20, 20] });
							 });						
							
							break;
						case "modelThree":
						
							$.ajax("generaUUID.do").done(function(data) {
									console.log(data);
									guidAuto=data;
									
									var guidDiv="R"+guidAuto;
									var guidDivId="#"+guidDiv;
									
									var divStr="<div class='window jtk-node' id='"+guidDiv+"' style='position:absolute'></div>";
									$(element).append(divStr);	
									$(guidDivId).css("top",divAxisY);
									$(guidDivId).css("left",divAxisX);
									$(guidDivId).css("width",graphWidth);
									$(guidDivId).css("height",graphHeight);
									
									addPointFunc(guidDiv,anchors,endpoint,instance);
									/*addPointsFunc(guidDiv,sourceEndpoint,sourceAnchors,targetEndpoint,targetAnchors,instance);*/
									svg=d3.select(guidDivId).append("svg").attr("width",graphWidth).attr("height",graphHeight).attr("id","rectSvg");
									
									var rectDataOut=[{x:0,y:0}];
									
									drawRect(rectDataOut,graphWidth,graphHeight,"modelOut",graphFillStyleFade,guidDiv+"RctO",svg);
									
		                            var rectDataIn=[{x:graphGrap,y:graphGrap}];
									
									drawRect(rectDataIn,graphWidth-graphGrap*2,graphHeight-graphGrap*2,"modelIn",graphFillStyle,guidDiv+"RctI",svg);
									
									var text="流程";

									drawText(graphWidth/2,graphHeight/2,text,guidDiv+"Text",svg);
									
									instance.draggable(jsPlumb.getSelector(guidDivId), { grid: [20, 20] });
							 });
							
							break;
						case "modelFour":
							$.ajax("generaUUID.do").done(function(data) {
									console.log(data);
									guidAuto=data;
									
									var guidDiv="R"+guidAuto;
									var guidDivId="#"+guidDiv;
									
									var text="数据";
									
									var divStr="<div class='modelIn window jtk-node' id='"+guidDiv+"' style='position:absolute '>"+text+"</div>";
									$(element).append(divStr);
									$(guidDivId).css("top",divAxisY);
									$(guidDivId).css("left",divAxisX);
									$(guidDivId).css("width",graphWidth-graphGrap);
									$(guidDivId).css("height",graphHeight-graphGrap);
									$(guidDivId).css("background-color",graphFillStyle);
									$(guidDivId).css("text-align","center");
									$(guidDivId).css("line-height",(graphHeight-graphGrap)+"px");
									$(guidDivId).css("color","white");
									
									addPointFunc(guidDiv,anchors,endpoint,instance);
									/*addPointsFunc(guidDiv,sourceEndpoint,sourceAnchors,targetEndpoint,targetAnchors,instance);*/
									instance.draggable(jsPlumb.getSelector(guidDivId), { grid: [20, 20] });
						      });

							break;
							
						case "modelFive":
							$.ajax("generaUUID.do").done(function(data) {
								console.log(data);
								guidAuto=data;
								
								var guidDiv="P"+guidAuto;
								var guidDivId="#"+guidDiv;
								divStr="<div class='window jtk-node' id='"+guidDiv+"' style='position:absolute ' data-widget-type='start' ></div>";
								$(element).append(divStr);
								$(guidDivId).css("top",divAxisY);
								$(guidDivId).css("left",divAxisX);
								$(guidDivId).css("width",graphWidth);
								$(guidDivId).css("height",graphHeight);
								
								instance.addEndpoint(guidDiv,sourceEndpoint,{anchor:["Bottom"]});
								
								svg=d3.select(guidDivId).insert("svg").attr("width",graphWidth).attr("height",graphHeight);
								
								var ellipseOut=[{cx:(graphWidth/2),cy:(graphHeight/2),rx:(graphWidth/2-graphGrap/2),ry:(graphHeight/2-graphGrap/2)}];
								drawEllipse(ellipseOut,"modelOut",graphFillStyleFade,guidDiv+"elpO",svg);
								var ellipseInner=[{cx:graphWidth/2,cy:graphHeight/2,rx:(graphWidth/2-graphGrap),ry:(graphHeight/2-graphGrap)}];
								drawEllipse(ellipseInner,"modelIn",graphFillStyle,guidDiv+"elpI",svg);
								
								var text="Start";

								drawText(graphWidth/2,graphHeight/2,text,guidDiv+"Text",svg);
								
								instance.draggable(jsPlumb.getSelector(guidDivId), { grid: [20, 20] });
							});	

							break;	
						case "modelSix":
							$.ajax("generaUUID.do").done(function(data) {
								console.log(data);
								guidAuto=data;
								
								var guidDiv="P"+guidAuto;
								var guidDivId="#"+guidDiv;
								divStr="<div class='window jtk-node' id='"+guidDiv+"' style='position:absolute ' data-widget-type='end'></div>";
								$(element).append(divStr);
								$(guidDivId).css("top",divAxisY);
								$(guidDivId).css("left",divAxisX);
								$(guidDivId).css("width",graphWidth);
								$(guidDivId).css("height",graphHeight);
								
								instance.addEndpoint(guidDiv,targetEndpoint,{anchor:["Top"]});
								
								svg=d3.select(guidDivId).insert("svg").attr("width",graphWidth).attr("height",graphHeight);
								
								var ellipseOut=[{cx:(graphWidth/2),cy:(graphHeight/2),rx:(graphWidth/2-graphGrap/2),ry:(graphHeight/2-graphGrap/2)}];
								drawEllipse(ellipseOut,"modelOut",graphFillStyleFade,guidDiv+"elpO",svg);
								var ellipseInner=[{cx:graphWidth/2,cy:graphHeight/2,rx:(graphWidth/2-graphGrap),ry:(graphHeight/2-graphGrap)}];
								drawEllipse(ellipseInner,"modelIn",graphFillStyle,guidDiv+"elpI",svg);
								
								var text="End";

								drawText(graphWidth/2,graphHeight/2,text,guidDiv+"Text",svg);
								
								instance.draggable(jsPlumb.getSelector(guidDivId), { grid: [20, 20] });
							});	

							break;		
						}
						
					}

			});

	});

	}
	
	/*
	 * 图形增加端点方法
	 * */
	this.addFunction=function(id,anchors,endpoint,instance){
		for(var i=0;i<anchors.length;i++){
			var pointId=id+anchors[i];
			instance.addEndpoint(id,endpoint,{anchor:anchors[i],uuid:pointId});	
		}
		
	}
	
	//sourceEndPointAnchors
	this.addPointsFunc=function(id,sourceEndpoint,sourcePointAnchors,targetEndpoint,targetPointAnchors,instance){
		for(var i=0;i<sourcePointAnchors.length;i++){
			var srouceId=id+sourcePointAnchors[i];
			instance.addEndpoint(id,sourceEndpoint,{anchor:sourcePointAnchors[i],uuid:srouceId});	
		}
		for(var i=0;i<targetPointAnchors.length;i++){
			var targetId=id+targetPointAnchors[i];
			instance.addEndpoint(id,targetEndpoint,{anchor:targetPointAnchors[i],uuid:targetId});	
		}
		
	}
	/*
	 *  初始化连接：设置连接线的标签
	 */
    this.initConn = function (connection) {
    	/*connection.getOverlay("label").setLabel(connection.id);*/
    	console.log("init");
    };
	
	/*
	 *  SVG绘制图形方法：四种如下：
	 *  1.路径  path
	 *  2.矩形  rect
	 *  3.椭圆  ellipse
	 *  4.文字  text
	 */
	this.drawDiamond=function(data,className,fillStyle,id,svg){
		svg.append("path")
           .attr("d",data)
           .attr("stroke",fillStyle)
           .attr("stroke-width",2)
           .attr("fill",fillStyle)
           .attr("class",className)
           .attr("id",id);
	}
	
	this.drawRect=function(data,width,height,className,fillStyle,id,svg){
		svg.selectAll("#"+id)
		   .data(data)
		   .enter()
		   .append("rect")
		   .attr("x",function(d){
			   return d.x;
		   })
		   .attr("y",function(d){
			   return d.y;
		   })
		   .attr("width",width)
		   .attr("height",height)
		   .attr("fill",fillStyle)
		   .attr("class",className)
		   .attr("id",id);
	}
	
	this.drawEllipse=function(data,className,fillStyle,id,svg){
		svg.selectAll("#"+id)
		   .data(data)
		   .enter()
		   .append("ellipse")
		   .attr("cx",function(d){
			   return d.cx;
		   })
		   .attr("cy",function(d){
			   return d.cy;
		   })
		   .attr("rx",function(d){
			   return d.rx;
		   })
		   .attr("ry",function(d){
			   return d.ry;
		   })
		   .attr("fill",fillStyle)
		   .attr("class",className)
		   .attr("id",id);
	}
	
	this.drawText=function(axisX,axisY,text,id,svg){
		svg.append("text")
        .attr("x",function(d,i){
            return axisX;
        })
        .attr("y",function(d,i){
            return axisY;
        })          
        .attr("font-size","14px")
        .attr("text-anchor","middle")
        .attr("fill","white")
        .attr("id",id)
        .text(text);
	}
	
	/*Delete widget
	 * */
/*	this.delWidget=function(){
		
	}*/

}