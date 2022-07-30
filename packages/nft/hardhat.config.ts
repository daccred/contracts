require("dotenv").config();
import { HardhatUserConfig } from "hardhat/config";

import '@typechain/hardhat'
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"

/* Testing utils */
import 'hardhat-docgen';
import 'solidity-coverage'
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';

// This adds support for typescript paths mappings
import "tsconfig-paths/register";

const config: HardhatUserConfig = {
    etherscan: {
        apiKey: "ECUS9XGPERAY4D5XMM9KE1QZKISJDQESAX",
    },
    solidity: {
        compilers: [
            {
                version: "0.8.9",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            }
        ],
    },
    mocha: {
        timeout: 600000,
    },
    docgen: {
        clear: true,
        runOnCompile: true,
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS === 'true',
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
        strict: false,
    },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false
  },
  networks: {
    localhost: {
        url: "http://127.0.0.1:8545",
    },
    ganache: {
        url: "http://127.0.0.1:7545",
    },
    // matic: {
    //     url: "https://rpc-mainnet.matic.quiknode.pro",
    //     accounts: [process.env.PRIVATEKEY as string],
    // },
    // mumbai: {
    //     url: "https://speedy-nodes-nyc.moralis.io/89b4f5c6d2fc13792dcaf416/polygon/mumbai",
    //     accounts: [process.env.PRIVATEKEY as string],
    // },
},
};

export default config;