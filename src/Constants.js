/* eslint-disable comma-dangle */
/* eslint-disable quotes */
// const base_uri = "http://192.168.0.107/beetpos/public/api";
// const base_uri = "http://beetpos.com/api/public/api";
//const base_uri = "http://192.168.0.199/beetpos/public/api";

//const base_uri = "http://192.168.1.8/beetpos/public/api";
export const OneSignal_App_ID = "545db6bf-4448-4444-b9c8-70fb9fae225b";

export const OneSignal_POS_App_ID = "545db6bf-4448-4444-b9c8-70fb9fae225b";

export const OneSignal_Customer_App_ID = "790258cf-7c93-480b-a5b4-2166c700f729";

const base_uri = "http://api.beetpos.com/public/api";

//const base_uri = "http://development-api.beetpos.com/public/api";

export const one_signal_uri = "https://onesignal.com/api/v1/notifications";

export const LoginAPI = base_uri + "/cashier/login";

export const GetMenuSearchFavAPI = base_uri + "/menu/search";

export const LogoutAPI = base_uri + "/cashier/logout";

export const RegisterAPI = base_uri + "/users/register";

export const EditUserAPI = base_uri + "/users/edit";

export const GetRestaurantAPI = base_uri + "/restaurants/all";

export const TestAPI = base_uri + "/restaurants/arrayTest";

export const GetCustomerAPI = base_uri + "/users";

export const UserByGeraiAPI = base_uri + "/cashier/gerai";

export const CheckPinAPI = base_uri + "/cashier/pin/check";

export const GetAttendanceAPI = base_uri + "/cashier/attendance/get";



export const UpdateAttendance = base_uri + "/cashier/attendance/update";

export const GetMenuFavAPI = base_uri + "/menu/favourite";

export const GetMenuAllAPI = base_uri + "/menu/all";

export const GetCategoryMenuAPI = base_uri + "/menu/category/all";

export const GetMenuByCategoryAPI = base_uri + "/menu/category";

export const GetMenuAddonsAPI = base_uri + "/menu/addons";

export const SaveOrderAPI = base_uri + "/order/save";
export const UpdateOrderAPI = base_uri + "/order/update";
export const RefundOrderAPI = base_uri + "/order/refund";

export const PayOrderAPI = base_uri + "/order/pay";

export const HistoryOrderAPI = base_uri + "/history";

export const HistoryDetailAPI = base_uri + "/history/detail";

export const GetRekapAPI = base_uri + "/rekap";

//?retail_id=1&gerai_id=1&page=1&date_start=2020-03-31&date_end=2020-03-31&search=1

export const GetRekapDetailAPI = base_uri + "/rekap/detail";
export const CalculateRekapAPI = base_uri + "/rekap/calculate";

//?rekap_id=1

export const SaveRekapDetailAPI = base_uri + "/rekap/detail/add";
export const ClosingRekapAPI = base_uri + "/rekap/update";

export const DeleteRekapDetailAPI = base_uri + "/rekap/detail/delete";

export const GetTableAPI = base_uri + "/table/all";

export const ChangeOrderTableAPI = base_uri + "/order/change";
export const ChangeBookingTableAPI = base_uri + "/booking/change";

export const DetailOrderAPI = base_uri + "/order/detail";
export const DetailOrderBillAPI = base_uri + "/order/detail/bill";

export const UpdateOrderByIdAPI = base_uri + "/order/updateByOrderId";

export const UpdateStatusOrderByIdAPI = base_uri + "/order/update/status";

export const AssignBookingAPI = base_uri + "/booking/assign";
export const GetBookingAPI = base_uri + "/booking/gerai/get";

export const CancelBookAPI = base_uri + "/booking/cancel";

export const GetNotificationAPI = base_uri + "/notification/gerai";

export const CustomerAddPointAPI = base_uri + "/customer/addpoint";
export const CustomerCreateAPI = base_uri + "/customer/create";
export const CustomerUpdateAPI = base_uri + "/customer/update";
export const CustomerGetAPI = base_uri + "/customer";

// API Dev: development-api.beetpos.com
// API Prod: node-api.beetpos.com

