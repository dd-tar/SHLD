## Available Scripts

In the project directory, you can run:

### `npx hardhat run ./scripts/deploy_shld.ts --network goerli`

Deploys a new SHLD NFT collection contract to the Goerli network.


### `npx hardhat run ./scripts/start_sale.ts --network goerli`

Enables the ability to mint the NFT in the collection. Called 1 time after the collection is deployed. 

### `npx hardhat run ./scripts/mint_shld.ts --network goerli`

Mints NFT from the calling account.

### `npx hardhat change_price --network goerli`

Changes the price of the NFT minting to the new one specified in the newPrice variable of the "change_price" task from the hardhat.config.ts file.

### `npx hardhat change_uri --network goerli`

Changes the baseURI of the collection to the new one specified in the newUri variable of the "change_uri" task from the hardhat.config.ts file.


_Note: Don\'t forget to fill in your .env variables first by following the example from example.env_  
_And also change shldProxyAddr value to the new contract address if you have re-deployed the contract._  
  \
  \
**Original contract address:** `0x90Ed812d4DFd4845ba64F8D8B2511360AcE0DEA0`
  
**IPFS CID for metadata:** `QmecqaxvGPjqhk7H4sxj4zBDjJNHVNGdPgWSpz4g99bM1h`  

**IPFS CID for the image:** `QmUxNasW2wqjTncEEpkg8XJWNYSAMvYGQgL8vTeHsEkoBK`  

**The ABI is stored in** `./artifacts/contracts/SHLD.json`  
