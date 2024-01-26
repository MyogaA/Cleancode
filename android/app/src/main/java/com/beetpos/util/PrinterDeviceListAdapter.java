package com.beetpos.util;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.caysn.autoreplyprint.caprint.CAPrinterDevice;
import com.beetpos.R;

import java.util.List;

public class PrinterDeviceListAdapter {

    private Context context;
    private List<CAPrinterDevice> printerDeviceList;

    // public PrinterDeviceListAdapter(Context context, List<CAPrinterDevice> bluetoothDeviceList) {
    public PrinterDeviceListAdapter(List<CAPrinterDevice> bluetoothDeviceList) {
        // this.context = context;
        this.printerDeviceList = bluetoothDeviceList;
    }

    private int getCount() {
        return printerDeviceList == null ? 0 : printerDeviceList.size();
    }

    private Object getItem(int position) {
        return printerDeviceList.get(position);
    }

    private long getItemId(int position) {
        return position;
    }

    // @Override
    // public View getView(int position, View convertView, ViewGroup parent) {
    //     if (convertView == null) {
    //         convertView = LayoutInflater.from(context).inflate(R.layout.printer_device_list_item, null);
    //     }
    //     if (convertView != null) {
    //         TextView tvBluetoothDeviceName = convertView.findViewById(R.id.tvPrinterDeviceName);
    //         TextView tvBluetoothDeviceAddress = convertView.findViewById(R.id.tvPrinterDeviceAddress);
    //         String name = printerDeviceList.get(position).printer_name;
    //         String address = printerDeviceList.get(position).port_address;
    //         if (name != null)
    //             tvBluetoothDeviceName.setText(name);
    //         if (address != null)
    //             tvBluetoothDeviceAddress.setText(address);
    //     }
    //     return convertView;
    // }

}
