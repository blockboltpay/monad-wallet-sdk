import {
  http,
  createPublicClient,
  createWalletClient,
  parseEther,
  type Address,
  type Account,
  type PublicClient,
  type WalletClient,
  type Hash,
} from "viem";
import {
  BlockBolt_TESTNET_CONTRACT_ADDRESS,
  MONAD_TESTNET,
} from "./constants/chain";
import { PaymentDetails, TransactionResult } from "./types";
import { validatePaymentDetails } from "./utils/validation";
import { TransactionError } from "./utils/errors";
import { BLOCKBOLT_MONAD_ABI } from "./constants/abi/blockboltABI";

export class BlockBolt {
  private publicClient: PublicClient;
  private walletClient: WalletClient;
  private contractAddress: Address;

  /**
   * Initialize the BlockBolt
   * @param contractAddress - The address of the payment contract
   */
  constructor() {
    this.contractAddress = BlockBolt_TESTNET_CONTRACT_ADDRESS;

    // Initialize clients
    this.publicClient = createPublicClient({
      chain: MONAD_TESTNET,
      transport: http(),
    });

    this.walletClient = createWalletClient({
      chain: MONAD_TESTNET,
      transport: http(),
    });
  }

  /**
   * Make a payment using the Monad contract
   * @param account - The account that will sign the transaction
   * @param paymentDetails - Details of the payment to be made
   * @returns Transaction hash
   */
  public async makePayment(
    account: Account,
    paymentDetails: PaymentDetails
  ): Promise<TransactionResult> {
    // Validate payment details
    validatePaymentDetails(paymentDetails);

    try {
      const { orderId, amount, merchantName, merchantAddress } = paymentDetails;
      const value = parseEther(amount);

      // Simulate the transaction first
      const { request } = await this.publicClient.simulateContract({
        account,
        address: this.contractAddress,
        abi: BLOCKBOLT_MONAD_ABI,
        functionName: "transfer",
        args: [orderId.trim(), merchantName, merchantAddress],
        value,
      });

      // Send the transaction
      const hash = await this.walletClient.writeContract(request);

      return {
        hash,
      };
    } catch (error: any) {
      throw new TransactionError(
        error.message || "Unknown error during payment"
      );
    }
  }

  /**
   * Get the transaction status
   * @param hash - Transaction hash to check
   */
  public async getTransactionStatus(hash: Hash) {
    try {
      const receipt = await this.publicClient.waitForTransactionReceipt({
        hash,
      });
      return {
        status: receipt.status,
        blockNumber: receipt.blockNumber,
        logs: receipt.logs,
        receipt,
      };
    } catch (error: any) {
      throw new TransactionError(
        `Failed to get transaction status: ${error.message}`
      );
    }
  }

  /**
   * Get the explorer URL for a transaction
   * @param hash - Transaction hash
   */
  public getExplorerUrl(hash: Hash): string {
    return `${MONAD_TESTNET.blockExplorers.default.url}/tx/${hash}`;
  }
}
