import { expect } from "chai";
import { ethers } from "hardhat";

describe("playerMint", function () {
  it("Player cannot mint", async () => {
    const [_, player] = await ethers.getSigners();
    const to = "0xdD4c825203f97984e7867F11eeCc813A036089D1";
    const tokenId = 1;
    const dexoshi = await ethers.deployContract("Dexoshi");
    await expect(
      dexoshi.connect(player).ownerMint(to, tokenId)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
