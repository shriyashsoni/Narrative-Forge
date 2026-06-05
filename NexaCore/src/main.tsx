import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { mainnet, sepolia } from 'wagmi/chains';

const valueChainMainnet = {
  id: 286623,
  name: "ValueChain Mainnet",
  nativeCurrency: { name: "Value", symbol: "VALUE", decimals: 18 },
  rpcUrls: { default: { http: ["https://mainnet-rpc.valuechain.dev"] } },
  blockExplorers: { default: { name: "ValueScan", url: "https://scan.valuechain.dev" } },
};

const sodexTestnet = {
  id: 138565,
  name: "SoDEX Testnet",
  nativeCurrency: { name: "VALUE", symbol: "VALUE", decimals: 18 },
  rpcUrls: { default: { http: ["https://testnet-rpc.valuechain.dev"] } },
  blockExplorers: { default: { name: "ValueScan", url: "https://testnet.scan.valuechain.dev" } },
};

const config = getDefaultConfig({
  appName: 'NarrativeForge',
  projectId: 'd83151480f2d6e75a2879a834224765d',
  chains: [sodexTestnet, mainnet, sepolia, valueChainMainnet],
  transports: {
    [sodexTestnet.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [valueChainMainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: "#C86FFF", 
            accentColorForeground: "#ffffff",
            borderRadius: "medium",
          })}
          initialChain={sepolia}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
