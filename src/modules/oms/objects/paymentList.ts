export default class PaymentList {

    // Payment Type: Defines the main types of payment methods
    public static PaymentType = {
        Cash: "CASH",
        Card: "CARD",
        Compliment: "COMPLIMENT",
        Voucher: "VOUCHER",
        OtherVoucher: "OTHER VOUCHER",
        MemberDeposit: "MEMBER DEPOSIT",
        OtherCost: "OTHER COST",
        AddPromo: "ADD PROMO"
    };

    // Payment Method: Specifies detailed methods used for payment
    public static PaymentMethod = {
        CashPayment: "CASH PAYMENT",
        DebitBca: "BCA Debit",
        QrisEsbPayment: "Qris ESB",
        OvoPayment: "OVO Xendit POS",
        DanaPayment: "Dana Xendit POS",
        ComplimentPayment: "Compliment",
        VoucherInternalPayment: "Voucher Internal",
        VoucherOnlinePayment: "Voucher Online",
        AyomakanVoucherPayment: "Ayomakan/ESB Voucher",
        OtherVoucherSubTotal: "Other Voucher Subtotal",
        OtherVoucherGrandTotal: "Other Voucher GrandTotal",
        MemberDepositPayment: "Member Deposit (Internal)",
        OtherCostPayment: "FOC Employee"
    };

    // Button Arrow: Defines directional buttons used in navigation
    public static Arrow = {
        Up: "up",
        Down: "down",
        Left: "left",
        Right: "right"
    };

    // Action Payment: Actions related to the payment process
    public static ActionPayment = {
        PurchaseVoucher: "Purchase Voucher",
        SavePayment: "Save",
        PayPayment: "Pay",
        ApplyPayment: "Apply",
        SendEmailPayment: "Send email",
        BackPayment: "Back",
        ClosePayment: "Close",
        DonePayment: "Done",
        NextPayment: "Next"
    };

    // Payment Debit: Action input in payment debit process
    public static PaymentDebit = {
        InputCardNumber: "First 6 digit and last 6 digit of the card",
        InputVerificationCode: "Verification code from EDC",
        InputBankName: "Bank Name",
        InputAccountName: "Name on the card",
        InputSelfOrderId: "Self order ID"
    };

    //Section name:Action Selected in section in payment Page
    public static SectionName = {
        PaymentSection: "Payment",
        ReceiptSection: "Receipt"
    };

    // Grid Select Cash Board
    public static PaymentBord = {
        Board1: "1",
        Board2: "2",
        Board3: "3",
        Board4: "4",
        Board5: "5",
        Board6: "6",
        Board7: "7",
        Board8: "8",
        Board9: "9",
        Board000: "000",
        BoardComa: ","

    };

}