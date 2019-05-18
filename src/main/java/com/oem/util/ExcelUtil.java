package com.oem.util;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class ExcelUtil {

    //读取excel
    public static Workbook readExcel(String filePath) throws Exception{
        if(StringUtil.isSpaceCheck(filePath)){
            return null;
        }
        Workbook wb = null;
        String extString = filePath.substring(filePath.lastIndexOf("."));
        InputStream is = new FileInputStream(filePath);
        if(".xls".equals(extString)){
             wb = new HSSFWorkbook(is);
        }else if(".xlsx".equals(extString)){
             wb = new XSSFWorkbook(is);
        }
        return wb;
    }
    public static Workbook readExcel(MultipartFile file) throws Exception {
        Workbook workbook  = null;
        String fileName = file.getOriginalFilename();
        boolean is03Excel = fileName.matches("^.+\\.(?i)(xls)$");
        InputStream  in = file.getInputStream();
        //1、读取工作簿
        workbook = is03Excel ? new HSSFWorkbook(in) : new XSSFWorkbook(in);
        return workbook;
    }


    public static String getCellValue(Cell cell) {
        String cellValue = "";
        DateFormat formater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (cell != null) {
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_NUMERIC:
                    if (org.apache.poi.ss.usermodel.DateUtil.isCellDateFormatted(cell)) {
                        cellValue = formater.format(cell.getDateCellValue());
                    } else {
                        cellValue=new BigDecimal(cell.getNumericCellValue()+"").toString();
                    }
                    break;
                case Cell.CELL_TYPE_STRING:
                    cellValue = cell.getStringCellValue();
                    break;
                case Cell.CELL_TYPE_BOOLEAN:
                    cellValue = String.valueOf(cell.getBooleanCellValue());
                    break;
                case Cell.CELL_TYPE_FORMULA:
                    cellValue = String.valueOf(cell.getCellFormula());
                    break;
                case Cell.CELL_TYPE_BLANK:
                    cellValue = "";
                    break;
                case Cell.CELL_TYPE_ERROR:
                    cellValue = "";
                    break;
                default:
                    cellValue = cell.toString().trim();
                    break;
            }
        }
        return cellValue.trim();
    }

    public static List<String[]> getExcelData(Workbook wb) throws IOException {

        List<String[]> dataList = new ArrayList<>();
        Sheet st = wb.getSheetAt(0);
        int rowCnt = st.getLastRowNum();
        int columnCnt = st.getRow(0).getPhysicalNumberOfCells();
        for(int i=1;i<=rowCnt;i++){
              String [] data = new String[columnCnt];
              Row row = st.getRow(i);
              for(int j=0;j<columnCnt;j++){
                  data[j] =getCellValue(row.getCell(j));
              }
              dataList.add(data);
        }
        return dataList;
    }


    public static void exportExcel(String filePath, String fileNamePrefix, List<String> header, List<String[]> dataValues) throws Exception {

        Workbook wb = new XSSFWorkbook();
        // 第二步，在workbook中添加一个sheet,对应Excel文件中的sheet
        Sheet sheet = wb.createSheet();
        // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制
        Row row = sheet.createRow(0);
        // 第四步，创建单元格，并设置值表头 设置表头居中
        CellStyle style = wb.createCellStyle();
        style.setAlignment(HorizontalAlignment.CENTER);
        Cell cell = null;

        //创建标题
        for(int i=0;i<header.size();i++){
            cell = row.createCell(i);
            cell.setCellValue(header.get(i));
            cell.setCellStyle(style);
        }
        //创建内容
        for(int i=0;i<dataValues.size();i++){
            row = sheet.createRow(i + 1);
            for(int j=0;j<dataValues.get(i).length;j++){
                //将内容按顺序赋给对应的列对象
                row.createCell(j).setCellValue(dataValues.get(i)[j]);
            }
        }
        //创建上传文件目录
        File folder = new File(filePath);
        //如果文件夹不存在创建对应的文件夹
        if (!folder.exists()) {
            folder.mkdirs();
        }

        //设置文件名
        String fileName = fileNamePrefix  + DateUtil.getRvTime() + ".xlsx";
        String savePath = filePath + File.separator + fileName;
        File outFile = new File(savePath);
        if(!outFile.exists()) {
            outFile.createNewFile();
            outFile = new File(savePath);
        }
        OutputStream fileOut = new FileOutputStream(outFile);
        wb.write(fileOut);
        fileOut.close();
        wb.close();
    }


}
