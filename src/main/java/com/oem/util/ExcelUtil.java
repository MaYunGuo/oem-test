package com.oem.util;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.InputStream;

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

    public static String getCellValue(Cell cell) {
        String cellValue = "";
        DataFormatter formatter = new DataFormatter();
        if (cell != null) {
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_NUMERIC:
                    if (DateUtil.isCellDateFormatted(cell)) {
                        cellValue = formatter.formatCellValue(cell);
                    } else {
                        double value = cell.getNumericCellValue();
                        int intValue = (int) value;
                        cellValue = value - intValue == 0 ? String.valueOf(intValue) : String.valueOf(value);
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

}
