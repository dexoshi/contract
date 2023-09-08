// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Dexoshi is ERC1155, Ownable {
    uint256 public immutable MAX_TOKEN_ID = 256;

    constructor() ERC1155("https://example/{id}.json") {}

    /*
     * Merge
     * @param _tokenA token id A
     * @param _tokenB token id B
     */
    function merge(
        uint256 _tokenA,
        uint256 _tokenB
    ) public pure returns (uint256 tokenC) {
        tokenC = (_tokenA * _tokenB) % MAX_TOKEN_ID;
    }

    /*
     * Owner mint
     * @param _to
     * @param _token
     */
    function ownerMint(address _to, uint256 _token) public onlyOwner {
        _mint(_to, _token, 1, "");
    }

    /*
     * Owner merge
     * @param _to address to transfer to
     * @param _tokenA token id A
     * @param _tokenB token id B
     */
    function ownerMerge(
        address _to,
        uint256 _tokenA,
        uint256 _tokenB
    ) public onlyOwner {
        require(balanceOf(_to, _tokenA) > 0, "Token A not owned");
        require(balanceOf(_to, _tokenB) > 0, "Token B not owned");
        uint256 tokenC = merge(_tokenA, _tokenB);
        require(balanceOf(_to, tokenC) == 0, "Already Owned");
        _burn(_to, _tokenA, 1);
        _burn(_to, _tokenB, 1);
        _mint(_to, tokenC, 1, "");
    }

    /*
     * Player merge
     * @param _tokenA token id A
     * @param _tokenB token id B
     */
    function playerMerge(uint256 _tokenA, uint256 _tokenB) public {
        require(balanceOf(msg.sender, _tokenA) > 0, "Token A not owned");
        require(balanceOf(msg.sender, _tokenB) > 0, "Token B not owned");
        uint256 tokenC = merge(_tokenA, _tokenB);
        require(balanceOf(msg.sender, tokenC) == 0, "Already Owned");
        _burn(msg.sender, _tokenA, 1);
        _burn(msg.sender, _tokenB, 1);
        _mint(msg.sender, tokenC, 1, "");
    }
}
