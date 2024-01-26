package com.beetpos.service.autoprint;
// import android.app.Activity;
import android.Manifest;
import android.content.pm.PackageManager;
import android.content.Context;
import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import android.text.TextUtils;
import android.graphics.Bitmap;
// import android.os.*;

import com.beetpos.util.Constants;
import com.beetpos.util.PrinterDeviceListAdapter;

import com.beetpos.model.Response;
import com.beetpos.service.base.BaseServiceImpl;
// import com.beetpos.util.PermissionUtils;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.PermissionListener;

// import com.beetpos.util.PrintFileUtils;

//import from aar
import com.caysn.autoreplyprint.AutoReplyPrint;
import com.caysn.autoreplyprint.caprint.CAPrintCommon;
import com.caysn.autoreplyprint.caprint.CAPrinterConnector;
import com.caysn.autoreplyprint.caprint.CAPrinterDevice;
import com.caysn.autoreplyprint.caprint.CAPrinterDiscover;




import com.beetpos.util.AppSettings;
import java.util.List;
import java.util.ArrayList;


// import com.imin.js.electronic.R;++
// import com.neostra.electronic.Electronic;
// import com.neostra.electronic.ElectronicCallback;
// import com.imin.library.IminSDKManager;


// public class AutoPrintServiceImpl extends BaseServiceImpl implements AutoPrintService, PermissionListener {
public class AutoPrintServiceImpl extends BaseServiceImpl implements AutoPrintService, PermissionListener {


    // private Electronic mElectronic;
    // protected Context mContext = this;
    // private IminSDKManager mIminSDKManager;
    // private List<CAPrinterDevice> printerDeviceList = new ArrayList<>();
    // public static CAPrinterConnector printerConnector = new CAPrinterConnector();
    // private CAPrinterDiscover printerDiscover = new CAPrinterDiscover();

    private List<CAPrinterDevice> printerDeviceList;
    public static CAPrinterConnector printerConnector;
    private CAPrinterDiscover printerDiscover;
    private Boolean connectedToPrinter;

    private CAPrinterDevice connectedPrinterDevice;
    // listViewPrinterDevice.setAdapter(printerDeviceListAdapter);

    private static final int REQUEST_CODE_ASK_PERMISSIONS = 101;
    private static final String TAG = AutoPrintServiceImpl.class.getSimpleName();
    private String messageCallBack = "";
    


    ArrayList<String> cars = new ArrayList<String>();

    private ArrayList<String> nameData;
    private ArrayList<Integer> numData;
    private ArrayList<Integer> amountData;



    private ArrayList<String> nameRekapData;
    private ArrayList<Integer> amountRekapData;


    private PrinterDeviceListAdapter printerDeviceListAdapter = new PrinterDeviceListAdapter(printerDeviceList);


    public AutoPrintServiceImpl(ReactApplicationContext context) {
        super(context);
    }

    private void launchInitialize() {
        super.requestPermissionGranted();
    }

    @Override
    public void initialize(Promise promise) {

        printerDeviceList = new ArrayList<>();
        printerConnector = new CAPrinterConnector();
        printerDiscover = new CAPrinterDiscover();
        connectedPrinterDevice = null;
        nameData = new ArrayList<String>();
        numData = new ArrayList<Integer>();
        amountData = new ArrayList<Integer>();
        nameRekapData = new ArrayList<String>();
        amountRekapData = new ArrayList<Integer>();

        
        // connectedPrinterDevice = new CAPrinterDevice();
        // initSerialPort
        // mElectronic = Electronic.Builder()
        // .setDevicePath(devicePath)
        // .setReceiveCallback(this)
        // .builder()
        super.setPromise(promise);
        super.requestPermissionGranted();

        // mElectronic = new Electronic.Builder().setDevicePath("/dev/ttyS4").setReceiveCallback(this).builder();
        Response response = new Response(Response.SDK_RESPONSE_OK, "success initialize auto print service", true);
        super.sendPromise(response);
    }

