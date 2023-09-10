import { expect } from "chai";
import { ethers } from "hardhat";

describe("setCustody", function () {
  it("Verify Custody", async () => {
    const [_, player] = await ethers.getSigners();
    const dexoshi = await ethers.deployContract("Dexoshi");
    // default custody is false
    expect(await dexoshi.hasCustody(player.address)).to.equal(false);
    // player sets full custody
    await dexoshi.connect(player).setCustody(true);
    expect(await dexoshi.hasCustody(player.address)).to.equal(true);
    // ownerBurn will throw error
    await expect(dexoshi.ownerBurn(player.address, 2, 3)).to.be.revertedWith(
      "Player has full custody"
    );
  });
});
