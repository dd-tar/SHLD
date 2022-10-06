import {ethers} from "hardhat";
import {
    SHLD
} from "../typechain";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

async function main() {
    let creator: SignerWithAddress;
    let shld: SHLD;
    [creator] = await ethers.getSigners();

    const shldProxyAddr = "0x90Ed812d4DFd4845ba64F8D8B2511360AcE0DEA0";

    shld = await ethers.getContractAt("SHLD", shldProxyAddr, creator);
    const price = await shld.getPrice();
    const quantity = 1;
    const val = price.mul(quantity)
    const tx = await shld.mint(quantity, {value: val});
    await tx.wait();
    console.log(`Minted ` + quantity + ' SHLD');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
