import { getDefaultWallets, getDefaultConfig } from "@rainbow-me/rainbowkit"
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets"
import {
  localhost,
  sepolia,
  scrollTestnet,
  thunderTestnet,
  optimismSepolia,
} from "wagmi/chains"

const { wallets } = getDefaultWallets()
const eth = 0.1
export const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ""
if (!WALLETCONNECT_PROJECT_ID) {
  console.warn(
    "You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable"
  )
}
export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: WALLETCONNECT_PROJECT_ID,
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    sepolia,
    scrollTestnet,
    thunderTestnet,
    optimismSepolia,
    localhost,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
})
