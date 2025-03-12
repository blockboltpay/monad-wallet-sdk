import { Address, defineChain } from "viem";

export const MONAD_TESTNET = defineChain({
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: {
    name: "Testnet MON Token",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.monad.xyz/"] },
    public: { http: ["https://testnet-rpc.monad.xyz/"] },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://testnet.monadexplorer.com/" },
  },
});
export const BlockBolt_TESTNET_CONTRACT_ADDRESS: Address =
  "0xA5acD7638F1EA0F0B34e64674694FCD46DcFb5Cc";