    @Override
    public void testPrint(Promise promise) {
        super.setPromise(promise);
        // mElectronic.turnZero();
        // PrintFileUtils.printBitmap(bitmap, getActivity(), null); getContext().getCurrentActivity()
        // PrintFileUtils.printBitmap(bitmap, BaseServiceImpl.mActivity, null);


        // print_result = CAPrintCommon.printBitmap(printerConnector, bitmap, binaryzationMethod, compressionMethod, paperType, printAlignment, printSpeed, printDensity, kickDrawer, feedPaper, cutPaper, waitPrintFinished);


        Response response = new Response(Response.SDK_RESPONSE_OK, "success testPrint", true);
        super.sendPromise(response);

    }



    @Override
    public void searchPrinter(Promise promise) {
        printerDiscover.setOnPrinterDiscoveredListener(new CAPrinterDiscover.OnPrinterDiscoveredListener() {
            @Override
            public void onPrinterDiscovered(final CAPrinterDevice printerDevice) {
                int index = CAPrinterDevice.indexOfPrinterByPort(printerDeviceList, printerDevice.port_type, printerDevice.port_address);
                if (index == -1) {
                    printerDeviceList.add(printerDevice);
                } else {
                    printerDeviceList.set(index, printerDevice);
                }

            }
        });

        Response response = new Response(Response.SDK_RESPONSE_OK, "BERES Search Printer function doang ga crash?", printerDeviceList, true);
        super.sendPromise(response);
    }

    @Override
    public void searchPrinterV2(Promise promise) {
        printerDiscover.setOnPrinterDiscoveredListener(new CAPrinterDiscover.OnPrinterDiscoveredListener() {
            @Override
            public void onPrinterDiscovered(final CAPrinterDevice printerDevice) {
               printerDeviceList.add(printerDevice);
               printerConnector.connectPrinterAsync(printerDevice);
            //connectedPrinterDevice = printerDevice;
               //set printer done
               //bikin demo print
            //    PrintContents.SalesTicket ticket = new PrintContents.SalesTicket();
            //     ticket.width = 576;
            //     ticket.title = "结账单";
            //     ticket.head = "服务台：1号\r\n收银员：2号\r\n桌台：3号\r\n序号：120 #1\r\n时间：2020-12-07 15:39\r\n";
            //     ticket.tail = "谢谢惠顾\r\nxx省xx市xx区xx路xx号\r\n";
            //     ticket.invoice = "01017151";
            //     ticket.items.add(new PrintContents.SalesItem("海鲜汤", 1, 78, 78));
            //     ticket.items.add(new PrintContents.SalesItem("南瓜汤", 1, 58, 58));
            //     ticket.items.add(new PrintContents.SalesItem("法式焗蜗牛", 1, 88, 88));
            //     ticket.items.add(new PrintContents.SalesItem("吞拿鱼尼斯沙拉", 1, 68, 68));
            //     ticket.items.add(new PrintContents.SalesItem("海鲜意粉", 1, 98, 98));
            //     ticket.items.add(new PrintContents.SalesItem("罗西尼菲力牛排", 1, 188, 188));
            //     ticket.items.add(new PrintContents.SalesItem("草莓挞", 1, 32, 32));
            //     ticket.items.add(new PrintContents.SalesItem("香煎三文鱼排配大虾", 1, 128, 128));
            //     Bitmap bitmap = PrintContents.getSampleBitmap(ticket);
                // PrintFileUtils.printBitmap(bitmap, BaseServiceImpl.mActivity, null);
            }
        });
        Response response = new Response(Response.SDK_RESPONSE_OK, "BERES Search Printer function doang ga crash?", printerDeviceList, true);
        super.sendPromise(response);
    }

