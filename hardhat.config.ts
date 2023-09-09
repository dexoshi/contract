import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY || "XMFCFQKZN4X1BCXR7JGTNR1N5SWC3UI1CV",
  },
  networks: {
    live: {
      url: process.env.RPC_URL || "https://rpc-mumbai.maticvigil.com",
      accounts: [
        process.env.PRIVATE_KEY ||
          "14105d93f26219cdb70e4cab9408c1b26e99662ab2cc6f6af7700f940a4411e9",
      ],
    },
  },
};

export default config;
