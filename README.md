# BlockBolt Monad Wallet SDK

The BlockBolt SDK for the Monad Wallet offers a streamlined and efficient way to integrate Monad blockchain payments. It provides a developer-friendly interface for processing transactions securely on the Monad chain. The SDK simplifies payment processing by handling transaction creation, signing, and status tracking, ensuring reliable delivery of payments to merchant addresses. By leveraging Viem's modern TypeScript support, it offers type-safe interaction with the Monad blockchain, making integration straightforward while maintaining high security standards.

## Features

- Simple payment SDK for Monad blockchain using BlockBolt
- Built with Viem for modern TypeScript support
- Full transaction receipt access
- Explorer URL generation
- Comprehensive error handling

## Technical Implementation

Our system connects mobile wallets and merchant websites for payment verification on the Monad Blockchain without intermediaries. Customers pay via their mobile wallets, and order details are stored directly on the Monad blockchain. The merchant website verifies the payment by matching the receiver's wallet address, amount, and order ID with the merchant's details from the QR code. This fully decentralized approach eliminates the need for third-party verification, ensuring secure and trustless transactions.

![Blockbolt Payment Process](https://github.com/user-attachments/assets/24e06120-9c41-474b-b96d-baa3d34d6384)

To make integration easy, we’ve released an open-source SDK for mobile wallets: 
https://www.npmjs.com/package/@blockbolt/monad-wallet

![Blockbolt Wallet Flow - Monad Blockchain](https://github.com/user-attachments/assets/281d99b3-c9de-4596-96ac-c4f81c704714)


## Installation

```bash
npm install @blockbolt/monad-wallet
```

## Usage

### Basic Example

```typescript
import { BlockBolt } from "@blockbolt/monad-wallet";
import { privateKeyToAccount } from "viem/accounts";

// Initialize the BlockBolt SDK
const monadSdk = new BlockBolt();

// Create payment details
const paymentDetails = {
  orderId: "ORDER123",
  amount: "0.01", // Amount in MON tokens
  merchantName: "Coffee Shop",
  merchantAddress: "0x55Eca4d519Ca2BdC60C8f886aB00B5281772E517",
};

const account = privateKeyToAccount("0xYourPrivateKeyHere");

// Make payment
async function sendPayment() {
  try {
    const result = await monadSdk.makePayment(account, paymentDetails);
    console.log(`Transaction sent! Hash: ${result.hash}`);

    // Get explorer URL
    const url = monadSdk.getExplorerUrl(result.hash);
    console.log(`View transaction: ${url}`);

    // Check transaction status
    const status = await monadSdk.getTransactionStatus(result.hash);
    if (status.status === "success") {
      console.log("Payment confirmed!");
    }
  } catch (error) {
    console.error("Payment failed:", error.message);
  }
}

sendPayment();
```

## API Reference

### `BlockBolt`

Main class for interacting with the BlockBolt Monad payment contract.

#### Constructor

```typescript
constructor();
```

Initializes the SDK with the default contract address and Monad Testnet configuration.

#### Methods

##### `makePayment`

```typescript
public async makePayment(
  account: Account,
  paymentDetails: PaymentDetails
): Promise<TransactionResult>
```

Makes a payment using the specified account and payment details.

Parameters:

- `account`: Viem account object with the signer
- `paymentDetails`: Object containing payment information
  - `orderId`: Unique identifier for the order
  - `amount`: Amount of MON tokens to send
  - `merchantName`: Name of the merchant
  - `merchantAddress`: Address of the merchant

Returns:

- `TransactionResult`: Object containing the transaction hash

##### `getTransactionStatus`

```typescript
public async getTransactionStatus(hash: Hash)
```

Gets the status and details of a transaction.

Parameters:

- `hash`: Transaction hash to check

Returns:

- Object containing:
  - `status`: Transaction status ('success' or 'reverted')
  - `blockNumber`: Block number where the transaction was mined
  - `logs`: Transaction logs
  - `receipt`: Full transaction receipt

##### `getExplorerUrl`

```typescript
public getExplorerUrl(hash: Hash): string
```

Generates a block explorer URL for the transaction.

Parameters:

- `hash`: Transaction hash

Returns:

- URL string for the transaction on Monad block explorer

## Error Handling

The SDK provides custom error classes for better error handling:

- `BlockBoltSDKError`: Base error class for all SDK errors
- `TransactionError`: Error related to transaction execution

Example:

```typescript
try {
  await monadSdk.makePayment(account, paymentDetails);
} catch (error) {
  if (error instanceof TransactionError) {
    console.error("Transaction failed:", error.message);
  } else {
    console.error("Unknown error:", error);
  }
}
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## Demo

- Demo Website: https://store.blockbolt.io/mocha
- Demo Payment with 'Wallet Connect' on Monad Testnet: https://www.youtube.com/watch?v=O_g8IyKgtWM
- Demo Payment with 'QR Code' on Monad Testnet: https://www.youtube.com/watch?v=UWCOL1jtUn8
- Demo Wallet for Monad Testnet: https://blockbolt-evm.vercel.app/

## License

MIT

---

<p align="center">
  <strong>Powered by BlockBolt</strong><br/>
  Making blockchain payments simple and secure
</p>
