import { expect } from "chai";
import { ethers } from "hardhat";

describe("ownerBurn", function () {
  it("Owner can burn", async () => {
    const to = "0xdD4c825203f97984e7867F11eeCc813A036089D1";
    const token = 2;
    const amount = 1;
    const dexoshi = await ethers.deployContract("Dexoshi");
    // mint token A
    expect(await dexoshi.balanceOf(to, token)).to.equal(0);
    await dexoshi.ownerMint(to, token, amount);
    expect(await dexoshi.balanceOf(to, token)).to.equal(1);
    // burn token A
    await dexoshi.ownerBurn(to, token, amount);
    expect(await dexoshi.balanceOf(to, token)).to.equal(0);
  });

  it("Owner cannot burn if player has custody", async () => {
    const [_, player] = await ethers.getSigners();
    const token = 1;
    const amount = 1;
    const dexoshi = await ethers.deployContract("Dexoshi");
    // mint token A
    expect(await dexoshi.balanceOf(player.address, token)).to.equal(0);
    await dexoshi.ownerMint(player.address, token, amount);
    expect(await dexoshi.balanceOf(player.address, token)).to.equal(1);
    // player sets custody
    expect(await dexoshi.hasCustody(player.address)).to.equal(false);
    await dexoshi.connect(player).setCustody(true);
    expect(await dexoshi.hasCustody(player.address)).to.equal(true);
    // owner cannot burn
    await expect(
      dexoshi.ownerBurn(player.address, token, amount)
    ).to.be.revertedWith("Player has full custody");
  });
});
