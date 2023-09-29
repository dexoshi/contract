// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Dexoshi is ERC1155, Ownable {
    mapping(address => bool) public hasCustody;

    constructor() ERC1155("https://ipfs.io/ipfs/bafybeiacu75qlt6kuleqosstzyekc4r4lwgtwpytpzibyg36hzxis4xx3m/{id}.json") {}

    /*
     * Contract level URI
     */
    function contractURI() public pure returns (string memory) {
        return
            "data:text/json;charset=utf-8,%7B%22name%22%3A%22Dexoshi%22%2C%22description%22%3A%22Dexoshi%20is%20a%20Lens%20trading%20card%20game%20on%20the%20blockchain.%20There%20are%20a%20total%20of%20255%20unique%20cards%20and%20amount%20of%20individual%20cards%20can%20be%20infinite.%20But%20not%20all%20cards%20are%20equal...%22%2C%22image%22%3A%22https%3A%2F%2Fipfs.io%2Fipfs%2Fbafybeiasmykcoebpnrhuuminmczqlvqeimuxtfwyuku2bh2mzi75satrgy%2F222.png%22%2C%22external_link%22%3A%22https%3A%2F%2Fwww.lensfrens.xyz%2Fdexoshi.lens%22%2C%22seller_fee_basis_points%22%3A500%2C%22fee_recipient%22%3A%220xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266%22%7D";
    }

    /*
     * Merge
     * @param tokenA token id A
     * @param tokenB token id B
     */
    function merge(
        uint256 tokenA,
        uint256 tokenB
    ) public pure returns (uint256 tokenC) {
        tokenC = (tokenA * tokenB) % 64;
    }

    /*
     * Owner mint
     * @param to
     * @param token id
     * @param amount
     */
    function ownerMint(
        address to,
        uint256 token,
        uint256 amount
    ) public onlyOwner {
        _mint(to, token, amount, "");
    }

    /*
     * Owner burn
     * @param to address to burn from
     * @param token id
     * @param amount
     */
    function ownerBurn(
        address to,
        uint256 token,
        uint256 amount
    ) public onlyOwner {
        require(hasCustody[to] == false, "Player has full custody");
        _burn(to, token, amount);
    }

    /*
     * Owner merge
     * @param to address to transfer to
     * @param tokenA token id A
     * @param tokenB token id B
     */
    function ownerMerge(
        address to,
        uint256 tokenA,
        uint256 tokenB
    ) public onlyOwner {
        require(hasCustody[to] == false, "Player has full custody");
        require(balanceOf(to, tokenA) > 0, "Token A not owned");
        require(balanceOf(to, tokenB) > 0, "Token B not owned");
        uint256 tokenC = merge(tokenA, tokenB);
        _burn(to, tokenA, 1);
        _burn(to, tokenB, 1);
        _mint(to, tokenC, 1, "");
    }

    /*
     * Player merge
     * @param tokenA token id A
     * @param tokenB token id B
     */
    function playerMerge(uint256 tokenA, uint256 tokenB) public {
        require(balanceOf(msg.sender, tokenA) > 0, "Token A not owned");
        require(balanceOf(msg.sender, tokenB) > 0, "Token B not owned");
        uint256 tokenC = merge(tokenA, tokenB);
        _burn(msg.sender, tokenA, 1);
        _burn(msg.sender, tokenB, 1);
        _mint(msg.sender, tokenC, 1, "");
    }

    /*
     * Set custody
     * @param _bool
     */
    function setCustody(bool _bool) public {
        hasCustody[tx.origin] = _bool;
    }
}
