// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Dexoshi is ERC1155, Ownable {
    constructor() ERC1155("https://example/{id}.json") {}

    /*
     * Contract level URI
     */
    function contractURI() public pure returns (string memory) {
        return
            "data:text/json;charset=utf-8,%7B%22name%22%3A%22Hello%20World%204321%22%2C%22description%22%3A%22Welcome%20to%20my%20collection%20about%20Hello%20World%204321%22%2C%22image%22%3A%22data%3Aimage%2Fpng%3Bbase64%2CPHN2ZyB2aWV3Qm94PSIwIDAgNjgwIDY4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0id2lkdGg6MTAwJTtiYWNrZ3JvdW5kOmJsYWNrOyI%2BPGRlZnM%2BPHBhdGggaWQ9ImNoZWNrIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS4zNiA5Ljg4NkEzLjkzMyAzLjkzMyAwIDAgMCAxOCA4Yy0xLjQyMyAwLTIuNjcuNzU1LTMuMzYgMS44ODdhMy45MzUgMy45MzUgMCAwIDAtNC43NTMgNC43NTNBMy45MzMgMy45MzMgMCAwIDAgOCAxOGMwIDEuNDIzLjc1NSAyLjY2OSAxLjg4NiAzLjM2YTMuOTM1IDMuOTM1IDAgMCAwIDQuNzUzIDQuNzUzIDMuOTMzIDMuOTMzIDAgMCAwIDQuODYzIDEuNTkgMy45NTMgMy45NTMgMCAwIDAgMS44NTgtMS41ODkgMy45MzUgMy45MzUgMCAwIDAgNC43NTMtNC43NTRBMy45MzMgMy45MzMgMCAwIDAgMjggMThhMy45MzMgMy45MzMgMCAwIDAtMS44ODctMy4zNiAzLjkzNCAzLjkzNCAwIDAgMC0xLjA0Mi0zLjcxMSAzLjkzNCAzLjkzNCAwIDAgMC0zLjcxLTEuMDQzWm0tMy45NTggMTEuNzEzIDQuNTYyLTYuODQ0Yy41NjYtLjg0Ni0uNzUxLTEuNzI0LTEuMzE2LS44NzhsLTQuMDI2IDYuMDQzLTEuMzcxLTEuMzY4Yy0uNzE3LS43MjItMS44MzYuMzk2LTEuMTE2IDEuMTE2bDIuMTcgMi4xNWEuNzg4Ljc4OCAwIDAgMCAxLjA5Ny0uMjJaIj48L3BhdGg%2BPHJlY3QgaWQ9InNxdWFyZSIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2IiBzdHJva2U9IiMxOTE5MTkiPjwvcmVjdD48ZyBpZD0icm93Ij48dXNlIGhyZWY9IiNzcXVhcmUiIHg9IjE5NiIgeT0iMTYwIi8%2BPHVzZSBocmVmPSIjc3F1YXJlIiB4PSIyMzIiIHk9IjE2MCIvPjx1c2UgaHJlZj0iI3NxdWFyZSIgeD0iMjY4IiB5PSIxNjAiLz48dXNlIGhyZWY9IiNzcXVhcmUiIHg9IjMwNCIgeT0iMTYwIi8%2BPHVzZSBocmVmPSIjc3F1YXJlIiB4PSIzNDAiIHk9IjE2MCIvPjx1c2UgaHJlZj0iI3NxdWFyZSIgeD0iMzc2IiB5PSIxNjAiLz48dXNlIGhyZWY9IiNzcXVhcmUiIHg9IjQxMiIgeT0iMTYwIi8%2BPHVzZSBocmVmPSIjc3F1YXJlIiB4PSI0NDgiIHk9IjE2MCIvPjwvZz48L2RlZnM%2BPHJlY3Qgd2lkdGg9IjY4MCIgaGVpZ2h0PSI2ODAiIGZpbGw9ImJsYWNrIi8%2BPHJlY3QgeD0iMTg4IiB5PSIxNTIiIHdpZHRoPSIzMDQiIGhlaWdodD0iMzc2IiBmaWxsPSIjMTExIi8%2BPGcgaWQ9ImdyaWQiIHg9IjE5NiIgeT0iMTYwIj48dXNlIGhyZWY9IiNyb3ciIHk9IjAiLz48dXNlIGhyZWY9IiNyb3ciIHk9IjM2Ii8%2BPHVzZSBocmVmPSIjcm93IiB5PSI3MiIvPjx1c2UgaHJlZj0iI3JvdyIgeT0iMTA4Ii8%2BPHVzZSBocmVmPSIjcm93IiB5PSIxNDQiLz48dXNlIGhyZWY9IiNyb3ciIHk9IjE4MCIvPjx1c2UgaHJlZj0iI3JvdyIgeT0iMjE2Ii8%2BPHVzZSBocmVmPSIjcm93IiB5PSIyNTIiLz48dXNlIGhyZWY9IiNyb3ciIHk9IjI4OCIvPjx1c2UgaHJlZj0iI3JvdyIgeT0iMzI0Ii8%2BPC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI4NiwgMjg2KSBzY2FsZSgzKSI%2BPHVzZSBocmVmPSIjY2hlY2siIGZpbGw9IiNERTMyMzciPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwiIHZhbHVlcz0iI0RFMzIzNzsjQzIzNTMyOyNGRjdGOEU7I0U4NEFBOTsjMzcxNDcxOyM1MjVFQUE7IzQ1NzZEMDsjOUFEOUZCOyMzMzc1OEQ7Izc3RDNERTsjOURFRkJGOyM4NkU0OEU7I0E3Q0E0NTsjRkFFMjcyOyNGNEM0NEE7I0ZBRDA2NDsjRjJBODQwOyNGMTg5MzA7I0QwNUMzNTsjRUM3MzY4OyNERTMyMzciIGR1cj0iMTBzIiBiZWdpbj0iYW5pbWF0aW9uLmJlZ2luIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz48L3VzZT48L2c%2BPHJlY3Qgd2lkdGg9IjY4MCIgaGVpZ2h0PSI2ODAiIGZpbGw9InRyYW5zcGFyZW50Ij48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ3aWR0aCIgZnJvbT0iNjgwIiB0bz0iMCIgZHVyPSIwLjJzIiBiZWdpbj0iY2xpY2siIGZpbGw9ImZyZWV6ZSIgaWQ9ImFuaW1hdGlvbiIvPjwvcmVjdD48L3N2Zz4%3D%22%2C%22external_link%22%3A%22https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DqWNQUvIk954%22%2C%22seller_fee_basis_points%22%3A500%2C%22fee_recipient%22%3A%220xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266%22%7D";
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
        tokenC = (tokenA + tokenB) % 255;
    }

    /*
     * Owner mint
     * @param to
     * @param _token
     */
    function ownerMint(address to, uint256 _token) public onlyOwner {
        _mint(to, _token, 1, "");
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
        require(balanceOf(to, tokenA) > 0, "Token A not owned");
        require(balanceOf(to, tokenB) > 0, "Token B not owned");
        uint256 tokenC = merge(tokenA, tokenB);
        require(balanceOf(to, tokenC) == 0, "Already Owned");
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
        require(balanceOf(msg.sender, tokenC) == 0, "Already Owned");
        _burn(msg.sender, tokenA, 1);
        _burn(msg.sender, tokenB, 1);
        _mint(msg.sender, tokenC, 1, "");
    }
}
