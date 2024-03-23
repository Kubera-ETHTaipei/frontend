"use client"
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
import { useBlockNumber } from "wagmi"
import { config } from "@/utils/config"
function User() {
  //   const { address } = useAccount()
  const address = "0x3d8846eA345A06938D3E1FDA2c59a98d750c1582"
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  //   const { data: latestBlockNum } = useBlockNumber({
  //     config: config,
  //     chainId: mainnet.id,
  //   })
  const latestBlockNum = 19494702
  console.log(latestBlockNum)

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20credits_11155111_1379`
      )
      const json = await data.json()
      console.log(json)
      for (let i = 0; i < json.length; i++) {
        console.log(json[i].address)
        console.log(address)

        if (json[i].address.toLowerCase() == address.toLowerCase()) {
          console.log("Found")
          console.log(json[i])
          console.log(json[i].timestamp)
          //   const d = await convertBlockToTimestamp(json[i].timestamp)
          //   console.log(d)
          setData({
            address: json[i].address,
            score: json[i].score,
            timestamp: await convertBlockToTimestamp(json[i].timestamp),
            blockNum: json[i].timestamp,
          })
        }
      }
    }
    fetchData()
  }, [address])

  async function handleClick() {
    setLoading(true)
    console.log(data)
    try {
      if (data) {
        console.log(latestBlockNum, address, data.blockNum)

        const response = await fetch(
          `http://84.247.136.249:3002/update?blockNum=${parseInt(
            latestBlockNum
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
        // const response = await fetch(
        //   `http://localhost:3002/insert?blockNum=${parseInt(
        //     latestBlockNum
        //   )}&address=${address}`,
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // )
        const response = await fetch(
          `http://84.247.136.249:3002/insert?blockNum=19494702&address=${address}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const json = await response.json()
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
        <div className="text-sm">Address: {address}</div>
        <div className="text-sm">Credit: {data?.score}</div>
        <div className="text-sm">Last Updated on Block: {data?.timestamp}</div>
      </CardContent>
      <CardFooter className="flex justify-center ">
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="w-full" onClick={handleClick}>
            Update
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default User