// Sandbox Dev: development-sandbox.beetpos.com
// Sandbox Prod: sandbox.beetpos.com
// export const BE_URI = "http://node-api.beetpos.com";
// export const BE_URI = "http://development-api.beetpos.com";
// const base_uri_backend = "http://development-api.beetpos.com/api/v1";

//prod
export const REGISTER_URI = "https://backoffice.beetpos.com/auth/registration";
export const FORGOT_PASSWORD_URI =
  "https://backoffice.beetpos.com/auth/forgot-password";
export const BE_URI = "https://api.beetpos.com/";
const base_uri_backend = "https://api.beetpos.com/api/v1";

//dev
// export const REGISTER_URI = "https://development-sandbox.beetpos.com/auth/registration";
// export const FORGOT_PASSWORD = "https://development-sandbox.beetpos.com/auth/forgot-password";
// export const BE_URI = "https://development-api.beetpos.com";
// const base_uri_backend = "https://development-api.beetpos.com/api/v1";

export const RoboLoginCustomer = base_uri_backend + "/auth/robo/customerlogin";


export const BE_Get_Product = base_uri_backend + "/product";

export const BE_Business = base_uri_backend + "/business/";

export const BE_Business_No_Verify = base_uri_backend + "/business-noverify/";


export const BE_Get_User = base_uri_backend + "/auth/user-staff/";

export const BE_Currency = base_uri_backend + "/currency";

export const BE_Currency_Conversion = base_uri_backend + "/currency-conversion";

export const BE_Transaction_Delivery =
  base_uri_backend + "/customer-app/transaction-delivery";

export const BE_Get_Product_Category = base_uri_backend + "/product-category";

export const BE_LoginAPI = base_uri_backend + "/auth/staff/login";

export const BE_LogoutAPI = base_uri_backend + "/auth/staff/logout";

export const BE_Create_Transaction = base_uri_backend + "/transaction/";

export const BE_Save_Transaction = base_uri_backend + "/transaction/save";

export const BE_Update_Transaction = base_uri_backend + "/transaction/";

export const BE_Transaction = base_uri_backend + "/transaction/";

export const BE_Gobiz_Transaction = base_uri_backend + "/gobiz-transaction";

export const BE_Payment = base_uri_backend + "/payment";

export const BE_Move_Table = base_uri_backend + "/transaction/tables/move";

export const BE_CheckPin = base_uri_backend + "/auth/check-pin";

export const BE_TableManagement = base_uri_backend + "/table-management";

export const BE_Kitchen = base_uri_backend + "/kitchen-management";

export const BE_TokopediaLocal = base_uri_backend + "/tokopedia-local";


export const BE_Coupon = base_uri_backend + "/coupon";

export const BE_Outlet = base_uri_backend + "/outlet/";

export const BE_Payment_Method = base_uri_backend + "/payment-method/";

export const BE_Sales_Type = base_uri_backend + "/sales-type/";

export const BE_Floor = base_uri_backend + "/floor-management/";


export const BE_Sales_Type_Product = base_uri_backend + "/sales-type-product";

export const BE_Role = base_uri_backend + "/role/";

export const BE_Rekap = base_uri_backend + "/recap";

export const BE_Cash = base_uri_backend + "/cash";

export const BE_Staff = base_uri_backend + "/staff";

export const BE_Devices = base_uri_backend + "/devices";

export const BE_Robo_Entrance = base_uri_backend + "/robo-attendance";

export const BE_Robo_Customer = base_uri_backend + "/robo-customer";

export const BE_Robo_Family = base_uri_backend + "/robo-family";





export const BE_Outlet_Setting = base_uri_backend + "/outlet-setting";

export const BE_Attendance = base_uri_backend + "/attendance";

export const BE_Customer = base_uri_backend + "/customer";

export const BE_Customer_Account = base_uri_backend + "/customer-account";

export const BE_Customer_Saldo_History =
  base_uri_backend + "/customer-saldo-history";

export const BE_Transaction_Commission =
  base_uri_backend + "/transaction-commission-staff";

export const BE_Customer_Point_History =
  base_uri_backend + "/customer-point-history";

export const BE_Customer_Membership =
  base_uri_backend + "/business-customer-membership";