    @Override
    public void searchPrinterV3(Promise promise) {
        super.setPromise(promise);
        // if (printerDiscover.isDiscovering())
        // {
        //     // return;
        //     Response response = new Response(Response.SDK_RESPONSE_OK, "BERES isDiscovering?", true);
        //     super.sendPromise(response);
        // }
        printerDiscover.startDiscover();

        printerDiscover.setOnPrinterDiscoveredListener(new CAPrinterDiscover.OnPrinterDiscoveredListener() {
            @Override
            public void onPrinterDiscovered(final CAPrinterDevice printerDevice) {
                messageCallBack = "Printer is discovered name: " + printerDevice.printer_name + " address: " + printerDevice.port_address + " type: " + printerDevice.port_type;
                printerDeviceList.add(printerDevice);
                // printerConnector.connectPrinterAsync(printerDevice);
                if (connectedPrinterDevice == null)
                {
                connectedPrinterDevice = printerDevice;
                }
                // if (printerDeviceList.length == 1)
                // {
                //     connectedPrinterDevice = printerDevice;
                // }
                // connectedPrinterDevice = printerDeviceList[0];

                responseOnConnectPrinter();
                
                //set printer done
                //bikin demo print
                // PrintFileUtils.printBitmap(bitmap, BaseServiceImpl.mActivity, null);
            }
        });        
        // printerDeviceList.clear();
        // printerDeviceListAdapter.notifyDataSetChanged();
        // printerDiscover.startDiscover();
        // Response response = new Response(Response.SDK_RESPONSE_OK, "BERES setOnPrinterDiscoveredListener?", printerDeviceList, true);
        // super.sendPromise(response);
        // printerDiscover.startDiscover();
        // Response response = new Response(Response.SDK_RESPONSE_OK, "BERES Search Printer function doang ga crash?", printerDeviceList, true);
        // super.sendPromise(response);

    }

    public void responseOnConnectPrinter()
    {
        // printerDiscover.stopDiscover();
        Response response = new Response(Response.SDK_RESPONSE_OK, messageCallBack, true);
        super.sendPromise(response);
    }

    @Override
    public void stopSearchPrinter() {
        printerDiscover.stopDiscover();
    }


    @Override
    public void connectToPrinter(Promise promise)
    {
        super.setPromise(promise);
        connectedToPrinter = printerConnector.isCurrentConnectedPrinter();

        if (!connectedToPrinter)
        {
            printerConnector.connectPrinterSync(connectedPrinterDevice);

        }
        Response response = new Response(Response.SDK_RESPONSE_OK, "Connected to Printer name: " + connectedPrinterDevice.printer_name + " address: " + connectedPrinterDevice.port_address + " type: " + connectedPrinterDevice.port_type, true);
        super.sendPromise(response);
    }

    @Override
    public void testPage(Promise promise)
    {
        super.setPromise(promise);
        connectedToPrinter = printerConnector.isCurrentConnectedPrinter();
        byte[] cmd = new byte[]{0x12, 0x54};
        CAPrintCommon.writeBuffer(printerConnector, cmd);

        Response response = new Response(Response.SDK_RESPONSE_OK, "Connected to TEST PAGE name: " + connectedPrinterDevice.printer_name + " address: " + connectedPrinterDevice.port_address + " type: " + connectedPrinterDevice.port_type, true);

        //Response response = new Response(Response.SDK_RESPONSE_OK, "PRINT TEST PAGE TESTING Connected to Printer = " + connectedPrinterDevice.port_address, true);
        super.sendPromise(response);
    }

    
    @Override
    public void testPageV2(Promise promise)
    {
        super.setPromise(promise);
        connectedToPrinter = printerConnector.isCurrentConnectedPrinter();
        printerConnector.connectPrinterSync(connectedPrinterDevice);
        byte[] cmd = new byte[]{0x12, 0x54};
        CAPrintCommon.writeBuffer(printerConnector, cmd);
        Response response = new Response(Response.SDK_RESPONSE_OK, "Connected to TEST PAGE name: " + connectedPrinterDevice.printer_name + " address: " + connectedPrinterDevice.port_address + " type: " + connectedPrinterDevice.port_type, true);

        //Response response = new Response(Response.SDK_RESPONSE_OK, "PRINT TEST PAGE V2 Connected to Printer = " + connectedPrinterDevice.port_address, true);
        super.sendPromise(response);
    }

    @Override
    public void checkConnectedPrinter(Promise promise)
    {

        super.setPromise(promise);

        Response response = new Response(Response.SDK_RESPONSE_OK, "Check Printer name: " + printerConnector.getCurrentPrinterDevice().printer_name + " address: " + printerConnector.getCurrentPrinterDevice().port_address + " type: " + printerConnector.getCurrentPrinterDevice().port_type, true);
        //Response response = new Response(Response.SDK_RESPONSE_OK, "PRINT TEST PAGE TESTING Connected to Printer = " + connectedPrinterDevice.port_address, true);
        super.sendPromise(response);
    }


