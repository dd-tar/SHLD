import {ethers, upgrades} from "hardhat";
import {
    SHLD
} from "../typechain";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

async function main() {
    let creator: SignerWithAddress;
    const startPrice = ethers.utils.parseEther("0.01");
    const maxSupply = 10000;
    const nReserved = 0;
    const maxTokensPerMint = 10;
    const uri = "ipfs://QmecqaxvGPjqhk7H4sxj4zBDjJNHVNGdPgWSpz4g99bM1h/";
    const name = "SHLD";
    const symbol = "SHLD";

    [creator] = await ethers.getSigners();
    const SHLD = await ethers.getContractFactory("SHLD", creator);
    const shld = await upgrades.deployProxy(SHLD, [
        startPrice,
        maxSupply,
        nReserved,
        maxTokensPerMint,
        uri,
        name,
        symbol
    ]);
    await shld.deployed();
    console.log(`SHLD is deployed at: ${shld.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
