import { ethers } from "ethers"

export const convertBlockToTimestamp = async (blockNumber: number) => {
  console.log("BLOCK NUMBER IN INDEX ", blockNumber)

  // Initialize provider
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.public.blastapi.io"
  )

  try {
    // Get block information
    const block = await provider.getBlock(blockNumber)
    console.log("BLOCK IN INDEX ", block)

    if (block) {
      // Access the timestamp property of the block object
      const timestamp = block.timestamp
      const date = new Date(timestamp * 1000).toDateString()
      console.log("DATE IN INDE ", date)
      return date
    } else {
      return new Date(19494421000).toDateString()
    }
  } catch (err) {
    console.error("Error:", err)
    throw err // Propagate the error
  }
}
