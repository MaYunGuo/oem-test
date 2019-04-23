package com.oem.util;


import java.io.*;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


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

        if(!dest.exists()){
            dest.createNewFile();
            dest = new File(dest.getAbsolutePath());
        }

        FileChannel inputChannel = null;
        FileChannel outputChannel = null;

        inputChannel = new FileInputStream(source).getChannel();
        outputChannel = new FileOutputStream(dest).getChannel();

        outputChannel.transferFrom(inputChannel, 0, inputChannel.size());
        inputChannel.close();
        outputChannel.close();
    }

    public static void copyFile(InputStream in, File destFile) throws Exception {
        OutputStream os = new FileOutputStream(destFile);
        int bytesRead = 0;
        byte[] buffer = new byte[8192];
        while ((bytesRead = in.read(buffer, 0, 8192)) != -1) {
            os.write(buffer, 0, bytesRead);
        }
        os.close();
        in.close();
    }

    public static File findFile(String fileName) {
        return new File(fileName);
    }

    public static File createFile(String path, String fileName) throws Exception {

        File directory = new File(path);
        if (!directory.exists()) {
            directory.mkdirs();
            storeFile(path);
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

    public static void backExcelFile(File excelFile) throws Exception {
        String fileName = excelFile.getName();
        String filePath = excelFile.getAbsolutePath();
        String fileBakPath = filePath.substring(0, filePath.lastIndexOf(File.separator)) + File.separator + "TEMP" + File.separator;
        File destFile = FileUtil.createFile(fileBakPath, fileName);  //备份
        FileUtil.copyFile(excelFile, destFile);
        FileUtil.deleteFile(excelFile);
    }

    /**
     * 修改linux图片权限
     * @param filePath
     * @throws IllegalStateException
     * @throws IOException
     */
    public static void storeFile(String filePath) throws Exception {
        File file = new File(filePath);
        //设置权限
        Set<PosixFilePermission> perms = new HashSet<PosixFilePermission>();
        perms.add(PosixFilePermission.OWNER_READ);//设置所有者的读取权限
        perms.add(PosixFilePermission.OWNER_WRITE);//设置所有者的写权限
        perms.add(PosixFilePermission.OWNER_EXECUTE);//设置所有者的执行权限
        perms.add(PosixFilePermission.GROUP_READ);//设置组的读取权限
        perms.add(PosixFilePermission.GROUP_WRITE); //设置组的写权限
        perms.add(PosixFilePermission.GROUP_EXECUTE);//设置组的执行权限
        perms.add(PosixFilePermission.OTHERS_READ);//设置其他的读取权限
        perms.add(PosixFilePermission.OTHERS_WRITE); //设置其他的写权限
        perms.add(PosixFilePermission.OTHERS_EXECUTE);//设置其他的执行权限
        //设置文件和文件夹的权限
        Path pathParent = Paths.get(file.getParentFile().getAbsolutePath());
        Path pathDest = Paths.get(file.getAbsolutePath());
        Files.setPosixFilePermissions(pathParent, perms);//修改文件夹路径的权限
        Files.setPosixFilePermissions(pathDest, perms);//修改图片文件的权限
    }

}
