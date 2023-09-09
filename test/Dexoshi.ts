import { expect } from "chai";
import { ethers } from "hardhat";

describe("Dexoshi", function () {
  it("Should be true", () => expect(true).to.equal(true));

  it("Verify Owner", async () => {
    const signer = await ethers.getSigners();
    const dexoshi = await ethers.deployContract("Dexoshi");
    expect(signer[0].address).to.equal(await dexoshi.owner());
  });

  it("Verify contractURI", async () => {
    const signer = await ethers.getSigners();
    const dexoshi = await ethers.deployContract("Dexoshi");

    // https://ethereum.stackexchange.com/questions/111841/erc1155-problem-nft-unidentified-contract
    const jsonAsString = JSON.stringify({
      name: "Hello World 4321",
      description: "Welcome to my collection about Hello World 4321",
      image: "data:image/png;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNjgwIDY4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0id2lkdGg6MTAwJTtiYWNrZ3JvdW5kOmJsYWNrOyI+PGRlZnM+PHBhdGggaWQ9ImNoZWNrIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS4zNiA5Ljg4NkEzLjkzMyAzLjkzMyAwIDAgMCAxOCA4Yy0xLjQyMyAwLTIuNjcuNzU1LTMuMzYgMS44ODdhMy45MzUgMy45MzUgMCAwIDAtNC43NTMgNC43NTNBMy45MzMgMy45MzMgMCAwIDAgOCAxOGMwIDEuNDIzLjc1NSAyLjY2OSAxLjg4NiAzLjM2YTMuOTM1IDMuOTM1IDAgMCAwIDQuNzUzIDQuNzUzIDMuOTMzIDMuOTMzIDAgMCAwIDQuODYzIDEuNTkgMy45NTMgMy45NTMgMCAwIDAgMS44NTgtMS41ODkgMy45MzUgMy45MzUgMCAwIDAgNC43NTMtNC43NTRBMy45MzMgMy45MzMgMCAwIDAgMjggMThhMy45MzMgMy45MzMgMCAwIDAtMS44ODctMy4zNiAzLjkzNCAzLjkzNCAwIDAgMC0xLjA0Mi0zLjcxMSAzLjkzNCAzLjkzNCAwIDAgMC0zLjcxLTEuMDQzWm0tMy45NTggMTEuNzEzIDQuNTYyLTYuODQ0Yy41NjYtLjg0Ni0uNzUxLTEuNzI0LTEuMzE2LS44NzhsLTQuMDI2IDYuMDQzLTEuMzcxLTEuMzY4Yy0uNzE3LS43MjItMS44MzYuMzk2LTEuMTE2IDEuMTE2bDIuMTcgMi4xNWEuNzg4Ljc4OCAwIDAgMCAxLjA5Ny0uMjJaIj48L3BhdGg+PHJlY3QgaWQ9InNxdWFyZSIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2IiBzdHJva2U9IiMxOTE5MTkiPjwvcmVjdD48ZyBpZD0icm93Ij48dXNlIGhyZWY9IiNzcXVhcmUiIHg9IjE5NiIgeT0iMTYwIi8+PHVzZSBocmVmPSIjc3F1YXJlIiB4PSIyMzIiIHk9IjE2MCIvPjx1c2UgaHJlZj0iI3NxdWFyZSIgeD0iMjY4IiB5PSIxNjAiLz48dXNlIGhyZWY9IiNzcXVhcmUiIHg9IjMwNCIgeT0iMTYwIi8+PHVzZSBocmVmPSIjc3F1YXJlIiB4PSIzNDAiIHk9IjE2MCIvPjx1c2UgaHJlZj0iI3NxdWFyZSIgeD0iMzc2IiB5PSIxNjAiLz48dXNlIGhyZWY9IiNzcXVhcmUiIHg9IjQxMiIgeT0iMTYwIi8+PHVzZSBocmVmPSIjc3F1YXJlIiB4PSI0NDgiIHk9IjE2MCIvPjwvZz48L2RlZnM+PHJlY3Qgd2lkdGg9IjY4MCIgaGVpZ2h0PSI2ODAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTg4IiB5PSIxNTIiIHdpZHRoPSIzMDQiIGhlaWdodD0iMzc2IiBmaWxsPSIjMTExIi8+PGcgaWQ9ImdyaWQiIHg9IjE5NiIgeT0iMTYwIj48dXNlIGhyZWY9IiNyb3ciIHk9IjAiLz48dXNlIGhyZWY9IiNyb3ciIHk9IjM2Ii8+PHVzZSBocmVmPSIjcm93IiB5PSI3MiIvPjx1c2UgaHJlZj0iI3JvdyIgeT0iMTA4Ii8+PHVzZSBocmVmPSIjcm93IiB5PSIxNDQiLz48dXNlIGhyZWY9IiNyb3ciIHk9IjE4MCIvPjx1c2UgaHJlZj0iI3JvdyIgeT0iMjE2Ii8+PHVzZSBocmVmPSIjcm93IiB5PSIyNTIiLz48dXNlIGhyZWY9IiNyb3ciIHk9IjI4OCIvPjx1c2UgaHJlZj0iI3JvdyIgeT0iMzI0Ii8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI4NiwgMjg2KSBzY2FsZSgzKSI+PHVzZSBocmVmPSIjY2hlY2siIGZpbGw9IiNERTMyMzciPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwiIHZhbHVlcz0iI0RFMzIzNzsjQzIzNTMyOyNGRjdGOEU7I0U4NEFBOTsjMzcxNDcxOyM1MjVFQUE7IzQ1NzZEMDsjOUFEOUZCOyMzMzc1OEQ7Izc3RDNERTsjOURFRkJGOyM4NkU0OEU7I0E3Q0E0NTsjRkFFMjcyOyNGNEM0NEE7I0ZBRDA2NDsjRjJBODQwOyNGMTg5MzA7I0QwNUMzNTsjRUM3MzY4OyNERTMyMzciIGR1cj0iMTBzIiBiZWdpbj0iYW5pbWF0aW9uLmJlZ2luIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz48L3VzZT48L2c+PHJlY3Qgd2lkdGg9IjY4MCIgaGVpZ2h0PSI2ODAiIGZpbGw9InRyYW5zcGFyZW50Ij48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ3aWR0aCIgZnJvbT0iNjgwIiB0bz0iMCIgZHVyPSIwLjJzIiBiZWdpbj0iY2xpY2siIGZpbGw9ImZyZWV6ZSIgaWQ9ImFuaW1hdGlvbiIvPjwvcmVjdD48L3N2Zz4=",
      external_link: "https://www.youtube.com/watch?v=qWNQUvIk954",
      seller_fee_basis_points: 500, // Indicates a 5% seller fee.
      fee_recipient: signer[0].address,
    });

    // Encode as data URI
    const dataUri = `data:text/json;charset=utf-8,${encodeURIComponent(
      jsonAsString
    )}`;

    expect(await dexoshi.contractURI()).to.equal(dataUri);
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
    const tokenC = 5;
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

  it("Player can merge", async () => {
    const [_, player] = await ethers.getSigners();
    const tokenA = 2;
    const tokenB = 3;
    const tokenC = 5;
    const dexoshi = await ethers.deployContract("Dexoshi");

    // mint token A
    expect(await dexoshi.balanceOf(player.address, tokenA)).to.equal(0);
    await dexoshi.ownerMint(player.address, tokenA);
    expect(await dexoshi.balanceOf(player.address, tokenA)).to.equal(1);

    // mint token B
    expect(await dexoshi.balanceOf(player.address, tokenB)).to.equal(0);
    await dexoshi.ownerMint(player.address, tokenB);
    expect(await dexoshi.balanceOf(player.address, tokenB)).to.equal(1);

    // merge tokenA and tokenB to tokenC
    expect(await dexoshi.balanceOf(player.address, tokenC)).to.equal(0);
    await dexoshi.connect(player).playerMerge(tokenA, tokenB);
    expect(await dexoshi.balanceOf(player.address, tokenC)).to.equal(1);

    // tokenA and tokenB are burned
    expect(await dexoshi.balanceOf(player.address, tokenA)).to.equal(0);
    expect(await dexoshi.balanceOf(player.address, tokenB)).to.equal(0);
  });

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
