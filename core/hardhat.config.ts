import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-contract-sizer';
import 'hardhat-docgen';
import '@nomiclabs/hardhat-etherscan';

const {
    API_KEY_ETHERSCAN,
    NODE_URL_MAINNET,
    NODE_URL_TESTNET,
    PKEY_MAINNET,
    PKEY_TESTNET,
    REPORT_GAS,
} = process.env;


const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.9',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        mainnet: {
            url: NODE_URL_MAINNET,
            accounts: [PKEY_MAINNET as string],
        },

        testnet: {
            url: NODE_URL_TESTNET,
            accounts: [PKEY_TESTNET as string],
        },
    },
    typechain: {
        outDir: "types",
        alwaysGenerateOverloads: true,
        target: "ethers-v5",
    },
    
    etherscan: {
        apiKey: API_KEY_ETHERSCAN,
    }, 
    docgen: {
        clear: true,
        runOnCompile: true,
    },
    gasReporter: {
        enabled: REPORT_GAS === 'true',
    },

    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: false,
    }
};

export default config;
