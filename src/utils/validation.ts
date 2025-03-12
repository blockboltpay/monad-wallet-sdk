import { PaymentDetails } from "../types";
import { BlockBoltSDKError } from "./errors";

export const validatePaymentDetails = (details: PaymentDetails): void => {
  if (!details.orderId || details.orderId.trim() === "") {
    throw new BlockBoltSDKError("Order ID is required");
  }

  if (
    !details.amount ||
    isNaN(Number(details.amount)) ||
    Number(details.amount) <= 0
  ) {
    throw new BlockBoltSDKError("Amount must be a positive number");
  }

  if (!details.merchantName || details.merchantName.trim() === "") {
    throw new BlockBoltSDKError("Merchant name is required");
  }

  if (!details.merchantAddress || details.merchantAddress.trim() === "") {
    throw new BlockBoltSDKError("Merchant address is required");
  }
};
