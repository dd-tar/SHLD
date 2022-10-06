import {ethers} from "hardhat";
import {
    SHLD
} from "../typechain";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

async function main() {
    let creator: SignerWithAddress;
    [creator] = await ethers.getSigners();

    const shldAddr = "0x90Ed812d4DFd4845ba64F8D8B2511360AcE0DEA0";
    const shld = await ethers.getContractAt("SHLD", shldAddr, creator);

    console.log("Initializing SHLD sale start...");
    let tx = await shld.setBeneficiary(creator.address);
    await tx.wait();
    let tr = await shld.flipSaleStarted();
    await tr.wait();
    console.log("Successfully initialized.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
