package com.beetpos.module.base;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class BaseModuleImpl extends ReactContextBaseJavaModule implements BaseModule {

    private String mName;

    public BaseModuleImpl(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public BaseModuleImpl(ReactApplicationContext reactContext, String name) {
        super(reactContext);

        this.mName = name;
    }

    @Override
    public void setName(String name) {
        this.mName = name;
    }

    @Override
    public String getName() {
        return this.mName;
    }
}
