import { expect } from "chai";
import { ethers } from "hardhat";

describe("ownerMint", function () {
  it("Owner can mint", async () => {
    const to = "0xdD4c825203f97984e7867F11eeCc813A036089D1";
    const tokenId = 1;
    const amount = 1;
    const dexoshi = await ethers.deployContract("Dexoshi");
    await dexoshi.ownerMint(to, tokenId, amount);
    expect(await dexoshi.balanceOf(to, tokenId)).to.equal(1);
  });
});
