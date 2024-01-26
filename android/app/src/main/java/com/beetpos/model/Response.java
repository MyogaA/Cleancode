package com.beetpos.model;

import android.os.Parcel;
import android.os.Parcelable;

// import com.cashlez.android.sdk.CLResponse;
// import com.cashlez.android.sdk.payment.CLPaymentResponse;
// import com.cashlez.android.sdk.payment.CLTCashQRResponse;
// import com.cashlez.android.sdk.payment.CLGoPayQRResponse;
// import com.cashlez.android.sdk.payment.CLShopeePayQrResponse;
// import com.cashlez.android.sdk.payment.CLDanaResponse;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.caysn.autoreplyprint.caprint.CAPrinterDevice;
import com.caysn.autoreplyprint.caprint.CAPrinterDevice;

import java.util.List;
import java.util.ArrayList;



public class Response implements Parcelable {
    private int code;
    private String message;
    private boolean success;
    private String accountHolder;
    private String accountNumber;
    private String acquirer;
    private String approvalCode;
    private String referenceNumber;
    private String traceNumber;
    private String signature;
    private String qrCode;
    private List<CAPrinterDevice> printerDeviceList;
    private CAPrinterDevice printerDevice;

    public static final String RESPONSE_CODE = "code";
    public static final String RESPONSE_MESSAGE = "message";
    public static final String RESPONSE_SUCCESS = "success";
    public static final String RESPONSE_ACCOUNT_HOLDER = "accountHolder";
    public static final String RESPONSE_ACCOUNT_NUMBER = "accountNumber";
    public static final String RESPONSE_ACQUIRER = "acquirer";
    public static final String RESPONSE_APPROVAL_CODE = "approvalCode";
    public static final String RESPONSE_REFERENCE_NUMBER = "referenceNumber";
    public static final String RESPONSE_TRACE_NUMBER = "traceNumber";
    public static final String RESPONSE_SIGNATURE = "signature";
    public static final String RESPONSE_QRCODE = "qrcode";
    public static final String RESPONSE_PRINTERDEVICE = "printerdevice";


    public static final int SDK_RESPONSE_ERROR = 500;
    public static final int SDK_RESPONSE_OK = 200;

    public Response() {
    }

    public Response(int code, String message, boolean success) {
        this.code = code;
        this.message = message;
        this.success = success;
    }

    public Response(int code, String message, List<CAPrinterDevice> printerDeviceList, boolean success) {
        this.code = code;
        this.message = message;
        this.printerDeviceList = printerDeviceList;

        this.success = success;
    }

    public Response(int code, String message, String signature, boolean success) {
        this.code = code;
        this.message = message;
        this.signature = signature;
        this.success = success;
    }

    public Response(int code, String message, boolean success, String accountHolder, String accountNumber,
                    String acquirer, String approvalCode, String referenceNumber, String traceNumber) {
        this.code = code;
        this.message = message;
        this.success = success;
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.acquirer = acquirer;
        this.approvalCode = approvalCode;
        this.referenceNumber = referenceNumber;
        this.traceNumber = traceNumber;
    }

    // public Response(CLShopeePayQrResponse clPaymentResponse, String qrCode) {
    //     this.code = clPaymentResponse != null ? clPaymentResponse.getHttpStatusCode() : Response.SDK_RESPONSE_ERROR;
    //     this.message = clPaymentResponse != null ? clPaymentResponse.getMessage() : "";
    //     this.success = clPaymentResponse != null ? clPaymentResponse.isSuccess() : false;
    //     this.accountHolder = clPaymentResponse != null ? clPaymentResponse.getCardHolderName() : "";
    //     this.accountNumber = clPaymentResponse != null ? clPaymentResponse.getCardNo() : "";
    //     this.acquirer = clPaymentResponse != null ? clPaymentResponse.getBankName() : "";
    //     this.approvalCode = clPaymentResponse != null ? clPaymentResponse.getApprovalCode() : "";
    //     this.referenceNumber = clPaymentResponse != null ? clPaymentResponse.getRefNo() : "";
    //     this.traceNumber = clPaymentResponse != null ? clPaymentResponse.getTraceNo() : "";
    //     this.qrCode = qrCode;
    // }

