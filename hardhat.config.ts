import {config as dotEnvConfig} from "dotenv";
import {HardhatUserConfig} from "hardhat/types";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import {task} from "hardhat/config";
import {ethers} from "hardhat";

dotEnvConfig();

task("change_price", "Changes NFT price.", async (taskArgs, hre) => {
    const address = "0x90Ed812d4DFd4845ba64F8D8B2511360AcE0DEA0";
    const SHLD = await hre.ethers.getContractAt("SHLD", address);

    const newPrice = ethers.utils.parseEther("YOUR_NEW_PRICE");

    const tx = await SHLD.setPrice(newPrice);
    await tx.wait();

    const curr_price = await SHLD.getPrice();

    console.log("SHLD price has been changed to ", curr_price);
});

task("change_uri", "Changes the base URI", async (taskArgs, hre) => {
    const address = "0x90Ed812d4DFd4845ba64F8D8B2511360AcE0DEA0";
    const SHLD = await hre.ethers.getContractAt("SHLD", address);

    const newUri = "ipfs://NEW_CID/";

    const tx = await SHLD.setBaseURI(newUri);
    await tx.wait();

    console.log("SHLD base URI has been changed to ", newUri);
});

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const GOERLI_PRIVATE_KEY =  process.env.GOERLI_PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [
            {
                version: "0.8.2",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                }
            },
        ]
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    networks: {
        hardhat: {
            accounts: [
                {
                    privateKey: GOERLI_PRIVATE_KEY, balance: "10000000000000000000000",
                }
            ]
        },
        goerli: {
            url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY],
        },
        local: {
            url: "http://127.0.0.1:8545",
            accounts: [GOERLI_PRIVATE_KEY],
            gas: 8000000,
            timeout: 100000
            /*chainId: 1*/
        }
    },
    etherscan: {
        //@ts-ignore
        url: "https://api-rinkeby.etherscan.io/api",
        apiKey: ETHERSCAN_API_KEY
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
        disambiguatePaths: false,
    },
    gasReporter: {
        currency: 'USD'
    }
};

export default config;
