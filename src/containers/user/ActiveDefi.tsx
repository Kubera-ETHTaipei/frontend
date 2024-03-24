"use client"
import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

function ActiveDefi() {
  const [data, setData] = useState<Boolean>(false)
  const [loading, setLoading] = useState<Boolean>(false)
  const [used, setUsed] = useState<Boolean>(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submit")

    setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const creditScore = formData.get("value") as number | null
    const address = formData.get("address") as string
    console.log(creditScore)
    console.log(address)
    const data = await fetch(
      `https://testnets.tableland.network/api/v1/query?statement=select%20*%20from%20credits_11155111_1379%20where%20address%20=%20'${address}'`
    )
    const json = await data.json()
    console.log(json)
    if (creditScore !== null && json[0]?.score > creditScore) {
      setUsed(true)
      setData(true)
      console.log("Eligible")
    } else {
      setUsed(true)
      setData(false)
      console.log("Not Eligible")
    }
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div className="flex flex-col  space-y-2 w-1/2 items-center">
          <Input name="address" placeholder="0xabcd" required />
          <Input name="value" type="number" placeholder="5" required />
          <Button type="submit" className="w-full">
            Check eligibility
          </Button>
        </div>
      </form>
      <div className="mt-3">
        {used &&
          (data ? (
            <div className="text-green-500">Eligible</div>
          ) : (
            <div className="text-red-500">Not Eligible</div>
          ))}
      </div>
    </div>
  )
}

export default ActiveDefi
