export class BlockBoltSDKError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlockBoltSDKError";
  }
}

export class TransactionError extends BlockBoltSDKError {
  constructor(message: string) {
    super(`Transaction error: ${message}`);
    this.name = "TransactionError";
  }
}
