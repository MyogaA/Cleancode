package com.beetpos.util;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Environment;

import androidx.core.app.ActivityCompat;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.RandomAccessFile;
import java.text.SimpleDateFormat;
import java.util.Arrays;

public class FileUtils {

    /**
     * 将数据存到文件
     */
    public static void AddToFile(byte[] buffer, int byteOffset, int byteCount,
                                 String dumpfile) {
        if (null == dumpfile)
            return;
        if (null == buffer)
            return;
        if (byteOffset < 0 || byteCount <= 0)
            return;

        try {
            File file = new File(dumpfile);
            if (!file.exists()) {
                file.createNewFile();
            }
            RandomAccessFile raf = new RandomAccessFile(file, "rw");
            raf.seek(file.length());
            raf.write(buffer, byteOffset, byteCount);
            raf.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void AddToFile(String text, String dumpfile) {
        if (null == dumpfile)
            return;
        if (null == text)
            return;
        if ("".equals(text))
            return;

        try {
            File file = new File(dumpfile);
            if (!file.exists()) {
                file.createNewFile();
            }
            RandomAccessFile raf = new RandomAccessFile(file, "rw");
            raf.seek(file.length());
            raf.write(text.getBytes());
            raf.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void SaveToFile(String text, String dumpfile) {
        if (null == dumpfile)
            return;
        if (null == text)
            return;

        try {
            File file = new File(dumpfile);
            if (file.exists())
                file.delete();

            file.createNewFile();
            RandomAccessFile raf = new RandomAccessFile(file, "rw");
            raf.seek(0);
            raf.write(text.getBytes());
            raf.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static boolean SaveTextToFile(String path, String name, String text, String encoding) {
        boolean result = false;
        try {
            File dir = new File(path);
            if (!dir.exists())
                dir.mkdirs();
            File file = new File(path + "/" + name);
            if (file.exists())
                file.delete();
            file.createNewFile();
            RandomAccessFile raf = new RandomAccessFile(file, "rw");
            raf.seek(0);
            raf.write(text.getBytes(encoding));
            raf.close();
            result = true;
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return result;
    }

    private static final byte[] utf8_boom = new byte[]{(byte) 0xef, (byte) 0xbb, (byte) 0xbf};

    public static boolean SaveTextToFileInUtf8WithBoom(String path, String name, String text) {
        boolean result = false;
        try {
            File dir = new File(path);
            if (!dir.exists())
                dir.mkdirs();
            File file = new File(path + "/" + name);
            if (file.exists())
                file.delete();
            file.createNewFile();
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(utf8_boom);
            fos.write(text.getBytes("UTF-8"));
            fos.close();
            result = true;
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return result;
    }

    public static boolean SaveBytesToFile(String filename, byte[] data) {
        boolean result = false;
        try {
            File file = new File(filename);
            File dir = new File(file.getParent());
            if (!dir.exists())
                dir.mkdirs();
            if (file.exists())
                file.delete();
            file.createNewFile();
            RandomAccessFile raf = new RandomAccessFile(file, "rw");
            raf.seek(0);
            raf.write(data);
            raf.close();
            result = true;
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return result;
    }

    public static String ReadTextFromFile(String path, String name, String encoding) {
        String text = null;
        try {
            File file = new File(path + "/" + name);
            if (file.exists()) {
                Long filelength = file.length();
                byte[] filecontent = new byte[filelength.intValue()];
                FileInputStream in = new FileInputStream(file);
                in.read(filecontent);
                in.close();
                text = new String(filecontent, encoding);
            }
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return text;
    }

    public static String ReadTextFromFileInUtf8WithBoom(String path, String name) {
        String text = null;
        try {
            File file = new File(path + "/" + name);
            if (file.exists()) {
                Long filelength = file.length();
                byte[] filecontent = new byte[filelength.intValue()];
                FileInputStream in = new FileInputStream(file);
                in.read(filecontent);
                in.close();
                if ((filecontent.length >= utf8_boom.length) && Arrays.equals(Arrays.copyOf(filecontent, utf8_boom.length), utf8_boom)) {
                    text = new String(filecontent, utf8_boom.length, filecontent.length - utf8_boom.length, "UTF-8");
                } else {
                    text = new String(filecontent, "UTF-8");
                }
            }
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return text;
    }

    public static byte[] ReadBytesFromFile(String filename) {
        byte[] filecontent = null;
        try {
            File file = new File(filename);
            if (file.exists()) {
                Long filelength = file.length();
                filecontent = new byte[filelength.intValue()];
                FileInputStream in = new FileInputStream(file);
                in.read(filecontent);
                in.close();
            }
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return filecontent;
    }

    public static boolean hasStoragePermission(Activity activity) {
        boolean hasPermission = false;
        if (Build.VERSION.SDK_INT >= 23) {
            if (activity != null) {
                if (ActivityCompat.checkSelfPermission(activity, Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
                    hasPermission = true;
                }
            }
        } else {
            hasPermission = true;
        }
        return hasPermission;
    }

    public static void requestStoragePermission(Activity activity, int requestCode) {
        String[] permissions = new String[]{
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.READ_EXTERNAL_STORAGE
        };
        ActivityCompat.requestPermissions(activity, permissions, requestCode);
    }

    public static String ReadToString(String filePathName) {

        File file = new File(filePathName);
        if (!file.exists())
            return null;

        Long filelength = file.length();
        byte[] filecontent = new byte[filelength.intValue()];
        try {
            FileInputStream in = new FileInputStream(file);
            in.read(filecontent);
            in.close();
            return new String(filecontent);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static byte[] ReadToMem(String filePathName) {
        File file = new File(filePathName);
        if (!file.exists())
            return null;

        Long filelength = file.length();
        byte[] filecontent = new byte[filelength.intValue()];
        try {
            FileInputStream in = new FileInputStream(file);
            in.read(filecontent);
            in.close();
            return filecontent;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static <T> void SaveToFile(T t, String file, Context context) {

        FileOutputStream fos;
        ObjectOutputStream oos;

        try {
            fos = context.openFileOutput(file, Context.MODE_PRIVATE);
            oos = new ObjectOutputStream(fos);
            oos.writeObject(t);
            oos.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static <T> void SaveObjectToFile(T t, String file) {

        FileOutputStream fos;
        ObjectOutputStream oos;

        try {
            fos = new FileOutputStream(file);
            oos = new ObjectOutputStream(fos);
            oos.writeObject(t);
            oos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @SuppressWarnings("unchecked")
    public static <T> T ReadObjectFromFile(String file) {

        T t = null;
        FileInputStream fis;
        ObjectInputStream ois;

        try {
            fis = new FileInputStream(file);
            ois = new ObjectInputStream(fis);
            t = (T) ois.readObject();
            ois.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return t;
    }

    public static <T> void SaveToSD(T t, String file) {

        FileOutputStream fos;
        ObjectOutputStream oos;

        try {
            File dir = new File(file).getParentFile();
            if (!dir.exists()) {
                dir.mkdirs();
            }

            fos = new FileOutputStream(file);
            oos = new ObjectOutputStream(fos);
            oos.writeObject(t);
            oos.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @SuppressWarnings("unchecked")
    public static <T> T ReadFromFile(String file, Context context) {

        T t = null;
        FileInputStream fis;
        ObjectInputStream ois;

        try {
            fis = context.openFileInput(file);
            ois = new ObjectInputStream(fis);
            t = (T) ois.readObject();
            ois.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return t;
    }

    @SuppressWarnings("unchecked")
    public static <T> T ReadFromSD(String file, Context context) {

        T t = null;
        FileInputStream fis;
        ObjectInputStream ois;

        try {
            fis = new FileInputStream(file);
            ois = new ObjectInputStream(fis);
            t = (T) ois.readObject();
            ois.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return t;
    }

    public void saveDataToBin(String fileName, byte[] data) {
        File f = new File(Environment.getExternalStorageDirectory().getPath(),
                fileName);
        try {
            f.createNewFile();
        } catch (IOException e) {
        }
        FileOutputStream fOut = null;
        try {
            fOut = new FileOutputStream(f);
            fOut.write(data, 0, data.length);
            fOut.flush();
            fOut.close();
        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }
    }


    @SuppressWarnings("unused")
    private void saveDataToBin(byte[] data) {
        File f = new File(Environment.getExternalStorageDirectory().getPath(),
                "Btatotest.bin");
        try {
            f.createNewFile();
        } catch (IOException e) {
        }
        FileOutputStream fOut = null;
        try {
            fOut = new FileOutputStream(f);
            fOut.write(data, 0, data.length);
            fOut.flush();
            fOut.close();
        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }
    }

    public void saveMyBitmap(Bitmap mBitmap, String name) {
        File f = new File(Environment.getExternalStorageDirectory().getPath(),
                name);
        try {
            f.createNewFile();
        } catch (IOException e) {
        }
        FileOutputStream fOut = null;
        try {
            fOut = new FileOutputStream(f);
            mBitmap.compress(Bitmap.CompressFormat.PNG, 100, fOut);
            fOut.flush();
            fOut.close();
        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }

    }

    public static String getFileLastModifiedTime(String path) {
        File file = new File(path);
        long lastModifiedTime = 0;
        if (file.exists())
            lastModifiedTime = file.lastModified();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        String result = formatter.format(lastModifiedTime);
        return result;
    }

    public static boolean copyFile(String srcPathName, String dstPathName) {
        if ((srcPathName == null) || (dstPathName == null))
            return false;
        if (srcPathName.equals(dstPathName))
            return true;

        boolean result = false;
        try {
            FileInputStream fis = new FileInputStream(srcPathName);//创建输入流对象
            FileOutputStream fos = new FileOutputStream(dstPathName); //创建输出流对象
            byte datas[] = new byte[1024 * 8];//创建搬运工具
            int len = 0;//创建长度
            while ((len = fis.read(datas)) != -1) {
                //循环读取数据
                fos.write(datas, 0, len);
            }
            fis.close();//释放资源
            fis.close();//释放资源
            result = true;
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return result;
    }

    /**
     * 删除文件，可以是文件或文件夹
     *
     * @param fileName 要删除的文件名
     * @return 删除成功返回true，否则返回false
     */
    public static boolean delete(String fileName) {
        File file = new File(fileName);
        if (!file.exists()) {
            System.out.println("删除文件失败:" + fileName + "不存在！");
            return false;
        } else {
            if (file.isFile())
                return deleteFile(fileName);
            else
                return deleteDirectory(fileName);
        }
    }

    /**
     * 删除单个文件
     *
     * @param fileName 要删除的文件的文件名
     * @return 单个文件删除成功返回true，否则返回false
     */
    public static boolean deleteFile(String fileName) {
        File file = new File(fileName);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (file.exists() && file.isFile()) {
            if (file.delete()) {
                System.out.println("删除单个文件" + fileName + "成功！");
                return true;
            } else {
                System.out.println("删除单个文件" + fileName + "失败！");
                return false;
            }
        } else {
            System.out.println("删除单个文件失败：" + fileName + "不存在！");
            return false;
        }
    }

    /**
     * 删除目录及目录下的文件
     *
     * @param dir 要删除的目录的文件路径
     * @return 目录删除成功返回true，否则返回false
     */
    public static boolean deleteDirectory(String dir) {
        // 如果dir不以文件分隔符结尾，自动添加文件分隔符
        if (!dir.endsWith(File.separator))
            dir = dir + File.separator;
        File dirFile = new File(dir);
        // 如果dir对应的文件不存在，或者不是一个目录，则退出
        if ((!dirFile.exists()) || (!dirFile.isDirectory())) {
            System.out.println("删除目录失败：" + dir + "不存在！");
            return false;
        }
        boolean flag = true;
        // 删除文件夹中的所有文件包括子目录
        File[] files = dirFile.listFiles();
        for (int i = 0; i < files.length; i++) {
            // 删除子文件
            if (files[i].isFile()) {
                flag = deleteFile(files[i].getAbsolutePath());
                if (!flag)
                    break;
            }
            // 删除子目录
            else if (files[i].isDirectory()) {
                flag = deleteDirectory(files[i].getAbsolutePath());
                if (!flag)
                    break;
            }
        }
        if (!flag) {
            System.out.println("删除目录失败！");
            return false;
        }
        // 删除当前目录
        if (dirFile.delete()) {
            System.out.println("删除目录" + dir + "成功！");
            return true;
        } else {
            return false;
        }
    }

}
