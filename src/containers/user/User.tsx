import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { convertBlockToTimestamp } from "@/utils"

import { mainnet } from "wagmi/chains"
import { useBlockNumber, useAccount } from "wagmi"
import { config } from "@/utils/config"

interface UserData {
  address: string
  score: number
  timestamp: number
  blockNum: number
  isFetched?: boolean
}

function User() {
  const { address } = useAccount()

  const [data, setData] = useState<UserData | undefined>()
  const [loading, setLoading] = useState(false)
  // const { data: latestBlockNum } = useBlockNumber({
  //   config: config,
  //   chainId: mainnet.id,
  // })
  const latestBlockNum = 19494421
  console.log(latestBlockNum)

  async function fetchData() {
    if (!address) return
    const response = await fetch(
      `https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20credits_11155111_1379`
    )
    const json = await response.json()
    for (let i = 0; i < json.length; i++) {
      if (json[i].address?.toLowerCase() === address?.toLowerCase()) {
        setData({
          address: json[i].address,
          score: json[i].score,
          timestamp:
            parseInt(await convertBlockToTimestamp(json[i].timestamp)) || 0,
          blockNum: json[i].timestamp,
          isFetched: true,
        })
        return // No need to continue the loop once data is found
      }
    }
    setData({
      address: address,
      score: 0,
      timestamp: 0,
      blockNum: 0,
      isFetched: false,
    })
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [address])

  async function handleClick() {
    setLoading(true)
    try {
      if (data && data?.timestamp != 0 && latestBlockNum) {
        console.log(latestBlockNum, address, data.blockNum)

        const response = await fetch(
          `http://84.247.136.249:3002/update?blockNum=${parseInt(
            latestBlockNum.toString()
          )}&address=${address}&lastBlock=${data.blockNum}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const json = await response.json()
        console.log(json)
      } else {
        console.log("No data")
        if (!latestBlockNum) {
          console.log("No block number")
          setLoading(false)
          return
        }
        const response = await fetch(
          `http://84.247.136.249:3002/insert?blockNum=${parseInt(
            latestBlockNum.toString()
          )}&address=${address}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const json = await response.json()
        await fetchData()
        console.log(json)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Info</CardTitle>
        <CardDescription>
          See your credit score and Updates changes to your Credit Score.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {data && data?.isFetched ? (
          <>
            <div className="text-sm">Address: {address}</div>
            <div className="text-xl">Credit: {data?.score}</div>
            <div className="text-sm">Last Updated Block: {data?.blockNum}</div>
          </>
        ) : (
          <>
            <div className="text-sm">Address: {address}</div>
            <div className="text-sm">No data found</div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-center ">
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="w-full" onClick={handleClick}>
            {data?.isFetched ? "Update" : "Generate"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default User
