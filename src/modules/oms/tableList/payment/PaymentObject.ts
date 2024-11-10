/**
 * Enum to define payment types, payment methods,
 * button directions, and payment actions used in the application.
 */
export enum PaymentObject {
    // Payment Type: Defines the main types of payment methods
    Cash = "CASH",
    Card = "CARD",
    Compliment = "COMPLIMENT",
    Voucher = "VOUCHER",
    OtherVoucher = "OTHER VOUCHER",
    MemberDeposit = "MEMBER DEPOSIT",
    OtherCost = "OTHER COST",

    // Payment Method: Specifies detailed methods used for payment
    CashPayment = "CASH PAYMENT",
    QrisShopeePayPayment = "ShopeePay xendit",
    QrisEsbPayment = "Qris ESB",
    OvoPayment = "OVO Xendit POS",
    DanaPayment = "Dana Xendit POS",
    ComplimentPayment = "Compliment",
    VoucherInternalPayment = "Voucher Internal",
    VoucherOnlinePayment = "Voucher Online",
    AyomakanVoucherPayment = "Ayomakan/ESB Voucher",
    OtherVoucherSubTotal = "Other Voucher Subtotal",
    OtherVoucherGrandTotal = "Other Voucher GrandTotal",
    MemberDepositPayment = "Member Deposit (Internal)",
    OtherCostPayment = "FOC Employee",

    // Button Arrow: Defines directional buttons used in navigation
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right",

    // Action Payment: Actions related to the payment process
    PurchaseVoucher = "Purchase Voucher",
    SavePayment = "Save Payment",
    CancelPayment = "Cancel",
    ApplyPayment = "Apply",
    ProcessPayment = "Process",
    ClosePayment = "Close"
}
