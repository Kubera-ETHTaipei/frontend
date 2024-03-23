"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { convertBlockToTimestamp } from "@/utils"

import { useAccount } from "wagmi"
function User() {
  //   const { address } = useAccount()
  const address = "0x63f40a6b30549a2e060eff00f5dcb31eb22e0c58"
  const blockNum = 19474080
  const [data, setData] = useState()

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
          console.log(json[i].timestamp)
          const d = await convertBlockToTimestamp(json[i].timestamp)
          console.log(d)
          console.log(await convertBlockToTimestamp(json[i].timestamp))
          setData({
            address: json[i].address,
            score: json[i].score,
            timestamp: await convertBlockToTimestamp(json[i].timestamp),
          })
        }
      }
    }
    fetchData()
  }, [address])

  async function handleClick() {
    console.log(data)
    try {
      if (data) {
        const response = await fetch(
          `http://localhost:3002/update?blockNum=${blockNum}&address=${address}`,
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
        const response = await fetch(
          `http://localhost:3002/insert?blockNum=${blockNum}&address=${address}`,
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
    }
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
        <Button className="w-full" onClick={handleClick}>
          Update
        </Button>
      </CardFooter>
    </Card>
  )
}

export default User
