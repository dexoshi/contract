import { expect } from "chai";
import { ethers } from "hardhat";

describe("ownerMerge", function () {
  it("Owner can merge", async () => {
    const to = "0xdD4c825203f97984e7867F11eeCc813A036089D1";
    const tokenA = 2;
    const tokenB = 3;
    const tokenC = 6;
    const dexoshi = await ethers.deployContract("Dexoshi");

    // mint token A
    expect(await dexoshi.balanceOf(to, tokenA)).to.equal(0);
    await dexoshi.ownerMint(to, tokenA);
    expect(await dexoshi.balanceOf(to, tokenA)).to.equal(1);

    // mint token B
    expect(await dexoshi.balanceOf(to, tokenB)).to.equal(0);
    await dexoshi.ownerMint(to, tokenB);
    expect(await dexoshi.balanceOf(to, tokenB)).to.equal(1);

    // merge tokenA and tokenB to tokenC
    expect(await dexoshi.balanceOf(to, tokenC)).to.equal(0);
    await dexoshi.ownerMerge(to, tokenA, tokenB);
    expect(await dexoshi.balanceOf(to, tokenC)).to.equal(1);

    // tokenA and tokenB are burned
    expect(await dexoshi.balanceOf(to, tokenA)).to.equal(0);
    expect(await dexoshi.balanceOf(to, tokenB)).to.equal(0);
  });

  it("Owner cannot merge if tokenB is not owned", async () => {
    const to = "0xdD4c825203f97984e7867F11eeCc813A036089D1";
    const tokenA = 2;
    const tokenB = 3;
    const dexoshi = await ethers.deployContract("Dexoshi");

    expect(await dexoshi.balanceOf(to, tokenA)).to.equal(0);
    await dexoshi.ownerMint(to, tokenA);
    expect(await dexoshi.balanceOf(to, tokenA)).to.equal(1);

    await expect(dexoshi.ownerMerge(to, tokenA, tokenB)).to.be.revertedWith(
      "Token B not owned"
    );
  });

  it("Owner cannot merge if player has custody", async () => {
    const [_, player] = await ethers.getSigners();
    const token = 1;
    const dexoshi = await ethers.deployContract("Dexoshi");
    // mint token A
    expect(await dexoshi.balanceOf(player.address, token)).to.equal(0);
    await dexoshi.ownerMint(player.address, token);
    expect(await dexoshi.balanceOf(player.address, token)).to.equal(1);
    // player sets custody
    expect(await dexoshi.hasCustody(player.address)).to.equal(false);
    await dexoshi.connect(player).setCustody(true);
    expect(await dexoshi.hasCustody(player.address)).to.equal(true);
    // owner cannot burn
    await expect(
      dexoshi.ownerMerge(player.address, token, token)
    ).to.be.revertedWith("Player has full custody");
  });
});
