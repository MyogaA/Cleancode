package com.beetpos.util;

import android.content.Context;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Environment;

import com.caysn.autoreplyprint.caprint.CAPrinterDevice;
import com.beetpos.util.FileUtils;
import com.beetpos.util.UriUtils;

public class AppSettings {

    // 文件管理部分 **************************************************

    private static final String main_dir_name = "CaPrintPos";

    private static final String cache_dir_name = "Cache";

    public static String getMainDirPathName() {
        return Environment.getExternalStorageDirectory() + "/" + main_dir_name;
    }

    public static String getCacheDirPathName() {
        return getMainDirPathName() + "/" + cache_dir_name;
    }

    public static boolean saveFileToCacheDir(Context context, Uri uri, String savename) {
        boolean result = false;
        byte[] data = UriUtils.ReadFromFile(context, uri);
        if ((data != null) && (data.length > 0)) {
            if (FileUtils.SaveBytesToFile(getCacheDirPathName() + "/" + savename, data)) {
                result = true;
            }
        }
        return result;
    }

    // 基础设置函数 **************************************************

    public static void SaveString(Context context, String section, String key, String value) {
        SharedPreferences preferences = context.getSharedPreferences("AppSettings", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(section + "/" + key, value);
        editor.commit();
    }

    public static String ReadString(Context context, String section, String key, String defaultValue) {
        SharedPreferences preferences = context.getSharedPreferences("AppSettings", Context.MODE_PRIVATE);
        return preferences.getString(section + "/" + key, defaultValue);
    }

    public static void SaveInt(Context context, String section, String key, int value) {
        SharedPreferences preferences = context.getSharedPreferences("AppSettings", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putInt(section + "/" + key, value);
        editor.commit();
    }

    public static int ReadInt(Context context, String section, String key, int defaultValue) {
        SharedPreferences preferences = context.getSharedPreferences("AppSettings", Context.MODE_PRIVATE);
        return preferences.getInt(section + "/" + key, defaultValue);
    }

    public static void SaveBoolean(Context context, String section, String key, boolean value) {
        SharedPreferences preferences = context.getSharedPreferences("AppSettings", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putBoolean(section + "/" + key, value);
        editor.commit();
    }

    public static boolean ReadBoolean(Context context, String section, String key, boolean defaultValue) {
        SharedPreferences preferences = context.getSharedPreferences("AppSettings", Context.MODE_PRIVATE);
        return preferences.getBoolean(section + "/" + key, defaultValue);
    }

    // 偏好设置函数 **************************************************

    public static void setPrintActivitySelectedFile(Context context, String fileName) {
        SaveString(context, "PrintActivity", "SelectedFile", fileName);
    }

    public static String getPrintActivitySelectedFile(Context context) {
        return ReadString(context, "PrintActivity", "SelectedFile", "");
    }

    public static void setPrintActivityExistUnhandledSharedIntent(Context context, boolean ExistUnhandledSharedIntent) {
        SaveBoolean(context, "PrintActivity", "ExistUnhandledSharedIntent", ExistUnhandledSharedIntent);
    }

    public static boolean getPrintActivityExistUnhandledSharedIntent(Context context) {
        return ReadBoolean(context, "PrintActivity", "ExistUnhandledSharedIntent", false);
    }

    public static void setConnectActivitySelectedPrinter(Context context, CAPrinterDevice printerDevice) {
        String printerDeviceUidString = CAPrinterDevice.toUidString(printerDevice);
        SaveString(context, "ConnectActivity", "SelectedPrinter", printerDeviceUidString);
    }

    public static CAPrinterDevice getConnectActivitySelectedPrinter(Context context) {
        String printerDeviceUidString = ReadString(context, "ConnectActivity", "SelectedPrinter", "");
        return CAPrinterDevice.fromUidString(printerDeviceUidString);
    }

    public static void setPrintOptionPaperType(Context context, int PaperType) {
        SaveInt(context, "PrintOption", "PaperType", PaperType);
    }

    public static int getPrintOptionPaperType(Context context) {
        return ReadInt(context, "PrintOption", "PaperType", 1);
    }

    public static void setPrintOptionFeedPaperAfterPrint(Context context, int FeedPaperAfterPrint) {
        SaveInt(context, "PrintOption", "FeedPaperAfterPrint", FeedPaperAfterPrint);
    }

    public static int getPrintOptionFeedPaperAfterPrint(Context context) {
        return ReadInt(context, "PrintOption", "FeedPaperAfterPrint", 10);
    }

    public static void setPrintOptionKickDrawerBeforePrint(Context context, boolean KickDrawerBeforePrint) {
        SaveBoolean(context, "PrintOption", "KickDrawerBeforePrint", KickDrawerBeforePrint);
    }

    public static boolean getPrintOptionKickDrawerBeforePrint(Context context) {
        return ReadBoolean(context, "PrintOption", "KickDrawerBeforePrint", false);
    }

    public static void setPrintOptionCutPaperAfterPrint(Context context, boolean CutPaperAfterPrint) {
        SaveBoolean(context, "PrintOption", "CutPaperAfterPrint", CutPaperAfterPrint);
    }

    public static boolean getPrintOptionCutPaperAfterPrint(Context context) {
        return ReadBoolean(context, "PrintOption", "CutPaperAfterPrint", false);
    }

    public static void setPrintOptionWaitPrintFinished(Context context, boolean WaitPrintFinished) {
        SaveBoolean(context, "PrintOption", "WaitPrintFinished", WaitPrintFinished);
    }

    public static boolean getPrintOptionWaitPrintFinished(Context context) {
        return ReadBoolean(context, "PrintOption", "WaitPrintFinished", true);
    }

    public static void setPrintOptionImageCompressionMethod(Context context, int ImageCompressionMethod) {
        SaveInt(context, "PrintOption", "ImageCompressionMethod", ImageCompressionMethod);
    }

    public static int getPrintOptionImageCompressionMethod(Context context) {
        return ReadInt(context, "PrintOption", "ImageCompressionMethod", 0);
    }

}
