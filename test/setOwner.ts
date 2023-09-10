import { expect } from "chai";
import { ethers } from "hardhat";

describe("setOwner", function () {
  it("Set Owner", async () => {
    const signer = await ethers.getSigners();
    const dexoshi = await ethers.deployContract("Dexoshi");
    expect(signer[0].address).to.equal(await dexoshi.owner());
  });
});
