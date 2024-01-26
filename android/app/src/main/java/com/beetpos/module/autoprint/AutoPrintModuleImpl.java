package com.beetpos.module.autoprint;

import androidx.annotation.NonNull;

import com.beetpos.module.base.BaseModuleImpl;
import com.beetpos.service.autoprint.AutoPrintServiceImpl;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class AutoPrintModuleImpl extends BaseModuleImpl implements AutoPrintModule {

    private AutoPrintServiceImpl mAutoPrintService;

    private static final String TAG = AutoPrintModuleImpl.class.getSimpleName();

    public AutoPrintModuleImpl(ReactApplicationContext reactContext, String name) {
        super(reactContext, name);
        mAutoPrintService = new AutoPrintServiceImpl(reactContext);
    }

    @ReactMethod
    @Override
    public void initialize(Promise promise) {
        mAutoPrintService.initialize(promise);
    }

    @ReactMethod
    @Override
    public void testPrint(Promise promise) {
        mAutoPrintService.testPrint(promise);
    }

    @ReactMethod
    @Override
    public void searchPrinter(Promise promise) {
        mAutoPrintService.searchPrinter(promise);
    }

    @ReactMethod
    @Override
    public void searchPrinterV2(Promise promise) {
        mAutoPrintService.searchPrinterV2(promise);
    }

    @ReactMethod
    @Override
    public void searchPrinterV3(Promise promise) {
        mAutoPrintService.searchPrinterV3(promise);
    }

    @ReactMethod
    @Override
    public void connectToPrinter(Promise promise) {
        mAutoPrintService.connectToPrinter(promise);
    }

    @ReactMethod
    @Override
    public void testPage(Promise promise) {
        mAutoPrintService.testPage(promise);
    }

    @ReactMethod
    @Override
    public void testPageV2(Promise promise) {
        mAutoPrintService.testPageV2(promise);
    }

    
    @ReactMethod
    @Override
    public void stopSearchPrinter() {
        mAutoPrintService.stopSearchPrinter();
    }    
    
    @ReactMethod
    @Override
    public void checkConnectedPrinter(Promise promise) {
        mAutoPrintService.checkConnectedPrinter(promise);
    }

    @ReactMethod
    @Override
    public void testPrintStatic(Promise promise) {
        mAutoPrintService.testPrintStatic(promise);
    }


    @ReactMethod
    @Override
    public void printParameter(String title, String head, String tail, String invoice, int sub_total, int discount, int tax, int services, int total, int bayar, int kembali, Promise promise)
    {
        mAutoPrintService.printParameter(title, head, tail, invoice, sub_total, discount, tax, services, total, bayar, kembali, promise);
    }

    @ReactMethod
    @Override
    public void printParameterNoInvoice(String title, String head, String tail, String invoice, int sub_total, int discount, int tax, int services, int total, int bayar, int kembali, Promise promise)
    {
        mAutoPrintService.printParameterNoInvoice(title, head, tail, invoice, sub_total, discount, tax, services, total, bayar, kembali, promise);
    }

    @ReactMethod
    @Override
    public void setTicketItems(String name, Integer num, Integer amount, Promise promise) {
        mAutoPrintService.setTicketItems(name, num, amount, promise);
    }

    @ReactMethod
    @Override
    public void clearTicketItems(Promise promise) {
        mAutoPrintService.clearTicketItems(promise);
    }

    @ReactMethod
    @Override
    public void printRekap(String title, String head, String tail, String invoice, Promise promise){
         mAutoPrintService.printRekap(title, head, tail, invoice, promise);
    }

    @ReactMethod
    @Override
    public void setRekapTicketItems(String name, Integer amount, Promise promise) {
        mAutoPrintService.setRekapTicketItems(name, amount, promise);
    }
    @ReactMethod
    @Override
    public void clearRekapTicketItems(Promise promise){
        mAutoPrintService.clearRekapTicketItems(promise);

    }



}