    // public Response(CLDanaResponse clPaymentResponse) {
    //     this.code = clPaymentResponse != null ? clPaymentResponse.getHttpStatusCode() : Response.SDK_RESPONSE_ERROR;
    //     this.message = clPaymentResponse != null ? clPaymentResponse.getMessage() : "";
    //     this.success = clPaymentResponse != null ? clPaymentResponse.isSuccess() : false;
    //     this.accountHolder = clPaymentResponse != null ? clPaymentResponse.getCardHolderName() : "";
    //     this.accountNumber = clPaymentResponse != null ? clPaymentResponse.getCardNo() : "";
    //     this.acquirer = clPaymentResponse != null ? clPaymentResponse.getBankName() : "";
    //     this.approvalCode = clPaymentResponse != null ? clPaymentResponse.getApprovalCode() : "";
    //     this.referenceNumber = clPaymentResponse != null ? clPaymentResponse.getRefNo() : "";
    //     this.traceNumber = clPaymentResponse != null ? clPaymentResponse.getTraceNo() : "";
    // }

    // public Response(CLDanaResponse clPaymentResponse, String qrCode) {
    //     this.code = clPaymentResponse != null ? clPaymentResponse.getHttpStatusCode() : Response.SDK_RESPONSE_ERROR;
    //     this.message = clPaymentResponse != null ? clPaymentResponse.getMessage() : "";
    //     this.success = clPaymentResponse != null ? clPaymentResponse.isSuccess() : false;
    //     this.accountHolder = clPaymentResponse != null ? clPaymentResponse.getCardHolderName() : "";
    //     this.accountNumber = clPaymentResponse != null ? clPaymentResponse.getCardNo() : "";
    //     this.acquirer = clPaymentResponse != null ? clPaymentResponse.getBankName() : "";
    //     this.approvalCode = clPaymentResponse != null ? clPaymentResponse.getApprovalCode() : "";
    //     this.referenceNumber = clPaymentResponse != null ? clPaymentResponse.getRefNo() : "";
    //     this.traceNumber = clPaymentResponse != null ? clPaymentResponse.getTraceNo() : "";
    //     this.qrCode = qrCode;
    // }

    protected Response(Parcel in) {
        code = in.readInt();
        message = in.readString();
        success = in.readByte() != 0;
        accountHolder = in.readString();
        accountNumber = in.readString();
        acquirer = in.readString();
        approvalCode = in.readString();
        referenceNumber = in.readString();
        traceNumber = in.readString();
        qrCode = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(code);
        dest.writeString(message);
        dest.writeByte((byte) (success ? 1 : 0));
        dest.writeString(accountHolder);
        dest.writeString(accountNumber);
        dest.writeString(acquirer);
        dest.writeString(approvalCode);
        dest.writeString(referenceNumber);
        dest.writeString(traceNumber);
        dest.writeString(qrCode);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Response> CREATOR = new Creator<Response>() {
        @Override
        public Response createFromParcel(Parcel in) {
            return new Response(in);
        }

        @Override
        public Response[] newArray(int size) {
            return new Response[size];
        }
    };

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean getSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getAccountHolder() {
        return accountHolder;
    }

    public void setAccountHolder(String accountHolder) {
        this.accountHolder = accountHolder;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAcquirer() {
        return acquirer;
    }

    public void setAcquirer(String acquirer) {
        this.acquirer = acquirer;
    }

    public String getApprovalCode() {
        return approvalCode;
    }

    public void setApprovalCode(String approvalCode) {
        this.approvalCode = approvalCode;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public String getTraceNumber() {
        return traceNumber;
    }

    public void setTraceNumber(String traceNumber) {
        this.traceNumber = traceNumber;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getQrCode(){
        return qrCode;
    }

    public void setQrCode(String qrCode){
        this.qrCode = qrCode;
    }

    public WritableMap toWritableMap() {
        WritableMap map = Arguments.createMap();

        map.putInt(Response.RESPONSE_CODE, this.getCode());
        map.putString(Response.RESPONSE_MESSAGE, this.getMessage());
        map.putBoolean(Response.RESPONSE_SUCCESS, this.isSuccess());
        map.putString(Response.RESPONSE_ACCOUNT_HOLDER, this.getAccountHolder());
        map.putString(Response.RESPONSE_ACCOUNT_NUMBER, this.getAccountNumber());
        map.putString(Response.RESPONSE_ACQUIRER, this.getAcquirer());
        map.putString(Response.RESPONSE_APPROVAL_CODE, this.getApprovalCode());
        map.putString(Response.RESPONSE_REFERENCE_NUMBER, this.getReferenceNumber());
        map.putString(Response.RESPONSE_TRACE_NUMBER, this.getTraceNumber());
        map.putString(Response.RESPONSE_SIGNATURE, this.getSignature());
        map.putString(Response.RESPONSE_QRCODE, this.getQrCode());

        return map;
    }
}
