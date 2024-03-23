"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DefiComponent } from "../read/DefiComponent"

function Defi() {
  return (
    <Card className="text-left">
      <CardHeader>
        <CardTitle>DeFi</CardTitle>
        <CardDescription>
          Whitelisted accoutns can check if the user are having your expected
          Zscore
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <DefiComponent />
      </CardContent>
    </Card>
  )
}

export default Defi