    @Override
    public void testPrintStatic(Promise promise)
    {
        boolean write_result = true;
        PrintContents.SalesTicket ticket = new PrintContents.SalesTicket();
        ticket.width = 576;
        // ticket.title = "结账单"; //TITLE
        // ticket.head = "服务台：1号\r\n收银员：2号\r\n桌台：3号\r\n序号：120 #1\r\n时间：2020-12-07 15:39\r\n";//HEADEr
        // ticket.tail = "谢谢惠顾\r\nxx省xx市xx区xx路xx号\r\n"; //FOOTER
        // ticket.invoice = "01017151"; //QR or BARCODE
        // ticket.items.add(new PrintContents.SalesItem("海鲜汤", 1, 78, 78));
        // ticket.items.add(new PrintContents.SalesItem("南瓜汤", 1, 58, 58));
        // ticket.items.add(new PrintContents.SalesItem("法式焗蜗牛", 1, 88, 88));
        // ticket.items.add(new PrintContents.SalesItem("吞拿鱼尼斯沙拉", 1, 68, 68));
        // ticket.items.add(new PrintContents.SalesItem("海鲜意粉", 1, 98, 98));
        // ticket.items.add(new PrintContents.SalesItem("罗西尼菲力牛排", 1, 188, 188));
        // ticket.items.add(new PrintContents.SalesItem("草莓挞", 1, 32, 32));
        // ticket.items.add(new PrintContents.SalesItem("香煎三文鱼排配大虾", 1, 128, 128));
        ticket.title = "Title BEETPOS"; //TITLE
        ticket.head = "TEST 1：1\r\nTEST 2：2\r\nTEST 3：3号\r\nTEST 4：4 #1\r\nDATE：2020-12-07 15:39\r\n";//HEADER
        ticket.tail = "FOOTER\r\nTEST SATU DUA TIGA\r\n"; //FOOTER
        ticket.invoice = "01017151"; //QR or BARCODE
        // ticket.items.add(new PrintContents.SalesItem("NAMA", "QTY", "TOTAL"));

        ticket.sub_total = 1000;
        ticket.discount = 100;
        ticket.tax = 100;
        ticket.services = 100;
        ticket.total = 1100;




        ticket.items.add(new PrintContents.SalesItem("PRODUCT 1", 1, 78));
        ticket.items.add(new PrintContents.SalesItem("PRODUCT 2", 1, 58));
        ticket.items.add(new PrintContents.SalesItem("PRODUCT 3", 1, 88));
        ticket.items.add(new PrintContents.SalesItem("PRODUCT 4 NAMA AGAK PANJANG MAU DITEST", 1, 68));
        ticket.items.add(new PrintContents.SalesItem("PRODUCT 5 NAMA AGAK PANJANG MAU DITEST NAMA AGAK PANJANG MAU DITEST", 1, 98));
        ticket.items.add(new PrintContents.SalesItem("PRODUCT 6", 1, 188));
        ticket.items.add(new PrintContents.SalesItem("PRODUCT 7 NAMA AGAK PANJANG MAU DITEST", 1, 32));
        ticket.items.add(new PrintContents.SalesItem("PRODUCT 8", 1, 128));
        Bitmap bitmap = PrintContents.getSampleBitmap(ticket);

        int binaryzationMethod = 2;
        int compressionMethod = 0; //0 = NO COMPRESS, 1  = LEVEL 1, 2 = LEVEL 2
        int paperType = 1; // 1 = SERIAL PAPER 2 = GAP PAPER 3 = BLACK MARKER PAPER
        int printAlignment = 1; // 1 = LEFT, 2 = CENTER, 3 = RIGHT
        int printSpeed = 150;
        int printDensity = 7; // 0 - 15 IF -1 NOT SPECIFIED
        boolean kickDrawer = true; //KICK BEFORE PRINT 1 YES
        double feedPaper = 25; //IN MM
        int cutPaper = 1; //CUT PAPER
        int waitPrintFinished = 3000; //IN MS 3000 = 3SECOND
        write_result = CAPrintCommon.printBitmap(printerConnector, bitmap, binaryzationMethod, compressionMethod, paperType, printAlignment, printSpeed, printDensity, kickDrawer, feedPaper, cutPaper, waitPrintFinished);
        super.setPromise(promise);
        Response response = new Response(Response.SDK_RESPONSE_OK, "SUCCESS PRINT", true);
        //Response response = new Response(Response.SDK_RESPONSE_OK, "PRINT TEST PAGE TESTING Connected to Printer = " + connectedPrinterDevice.port_address, true);
        super.sendPromise(response);
    }

