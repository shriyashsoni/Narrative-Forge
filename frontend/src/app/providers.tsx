"use client";

import React from "react";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

// Define ValueChain Network (from SoDEX Docs)
const valueChainMainnet = {
  id: 286623,
  name: "ValueChain Mainnet",
  nativeCurrency: { name: "Value", symbol: "VALUE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mainnet-rpc.valuechain.dev"] },
  },
  blockExplorers: {
    default: { name: "ValueScan", url: "https://scan.valuechain.dev" },
  },
};

const valueChainTestnet = {
  id: 138565,
  name: "ValueChain Testnet",
  nativeCurrency: { name: "Value", symbol: "VALUE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.valuechain.dev"] },
  },
  blockExplorers: {
    default: { name: "ValueScan", url: "https://testnet.scan.valuechain.dev" },
  },
};

const config = getDefaultConfig({
  appName: "NarrativeForge",
  projectId: "d83151480f2d6e75a2879a834224765d", 
  chains: [valueChainMainnet, valueChainTestnet],
  ssr: true, 
  transports: {
    [valueChainMainnet.id]: http(),
    [valueChainTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: "#D9F3E5", 
            accentColorForeground: "#111827",
            borderRadius: "medium",
          })}
          initialChain={valueChainTestnet}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
