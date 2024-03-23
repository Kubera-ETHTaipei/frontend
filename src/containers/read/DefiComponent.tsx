"use client"
import { useReadContract, useAccount } from "wagmi"
import { contractAddress } from "@/constants"
import abi from "@/abi/abi.json"
import ActiveDefi from "../user/ActiveDefi"
import UnActive from "../user/UnActive"

export function DefiComponent() {
  const { address } = useAccount()
  const {
    data: isApproved,
    status,
    isLoading,
    error,
  } = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "getTrustedProtocol",
    args: [address],
  })
  console.log(isApproved, status, isLoading, error)

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>{isApproved ? <ActiveDefi /> : <UnActive />}</>
      )}
    </div>
  )
}
