import { ethers } from "ethers"
export const convertBlockToTimestamp = async (blockNumber: number) => {
  // Initialize provider
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.public.blastapi.io"
  )

  // Get block information
  const d = provider
    .getBlock(blockNumber)
    .then((block) => {
      // Access the timestamp property of the block object
      const timestamp = block.timestamp
      const date = new Date(timestamp * 1000).toDateString()
      console.log("DATE IN INDE ", date)

      return date
    })
    .catch((err) => {
      console.error("Error:", err)
    })
  return d
}
