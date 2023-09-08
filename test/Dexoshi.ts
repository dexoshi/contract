import { expect } from "chai";
import { ethers } from "hardhat";

describe("Dexoshi", function () {
  it("Should be true", () => expect(true).to.equal(true));

  it("Verify Owner", async () => {
    const signer = await ethers.getSigners();
    const dexoshi = await ethers.deployContract("Dexoshi");
    expect(signer[0].address).to.equal(await dexoshi.owner());
  });

  it("Owner can mint", async () => {
    const to = "0xdD4c825203f97984e7867F11eeCc813A036089D1";
    const tokenId = 1;
    const dexoshi = await ethers.deployContract("Dexoshi");
    await dexoshi.ownerMint(to, tokenId);
    expect(await dexoshi.balanceOf(to, tokenId)).to.equal(1);
  });

  it("Player cannot mint", async () => {
    const [_, player] = await ethers.getSigners();
    const to = "0xdD4c825203f97984e7867F11eeCc813A036089D1";
    const tokenId = 1;
    const dexoshi = await ethers.deployContract("Dexoshi");
    await expect(
      dexoshi.connect(player).ownerMint(to, tokenId)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Owner can merge", async () => {
    const to = "0xdD4c825203f97984e7867F11eeCc813A036089D1";
    const tokenA = 2;
    const tokenB = 3;
    const tokenC = 6;
    const dexoshi = await ethers.deployContract("Dexoshi");

    expect(await dexoshi.balanceOf(to, tokenA)).to.equal(0);
    await dexoshi.ownerMint(to, tokenA);
    expect(await dexoshi.balanceOf(to, tokenA)).to.equal(1);

    expect(await dexoshi.balanceOf(to, tokenB)).to.equal(0);
    await dexoshi.ownerMint(to, tokenB);
    expect(await dexoshi.balanceOf(to, tokenB)).to.equal(1);

    expect(await dexoshi.balanceOf(to, tokenC)).to.equal(0);
    await dexoshi.ownerMerge(to, tokenA, tokenB);
    expect(await dexoshi.balanceOf(to, tokenC)).to.equal(1);
  });

  it("Player can merge", async () => {
    const [_, player] = await ethers.getSigners();
    const tokenA = 2;
    const tokenB = 3;
    const tokenC = 6;
    const dexoshi = await ethers.deployContract("Dexoshi");

    expect(await dexoshi.balanceOf(player.address, tokenA)).to.equal(0);
    await dexoshi.ownerMint(player.address, tokenA);
    expect(await dexoshi.balanceOf(player.address, tokenA)).to.equal(1);

    expect(await dexoshi.balanceOf(player.address, tokenB)).to.equal(0);
    await dexoshi.ownerMint(player.address, tokenB);
    expect(await dexoshi.balanceOf(player.address, tokenB)).to.equal(1);

    expect(await dexoshi.balanceOf(player.address, tokenC)).to.equal(0);
    await dexoshi.connect(player).playerMerge(tokenA, tokenB);
    expect(await dexoshi.balanceOf(player.address, tokenC)).to.equal(1);
  })

  it("Cannot merge if tokenB is not owned", async () => {
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
});
