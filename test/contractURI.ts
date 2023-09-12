import { expect } from "chai";
import { ethers } from "hardhat";

describe("contractURI", function () {
  it("Verify contractURI", async () => {
    const signer = await ethers.getSigners();
    const dexoshi = await ethers.deployContract("Dexoshi");

    // https://ethereum.stackexchange.com/questions/111841/erc1155-problem-nft-unidentified-contract
    const jsonAsString = JSON.stringify({
      name: "Dexoshi",
      description:
        "Dexoshi is a Lens trading card game on the blockchain. There are a total of 255 unique cards and amount of individual cards can be infinite. But not all cards are equal...",
      image:
        "https://ipfs.io/ipfs/bafkreiezcdvvipxiohdwm6hslbqwoy64lzg2vwjxi6rhdj7fcql5rwgo2q",
      external_link: "https://www.lensfrens.xyz/dexoshi.lens",
      seller_fee_basis_points: 500, // Indicates a 5% seller fee.
      fee_recipient: signer[0].address,
    });

    // Encode as data URI
    const dataUri = `data:text/json;charset=utf-8,${encodeURIComponent(
      jsonAsString
    )}`;

    expect(await dexoshi.contractURI()).to.equal(dataUri);
  });
});
