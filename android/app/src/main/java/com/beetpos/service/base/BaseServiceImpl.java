package com.beetpos.service.base;

// import android.app.Activity;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import android.util.Log;
// import android.os.*;
import com.beetpos.R;
import com.beetpos.model.Response;
import com.beetpos.util.LogUtils;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
// import com.cashlez.android.sdk.payment.CLPaymentResponse;

/**
 * Created by anka on 9/22/17.
 */

public class BaseServiceImpl implements BaseService{

    private ReactContext mContext;
    private Promise mPromise;
    // public static Activity mActivity;
    // private CLPaymentResponse lastResponse;

    private static final String TAG = BaseServiceImpl.class.getSimpleName();


    // public static Handler UIHandler;

    // static 
    // {
    //     UIHandler = new Handler(Looper.getMainLooper());
    // }
    // public static void runOnUI(Runnable runnable) {
    //     UIHandler.post(runnable);
    // }


    public BaseServiceImpl(ReactContext context) {
        this.mContext = context;
    }

    public ReactContext getContext() {
        return mContext;
    }

    public void setContext(ReactContext context) {
        this.mContext = context;
    }

    public Promise getPromise() {
        return mPromise;
    }

    public void setPromise(Promise promise) {
        this.mPromise = promise;
    }

    // public CLPaymentResponse getLastResponse(){
    //     return lastResponse;
    // }

    // public void setLastResponse(CLPaymentResponse response){
    //     this.lastResponse = response;
    // }

    @Override
    public void sendEvent(@NonNull String event, @Nullable Response response) {
        LogUtils.log(Log.DEBUG, TAG, "cashlez service sendEvent -> ");

        try {
            mContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(event, response.toWritableMap());
        } catch (NullPointerException e) {
            LogUtils.log(Log.ERROR, TAG, e.getMessage());
        }
    }

    @Override
    public void sendPromise(@Nullable Response response) {
        LogUtils.log(Log.DEBUG, TAG, "cashlez service sendPromise -> ");

        try {
            WritableMap map = response.toWritableMap();

            mPromise.resolve(map);
        } catch (NullPointerException e) {
            LogUtils.log(Log.ERROR, TAG, e.getMessage());
        }
    }

    @Override
    public void requestPermissionGranted() {
        Response response = new Response(
                Response.SDK_RESPONSE_OK,
                "ACCESS GRANTED",
                // mContext.getResources().getString(R.string.access_library_granted),
                true);

        this.sendPromise(response);
    }

    @Override
    public void requestPermissionDenied() {
        Response response = new Response(
                Response.SDK_RESPONSE_ERROR,
                "ACCESS DENIED",
                // mContext.getResources().getString(R.string.access_library_denied),
                false);

        this.sendPromise(response);
    }
}