    @Override 
    public void setTicketItems(String name, Integer num, Integer amount, Promise promise)
    {
        super.setPromise(promise);
        nameData.add(name);
        numData.add(num);
        amountData.add(amount);
        Response response = new Response(Response.SDK_RESPONSE_OK, "Setting Value success", true);
        super.sendPromise(response);
    }

    @Override 
    public void clearTicketItems(Promise promise)
    {
        super.setPromise(promise);
        nameData.clear();
        numData.clear();
        amountData.clear();
        Response response = new Response(Response.SDK_RESPONSE_OK, "clearTicketItems sucess", true);
        super.sendPromise(response);
    }

    @Override 
    public void setRekapTicketItems(String name, Integer amount, Promise promise)
    {
        super.setPromise(promise);
        nameRekapData.add(name);
        amountRekapData.add(amount);
        Response response = new Response(Response.SDK_RESPONSE_OK, "Setting Rekap Value success", true);
        super.sendPromise(response);
    }

    @Override 
    public void clearRekapTicketItems(Promise promise)
    {
        super.setPromise(promise);
        nameRekapData.clear();
        amountRekapData.clear();
        Response response = new Response(Response.SDK_RESPONSE_OK, "clearRekapTicketItems sucess", true);
        super.sendPromise(response);
    }

    @Override
    public void printParameter(String title, String head, String tail, String invoice, int sub_total, int discount, int tax, int services, int total, int bayar, int kembali, Promise promise)
    {
        super.setPromise(promise);

        boolean write_result = true;
        PrintContents.SalesTicket ticket = new PrintContents.SalesTicket();
        ticket.width = 576;
        // ticket.title = "结账单"; //TITLE
        // ticket.head = "服务台：1号\r\n收银员：2号\r\n桌台：3号\r\n序号：120 #1\r\n时间：2020-12-07 15:39\r\n";//HEADEr
        // ticket.tail = "谢谢惠顾\r\nxx省xx市xx区xx路xx号\r\n"; //FOOTER
        // ticket.invoice = "01017151"; //QR or BARCODE
        // ticket.items.add(new PrintContents.SalesItem("海鲜汤", 1, 78, 78));
        // ticket.items.add(new PrintContents.SalesItem("南瓜汤", 1, 58, 58));
        // ticket.items.add(new PrintContents.SalesItem("法式焗蜗牛", 1, 88, 88));
        // ticket.items.add(new PrintContents.SalesItem("吞拿鱼尼斯沙拉", 1, 68, 68));
        // ticket.items.add(new PrintContents.SalesItem("海鲜意粉", 1, 98, 98));
        // ticket.items.add(new PrintContents.SalesItem("罗西尼菲力牛排", 1, 188, 188));
        // ticket.items.add(new PrintContents.SalesItem("草莓挞", 1, 32, 32));
        // ticket.items.add(new PrintContents.SalesItem("香煎三文鱼排配大虾", 1, 128, 128));


        ticket.title = title; //TITLE
        ticket.head = head;//HEADER
        ticket.tail = tail; //FOOTER
        ticket.invoice = invoice; //QR or BARCODE
        // ticket.items.add(new PrintContents.SalesItem("NAMA", "QTY", "TOTAL"));

        ticket.sub_total = sub_total;
        ticket.discount = discount;
        ticket.tax = tax;
        ticket.services = services;
        ticket.total = total;
        ticket.bayar = bayar;
        ticket.kembali = kembali;


        
        for (int i = 0; i < nameData.size(); i++) {
        ticket.items.add(new PrintContents.SalesItem(nameData.get(i), numData.get(i), amountData.get(i)));
        }
        Bitmap bitmap = PrintContents.getSampleBitmap(ticket);
        int binaryzationMethod = 2;
        int compressionMethod = 0; //0 = NO COMPRESS, 1  = LEVEL 1, 2 = LEVEL 2
        int paperType = 1; // 1 = SERIAL PAPER 2 = GAP PAPER 3 = BLACK MARKER PAPER
        int printAlignment = 1; // 1 = LEFT, 2 = CENTER, 3 = RIGHT
        int printSpeed = 150;
        int printDensity = 7; // 0 - 15 IF -1 NOT SPECIFIED
        boolean kickDrawer = true; //KICK BEFORE PRINT 1 YES
        double feedPaper = 25; //IN MM
        int cutPaper = 1; //CUT PAPER
        int waitPrintFinished = 3000; //IN MS 3000 = 3SECOND
        write_result = CAPrintCommon.printBitmap(printerConnector, bitmap, binaryzationMethod, compressionMethod, paperType, printAlignment, printSpeed, printDensity, kickDrawer, feedPaper, cutPaper, waitPrintFinished);
        Response response = new Response(Response.SDK_RESPONSE_OK, "SUCCESS PRINT", true);
        //Response response = new Response(Response.SDK_RESPONSE_OK, "PRINT TEST PAGE TESTING Connected to Printer = " + connectedPrinterDevice.port_address, true);
        super.sendPromise(response);
    }

