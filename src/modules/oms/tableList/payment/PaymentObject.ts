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
    AddPromo = "ADD PROMO",

    // Payment Method: Specifies detailed methods used for payment
    CashPayment = "CASH PAYMENT",
    DebitBca = "BCA Debit",
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
    ClosePayment = "Close",

    // Payment Debit: Action input in payment debit process
    InputCardNumber = "First 6 digit and last 4 digit of card number",
    InputVerificationCode = "Verification code from EDC",
    InputBankName = "Name of the bank that issued the card",
    InputAccountName = "Name on the card",
    InputSelfOrderId = "Self Order ID",

    // Grid Select Cash Board
    GridCashBoard100000 = "100.000",
    GridCashBoard25000 = "25.000",
    GridCashBoard20000 = "20.000",
    GridCashBoard15000 = "15.000",
    GridCashBoard5000 = "5.000",
    GridCashBoard2000 = "2.000",
    GridCashBoard1000 = "1.000"

}
