import {ethers, upgrades} from "hardhat";
import {
    SHLD
} from "../typechain";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

async function main() {
    let creator: SignerWithAddress;
    let shld;
    [creator] = await ethers.getSigners();
    const shldProxyAddr = "0x90Ed812d4DFd4845ba64F8D8B2511360AcE0DEA0";

    const SHLDFactory = await ethers.getContractFactory("SHLD", creator);
    console.log("Preparing upgrade...");
    shld = await upgrades.upgradeProxy(shldProxyAddr, SHLDFactory);
    console.log("SHLD at:", shld.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
