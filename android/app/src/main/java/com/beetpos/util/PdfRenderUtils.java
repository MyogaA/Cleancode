package com.beetpos.util;

import android.graphics.Bitmap;
import android.graphics.Rect;
import android.graphics.pdf.PdfRenderer;
import android.os.Build;
import android.os.ParcelFileDescriptor;
import android.print.PageRange;
import android.util.Log;
import android.util.Size;

import androidx.annotation.RequiresApi;

import java.io.File;

// 调用系统PdfRenderer解析PDF
// 无法获取边距信息，所以最终图像是包含边距的，无法去掉边距。
@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
public class PdfRenderUtils {

    private static final String TAG = "PdfRenderUtils";

    public static int getPdfPageCount(String fileName) {
        int pageCount = 0;
        try {
            File file = new File(fileName);
            if (file.exists() && file.isFile()) {
                ParcelFileDescriptor parcelFileDescriptor = ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY);
                if (parcelFileDescriptor != null) {
                    PdfRenderer pdfRenderer = new PdfRenderer(parcelFileDescriptor);
                    if (pdfRenderer != null) {
                        pageCount = pdfRenderer.getPageCount();
                        pdfRenderer.close();
                    }
                    parcelFileDescriptor.close();
                }
            }
        } catch (Throwable tr) {
            tr.printStackTrace();
        } finally {

        }
        return pageCount;
    }

    // 假设PDF的每一页，大小和边距都是一致的
    // 传入页面大小，传入内容矩形，最终输出的图像，是按照内容矩形裁减而来的
    public static Bitmap getPdfPageContentBitmap(String fileName, int pageIndex, Size pageSize, Rect contentRect) {
        Bitmap contentBitmap = null;
        try {
            File file = new File(fileName);
            if (file.exists() && file.isFile()) {
                ParcelFileDescriptor parcelFileDescriptor = ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY);
                if (parcelFileDescriptor != null) {
                    PdfRenderer pdfRenderer = new PdfRenderer(parcelFileDescriptor);
                    if (pdfRenderer != null) {
                        if ((pageIndex >= 0) && (pageIndex < pdfRenderer.getPageCount())) {
                            PdfRenderer.Page page = pdfRenderer.openPage(pageIndex);
                            if (page != null) {
                                if ((pageSize != null) && (pageSize.getWidth() > 0) && (pageSize.getHeight() > 0)) {
                                    Bitmap pageBitmap = Bitmap.createBitmap(pageSize.getWidth(), pageSize.getHeight(), Bitmap.Config.ARGB_8888);
                                    if (pageBitmap != null) {
                                        page.render(pageBitmap, null, null, PdfRenderer.Page.RENDER_MODE_FOR_PRINT);
                                        if ((contentRect != null) && (contentRect.left >= 0) && (contentRect.top >= 0) && (contentRect.width() > 0) && (contentRect.height() > 0)) {
                                            int x = contentRect.left;
                                            int y = contentRect.top;
                                            int w = contentRect.width();
                                            int h = contentRect.height();
                                            if (x + w > pageBitmap.getWidth())
                                                w = pageBitmap.getWidth() - x;
                                            if (y + h > pageBitmap.getHeight())
                                                h = pageBitmap.getHeight() - y;
                                            if ((x >= 0) && (x < pageBitmap.getWidth()) && (y >= 0) && (y < pageBitmap.getHeight()) && (w > 0) && (h > 0)) {
                                                contentBitmap = Bitmap.createBitmap(pageBitmap, x, y, w, h);
                                            }
                                        }
                                    }
                                }
                                page.close();
                            }
                        }
                        pdfRenderer.close();
                    }
                    parcelFileDescriptor.close();
                }
            }
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return contentBitmap;
    }

    public static Bitmap getPdfPageBitmap(String fileName, int pageIndex, int dstw) {
        Bitmap pageBitmap = null;
        try {
            File file = new File(fileName);
            if (file.exists() && file.isFile()) {
                ParcelFileDescriptor parcelFileDescriptor = ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY);
                if (parcelFileDescriptor != null) {
                    PdfRenderer pdfRenderer = new PdfRenderer(parcelFileDescriptor);
                    if (pdfRenderer != null) {
                        if ((pageIndex >= 0) && (pageIndex < pdfRenderer.getPageCount())) {
                            PdfRenderer.Page page = pdfRenderer.openPage(pageIndex);
                            if (page != null) {
                                if ((page.getWidth() > 0) && (page.getHeight() > 0)) {
                                    if (dstw <= 0)
                                        dstw = page.getWidth();
                                    int dsth = dstw * page.getHeight() / page.getWidth();
                                    pageBitmap = Bitmap.createBitmap(dstw, dsth, Bitmap.Config.ARGB_8888);
                                    if (pageBitmap != null) {
                                        page.render(pageBitmap, null, null, PdfRenderer.Page.RENDER_MODE_FOR_PRINT);
                                    }
                                }
                                page.close();
                            }
                        }
                        pdfRenderer.close();
                    }
                    parcelFileDescriptor.close();
                }
            }
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return pageBitmap;
    }

    // 获取PDF文件页面的最大尺寸
    private static Size getPdfPagesMaxSize(PdfRenderer pdfRenderer) {
        int maxw = 0;
        int maxh = 0;
        try {
            int pageCount = pdfRenderer.getPageCount();
            for (int pageIndex = 0; pageIndex < pageCount; ++pageIndex) {
                PdfRenderer.Page page = pdfRenderer.openPage(pageIndex);
                if (page != null) {
                    if (maxw < page.getWidth())
                        maxw = page.getWidth();
                    if (maxh < page.getHeight())
                        maxh = page.getHeight();
                    page.close();
                }
            }
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return new Size(maxw, maxh);
    }

    public static Size getPdfPagesMaxSize(String fileName) {
        Size maxSize = new Size(0, 0);
        Log.d(TAG, "getPdfPagesMaxSize entry");
        try {
            File file = new File(fileName);
            if (file.exists() && file.isFile()) {
                ParcelFileDescriptor parcelFileDescriptor = ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY);
                if (parcelFileDescriptor != null) {
                    PdfRenderer pdfRenderer = new PdfRenderer(parcelFileDescriptor);
                    if (pdfRenderer != null) {
                        maxSize = getPdfPagesMaxSize(pdfRenderer);
                        pdfRenderer.close();
                    }
                    parcelFileDescriptor.close();
                }
            }
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        Log.d(TAG, "getPdfPagesMaxSize leave");
        return maxSize;
    }

    // Gets the page width in points (1/72").
    private static Rect getPdfPageContentRectInSize(PdfRenderer.Page page, Size dstSize) {
        try {
            Bitmap bitmap = Bitmap.createBitmap(dstSize.getWidth(), dstSize.getHeight(), Bitmap.Config.ARGB_8888);
            if (bitmap != null) {
                page.render(bitmap, null, null, PdfRenderer.Page.RENDER_MODE_FOR_PRINT);
                ImageUtils.ImagePadding imagePadding = ImageUtils.GetBitmapPadding(bitmap);
                return new Rect(imagePadding.left_padding, imagePadding.top_padding, bitmap.getWidth() - imagePadding.right_padding, bitmap.getHeight() - imagePadding.bottom_padding);
            }
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return new Rect(0, 0, dstSize.getWidth(), dstSize.getHeight());
    }

    public static class PdfRenderControl {
        public boolean cancelRender = false;
    }

    // 获取PDF文件最大的内容尺寸
    private static Rect getPdfPagesMaxContentRect(PdfRenderer pdfRenderer, PageRange[] pageRanges, PdfRenderControl pdfRenderControl) {
        Size pageMaxSize = getPdfPagesMaxSize(pdfRenderer);
        try {
            Rect maxContentRect = null;
            int pageCount = pdfRenderer.getPageCount();
            for (int pageIndex = 0; pageIndex < pageCount; ++pageIndex) {
                // 支持取消，如果页面太多了，会很耗时，需要能随时取消
                if (pdfRenderControl.cancelRender)
                    break;
                // 支持指定页面获取，仅分析要打印的页面，如果页面太多，而打印的页面很少，这样能省很多时间
                if (!isIndexInPageRanges(pageIndex, pageRanges))
                    continue;
                // 解析页面
                PdfRenderer.Page page = pdfRenderer.openPage(pageIndex);
                if (page != null) {
                    if (maxContentRect == null) {
                        maxContentRect = getPdfPageContentRectInSize(page, pageMaxSize);
                    } else {
                        Rect curContentRect = getPdfPageContentRectInSize(page, pageMaxSize);
                        maxContentRect = new Rect(
                                Math.min(maxContentRect.left, curContentRect.left),
                                Math.min(maxContentRect.top, curContentRect.top),
                                Math.max(maxContentRect.right, curContentRect.right),
                                Math.max(maxContentRect.bottom, curContentRect.bottom));
                    }
                    page.close();
                }
            }
            return maxContentRect;
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return null;
    }

    public static Rect getPdfPagesMaxContentRect(String fileName, PageRange[] pageRanges, PdfRenderControl pdfRenderControl) {
        Rect maxContentRect = null;
        Log.d(TAG, "getPdfPagesMaxContentRect entry");
        try {
            File file = new File(fileName);
            if (file.exists() && file.isFile()) {
                ParcelFileDescriptor parcelFileDescriptor = ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY);
                if (parcelFileDescriptor != null) {
                    PdfRenderer pdfRenderer = new PdfRenderer(parcelFileDescriptor);
                    if (pdfRenderer != null) {
                        maxContentRect = getPdfPagesMaxContentRect(pdfRenderer, pageRanges, pdfRenderControl);
                        pdfRenderer.close();
                    }
                    parcelFileDescriptor.close();
                }
            }
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        if (maxContentRect == null)
            maxContentRect = new Rect(0, 0, 0, 0);
        Log.d(TAG, "getPdfPagesMaxContentRect leave");
        return maxContentRect;
    }

    public static Rect getPdfPagesMaxContentRect(String fileName) {
        PageRange[] pageRanges = new PageRange[]{PageRange.ALL_PAGES};
        PdfRenderControl pdfRenderControl = new PdfRenderControl();
        return getPdfPagesMaxContentRect(fileName, pageRanges, pdfRenderControl);
    }

    public static boolean isIndexInPageRanges(int index, PageRange[] pageRanges) {
        if (pageRanges != null) {
            for (PageRange pageRange : pageRanges) {
                if ((index >= pageRange.getStart()) && (index <= pageRange.getEnd()))
                    return true;
            }
        }
        return false;
    }

}
