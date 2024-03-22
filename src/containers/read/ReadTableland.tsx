"use client"
import { useReadContract } from "wagmi"
import abi from "@/abi/abi.json"
import { contractAddress } from "@/constants"
export function ReadContract() {
  const {
    data: balance,
    status,
    isLoading,
    error,
  } = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "retrieve",
  })
  console.log(balance, status, isLoading, error)

  return (
    <div>
      {isLoading ? <div>Loading</div> : <p>Balance: {balance?.toString()}</p>}
    </div>
  )
}
