import { ethers } from "hardhat";
async function main() {
  const contract = await ethers.getContract("Cuchulink");
  const tx = await contract.createCuchubal("Prueba", ethers.parseEther("0.1"), 1, 3, "testcode", {
    value: ethers.parseEther("0.1"),
  });
  await tx.wait();
  const info = await contract.getCuchubalInfo("testcode");
  console.log("Successfully created Cuchubal:", info[0], "with Round amount:", ethers.formatEther(info[1]), "ETH");
}
main().catch(console.error);