    @Override
    public void printParameterNoInvoice(String title, String head, String tail, String invoice, int sub_total, int discount, int tax, int services, int total, int bayar, int kembali, Promise promise)
    {
        super.setPromise(promise);

        boolean write_result = true;
        PrintContents.SalesTicket ticket = new PrintContents.SalesTicket();
        ticket.width = 576;
        // ticket.title = "结账单"; //TITLE
        // ticket.head = "服务台：1号\r\n收银员：2号\r\n桌台：3号\r\n序号：120 #1\r\n时间：2020-12-07 15:39\r\n";//HEADEr
        // ticket.tail = "谢谢惠顾\r\nxx省xx市xx区xx路xx号\r\n"; //FOOTER
        // ticket.invoice = "01017151"; //QR or BARCODE
        // ticket.items.add(new PrintContents.SalesItem("海鲜汤", 1, 78, 78));
        // ticket.items.add(new PrintContents.SalesItem("南瓜汤", 1, 58, 58));
        // ticket.items.add(new PrintContents.SalesItem("法式焗蜗牛", 1, 88, 88));
        // ticket.items.add(new PrintContents.SalesItem("吞拿鱼尼斯沙拉", 1, 68, 68));
        // ticket.items.add(new PrintContents.SalesItem("海鲜意粉", 1, 98, 98));
        // ticket.items.add(new PrintContents.SalesItem("罗西尼菲力牛排", 1, 188, 188));
        // ticket.items.add(new PrintContents.SalesItem("草莓挞", 1, 32, 32));
        // ticket.items.add(new PrintContents.SalesItem("香煎三文鱼排配大虾", 1, 128, 128));


        ticket.title = title; //TITLE
        ticket.head = head;//HEADER
        ticket.tail = tail; //FOOTER
        ticket.invoice = invoice; //QR or BARCODE
        // ticket.items.add(new PrintContents.SalesItem("NAMA", "QTY", "TOTAL"));

        ticket.sub_total = sub_total;
        ticket.discount = discount;
        ticket.tax = tax;
        ticket.services = services;
        ticket.total = total;
        ticket.bayar = bayar;
        ticket.kembali = kembali;
        
        for (int i = 0; i < nameData.size(); i++) {
        ticket.items.add(new PrintContents.SalesItem(nameData.get(i), numData.get(i), amountData.get(i)));
        }
        Bitmap bitmap = PrintContents.PrintWithoutInvoice(ticket);
        int binaryzationMethod = 2;
        int compressionMethod = 0; //0 = NO COMPRESS, 1  = LEVEL 1, 2 = LEVEL 2
        int paperType = 1; // 1 = SERIAL PAPER 2 = GAP PAPER 3 = BLACK MARKER PAPER
        int printAlignment = 1; // 1 = LEFT, 2 = CENTER, 3 = RIGHT
        int printSpeed = 150;
        int printDensity = 7; // 0 - 15 IF -1 NOT SPECIFIED
        boolean kickDrawer = true; //KICK BEFORE PRINT 1 YES
        double feedPaper = 25; //IN MM
        int cutPaper = 1; //CUT PAPER
        int waitPrintFinished = 3000; //IN MS 3000 = 3SECOND
        write_result = CAPrintCommon.printBitmap(printerConnector, bitmap, binaryzationMethod, compressionMethod, paperType, printAlignment, printSpeed, printDensity, kickDrawer, feedPaper, cutPaper, waitPrintFinished);
        Response response = new Response(Response.SDK_RESPONSE_OK, "SUCCESS PRINT", true);
        //Response response = new Response(Response.SDK_RESPONSE_OK, "PRINT TEST PAGE TESTING Connected to Printer = " + connectedPrinterDevice.port_address, true);
        super.sendPromise(response);
    }