export const BE_Customer_Voucher_Personal =
  base_uri_backend + "/customer-voucher-personal";

export const BE_Customer_Voucher_History =
  base_uri_backend + "/customer-voucher-history";

export const BE_Customer_Voucher_Redeem =
  base_uri_backend + "/customer-voucher-redeem";

export const BE_Special_Promo = base_uri_backend + "/special-promo";

export const BE_Automatic_Promo = base_uri_backend + "/automatic-promo";

export const BE_Voucher_Promo = base_uri_backend + "/voucher-promo";

export const BE_Special_Promo_History =
  base_uri_backend + "/special-promo-history";

export const BE_Voucher_Promo_History =
  base_uri_backend + "/voucher-promo-history";

export const BE_Loyalty_Promo_Settings =
  base_uri_backend + "/loyalty-promo/settings";

export const BE_Beetpos_Setting = base_uri_backend + "/beetpos-setting";

export const BE_Send_Struk = base_uri_backend + "/send-email/receipt";

export const BE_Commission = base_uri_backend + "/commission/";

export const Code_Token_Invalid = 403;

export const BE_Token =
  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlX2lkIjozLCJpc192ZXJpZmllZCI6ZmFsc2UsImxhc3RfbG9naW4iOiIyMDIwLTEwLTA3VDAzOjM3OjI5LjgxOFoiLCJpc19sb2dpbiI6dHJ1ZSwiYnVzaW5lc3NfaWQiOjEsIm91dGxldF9pZCI6MSwiZGV2aWNlX2lkIjoiZGZiMDFhZjYtOGI4OC00NWQzLThhNTUtMWU3YzMwOGY3MTc1IiwiaWF0IjoxNjAyMDQxODQ5fQ.y3nJmfUUh2L9n6IL6RqFneth73bYZZUvY2qJBQXEQ2s";

export const BE_Signature = base_uri_backend + "/signature/generate";

export const BE_Kios_Product = base_uri_backend + "/kios-product";
export const BE_Kios_Payment = base_uri_backend + "/kios-payment";
export const BE_Kios_Transaction = base_uri_backend + "/kios-transaction";
export const BE_Kios_Category = base_uri_backend + "/kios-category";
export const BE_Kios_Sub_Category = base_uri_backend + "/kios-sub-category";

export const BE_Ads_Image = base_uri_backend + "/ads-image";





export const CashLezPaymentTypes = [
  {
    id: 3,
    code: "OVO_PUSH_TO_PAY",
    name: "OVO"
  },
  {
    id: 4,
    code: "TCASH_QR_PAYMENT",
    name: "TCASH_QR"
  },
  {
    id: 1,
    code: "ECOMM",
    name: "ECOMM"
  },
  {
    id: 2,
    code: "PERMATA_GENERATE_VACODE",
    name: "PERMATA_VA"
  },
  {
    id: 7,
    code: "BCA_GENERATE_VACODE",
    name: "VA_BCA"
  }
];

export const beetpos_version_name = "1.2.0.1";

export const beetpos_version_code = "162";

export const beetpos_playstore =
  "https://play.google.com/store/apps/details?id=com.beetpos";

export const beetpos_url = "https://beetpos.com/apk/beetposlatest.apk";

export const settings_latest_version = "latest_version";

export const settings_latest_version_sunmi = "latest_version_sunmi";

export const settings_papa_recepi = "papa_recepi_id";

export const blibli_channel_id = "Lifetech Tanpa Batas";

export const blibli_auth =
  "Basic bXRhLWFwaS1saWZldGVjaHRhbnBhYmF0LTdiY2ZiOm10YS1hcGktamx2bVdrWllnckg5SnZ2cE5tTEVvV0NmTEZ4d0h6MDNxaXRVVXo2S2ZxZlBTUFJaQnY=";

export const blibli_username = "hello@lifetech.co.id";


//http://node-api.beetpos.com/api/v1/group-modifier?business_id=1&product_id=2
//http://node-api.beetpos.com/images/product/productImage/productImage-1601607005527.jpg
//http://node-api.beetpos.com/api/v1/product-category?business_id=1

//?business_id=1&is_favorite=1&product_category_id=2
