package com.beetpos.util;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.graphics.Rect;
import android.net.Uri;
import android.provider.MediaStore;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class ImageUtils {

    private static final String TAG = "ImageUtils";

    public static Bitmap getImageFromAssetsFile(Context ctx, String fileName) {
        Bitmap image = null;
        AssetManager am = ctx.getResources().getAssets();
        try {
            InputStream is = am.open(fileName);
            image = BitmapFactory.decodeStream(is);
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return image;
    }

    public static boolean saveBitmapToFile(Bitmap bitmap, String fileName) {
        boolean result = false;
        try {
            File f = new File(fileName);
            if (f.exists()) {
                f.delete();
            }
            FileOutputStream out = new FileOutputStream(f);
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, out);
            out.flush();
            out.close();
            result = true;
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return result;
    }

    public static Bitmap scaleImageToWidth(Bitmap bitmap, int w) {
        int bitmapWidth = bitmap.getWidth();
        int bitmapHeight = bitmap.getHeight();
        // 缩放图片的尺寸
        float scaleWidth = (float) w / bitmapWidth;
        float scaleHeight = scaleWidth;
        Matrix matrix = new Matrix();
        matrix.postScale(scaleWidth, scaleHeight);
        return Bitmap.createBitmap(bitmap, 0, 0, bitmapWidth, bitmapHeight, matrix, false);
    }

    public static Bitmap scaleImageIfWidthOrHeightOutOfRange(Bitmap bitmap, int maxw, int maxh) {
        int bitmapWidth = bitmap.getWidth();
        int bitmapHeight = bitmap.getHeight();

        Matrix matrix = new Matrix();
        if ((bitmapWidth > maxw) || (bitmapHeight > maxh)) {
            // 缩放图片的尺寸
            float scaleWidth = (float) maxw / bitmapWidth;
            float scaleHeight = (float) maxh / bitmapHeight;
            float scale = Math.min(scaleWidth, scaleHeight);
            matrix.postScale(scale, scale);
        }

        return Bitmap.createBitmap(bitmap, 0, 0, bitmapWidth, bitmapHeight, matrix, false);
    }

    public static Bitmap cropImage(Bitmap bitmap, Rect rect) {
        try {
            return Bitmap.createBitmap(bitmap, rect.left, rect.top, rect.width(), rect.height());
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return null;
    }

    public static void selectImage(Activity activity, int requestCode) {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        activity.startActivityForResult(intent, requestCode);
    }

    public static Bitmap getResultImage(Activity activity, Intent data) {
        Bitmap bitmap = null;
        try {
            Uri pictureUri = data.getData();
            bitmap = MediaStore.Images.Media.getBitmap(activity.getContentResolver(), pictureUri);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bitmap;
    }

    // 获取位图的灰度数据
    public static byte[] GetBitmapGrayBytes(Bitmap bitmap) {
        try {
            int bitmap_width = bitmap.getWidth();
            int bitmap_height = bitmap.getHeight();
            int[] pixels_intarray = new int[bitmap_width * bitmap_height];
            bitmap.getPixels(pixels_intarray, 0, bitmap_width, 0, 0, bitmap_width, bitmap_height);
            byte[] grayimg_data = new byte[bitmap_width * bitmap_height];
            for (int i = 0; i < pixels_intarray.length; ++i) {
                int argb = pixels_intarray[i];
                int a = ((argb >> 24) & 0xff);
                int r = ((argb >> 16) & 0xff);
                int g = ((argb >> 8) & 0xff);
                int b = (argb & 0xff);
                double alpha = 1 - a / 255.0;
                grayimg_data[i] = (byte) Math.round(r * 0.299 + g * 0.587 + b * 0.114);
                grayimg_data[i] = (byte) Math.round(255 * alpha + grayimg_data[i] * (1 - alpha));
            }
            return grayimg_data;
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return null;
    }

    private static boolean ScanLineEquals(byte[] p_scanline_data, int n_scanline_data_offset, int n_scanline_data_length, byte dst_char) {
        for (int x = 0; x < n_scanline_data_length; ++x) {
            if (p_scanline_data[n_scanline_data_offset + x] != dst_char)
                return false;
        }
        return true;
    }

    private static int GetScalLineEqualsHeightForward(byte[] p_src_data, int src_data_offset, int src_width_bytes, int src_height, int src_width_stride, byte dst_char) {
        int equals_height = 0;
        for (int y = 0; y < src_height; ++y) {
            if (ScanLineEquals(p_src_data, src_data_offset + y * src_width_stride, src_width_bytes, dst_char))
                equals_height++;
            else
                break;
        }
        return equals_height;
    }

    private static int GetScalLineEqualsHeightBackward(byte[] p_src_data, int src_data_offset, int src_width_bytes, int src_height, int src_width_stride, byte dst_char) {
        int equals_height = 0;
        for (int y = src_height - 1; y >= 0; --y) {
            if (ScanLineEquals(p_src_data, src_data_offset + y * src_width_stride, src_width_bytes, dst_char))
                equals_height++;
            else
                break;
        }
        return equals_height;
    }

    // 获得省纸过后的图像
    // 省略到XXX，表示省略到只剩多少行，0表示省略到剩0行，也就是全部省略。
    public static byte[] GetStripedImage(byte[] p_src_data, int src_width_bytes, int src_height, int src_width_stride, byte strip_value, int strip_top, int strip_middle, int strip_bottom) {
        try {
            byte[] p_dst_data = new byte[p_src_data.length];

            int dst_height = 0;

            int yStart = 0;
            if (strip_top >= 0) {
                int top_equals_height = GetScalLineEqualsHeightForward(p_src_data, 0, src_width_bytes, src_height, src_width_stride, strip_value);
                if (top_equals_height > strip_top)
                    yStart = top_equals_height - strip_top;
            }

            int yStop = src_height;
            if (strip_bottom >= 0) {
                int bottom_equals_height = GetScalLineEqualsHeightBackward(p_src_data, yStart * src_width_stride, src_width_bytes, src_height - yStart, src_width_stride, strip_value);
                if (bottom_equals_height > strip_bottom)
                    yStop = src_height - (bottom_equals_height - strip_bottom);
            }

            if (strip_middle >= 0) {
                int y = yStart;
                while (y < yStop) {
                    int middle_equals_height = GetScalLineEqualsHeightForward(p_src_data, y * src_width_stride, src_width_bytes, src_height - y, src_width_stride, strip_value);
                    if (middle_equals_height > strip_middle) {
                        System.arraycopy(p_src_data, y * src_width_stride, p_dst_data, dst_height * src_width_stride, strip_middle * src_width_stride);
                        y += middle_equals_height;
                        dst_height += strip_middle;
                    } else if (middle_equals_height > 0) {
                        System.arraycopy(p_src_data, y * src_width_stride, p_dst_data, dst_height * src_width_stride, middle_equals_height * src_width_stride);
                        y += middle_equals_height;
                        dst_height += middle_equals_height;
                    } else {
                        System.arraycopy(p_src_data, y * src_width_stride, p_dst_data, dst_height * src_width_stride, src_width_stride);
                        y += 1;
                        dst_height += 1;
                    }
                }
            } else {
                dst_height = yStop - yStart;
                System.arraycopy(p_src_data, yStart * src_width_stride, p_dst_data, 0, dst_height * src_width_stride);
            }

            byte[] final_dst_data = new byte[src_width_stride * dst_height];
            System.arraycopy(p_dst_data, 0, final_dst_data, 0, final_dst_data.length);
            return final_dst_data;
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return null;
    }

    private static int GetGrayImageLeftPadding(byte[] p_src_data, int src_width, int src_height, int src_width_stride, byte padding_value) {
        int left_padding = 0;
        for (int x = 0; x < src_width; ++x) {
            int src_offset = x;
            int y;
            for (y = 0; y < src_height; ++y) {
                if (p_src_data[src_offset] == padding_value)
                    src_offset += src_width_stride;
                else
                    break;
            }
            if (y == src_height)
                left_padding++;
            else
                break;
        }
        return left_padding;
    }

    private static int GetGrayImageRightPadding(byte[] p_src_data, int src_width, int src_height, int src_width_stride, byte padding_value) {
        int right_padding = 0;
        for (int x = src_width - 1; x >= 0; --x) {
            int src_offset = x;
            int y;
            for (y = 0; y < src_height; ++y) {
                if (p_src_data[src_offset] == padding_value)
                    src_offset += src_width_stride;
                else
                    break;
            }
            if (y == src_height)
                right_padding++;
            else
                break;
        }
        return right_padding;
    }

    public static class ImageSize {
        public int width;
        public int height;
    }

    // 获得上下左右省略过的图像
    public static void StripGrayImagePadding(byte[] p_src_data, int src_width, int src_height, int src_width_stride, byte padding_value, boolean strip_left, boolean strip_right, boolean strip_top, boolean strip_bottom, ImageSize dst_size) {
        try {
            if (strip_bottom && (src_height > 0)) {
                int bottom_padding = GetScalLineEqualsHeightBackward(p_src_data, 0, src_width, src_height, src_width_stride, padding_value);
                if (bottom_padding > (src_height - 1))
                    bottom_padding = (src_height - 1);
                src_height -= bottom_padding;
                //Log.d(TAG, "StripGrayImagePadding Image Bottom Padding:" + bottom_padding);
            }

            if (strip_top && (src_height > 0)) {
                int top_padding = GetScalLineEqualsHeightForward(p_src_data, 0, src_width, src_height, src_width_stride, padding_value);
                if (top_padding > (src_height - 1))
                    top_padding = (src_height - 1);
                src_height -= top_padding;
                if (top_padding > 0) {
                    memmove(p_src_data, top_padding * src_width_stride, p_src_data, 0, src_height * src_width_stride);
                }
                //Log.d(TAG, "StripGrayImagePadding Image Top Padding:" + top_padding);
            }

            if (strip_right && (src_width > 0)) {
                int right_padding = GetGrayImageRightPadding(p_src_data, src_width, src_height, src_width_stride, padding_value);
                if (right_padding > (src_width - 1))
                    right_padding = (src_width - 1);
                src_width -= right_padding;
                //Log.d(TAG, "StripGrayImagePadding Image Right Padding:" + right_padding);
            }

            if (strip_left && (src_width > 0)) {
                int left_padding = GetGrayImageLeftPadding(p_src_data, src_width, src_height, src_width_stride, padding_value);
                if (left_padding > (src_width - 1))
                    left_padding = (src_width - 1);
                src_width -= left_padding;
                if (left_padding > 0) {
                    for (int y = 0; y < src_height; ++y) {
                        int line_offset = src_width_stride * y;
                        memmove(p_src_data, line_offset + left_padding, p_src_data, line_offset, src_width);
                    }
                }
                //Log.d(TAG, "StripGrayImagePadding Image Left Padding:" + left_padding);
            }

            dst_size.width = src_width;
            dst_size.height = src_height;
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
    }

    // 获得上下左右省略过的图像
    public static void StripGrayImage(byte[] p_src_data, int src_width, int src_height, int src_width_stride, int strip_left, int strip_right, int strip_top, int strip_bottom, ImageSize dst_size) {
        try {
            if ((strip_bottom > 0) && (src_height > 0)) {
                int bottom_padding = strip_bottom;
                if (bottom_padding > (src_height - 1))
                    bottom_padding = (src_height - 1);
                src_height -= bottom_padding;
                //Log.d(TAG, "StripGrayImagePadding Image Bottom Padding:" + bottom_padding);
            }

            if ((strip_top > 0) && (src_height > 0)) {
                int top_padding = strip_top;
                if (top_padding > (src_height - 1))
                    top_padding = (src_height - 1);
                src_height -= top_padding;
                if (top_padding > 0) {
                    memmove(p_src_data, top_padding * src_width_stride, p_src_data, 0, src_height * src_width_stride);
                }
                //Log.d(TAG, "StripGrayImagePadding Image Top Padding:" + top_padding);
            }

            if ((strip_right > 0) && (src_width > 0)) {
                int right_padding = strip_right;
                if (right_padding > (src_width - 1))
                    right_padding = (src_width - 1);
                src_width -= right_padding;
                //Log.d(TAG, "StripGrayImagePadding Image Right Padding:" + right_padding);
            }

            if ((strip_left > 0) && (src_width > 0)) {
                int left_padding = strip_left;
                if (left_padding > (src_width - 1))
                    left_padding = (src_width - 1);
                src_width -= left_padding;
                if (left_padding > 0) {
                    for (int y = 0; y < src_height; ++y) {
                        int line_offset = src_width_stride * y;
                        memmove(p_src_data, line_offset + left_padding, p_src_data, line_offset, src_width);
                    }
                }
                //Log.d(TAG, "StripGrayImagePadding Image Left Padding:" + left_padding);
            }

            dst_size.width = src_width;
            dst_size.height = src_height;
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
    }

    private static void memmove(byte[] src, int src_offset, byte[] dst, int dst_offset, int count) {
        byte[] data = new byte[count];
        System.arraycopy(src, src_offset, data, 0, data.length);
        System.arraycopy(data, 0, dst, dst_offset, data.length);
    }

    public static class ImagePadding {
        public int left_padding;
        public int top_padding;
        public int right_padding;
        public int bottom_padding;

        public ImagePadding(int left_padding, int top_padding, int right_padding, int bottom_padding) {
            this.left_padding = left_padding;
            this.top_padding = top_padding;
            this.right_padding = right_padding;
            this.bottom_padding = bottom_padding;
        }
    }

    // 获取图像边距
    public static ImagePadding GetBitmapPadding(Bitmap bitmap) {
        try {
            byte[] p_src_data = ImageUtils.GetBitmapGrayBytes(bitmap);
            if (p_src_data != null) {
                int src_width_stride = bitmap.getWidth();
                int src_height = bitmap.getHeight();
                int src_width = bitmap.getWidth();
                byte padding_value = (byte) 0xff;

                int bottom_padding = GetScalLineEqualsHeightBackward(p_src_data, 0, src_width, src_height, src_width_stride, padding_value);
                if (bottom_padding > (src_height - 1))
                    bottom_padding = (src_height - 1);

                int top_padding = GetScalLineEqualsHeightForward(p_src_data, 0, src_width, src_height, src_width_stride, padding_value);
                if (top_padding > (src_height - 1))
                    top_padding = (src_height - 1);

                int right_padding = GetGrayImageRightPadding(p_src_data, src_width, src_height, src_width_stride, padding_value);
                if (right_padding > (src_width - 1))
                    right_padding = (src_width - 1);

                int left_padding = GetGrayImageLeftPadding(p_src_data, src_width, src_height, src_width_stride, padding_value);
                if (left_padding > (src_width - 1))
                    left_padding = (src_width - 1);

                return new ImagePadding(left_padding, top_padding, right_padding, bottom_padding);
            }
        } catch (Throwable tr) {
            tr.printStackTrace();
        }
        return new ImagePadding(0, 0, 0, 0);
    }

    // 移除图像上下左右边距，并返回新的图像
    public static Bitmap GetStripedBitmap(Bitmap bitmap, boolean strip_left, boolean strip_right, boolean strip_top, boolean strip_bottom) {
        if (bitmap != null) {
            ImagePadding imagePadding = GetBitmapPadding(bitmap);
            if (imagePadding != null) {
                int left = 0;
                int top = 0;
                int right = bitmap.getWidth();
                int bottom = bitmap.getHeight();
                if (strip_left)
                    left += imagePadding.left_padding;
                if (strip_top)
                    top += imagePadding.top_padding;
                if (strip_right)
                    right -= imagePadding.right_padding;
                if (strip_bottom)
                    bottom -= imagePadding.bottom_padding;
                bitmap = cropImage(bitmap, new Rect(left, top, right, bottom));
            }
        }
        return bitmap;
    }

}
