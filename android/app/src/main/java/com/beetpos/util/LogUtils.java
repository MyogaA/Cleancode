package com.beetpos.util;

import android.content.Context;
import androidx.annotation.NonNull;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

/**
 * Created by anka on 9/24/17.
 */

public class LogUtils {

    private LogUtils() {}

    public static void log(@NonNull int type, @NonNull String tag, @NonNull String message) {

        if (TextUtils.isEmpty(message)) {
            return;
        }

        switch (type) {
            case Log.VERBOSE:
                Log.v(tag, message);
                break;
            case Log.INFO:
                Log.i(tag, message);
                break;
            case Log.WARN:
                Log.w(tag, message);
                break;
            case Log.ERROR:
                Log.e(tag, message);
                break;
            default:
                Log.d(tag, message);
        }
    }
}
