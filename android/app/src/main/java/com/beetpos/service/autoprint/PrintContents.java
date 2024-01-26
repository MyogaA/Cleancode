package com.beetpos.service.autoprint;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.pdf.PdfDocument;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;

// import com.caysn.autoreplyprint.sample.Settings.AppSettings;
// import com.caysn.autoreplyprint.sample.Utils.ZXingUtils;


import com.beetpos.util.AppSettings;
import com.beetpos.util.ZXingUtils;
import com.google.zxing.WriterException;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class PrintContents {

    // 售卖项
    public static class SalesItem {
        // 名称
        public String name = "";
        // 数量
        public int num = 0;
        // 单价
        // public int price = 0;
        // 金额
        public int amount = 0;

        public SalesItem() {

        }

        public SalesItem(String name, int num, int amount) {
            this.name = name;
            this.num = num;
            // this.price = price;
            this.amount = amount;
        }
    }

    // 销售单
    public static class SalesTicket {
        // 单据宽度，58打印机可打印宽度384点，80打印机可打印宽度576点
        public int width = 0;
        // 单据标题
        public String title = "";
        // 单据头
        public String head = "";
        // 列表项
        public List<SalesItem> items = new ArrayList<>();
        // 单据尾
        public String tail = "";
        // 发票号，用来打印条码和二维码
        public String invoice = ""; //QR
        
        public int sub_total = 0;
        public int total = 0;
        public int discount = 0;
        public int services = 0;
        public int tax = 0;
        public int bayar = 0;
        public int kembali = 0;
    }

    // 售卖项
    public static class RekapItem {
        // 名称
        public String name = "";
        // 数量
        // public int num = 0;
        // 单价
        // public int price = 0;
        // 金额
        public int amount = 0;
        public RekapItem() {

        }
        public RekapItem(String name, int amount) {
            this.name = name;
            // this.num = num;
            // this.price = price;
            this.amount = amount;
        }
    }

    // 销售单
    public static class RekapTicket {
        // 单据宽度，58打印机可打印宽度384点，80打印机可打印宽度576点
        public int width = 0;
        // 单据标题
        public String title = "";
        // 单据头
        public String head = "";
        // 列表项
        public List<RekapItem> rekapitems = new ArrayList<>();
        public List<SalesItem> items = new ArrayList<>();

        // 单据尾
        public String tail = "";
        // 发票号，用来打印条码和二维码
        public String invoice = ""; //QR
    }

    // 生成样例图片
    // 先打印标题（大字体）
    // 再打印头部，中间列表项，尾部（正常字体）
    // 再打印发票号条码和二维码
    public static Bitmap getSampleBitmap(SalesTicket ticket) {

        // 单据标题
        TextPaint titlePaint = new TextPaint();
        titlePaint.setColor(Color.BLACK);
        titlePaint.setTextSize(36);
        StaticLayout titleLayout = new StaticLayout(ticket.title, titlePaint, ticket.width, Layout.Alignment.ALIGN_CENTER, 1, 0, false);

        // 单据头
        TextPaint headPaint = new TextPaint();
        headPaint.setColor(Color.BLACK);
        headPaint.setTextSize(24);
        StaticLayout headLayout = new StaticLayout(ticket.head, headPaint, ticket.width, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);

        // 单据尾
        TextPaint tailPaint = new TextPaint();
        tailPaint.setColor(Color.BLACK);
        tailPaint.setTextSize(24);
        StaticLayout tailLayout = new StaticLayout(ticket.tail, tailPaint, ticket.width, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);

        // 列表项，从左到右共四列，依次是名称，数量，单价，金额
        TextPaint itemPaint = new TextPaint();
        itemPaint.setColor(Color.BLACK);
        itemPaint.setTextSize(24);
        List<StaticLayout> itemNameLayoutList = new ArrayList<>();
        List<StaticLayout> itemNumLayoutList = new ArrayList<>();
        // List<StaticLayout> itemPriceLayoutList = new ArrayList<>();
        List<StaticLayout> itemAmountLayoutList = new ArrayList<>();
        // int itemNumWidth = (int) (0.1 * ticket.width);
        // int itemPriceWidth = (int) (0.2 * ticket.width);
        // int itemAmountWidth = (int) (0.2 * ticket.width);
        // int itemNameWidth = ticket.width - itemNumWidth - itemPriceWidth - itemAmountWidth;
        int itemNumWidth = (int) (0.1 * ticket.width);
        // int itemPriceWidth = (int) (0.2 * ticket.width);
        int itemAmountWidth = (int) (0.4 * ticket.width);
        int itemNameWidth = ticket.width - itemNumWidth - itemAmountWidth;
        for (SalesItem salesItem : ticket.items) {
            StaticLayout itemNameLayout = new StaticLayout(salesItem.name, itemPaint, itemNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
            StaticLayout itemNumLayout = new StaticLayout("" + salesItem.num, itemPaint, itemNumWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
            // StaticLayout itemPriceLayout = new StaticLayout("" + salesItem.price, itemPaint, itemPriceWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
            StaticLayout itemAmountLayout = new StaticLayout("" + salesItem.amount, itemPaint, itemAmountWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
            itemNameLayoutList.add(itemNameLayout);
            itemNumLayoutList.add(itemNumLayout);
            // itemPriceLayoutList.add(itemPriceLayout);
            itemAmountLayoutList.add(itemAmountLayout);
        }

        // 列表项金额总计
        TextPaint itemTotalPaint = new TextPaint();
        itemTotalPaint.setColor(Color.BLACK);
        itemTotalPaint.setTextSize(24);
        int totalAmount = 0;
        // for (SalesItem salesItem : ticket.items) {
        //     totalAmount += salesItem.amount;
        // }
        // totalAmount = ticket.total;
        // StaticLayout itemTotalLayout = new StaticLayout("Total     " + totalAmount + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemSubTotalLayout = new StaticLayout("Sub Total " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemDiscountLayout = new StaticLayout("Discount  " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemServicesLayout = new StaticLayout("Services  " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemTaxLayout = new StaticLayout("Tax       " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemTotalLayout = new StaticLayout("Total     " + ticket.total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        

        int itemSummaryNumberWidth = (int) (0.4 * ticket.width);
        int itemSummaryNameWidth = ticket.width - itemSummaryNumberWidth;

        StaticLayout itemSubTotalLayout = new StaticLayout("Sub Total", itemPaint, itemSummaryNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
        StaticLayout itemDiscountLayout = new StaticLayout("Discount", itemPaint, itemSummaryNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
        StaticLayout itemServicesLayout = new StaticLayout("Services", itemPaint, itemSummaryNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
        StaticLayout itemTaxLayout = new StaticLayout("Tax", itemPaint, itemSummaryNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
        StaticLayout itemTotalLayout = new StaticLayout("Total", itemPaint, itemSummaryNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
        StaticLayout itemSubTotalAmountLayout = new StaticLayout("" + ticket.sub_total, itemPaint, itemSummaryNumberWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        StaticLayout itemDiscountAmountLayout = new StaticLayout("" + ticket.discount, itemPaint, itemSummaryNumberWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        StaticLayout itemServicesAmountLayout = new StaticLayout("" + ticket.services, itemPaint, itemSummaryNumberWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        StaticLayout itemTaxAmountLayout = new StaticLayout("" + ticket.tax, itemPaint, itemSummaryNumberWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        StaticLayout itemTotalAmountLayout = new StaticLayout("" + ticket.total, itemPaint, itemSummaryNumberWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
              
        // StaticLayout itemSubTotalLayout = new StaticLayout("Sub Total " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemDiscountLayout = new StaticLayout("Discount  " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemServicesLayout = new StaticLayout("Services  " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemTaxLayout = new StaticLayout("Tax       " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemTotalLayout = new StaticLayout("Total     " + ticket.total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);

        // 发票号条码
        Bitmap invoiceBarcodeBitmap = null;
        Bitmap invoiceQRCodeBitmap = null;

        try {
            invoiceBarcodeBitmap = ZXingUtils.CreatCode128(ticket.invoice, ticket.width, 60);
        } catch (WriterException e) {
            e.printStackTrace();
        }

        // 发票号二维码
        try {
            invoiceQRCodeBitmap = ZXingUtils.CreateQRCode(ticket.invoice, ticket.width);
        } catch (WriterException e) {
            e.printStackTrace();
        }
        

        // 计算位图高度
        int bitmapWidth = ticket.width;
        int bitmapHeight = titleLayout.getHeight() + headLayout.getHeight() + tailLayout.getHeight() + itemTotalLayout.getHeight();
        for (int row = 0; row < ticket.items.size(); ++row) {
            bitmapHeight += itemNameLayoutList.get(row).getHeight();
        }
        if (invoiceBarcodeBitmap != null) {
            bitmapHeight += invoiceBarcodeBitmap.getHeight();
        }
        if (invoiceQRCodeBitmap != null) {
            bitmapHeight += invoiceQRCodeBitmap.getHeight();
        }

        // 创建位图并绘制位图
        Bitmap bitmap = Bitmap.createBitmap(bitmapWidth, bitmapHeight, Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        canvas.drawColor(Color.WHITE);

        // 绘制标题
        titleLayout.draw(canvas);
        canvas.translate(0, titleLayout.getHeight());

        // 绘制头
        headLayout.draw(canvas);
        canvas.translate(0, headLayout.getHeight());

        // 绘制列表项
        for (int row = 0; row < ticket.items.size(); ++row) {
            StaticLayout itemNameLayout = itemNameLayoutList.get(row);
            StaticLayout itemNumLayout = itemNumLayoutList.get(row);
            // StaticLayout itemPriceLayout = itemPriceLayoutList.get(row);
            StaticLayout itemAmountLayout = itemAmountLayoutList.get(row);

            itemNameLayout.draw(canvas);
            canvas.translate(itemNameLayout.getWidth(), 0);

            itemNumLayout.draw(canvas);
            canvas.translate(itemNumLayout.getWidth(), 0);

            // itemPriceLayout.draw(canvas);
            // canvas.translate(itemPriceLayout.getWidth(), 0);

            itemAmountLayout.draw(canvas);
            // canvas.translate(-itemNameLayout.getWidth() - itemNumLayout.getWidth() - itemPriceLayout.getWidth(), itemNameLayout.getHeight());
            canvas.translate(-itemNameLayout.getWidth() - itemNumLayout.getWidth(), itemNameLayout.getHeight());

            
        }

        // 绘制列表项总金额
        // itemTotalLayout.draw(canvas);
        // canvas.translate(0, itemTotalLayout.getHeight());

        // Sample
        // itemNameLayout.draw(canvas);
        // canvas.translate(itemNameLayout.getWidth(), 0);
        // itemAmountLayout.draw(canvas);
        // canvas.translate(-itemNameLayout.getWidth() - itemNumLayout.getWidth() - itemPriceLayout.getWidth(), itemNameLayout.getHeight());
       
        itemSubTotalLayout.draw(canvas);
        canvas.translate(itemSubTotalLayout.getWidth(), 0);
        itemSubTotalAmountLayout.draw(canvas);
        canvas.translate(-itemSubTotalLayout.getWidth(), itemSubTotalAmountLayout.getHeight());

        itemDiscountLayout.draw(canvas);
        canvas.translate(itemDiscountLayout.getWidth(), 0);
        itemDiscountAmountLayout.draw(canvas);
        canvas.translate(-itemDiscountLayout.getWidth(), itemDiscountAmountLayout.getHeight());

        itemTaxLayout.draw(canvas);
        canvas.translate(itemTaxLayout.getWidth(), 0);
        itemTaxAmountLayout.draw(canvas);
        canvas.translate(-itemTaxLayout.getWidth(), itemTaxAmountLayout.getHeight());

        itemServicesLayout.draw(canvas);
        canvas.translate(itemServicesLayout.getWidth(), 0);
        itemServicesAmountLayout.draw(canvas);
        canvas.translate(-itemServicesLayout.getWidth(), itemServicesAmountLayout.getHeight());

        itemTotalLayout.draw(canvas);
        canvas.translate(itemTotalLayout.getWidth(), 0);
        itemTotalAmountLayout.draw(canvas);
        canvas.translate(-itemTotalLayout.getWidth(), itemTotalAmountLayout.getHeight());

        // 绘制尾
        tailLayout.draw(canvas);
        canvas.translate(0, tailLayout.getHeight());

        // 绘制条码
        if (invoiceBarcodeBitmap != null) {
            canvas.drawBitmap(invoiceBarcodeBitmap, 0, 0, null);
            canvas.translate(0, invoiceBarcodeBitmap.getHeight());
        }

        // 绘制二维码
        if (invoiceQRCodeBitmap != null) {
            canvas.drawBitmap(invoiceQRCodeBitmap, 0, 0, null);
            canvas.translate(0, invoiceQRCodeBitmap.getHeight());
        }

        return bitmap;
    }

   


    public static Bitmap getRekapSampleBitmap(RekapTicket ticket) {

        // 单据标题
        TextPaint titlePaint = new TextPaint();
        titlePaint.setColor(Color.BLACK);
        titlePaint.setTextSize(36);
        StaticLayout titleLayout = new StaticLayout(ticket.title, titlePaint, ticket.width, Layout.Alignment.ALIGN_CENTER, 1, 0, false);

        // 单据头
        TextPaint headPaint = new TextPaint();
        headPaint.setColor(Color.BLACK);
        headPaint.setTextSize(24);
        StaticLayout headLayout = new StaticLayout(ticket.head, headPaint, ticket.width, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);

        // 单据尾
        TextPaint tailPaint = new TextPaint();
        tailPaint.setColor(Color.BLACK);
        tailPaint.setTextSize(24);
        StaticLayout tailLayout = new StaticLayout(ticket.tail, tailPaint, ticket.width, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);

        // 列表项，从左到右共四列，依次是名称，数量，单价，金额
        TextPaint itemPaint = new TextPaint();
        itemPaint.setColor(Color.BLACK);
        itemPaint.setTextSize(24);
        List<StaticLayout> itemNameLayoutList = new ArrayList<>();
        List<StaticLayout> itemNumLayoutList = new ArrayList<>();
        List<StaticLayout> itemAmountLayoutList = new ArrayList<>();

        int itemNumWidth = (int) (0.1 * ticket.width);
        // int itemPriceWidth = (int) (0.2 * ticket.width);
        int itemAmountWidth = (int) (0.4 * ticket.width);
        int itemNameWidth = ticket.width - itemNumWidth - itemAmountWidth;
        for (SalesItem salesItem : ticket.items) {
            StaticLayout itemNameLayout = new StaticLayout(salesItem.name, itemPaint, itemNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
            StaticLayout itemNumLayout = new StaticLayout("" + salesItem.num, itemPaint, itemNumWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
            // StaticLayout itemPriceLayout = new StaticLayout("" + salesItem.price, itemPaint, itemPriceWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
            StaticLayout itemAmountLayout = new StaticLayout("" + salesItem.amount, itemPaint, itemAmountWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
            itemNameLayoutList.add(itemNameLayout);
            itemNumLayoutList.add(itemNumLayout);
            // itemPriceLayoutList.add(itemPriceLayout);
            itemAmountLayoutList.add(itemAmountLayout);
        }

        // Item Rekap
        List<StaticLayout> itemrekapNameLayoutList = new ArrayList<>();
        List<StaticLayout> itemrekapAmountLayoutList = new ArrayList<>();

        int itemrekapAmountWidth = (int) (0.4 * ticket.width);
        int itemrekapNameWidth = ticket.width - itemrekapAmountWidth;

        for (RekapItem rekapItem : ticket.rekapitems) {
            StaticLayout itemrekapNameLayout = new StaticLayout(rekapItem.name, itemPaint, itemrekapNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
            StaticLayout itemrekapAmountLayout = new StaticLayout("" + rekapItem.amount, itemPaint, itemrekapAmountWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
            itemrekapNameLayoutList.add(itemrekapNameLayout);
            // itemPriceLayoutList.add(itemPriceLayout);
            itemrekapAmountLayoutList.add(itemrekapAmountLayout);
        }


        // 发票号条码
        // Bitmap invoiceBarcodeBitmap = null;
        // try {
        //     invoiceBarcodeBitmap = ZXingUtils.CreatCode128(ticket.invoice, ticket.width, 60);
        // } catch (WriterException e) {
        //     e.printStackTrace();
        // }

        // // 发票号二维码
        // Bitmap invoiceQRCodeBitmap = null;
        // try {
        //     invoiceQRCodeBitmap = ZXingUtils.CreateQRCode(ticket.invoice, ticket.width);
        // } catch (WriterException e) {
        //     e.printStackTrace();
        // }

        // 计算位图高度
        int bitmapWidth = ticket.width;
        int bitmapHeight = titleLayout.getHeight() + headLayout.getHeight() + tailLayout.getHeight();
        for (int row = 0; row < ticket.items.size(); ++row) {
            bitmapHeight += itemNameLayoutList.get(row).getHeight();
        }

        for (int row = 0; row < ticket.rekapitems.size(); ++row) {
            bitmapHeight += itemrekapNameLayoutList.get(row).getHeight();
        }
        // if (invoiceBarcodeBitmap != null) {
        //     bitmapHeight += invoiceBarcodeBitmap.getHeight();
        // }
        // if (invoiceQRCodeBitmap != null) {
        //     bitmapHeight += invoiceQRCodeBitmap.getHeight();
        // }

        // 创建位图并绘制位图
        Bitmap bitmap = Bitmap.createBitmap(bitmapWidth, bitmapHeight, Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        canvas.drawColor(Color.WHITE);

        // 绘制标题
        titleLayout.draw(canvas);
        canvas.translate(0, titleLayout.getHeight());

        // 绘制头
        headLayout.draw(canvas);
        canvas.translate(0, headLayout.getHeight());


        //item rekap

        for (int row = 0; row < ticket.rekapitems.size(); ++row) {
            StaticLayout itemrekapNameLayout = itemrekapNameLayoutList.get(row);
            StaticLayout itemrekapAmountLayout = itemrekapAmountLayoutList.get(row);

            itemrekapNameLayout.draw(canvas);
            canvas.translate(itemrekapNameLayout.getWidth(), 0);

            itemrekapAmountLayout.draw(canvas);
            // canvas.translate(-itemNameLayout.getWidth() - itemNumLayout.getWidth() - itemPriceLayout.getWidth(), itemNameLayout.getHeight());
            canvas.translate(-itemrekapNameLayout.getWidth(), itemrekapNameLayout.getHeight());

            
        }

        tailLayout.draw(canvas); //separator09
        canvas.translate(0, tailLayout.getHeight());


        // 绘制列表项
        for (int row = 0; row < ticket.items.size(); ++row) {
            StaticLayout itemNameLayout = itemNameLayoutList.get(row);
            StaticLayout itemNumLayout = itemNumLayoutList.get(row);
            // StaticLayout itemPriceLayout = itemPriceLayoutList.get(row);
            StaticLayout itemAmountLayout = itemAmountLayoutList.get(row);

            itemNameLayout.draw(canvas);
            canvas.translate(itemNameLayout.getWidth(), 0);

            itemNumLayout.draw(canvas);
            canvas.translate(itemNumLayout.getWidth(), 0);

            // itemPriceLayout.draw(canvas);
            // canvas.translate(itemPriceLayout.getWidth(), 0);

            itemAmountLayout.draw(canvas);
            // canvas.translate(-itemNameLayout.getWidth() - itemNumLayout.getWidth() - itemPriceLayout.getWidth(), itemNameLayout.getHeight());
            canvas.translate(-itemNameLayout.getWidth() - itemNumLayout.getWidth(), itemNameLayout.getHeight());

            
        }

        // 绘制列表项总金额
        // itemTotalLayout.draw(canvas);
        // canvas.translate(0, itemTotalLayout.getHeight());

        // Sample
        // itemNameLayout.draw(canvas);
        // canvas.translate(itemNameLayout.getWidth(), 0);
        // itemAmountLayout.draw(canvas);
        // canvas.translate(-itemNameLayout.getWidth() - itemNumLayout.getWidth() - itemPriceLayout.getWidth(), itemNameLayout.getHeight());

        // 绘制尾


        // 绘制条码
        // if (invoiceBarcodeBitmap != null) {
        //     canvas.drawBitmap(invoiceBarcodeBitmap, 0, 0, null);
        //     canvas.translate(0, invoiceBarcodeBitmap.getHeight());
        // }

        // // 绘制二维码
        // if (invoiceQRCodeBitmap != null) {
        //     canvas.drawBitmap(invoiceQRCodeBitmap, 0, 0, null);
        //     canvas.translate(0, invoiceQRCodeBitmap.getHeight());
        // }

        return bitmap;
    }


    public static Bitmap PrintWithoutInvoice(SalesTicket ticket) {

        // 单据标题
        TextPaint titlePaint = new TextPaint();
        titlePaint.setColor(Color.BLACK);
        titlePaint.setTextSize(36);
        StaticLayout titleLayout = new StaticLayout(ticket.title, titlePaint, ticket.width, Layout.Alignment.ALIGN_CENTER, 1, 0, false);

        // 单据头
        TextPaint headPaint = new TextPaint();
        headPaint.setColor(Color.BLACK);
        headPaint.setTextSize(24);
        StaticLayout headLayout = new StaticLayout(ticket.head, headPaint, ticket.width, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);

        // 单据尾
        TextPaint tailPaint = new TextPaint();
        tailPaint.setColor(Color.BLACK);
        tailPaint.setTextSize(24);
        StaticLayout tailLayout = new StaticLayout(ticket.tail, tailPaint, ticket.width, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);

        // 列表项，从左到右共四列，依次是名称，数量，单价，金额
        TextPaint itemPaint = new TextPaint();
        itemPaint.setColor(Color.BLACK);
        itemPaint.setTextSize(24);
        List<StaticLayout> itemNameLayoutList = new ArrayList<>();
        List<StaticLayout> itemNumLayoutList = new ArrayList<>();
        // List<StaticLayout> itemPriceLayoutList = new ArrayList<>();
        List<StaticLayout> itemAmountLayoutList = new ArrayList<>();
        // int itemNumWidth = (int) (0.1 * ticket.width);
        // int itemPriceWidth = (int) (0.2 * ticket.width);
        // int itemAmountWidth = (int) (0.2 * ticket.width);
        // int itemNameWidth = ticket.width - itemNumWidth - itemPriceWidth - itemAmountWidth;
        int itemNumWidth = (int) (0.1 * ticket.width);
        // int itemPriceWidth = (int) (0.2 * ticket.width);
        int itemAmountWidth = (int) (0.4 * ticket.width);
        int itemNameWidth = ticket.width - itemNumWidth - itemAmountWidth;
        for (SalesItem salesItem : ticket.items) {
            StaticLayout itemNameLayout = new StaticLayout(salesItem.name, itemPaint, itemNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
            StaticLayout itemNumLayout = new StaticLayout("" + salesItem.num, itemPaint, itemNumWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
            // StaticLayout itemPriceLayout = new StaticLayout("" + salesItem.price, itemPaint, itemPriceWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
            StaticLayout itemAmountLayout = new StaticLayout("" + salesItem.amount, itemPaint, itemAmountWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
            itemNameLayoutList.add(itemNameLayout);
            itemNumLayoutList.add(itemNumLayout);
            // itemPriceLayoutList.add(itemPriceLayout);
            itemAmountLayoutList.add(itemAmountLayout);
        }

        // 列表项金额总计
        TextPaint itemTotalPaint = new TextPaint();
        itemTotalPaint.setColor(Color.BLACK);
        itemTotalPaint.setTextSize(24);
        int totalAmount = 0;
        // for (SalesItem salesItem : ticket.items) {
        //     totalAmount += salesItem.amount;
        // }
        // totalAmount = ticket.total;
        // StaticLayout itemTotalLayout = new StaticLayout("Total     " + totalAmount + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemSubTotalLayout = new StaticLayout("Sub Total " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemDiscountLayout = new StaticLayout("Discount  " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemServicesLayout = new StaticLayout("Services  " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemTaxLayout = new StaticLayout("Tax       " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemTotalLayout = new StaticLayout("Total     " + ticket.total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        

        int itemSummaryNumberWidth = (int) (0.4 * ticket.width);
        int itemSummaryNameWidth = ticket.width - itemSummaryNumberWidth;

        StaticLayout itemSubTotalLayout = new StaticLayout("Sub Total", itemPaint, itemSummaryNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
        StaticLayout itemDiscountLayout = new StaticLayout("Discount", itemPaint, itemSummaryNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
        StaticLayout itemServicesLayout = new StaticLayout("Services", itemPaint, itemSummaryNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
        StaticLayout itemTaxLayout = new StaticLayout("Tax", itemPaint, itemSummaryNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
        StaticLayout itemTotalLayout = new StaticLayout("Total", itemPaint, itemSummaryNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
        StaticLayout itemSubTotalAmountLayout = new StaticLayout("" + ticket.sub_total, itemPaint, itemSummaryNumberWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        StaticLayout itemDiscountAmountLayout = new StaticLayout("" + ticket.discount, itemPaint, itemSummaryNumberWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        StaticLayout itemServicesAmountLayout = new StaticLayout("" + ticket.services, itemPaint, itemSummaryNumberWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        StaticLayout itemTaxAmountLayout = new StaticLayout("" + ticket.tax, itemPaint, itemSummaryNumberWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        StaticLayout itemTotalAmountLayout = new StaticLayout("" + ticket.total, itemPaint, itemSummaryNumberWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
              
        // StaticLayout itemSubTotalLayout = new StaticLayout("Sub Total " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemDiscountLayout = new StaticLayout("Discount  " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemServicesLayout = new StaticLayout("Services  " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemTaxLayout = new StaticLayout("Tax       " + ticket.sub_total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
        // StaticLayout itemTotalLayout = new StaticLayout("Total     " + ticket.total + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);

        // 发票号条码
        Bitmap invoiceBarcodeBitmap = null;
        Bitmap invoiceQRCodeBitmap = null;

        // try {
        //     invoiceBarcodeBitmap = ZXingUtils.CreatCode128(ticket.invoice, ticket.width, 60);
        // } catch (WriterException e) {
        //     e.printStackTrace();
        // }

        // // 发票号二维码
        // try {
        //     invoiceQRCodeBitmap = ZXingUtils.CreateQRCode(ticket.invoice, ticket.width);
        // } catch (WriterException e) {
        //     e.printStackTrace();
        // }
        

        // 计算位图高度
        int bitmapWidth = ticket.width;
        int bitmapHeight = titleLayout.getHeight() + headLayout.getHeight() + tailLayout.getHeight() + itemTotalLayout.getHeight() + itemTaxLayout.getHeight() + itemDiscountLayout.getHeight() + itemSubTotalLayout.getHeight();
        for (int row = 0; row < ticket.items.size(); ++row) {
            bitmapHeight += itemNameLayoutList.get(row).getHeight();
        }

        if (invoiceBarcodeBitmap != null) {
            bitmapHeight += invoiceBarcodeBitmap.getHeight();
        }
        if (invoiceQRCodeBitmap != null) {
            bitmapHeight += invoiceQRCodeBitmap.getHeight();
        }

        // 创建位图并绘制位图
        Bitmap bitmap = Bitmap.createBitmap(bitmapWidth, bitmapHeight, Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        canvas.drawColor(Color.WHITE);

        // 绘制标题
        titleLayout.draw(canvas);
        canvas.translate(0, titleLayout.getHeight());

        // 绘制头
        headLayout.draw(canvas);
        canvas.translate(0, headLayout.getHeight());

        // 绘制列表项
        for (int row = 0; row < ticket.items.size(); ++row) {
            StaticLayout itemNameLayout = itemNameLayoutList.get(row);
            StaticLayout itemNumLayout = itemNumLayoutList.get(row);
            // StaticLayout itemPriceLayout = itemPriceLayoutList.get(row);
            StaticLayout itemAmountLayout = itemAmountLayoutList.get(row);

            itemNameLayout.draw(canvas);
            canvas.translate(itemNameLayout.getWidth(), 0);

            itemNumLayout.draw(canvas);
            canvas.translate(itemNumLayout.getWidth(), 0);

            // itemPriceLayout.draw(canvas);
            // canvas.translate(itemPriceLayout.getWidth(), 0);

            itemAmountLayout.draw(canvas);
            // canvas.translate(-itemNameLayout.getWidth() - itemNumLayout.getWidth() - itemPriceLayout.getWidth(), itemNameLayout.getHeight());
            canvas.translate(-itemNameLayout.getWidth() - itemNumLayout.getWidth(), itemNameLayout.getHeight());

            
        }

        // 绘制列表项总金额
        // itemTotalLayout.draw(canvas);
        // canvas.translate(0, itemTotalLayout.getHeight());

        // Sample
        // itemNameLayout.draw(canvas);
        // canvas.translate(itemNameLayout.getWidth(), 0);
        // itemAmountLayout.draw(canvas);
        // canvas.translate(-itemNameLayout.getWidth() - itemNumLayout.getWidth() - itemPriceLayout.getWidth(), itemNameLayout.getHeight());
       
        itemSubTotalLayout.draw(canvas);
        canvas.translate(itemSubTotalLayout.getWidth(), 0);
        itemSubTotalAmountLayout.draw(canvas);
        canvas.translate(-itemSubTotalLayout.getWidth(), itemSubTotalAmountLayout.getHeight());

        itemDiscountLayout.draw(canvas);
        canvas.translate(itemDiscountLayout.getWidth(), 0);
        itemDiscountAmountLayout.draw(canvas);
        canvas.translate(-itemDiscountLayout.getWidth(), itemDiscountAmountLayout.getHeight());

        itemTaxLayout.draw(canvas);
        canvas.translate(itemTaxLayout.getWidth(), 0);
        itemTaxAmountLayout.draw(canvas);
        canvas.translate(-itemTaxLayout.getWidth(), itemTaxAmountLayout.getHeight());

        itemServicesLayout.draw(canvas);
        canvas.translate(itemServicesLayout.getWidth(), 0);
        itemServicesAmountLayout.draw(canvas);
        canvas.translate(-itemServicesLayout.getWidth(), itemServicesAmountLayout.getHeight());

        itemTotalLayout.draw(canvas);
        canvas.translate(itemTotalLayout.getWidth(), 0);
        itemTotalAmountLayout.draw(canvas);
        canvas.translate(-itemTotalLayout.getWidth(), itemTotalAmountLayout.getHeight());

        // 绘制尾
        tailLayout.draw(canvas);
        canvas.translate(0, tailLayout.getHeight());

        // 绘制条码
        if (invoiceBarcodeBitmap != null) {
            canvas.drawBitmap(invoiceBarcodeBitmap, 0, 0, null);
            canvas.translate(0, invoiceBarcodeBitmap.getHeight());
        }

        // 绘制二维码
        if (invoiceQRCodeBitmap != null) {
            canvas.drawBitmap(invoiceQRCodeBitmap, 0, 0, null);
            canvas.translate(0, invoiceQRCodeBitmap.getHeight());
        }

        return bitmap;
    }

}



 // 生成样例图片
    // 先打印标题（大字体）
    // 再打印头部，中间列表项，尾部（正常字体）
    // 再打印发票号条码和二维码
    // public static String generateSamplePdf(SalesTicket ticket) {
    //     String pdfFilePathName = null;

    //     // 单据标题
    //     TextPaint titlePaint = new TextPaint();
    //     titlePaint.setColor(Color.BLACK);
    //     titlePaint.setTextSize(36);
    //     StaticLayout titleLayout = new StaticLayout(ticket.title, titlePaint, ticket.width, Layout.Alignment.ALIGN_CENTER, 1, 0, false);

    //     // 单据头
    //     TextPaint headPaint = new TextPaint();
    //     headPaint.setColor(Color.BLACK);
    //     headPaint.setTextSize(24);
    //     StaticLayout headLayout = new StaticLayout(ticket.head, headPaint, ticket.width, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);

    //     // 单据尾
    //     TextPaint tailPaint = new TextPaint();
    //     tailPaint.setColor(Color.BLACK);
    //     tailPaint.setTextSize(24);
    //     StaticLayout tailLayout = new StaticLayout(ticket.tail, tailPaint, ticket.width, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);

    //     // 列表项，从左到右共四列，依次是名称，数量，单价，金额
    //     TextPaint itemPaint = new TextPaint();
    //     itemPaint.setColor(Color.BLACK);
    //     itemPaint.setTextSize(24);
    //     List<StaticLayout> itemNameLayoutList = new ArrayList<>();
    //     List<StaticLayout> itemNumLayoutList = new ArrayList<>();
    //     List<StaticLayout> itemPriceLayoutList = new ArrayList<>();
    //     List<StaticLayout> itemAmountLayoutList = new ArrayList<>();
    //     int itemNumWidth = (int) (0.1 * ticket.width);
    //     int itemPriceWidth = (int) (0.2 * ticket.width);
    //     int itemAmountWidth = (int) (0.2 * ticket.width);
    //     int itemNameWidth = ticket.width - itemNumWidth - itemPriceWidth - itemAmountWidth;
    //     for (SalesItem salesItem : ticket.items) {
    //         StaticLayout itemNameLayout = new StaticLayout(salesItem.name, itemPaint, itemNameWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
    //         StaticLayout itemNumLayout = new StaticLayout("" + salesItem.num, itemPaint, itemNumWidth, Layout.Alignment.ALIGN_NORMAL, 1, 0, false);
    //         StaticLayout itemPriceLayout = new StaticLayout("" + salesItem.price, itemPaint, itemPriceWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
    //         StaticLayout itemAmountLayout = new StaticLayout("" + salesItem.amount, itemPaint, itemAmountWidth, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);
    //         itemNameLayoutList.add(itemNameLayout);
    //         itemNumLayoutList.add(itemNumLayout);
    //         itemPriceLayoutList.add(itemPriceLayout);
    //         itemAmountLayoutList.add(itemAmountLayout);
    //     }

    //     // 列表项金额总计
    //     TextPaint itemTotalPaint = new TextPaint();
    //     itemTotalPaint.setColor(Color.BLACK);
    //     itemTotalPaint.setTextSize(30);
    //     int totalAmount = 0;
    //     for (SalesItem salesItem : ticket.items) {
    //         totalAmount += salesItem.amount;
    //     }
    //     StaticLayout itemTotalLayout = new StaticLayout("Total     " + totalAmount + "\r\n", itemTotalPaint, ticket.width, Layout.Alignment.ALIGN_OPPOSITE, 1, 0, false);

    //     // 发票号条码
    //     Bitmap invoiceBarcodeBitmap = null;
    //     try {
    //         invoiceBarcodeBitmap = ZXingUtils.CreatCode128(ticket.invoice, ticket.width, 60);
    //     } catch (WriterException e) {
    //         e.printStackTrace();
    //     }

    //     // 发票号二维码
    //     Bitmap invoiceQRCodeBitmap = null;
    //     try {
    //         invoiceQRCodeBitmap = ZXingUtils.CreateQRCode(ticket.invoice, ticket.width);
    //     } catch (WriterException e) {
    //         e.printStackTrace();
    //     }

    //     // 计算位图高度
    //     int bitmapWidth = ticket.width;
    //     int bitmapHeight = titleLayout.getHeight() + headLayout.getHeight() + tailLayout.getHeight() + itemTotalLayout.getHeight();
    //     for (int row = 0; row < ticket.items.size(); ++row) {
    //         bitmapHeight += itemNameLayoutList.get(row).getHeight();
    //     }
    //     if (invoiceBarcodeBitmap != null) {
    //         bitmapHeight += invoiceBarcodeBitmap.getHeight();
    //     }
    //     if (invoiceQRCodeBitmap != null) {
    //         bitmapHeight += invoiceQRCodeBitmap.getHeight();
    //     }

    //     // 创建位图并绘制位图
    //     if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.KITKAT) {
    //         PdfDocument pdfDocument = new PdfDocument();
    //         PdfDocument.PageInfo pageInfo = new PdfDocument.PageInfo.Builder(bitmapWidth, bitmapHeight, 1).create();
    //         PdfDocument.Page page = pdfDocument.startPage(pageInfo);

    //         Canvas canvas = page.getCanvas();
    //         canvas.drawColor(Color.WHITE);

    //         // 绘制标题
    //         titleLayout.draw(canvas);
    //         canvas.translate(0, titleLayout.getHeight());

    //         // 绘制头
    //         headLayout.draw(canvas);
    //         canvas.translate(0, headLayout.getHeight());

    //         // 绘制列表项
    //         for (int row = 0; row < ticket.items.size(); ++row) {
    //             StaticLayout itemNameLayout = itemNameLayoutList.get(row);
    //             StaticLayout itemNumLayout = itemNumLayoutList.get(row);
    //             StaticLayout itemPriceLayout = itemPriceLayoutList.get(row);
    //             StaticLayout itemAmountLayout = itemAmountLayoutList.get(row);

    //             itemNameLayout.draw(canvas);
    //             canvas.translate(itemNameLayout.getWidth(), 0);

    //             itemNumLayout.draw(canvas);
    //             canvas.translate(itemNumLayout.getWidth(), 0);

    //             itemPriceLayout.draw(canvas);
    //             canvas.translate(itemPriceLayout.getWidth(), 0);

    //             itemAmountLayout.draw(canvas);
    //             canvas.translate(-itemNameLayout.getWidth() - itemNumLayout.getWidth() - itemPriceLayout.getWidth(), itemNameLayout.getHeight());
    //         }

    //         // 绘制列表项总金额
    //         itemTotalLayout.draw(canvas);
    //         canvas.translate(0, itemTotalLayout.getHeight());

    //         // 绘制尾
    //         tailLayout.draw(canvas);
    //         canvas.translate(0, tailLayout.getHeight());

    //         // 绘制条码
    //         if (invoiceBarcodeBitmap != null) {
    //             canvas.drawBitmap(invoiceBarcodeBitmap, 0, 0, null);
    //             canvas.translate(0, invoiceBarcodeBitmap.getHeight());
    //         }

    //         // 绘制二维码
    //         if (invoiceQRCodeBitmap != null) {
    //             canvas.drawBitmap(invoiceQRCodeBitmap, 0, 0, null);
    //             canvas.translate(0, invoiceQRCodeBitmap.getHeight());
    //         }

    //         pdfDocument.finishPage(page);

    //         String path = AppSettings.getCacheDirPathName() + "/sample.pdf";
    //         File file = new File(path);
    //         if (!file.exists()) {
    //             file.mkdirs();
    //         }
    //         if (file.exists()) {
    //             file.delete();
    //         }
    //         try {
    //             pdfDocument.writeTo(new FileOutputStream(file));
    //             pdfFilePathName = path;
    //         } catch (IOException e) {
    //             e.printStackTrace();
    //         }
    //         pdfDocument.close();
    //     }

    //     return pdfFilePathName;
    // }