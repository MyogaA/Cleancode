package com.beetpos.util;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.documentfile.provider.DocumentFile;

import java.io.InputStream;

public class UriUtils {

    public static byte[] ReadFromFile(Context context, Uri fileUri) {
        byte[] data = null;
        try {
            InputStream in = context.getContentResolver().openInputStream(fileUri);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return data;
    }

    // 获取路径：这是最终的方法
    private static String GetFilePathNameFromUriV1(Uri fileUri) {
        String path = null;
        try {
            path = Uri.decode(fileUri.toString());
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return path;
    }

    // 获取路径：这是早期的方法
    private static String GetFilePathNameFromUriV2(Context context, Uri fileUri) {
        String path = null;
        try {
            path = UriUtilsOldV1.getFilePathByUri(context, fileUri);
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return path;

    }

    // 获取文件名：这是最新方法
    private static String GetFileNameFromUriV1(Context context, Uri fileUri) {
        String name = null;
        try {
            DocumentFile documentFile = DocumentFile.fromSingleUri(context, fileUri);
            if (documentFile != null) {
                name = documentFile.getName();
            }
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return name;
    }

    // 获取文件名：组合方法
    public static String GetFileNameFromUri(Context context, Uri fileUri) {
        String name = null;

        try {
            // 先用最新的办法
            name = GetFileNameFromUriV1(context, fileUri);

            // 不行再用早期方法
            if (name == null) {
                String fullName = GetFilePathNameFromUriV2(context, fileUri);
                if (fullName != null) {
                    name = fullName.substring(fullName.lastIndexOf('/') + 1);
                }
            }

            // 还不行使用终极方法
            if (name == null) {
                String fullName = GetFilePathNameFromUriV1(fileUri);
                if (fullName != null) {
                    name = fullName.substring(fullName.lastIndexOf('/') + 1);
                }
            }

        } catch (Throwable tr) {
            tr.printStackTrace();
        }

        return name;
    }

    public static Uri GetUriDataFromIntent(Intent intent) {
        Uri uri = intent.getData();
        if (uri != null)
            return uri;
        Bundle extras = intent.getExtras();
        if (extras != null) {
            if (extras.containsKey(Intent.EXTRA_STREAM)) {
                uri = extras.getParcelable(Intent.EXTRA_STREAM);
                if (uri != null)
                    return uri;
            }
        }
        return uri;
    }

}
