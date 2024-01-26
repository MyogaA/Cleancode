package com.beetpos.module.autoprint;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;

public interface AutoPrintModule {
    void initialize(Promise promise);
    void testPrint(Promise promise);
    void searchPrinter(Promise promise);
    void searchPrinterV2(Promise promise);
    void searchPrinterV3(Promise promise);
    void connectToPrinter(Promise promise);
    void testPage(Promise promise);
    void testPageV2(Promise promise);
    void checkConnectedPrinter(Promise promise);
    void testPrintStatic(Promise promise);

    void setTicketItems(String name, Integer num, Integer amount, Promise promise);
    void clearTicketItems(Promise promise);
    void printParameter(String title, String head, String tail, String invoice, int sub_total, int discount, int tax, int services, int total, int bayar, int kembali, Promise promise);
    void printParameterNoInvoice(String title, String head, String tail, String invoice, int sub_total, int discount, int tax, int services, int total, int bayar, int kembali, Promise promise);
    //
    void printRekap(String title, String head, String tail, String invoice, Promise promise);
    void setRekapTicketItems(String name, Integer amount, Promise promise);
    void clearRekapTicketItems(Promise promise);


    void stopSearchPrinter();

}
