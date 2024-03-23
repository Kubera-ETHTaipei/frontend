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

function Defi() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>DeFi</CardTitle>
        <CardDescription>
          Whitelisted accoutns can check if the user are having your expected
          Zscore
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2"></CardContent>
      <CardFooter>
        <Button>Save DeFi</Button>
      </CardFooter>
    </Card>
  )
}

export default Defi
