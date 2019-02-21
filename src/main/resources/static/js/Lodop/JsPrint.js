var LODOP;
var printBySelfunc = function (company,mdlIdFk,mdlIdFkDesc,woIdFk,prdQty,NWeight,GWeight,boxIdFk,note) {
    LODOP=getLodop();
    LODOP.PRINT_INIT("");
    LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR",true);
    LODOP.ADD_PRINT_LINE("14mm","6mm","14mm","146mm",0,1);
    LODOP.ADD_PRINT_RECT("24mm","6mm","140mm","74mm",0,1);
    LODOP.ADD_PRINT_LINE("34mm","6mm","34mm","146mm",0,1);
    LODOP.ADD_PRINT_LINE("44mm","6mm","44mm","146mm",0,1);
    LODOP.ADD_PRINT_LINE("54mm","6mm","54mm","146mm",0,1);
    LODOP.ADD_PRINT_LINE("64mm","6mm","64mm","106mm",0,1);
    LODOP.ADD_PRINT_LINE("74mm","6mm","74mm","106mm",0,1);
    LODOP.ADD_PRINT_LINE("88mm","6mm","88mm","106mm",0,1);
    LODOP.ADD_PRINT_LINE("98mm","36mm","24mm","36mm",0,1);
    LODOP.ADD_PRINT_LINE("98mm","106mm","44mm","106mm",0,1);
    LODOP.ADD_PRINT_LINE("74mm","56mm","64mm","56mm",0,1);
    LODOP.ADD_PRINT_LINE("74mm","86mm","64mm","86mm",0,1);
    LODOP.SET_PRINT_STYLE("FontSize",14);
    LODOP.ADD_PRINT_TEXT("8mm","5mm","70mm","10mm",company);
    LODOP.ADD_PRINT_TEXT("8mm","2mm","70mm","10mm","");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",18);
    LODOP.ADD_PRINT_TEXT("16mm","6mm","140mm","10mm","产品标识卡");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("25mm","6mm","30mm","6mm","物料号");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("30mm","6mm","30mm","4mm","(ProductSpec)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("35mm","6mm","30mm","6mm","物料描述");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("40mm","6mm","30mm","4mm","(ProductSpecDesc)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("45mm","6mm","30mm","6.01mm","GVO批次");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("50mm","6mm","30mm","4mm","(WorkOrder)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("55mm","6mm","30mm","6.01mm","数量");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("60mm","6mm","30mm","4mm","(QTY)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("65mm","6mm","30mm","6.01mm","净重");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("70mm","6mm","30mm","4mm","(NetWeight)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("79mm","6mm","30mm","14mm","PPBoxID");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("89mm","6mm","30mm","6.01mm","备注");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("94mm","6mm","30mm","4mm","(ReMark)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",16);
    LODOP.ADD_PRINT_TEXT("27mm","36mm","110mm","10mm",mdlIdFk);
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.ADD_PRINT_TEXT("37mm","36mm","110mm","10mm",mdlIdFkDesc);
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.ADD_PRINT_TEXT("47mm","36mm","70mm","10mm",woIdFk);
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("47mm","106mm","40mm","10mm","QC检验(QC Test)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",16);
    LODOP.ADD_PRINT_TEXT("57mm","36mm","70mm","10mm",prdQty+"PCS");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.ADD_PRINT_TEXT("67mm","36mm","20mm","10mm",NWeight+"kg");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("65mm","56mm","30mm","6mm","毛重");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("70mm","56mm","30mm","4mm","(GrossWeight)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",16);
    LODOP.ADD_PRINT_TEXT("67mm","86mm","20mm","10mm",GWeight+"kg");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_BARCODE("75mm","39mm","70mm","13mm","Code39",boxIdFk);
    LODOP.SET_PRINT_STYLE("FontSize",16);
    LODOP.ADD_PRINT_TEXT("91mm","36mm","70mm","10mm",note);
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.PREVIEW();

};

var printBtnfunc = function (mdlIdFk,mdlIdFkDesc,woIdFk,prdQty,NWeight,GWeight,boxIdFk) {
    LODOP=getLodop();
    LODOP.PRINT_INIT("");
    //LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //规定纸张大小；使用A4纸。
    LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR",true);
    LODOP.ADD_PRINT_LINE("14mm","6mm","14mm","146mm",0,1);
    LODOP.ADD_PRINT_RECT("24mm","6mm","140mm","74mm",0,1);
   /* LODOP.ADD_PRINT_LINE("14mm","6mm","14mm","146mm",0,1);*/
   /* LODOP.ADD_PRINT_LINE("24mm","6mm","24mm","146mm",0,1);*/
    LODOP.ADD_PRINT_LINE("34mm","6mm","34mm","146mm",0,1);
    LODOP.ADD_PRINT_LINE("44mm","6mm","44mm","146mm",0,1);
    LODOP.ADD_PRINT_LINE("54mm","6mm","54mm","146mm",0,1);
    LODOP.ADD_PRINT_LINE("64mm","6mm","64mm","106mm",0,1);
    LODOP.ADD_PRINT_LINE("74mm","6mm","74mm","106mm",0,1);
    LODOP.ADD_PRINT_LINE("88mm","6mm","88mm","106mm",0,1);
    LODOP.ADD_PRINT_LINE("98mm","36mm","24mm","36mm",0,1);
    LODOP.ADD_PRINT_LINE("98mm","106mm","44mm","106mm",0,1);
    LODOP.ADD_PRINT_LINE("74mm","56mm","64mm","56mm",0,1);
    LODOP.ADD_PRINT_LINE("74mm","86mm","64mm","86mm",0,1);
    LODOP.SET_PRINT_STYLE("FontSize",14);
//    LODOP.ADD_PRINT_TEXT("8mm","2mm","70mm","10mm","霸州市云谷电子科技有限公司");
    LODOP.ADD_PRINT_TEXT("8mm","5mm","70mm","10mm","昆山国显光电有限公司");
    LODOP.ADD_PRINT_TEXT("8mm","2mm","70mm","10mm","");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",18);
    LODOP.ADD_PRINT_TEXT("16mm","6mm","140mm","10mm","产品标识卡");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    //LODOP.SET_PRINT_STYLE("FontName","宋体");
    LODOP.ADD_PRINT_TEXT("25mm","6mm","30mm","6mm","物料号");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("30mm","6mm","30mm","4mm","(ProductSpec)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("35mm","6mm","30mm","6mm","物料描述");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("40mm","6mm","30mm","4mm","(ProductSpecDesc)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("45mm","6mm","30mm","6.01mm","GVO批次");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("50mm","6mm","30mm","4mm","(WorkOrder)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("55mm","6mm","30mm","6.01mm","数量");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("60mm","6mm","30mm","4mm","(QTY)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("65mm","6mm","30mm","6.01mm","净重");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("70mm","6mm","30mm","4mm","(NetWeight)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("79mm","6mm","30mm","14mm","PPBoxID");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("89mm","6mm","30mm","6.01mm","备注");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("94mm","6mm","30mm","4mm","(ReMark)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",16);
    LODOP.ADD_PRINT_TEXT("27mm","36mm","110mm","10mm",mdlIdFk);
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.ADD_PRINT_TEXT("37mm","36mm","110mm","10mm",mdlIdFkDesc);
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.ADD_PRINT_TEXT("47mm","36mm","70mm","10mm",woIdFk);
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("47mm","106mm","40mm","10mm","QC检验(QC Test)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",16);
    LODOP.ADD_PRINT_TEXT("57mm","36mm","70mm","10mm",prdQty+"PCS");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.ADD_PRINT_TEXT("67mm","36mm","20mm","10mm",NWeight+"kg");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_TEXT("65mm","56mm","30mm","6mm","毛重");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",9);
    LODOP.ADD_PRINT_TEXT("70mm","56mm","30mm","4mm","(GrossWeight)");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",16);
    LODOP.ADD_PRINT_TEXT("67mm","86mm","20mm","10mm",GWeight+"kg");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLE("FontSize",12);
    LODOP.ADD_PRINT_BARCODE("75mm","39mm","70mm","13mm","Code39",boxIdFk);
    LODOP.SET_PRINT_STYLE("FontSize",16);
    LODOP.ADD_PRINT_TEXT("91mm","36mm","70mm","10mm","");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.PREVIEW();

};

//多晶小包标签
var printDJXBfunc = function (effc, clor, gear, grade, date, lineID, mdlID,prd_qty,barCode1) {
    LODOP = getLodop();
    LODOP.PRINT_INIT("");
    //LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //规定纸张大小；使用A4纸。
    LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR", true);
    // LODOP.ADD_PRINT_LINE("14mm","6mm","14mm","146mm",0,1);
    /*ADD_PRINT_RECT(Top, Left, Width, Height,intLineStyle, intLineWidth)*/
    LODOP.ADD_PRINT_RECT("1.25mm", "0.44mm", "49mm", "32.75mm", 0, 1);
    //横向
    /*ADD_PRINT_LINE(Top1,Left1, Top2, Left2,intLineStyle, intLineWidth)*/
    LODOP.ADD_PRINT_LINE("5.6mm", "0.44mm", "5.6mm", "49.44mm", 0, 1);
    LODOP.ADD_PRINT_LINE("14.07mm", "0.44mm", "14.07mm", "49.44mm", 0, 1);
    LODOP.ADD_PRINT_LINE("18.36mm", "0.44mm", "18.36mm", "49.44mm", 0, 1);
    LODOP.ADD_PRINT_LINE("22.66mm", "0.44mm", "22.66mm", "49.44mm", 0, 1);
    LODOP.ADD_PRINT_LINE("27.27mm", "0.44mm", "27.27mm", "49.44mm", 0, 1);
    //纵向
    /*ADD_PRINT_LINE(Top1,Left1, Top2, Left2,intLineStyle, intLineWidth)*/
    LODOP.ADD_PRINT_LINE("1.25mm", "13.9mm", "27.22mm", "13.9mm", 0, 1);
    LODOP.ADD_PRINT_LINE("1.25mm", "28.9mm", "14mm", "28.9mm", 0, 1);

    LODOP.ADD_PRINT_LINE("14mm", "23.93mm", "27mm", "23.93mm", 0, 1);
    LODOP.ADD_PRINT_LINE("14mm", "38.31mm", "27mm", "38.31mm", 0, 1);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    LODOP.ADD_PRINT_TEXT("2.38mm", "0.44mm", "14mm", "5mm", "Eff(效率):");
    //居中
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    LODOP.ADD_PRINT_TEXT("2.38mm", "13.9mm", "16mm", "5mm", "Color(花色):");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    LODOP.ADD_PRINT_TEXT("2.38mm", "31mm", "16mm", "5mm", "Label(档位):");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 14);
    LODOP.SET_PRINT_STYLE("FontName", "Arial");
    //todo 效率传入
    LODOP.ADD_PRINT_TEXT("7mm", "0.44mm", "14mm", "12mm", effc);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 14);
    LODOP.SET_PRINT_STYLE("FontName", "宋体");
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    //todo 花色传入
    LODOP.ADD_PRINT_TEXT("7mm", "13mm", "18mm", "12mm", clor);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 20);
    LODOP.SET_PRINT_STYLE("FontName", "宋体");
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    //todo 档位传入
    LODOP.ADD_PRINT_TEXT("7mm", "30mm", "18mm", "16mm", gear);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    LODOP.ADD_PRINT_TEXT("15mm", "0.2mm", "16mm", "5mm", "Grade(等级):");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    LODOP.SET_PRINT_STYLE("FontName", "Arial");
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    //todo 等级传入
    LODOP.ADD_PRINT_TEXT("15mm", "15mm", "8mm", "5mm", grade);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    LODOP.ADD_PRINT_TEXT("15mm", "23mm", "16mm", "5mm", "Date(日期):");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    LODOP.SET_PRINT_STYLE("FontName", "Arial");
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    //todo 日期传入
    LODOP.ADD_PRINT_TEXT("15mm", "36mm", "16mm", "5mm", date);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    LODOP.ADD_PRINT_TEXT("19.5mm", "0.44mm", "14mm", "5mm", "Line(线别):");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    LODOP.SET_PRINT_STYLE("FontName", "Arial");
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    //todo 线别传入
    LODOP.ADD_PRINT_TEXT("19.5mm", "15mm", "8mm", "5mm", lineID);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    LODOP.ADD_PRINT_TEXT("19.5mm", "24.5mm", "14mm", "5mm", "Code(料号):");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    LODOP.SET_PRINT_STYLE("FontName", "Arial");
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    //todo 料号传入
    LODOP.ADD_PRINT_TEXT("19.5mm", "35.9mm", "16mm", "5mm", mdlID);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    LODOP.ADD_PRINT_TEXT("24mm", "0.58mm", "16mm", "5mm", "Number(数量):");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 1);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    LODOP.SET_PRINT_STYLE("FontName", "Arial");
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    //todo 数量暂时写死
    LODOP.ADD_PRINT_TEXT("24mm", "14mm", "10mm", "5mm", prd_qty +"PCS");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.SET_PRINT_STYLE("FontSize", 6);
    /*ADD_PRINT_TEXT(Top,Left,Width,Height,strContent)*/
    LODOP.ADD_PRINT_TEXT("24mm", "22.5mm", "18mm", "5mm", "Tester(测试员):");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    /*ADD_PRINT_BARCODE(Top, Left,Width, Height, CodeType, CodeValue)*/

    LODOP.ADD_PRINT_BARCODE("28.8mm","5mm","48mm","5mm","Code39",barCode1);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.PREVIEW();
    // LODOP.PRINT();
};

var printBtnfunc2 = function (fab_id, mtrlIn_no, buyer, cus_info, current_time, fab_info, table_no, oary, i) {
    var j = i * 5;
    var trStr="";
    // for (var i = 0; i < 5; i++) {
    //     if(!oary[i+j]){
    //         trStr = trStr + "<tr >\n" +
    //             "    <td   width=\\\"8%\\\"></td>\n" +
    //             "    <td   width=\\\"17%\\\"></td>\n" +
    //             "    <td   width=\\\"25%\\\"></td>\n" +
    //             "    <td   width=\\\"15%\\\"></td>\n" +
    //             "    <td   width=\\\"14%\\\"></td>\n" +
    //             "    <td   width=\\\"8%\\\"></td>\n" +
    //             "    <td   width=\\\"5%\\\"></td>\n" +
    //             "    <td   width=\\\"8%\\\"></td>\n" +
    //             "    <td   width=\\\"14%\\\"></td>\n" +
    //             "    <td   width=\\\"8%\\\"></td>\n" +
    //             "    <td   width=\\\"5%\\\"></td>\n" +
    //             "    <td   width=\\\"8%\\\"></td>\n" +
    //             "</tr>\n";
    //     }else{
    //         trStr = trStr + "<tr >\n" +
    //             "    <td   width=\\\"8%\\\">"+(j+i+1)+"</td>\n" +
    //             "    <td   width=\\\"17%\\\">" + oary[i+j].mtrl_prod_id + "</td>\n" +
    //             "    <td   width=\\\"25%\\\">" + oary[i+j].mtrl_prod_dsc + "</td>\n" +
    //             "    <td   width=\\\"15%\\\">" + oary[i+j].dest_shop + "</td>\n" +
    //             "    <td   width=\\\"14%\\\">" + oary[i+j].shelf_id + "</td>\n" +
    //             "    <td   width=\\\"8%\\\">" + oary[i+j].mtrl_unit + "</td>\n" +
    //             "    <td   width=\\\"5%\\\">" + oary[i+j].do_rcv_qty + "</td>\n" +
    //             "    <td   width=\\\"8%\\\">" + oary[i+j].do_act_qty + "</td>\n" +
    //             "    <td   width=\\\"14%\\\">" + oary[i+j].po_info + "</td>\n" +
    //             "    <td   width=\\\"8%\\\">" + oary[i+j].batch_no + "</td>\n" +
    //             "    <td   width=\\\"5%\\\">" + oary[i+j].check_batch + "</td>\n" +
    //             "    <td   width=\\\"8%\\\"></td>\n" +
    //             "</tr>\n";
    //     }
    //
    // }

    var tableStr = "<style>\n" +
        "table {\n" +
        "border-collapse: collapse;\n" +
        "font-size:'12px';\n" +
        "font-family:'宋体';\n" +
        "width:'50px';\n" +
        "table-layout: fixed;word-wrap:break-word;\n"+
        "}\n" +
        "td{\n" +
        "border:1px solid #333;\n" +
        " }\n" +
        "table tr{" +
        "height: 30px;" +
        "line-height: 30px;}" +
        "table .first{" +
        "font-weight:bold}" +
        "</style>\n" +
        "<table  cellspacing=\\\"0\\\" cellpadding=\\\"0\\\">\n" +
        "<tr class='first';>\n" +
        "    <td   width=\\\"8%\\\">项目</td>\n" +
        "    <td   width=\\\"17%\\\">物料</td>\n" +
        "    <td   width=\\\"25%\\\">物料描述</td>\n" +
        "    <td   width=\\\"15%\\\">库位</td>\n" +
        "    <td   width=\\\"14%\\\">货位</td>\n" +
        "    <td   width=\\\"8%\\\">单位</td>\n" +
        "    <td   width=\\\"5%\\\">收货数量</td>\n" +
        "    <td   width=\\\"8%\\\">实入数量</td>\n" +
        "    <td   width=\\\"14%\\\">采购订单/行项目</td>\n" +
        "    <td   width=\\\"8%\\\">物料批次</td>\n" +
        "    <td   width=\\\"5%\\\">检验批次</td>\n" +
        "    <td   width=\\\"8%\\\">备注</td>\n" +
        "</tr>\n" +
        trStr
    "</table>\n";

    $('table tr:first').css('font-weight', 'bolder');
    LODOP = getLodop();
    // LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
    LODOP.PRINT_INITA(-25, -55, 800, 600, "");
    LODOP.SET_PRINT_PAGESIZE(0, 2410, 1400, "utf-8");
    LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR", true);
    LODOP.ADD_PRINT_TEXT(32, 227, 428, 48, fab_id);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 21);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.ADD_PRINT_TEXT(93, 337, 199, 35, "入库验收单");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.ADD_PRINT_TEXT(143, 90, 93, 29, "入库单号：");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.ADD_PRINT_TEXT(143, 183, 228, 29, mtrlIn_no);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.ADD_PRINT_TEXT(182, 90, 77, 29, "采购员：");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.ADD_PRINT_TEXT(182, 163, 251, 29, buyer);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.ADD_PRINT_TEXT(220, 163, 248, 29, cus_info);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.ADD_PRINT_TEXT(220, 90, 77, 29, "供应商：");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.ADD_PRINT_TEXT(143, 432, 89, 29, "入库日期：");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.ADD_PRINT_TEXT(182, 432, 60, 29, "工厂：");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.ADD_PRINT_TEXT(143, 516, 197, 29, current_time);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.ADD_PRINT_TEXT(182, 489, 222, 29, fab_info);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.ADD_PRINT_TABLE(252, 90, 1000, 200, tableStr);
    LODOP.ADD_PRINT_TEXT(450, 90, 100, 29, "仓管：");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.ADD_PRINT_TEXT(450, 258, 100, 29, "检验：");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.ADD_PRINT_TEXT(450, 425, 100, 29, "财务员：");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.ADD_PRINT_TEXT(450, 602, 100, 29, "复核人：");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.ADD_PRINT_TEXT(485, 90, 630, 25, "一式三联:第一联(白)财务 第二联(红)仓库 第三联(黄)采购 指引文件:仓库管理办法 表单编号:");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.ADD_PRINT_TEXT(485, 702, 95, 25, table_no);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.PREVIEW();
    // LODOP.PRINTA();
}

