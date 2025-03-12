export interface PaymentDetails {
  orderId: string;
  amount: string;
  merchantName: string;
  merchantAddress: string;
}

export interface TransactionResult {
  hash: string;
}
