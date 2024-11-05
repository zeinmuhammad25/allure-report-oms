export enum PaymentList {
    //Payment Type
    Cash = "CASH",
    Card = "CARD",
    Compliment = "COMPLIMENT",
    Voucher = "VOUCHER",
    OtherVoucher = "OTHER VOUCHER",
    MemberDeposit = "MEMBER DEPOSIT",
    OtherCost = "OTHER COST",

    //Payment Method
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


}