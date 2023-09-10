import { expect } from "chai";
import { ethers } from "hardhat";

describe("playerMerge", function () {
  it("Player can merge", async () => {
    const [_, player] = await ethers.getSigners();
    const tokenA = 2;
    const tokenB = 3;
    const tokenC = 6;
    const amount = 1
    const dexoshi = await ethers.deployContract("Dexoshi");

    // mint token A
    expect(await dexoshi.balanceOf(player.address, tokenA)).to.equal(0);
    await dexoshi.ownerMint(player.address, tokenA, amount);
    expect(await dexoshi.balanceOf(player.address, tokenA)).to.equal(1);

    // mint token B
    expect(await dexoshi.balanceOf(player.address, tokenB)).to.equal(0);
    await dexoshi.ownerMint(player.address, tokenB, amount);
    expect(await dexoshi.balanceOf(player.address, tokenB)).to.equal(1);

    // merge tokenA and tokenB to tokenC
    expect(await dexoshi.balanceOf(player.address, tokenC)).to.equal(0);
    await dexoshi.connect(player).playerMerge(tokenA, tokenB);
    expect(await dexoshi.balanceOf(player.address, tokenC)).to.equal(1);

    // tokenA and tokenB are burned
    expect(await dexoshi.balanceOf(player.address, tokenA)).to.equal(0);
    expect(await dexoshi.balanceOf(player.address, tokenB)).to.equal(0);
  });
});
