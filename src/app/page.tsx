"use client"

import { MainTabs } from "@/containers/user/MainTab"

export default function Home() {
  return (
    <main className="p-24">
      <h1 className="text-center text-3xl">
        <MainTabs />
      </h1>
    </main>
  )
}
