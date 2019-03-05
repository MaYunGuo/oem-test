package com.oem.util;


import java.io.*;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;


public class FileUtil {

    public static File[] getFiles(String filePath) {
        File[] files = null;
        File fileDirect = new File(filePath);

        if (fileDirect.isDirectory()) {
            files = fileDirect.listFiles();
        }

        return files;
    }

    public static List<String> getFileContent(File file) {
        List<String> readAllLines = null;

        try {
            readAllLines = Files.readAllLines(Paths.get(file.getPath()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return readAllLines;
    }

    public static boolean checkFileExist(String filePath) {
        boolean flag = false;

        File file = new File(filePath);

        if (file.exists()) {
            flag = true;
        }

        return flag;
    }

    public static void makeDirectory(String filePath) {

        File file = new File(filePath);

        if (!file.exists()) {
            file.mkdirs();
        }
    }

    public static boolean deleteFile(File file) {

        if (!file.delete()) {
            return false;
        }

        return true;
    }

    @SuppressWarnings("resource")
    public static void copyFile(File source, File dest) throws IOException {
        FileChannel inputChannel = null;
        FileChannel outputChannel = null;

        inputChannel = new FileInputStream(source).getChannel();
        outputChannel = new FileOutputStream(dest).getChannel();

        outputChannel.transferFrom(inputChannel, 0, inputChannel.size());
        inputChannel.close();
        outputChannel.close();
    }

    public static File findFile(String fileName) {
        return new File(fileName);
    }

    public static File createFile(String path, String fileName) {

        File directory = new File(path);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        return new File(path + fileName);
    }


    public static void createFile(String fileName) {

        File file = new File(fileName);

        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public static void deleteFile(String fileName) {
        File file = new File(fileName);

        if (file.exists()) {
            deleteFile(file);
        }
    }


    public static void writeFileContent(String fileName, String fileContents) throws IOException {

        BufferedWriter writer = Files.newBufferedWriter(Paths.get(fileName));
        writer.write(fileContents);
        writer.close();

    }


    public static void updateFile(File file, List<String> fileContent) throws IOException {
        BufferedWriter bw = new BufferedWriter(new FileWriter(file));
        for (String line : fileContent) {
            bw.write(line);
            bw.newLine();
            bw.flush();
        }
        bw.close();
    }

    public static void backExcelFile(File excelFile) throws IOException {
        String fileName = excelFile.getName();
        String filePath = excelFile.getAbsolutePath();
        String fileBakPath = filePath.substring(0, filePath.lastIndexOf(File.separator)) + File.separator + "TEMP" + File.separator;
        File destFile = FileUtil.createFile(fileBakPath, fileName);  //备份
        FileUtil.copyFile(excelFile, destFile);
        FileUtil.deleteFile(excelFile);
    }

}
