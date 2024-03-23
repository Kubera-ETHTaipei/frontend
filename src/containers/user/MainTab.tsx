import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import User from "./User"
import Defi from "./Defi"

export function MainTabs() {
  return (
    <div className="flex justify-center">
      <Tabs defaultValue="user" className="w-[800px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="DeFi">DeFi</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <User />
        </TabsContent>
        <TabsContent value="DeFi">
          <Defi />
        </TabsContent>
      </Tabs>
    </div>
  )
}
