package com.beetpos.util;

import android.Manifest;
import androidx.core.app.ActivityCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.PermissionListener;

/**
 * Created by anka on 12/31/17.
 */

public class PermissionUtils {
    private PermissionUtils() {}

    public static void requestPermission(ReactContext context, int code, PermissionListener listener) {

        if (!ActivityCompat.shouldShowRequestPermissionRationale(context.getCurrentActivity(),
                Manifest.permission.ACCESS_FINE_LOCATION)) {
            ((ReactActivity) context.getCurrentActivity()).requestPermissions(
                    new String[] {Manifest.permission.ACCESS_FINE_LOCATION},
                    code,
                    listener);
        }

        ((ReactActivity) context.getCurrentActivity()).requestPermissions(
                new String[] {Manifest.permission.ACCESS_FINE_LOCATION},
                code,
                listener);
    }
}
