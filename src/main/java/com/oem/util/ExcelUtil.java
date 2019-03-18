package com.oem.util;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
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

    public static List<String[]> getExcelData(Workbook wb) throws IOException {

        List<String[]> dataList = new ArrayList<>();
        Sheet st = wb.getSheetAt(0);
        int rowCnt = st.getLastRowNum();
        int columnCnt = st.getRow(0).getPhysicalNumberOfCells();
        for(int i=1;i<rowCnt;i++){
              String [] data = new String[columnCnt];
              Row row = st.getRow(i);
              for(int j=0;j<columnCnt;i++){
                  data[j] = getCellValue(row.getCell(j));
              }
              dataList.add(data);
        }
        return dataList;
    }


}
