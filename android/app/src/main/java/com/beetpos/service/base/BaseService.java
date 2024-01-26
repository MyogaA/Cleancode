package com.beetpos.service.base;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.beetpos.model.Response;
// import com.cashlez.android.sdk.CLResponse;

public interface BaseService {
    void sendEvent(@NonNull String event, @Nullable Response response);
    void sendPromise(@Nullable Response response);
    void requestPermissionGranted();
    void requestPermissionDenied();
}