    @Override
    public void printRekap(String title, String head, String tail, String invoice, Promise promise)
    {
        super.setPromise(promise);

        boolean write_result = true;
        PrintContents.RekapTicket ticket = new PrintContents.RekapTicket();
        ticket.width = 576;
        // ticket.title = "结账单"; //TITLE
        // ticket.head = "服务台：1号\r\n收银员：2号\r\n桌台：3号\r\n序号：120 #1\r\n时间：2020-12-07 15:39\r\n";//HEADEr
        // ticket.tail = "谢谢惠顾\r\nxx省xx市xx区xx路xx号\r\n"; //FOOTER
        // ticket.invoice = "01017151"; //QR or BARCODE
        // ticket.items.add(new PrintContents.SalesItem("海鲜汤", 1, 78, 78));
        // ticket.items.add(new PrintContents.SalesItem("南瓜汤", 1, 58, 58));
        // ticket.items.add(new PrintContents.SalesItem("法式焗蜗牛", 1, 88, 88));
        // ticket.items.add(new PrintContents.SalesItem("吞拿鱼尼斯沙拉", 1, 68, 68));
        // ticket.items.add(new PrintContents.SalesItem("海鲜意粉", 1, 98, 98));
        // ticket.items.add(new PrintContents.SalesItem("罗西尼菲力牛排", 1, 188, 188));
        // ticket.items.add(new PrintContents.SalesItem("草莓挞", 1, 32, 32));
        // ticket.items.add(new PrintContents.SalesItem("香煎三文鱼排配大虾", 1, 128, 128));


        ticket.title = title; //TITLE
        ticket.head = head;//HEADER
        ticket.tail = tail; //FOOTER
        ticket.invoice = invoice; //QR or BARCODE
        // ticket.items.add(new PrintContents.SalesItem("NAMA", "QTY", "TOTAL"));

        
        for (int i = 0; i < nameData.size(); i++) {
        ticket.items.add(new PrintContents.SalesItem(nameData.get(i), numData.get(i), amountData.get(i)));
        }

        for (int i = 0; i < nameRekapData.size(); i++) {
        ticket.rekapitems.add(new PrintContents.RekapItem(nameRekapData.get(i), amountRekapData.get(i)));
        }




        Bitmap bitmap = PrintContents.getRekapSampleBitmap(ticket);
        int binaryzationMethod = 2;
        int compressionMethod = 0; //0 = NO COMPRESS, 1  = LEVEL 1, 2 = LEVEL 2
        int paperType = 1; // 1 = SERIAL PAPER 2 = GAP PAPER 3 = BLACK MARKER PAPER
        int printAlignment = 1; // 1 = LEFT, 2 = CENTER, 3 = RIGHT
        int printSpeed = 150;
        int printDensity = 7; // 0 - 15 IF -1 NOT SPECIFIED
        boolean kickDrawer = true; //KICK BEFORE PRINT 1 YES
        double feedPaper = 25; //IN MM
        int cutPaper = 1; //CUT PAPER
        int waitPrintFinished = 3000; //IN MS 3000 = 3SECOND
        write_result = CAPrintCommon.printBitmap(printerConnector, bitmap, binaryzationMethod, compressionMethod, paperType, printAlignment, printSpeed, printDensity, kickDrawer, feedPaper, cutPaper, waitPrintFinished);
        Response response = new Response(Response.SDK_RESPONSE_OK, "SUCCESS PRINT", true);
        //Response response = new Response(Response.SDK_RESPONSE_OK, "PRINT TEST PAGE TESTING Connected to Printer = " + connectedPrinterDevice.port_address, true);
        super.sendPromise(response);
    }



    


    @Override
    public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        boolean granted = false;

        if (requestCode == REQUEST_CODE_ASK_PERMISSIONS) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                granted = true;
                launchInitialize();
            }
        }

        if (!granted) {
            super.requestPermissionDenied();
        }

        return granted;
    }
}
