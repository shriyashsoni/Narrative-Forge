import React from 'react';
import { Code, ShieldCheck, Cpu, Database } from 'lucide-react';

export default function Contracts() {
  return (
    <div className="min-h-screen bg-[#05070A] text-gray-300 pt-32 pb-12 px-4 sm:px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Smart Contract Architecture</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            NarrativeForge is powered by a robust, secure, and fully verified suite of smart contracts deployed on the Ethereum Sepolia Testnet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#0b0e14] border border-[#1f2937] p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-brand-purple/20 text-brand-purple rounded-full flex items-center justify-center">
              <Code size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">SSI Protocol (v1)</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our core smart contract, `SSIProtocol.sol`, handles the immutable forging of AI-generated indexes. It permanently records narrative themes, asset baskets, and their precise basis-point weightings directly onto the blockchain.
            </p>
            <div className="bg-[#111827] border border-[#1f2937] px-4 py-2 rounded-lg text-xs font-mono text-gray-500 w-full mt-4 truncate">
              0xCE2979887785d415b407727CDd8f6Ed752AAE335
            </div>
          </div>

          <div className="bg-[#0b0e14] border border-[#1f2937] p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
              <Cpu size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">AI Oracle Integration</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our backend Python intelligence engine (powered by Gemini 1.5 Pro) operates as a highly secure off-chain oracle, mathematically validating index weights to equal exactly 10,000 basis points before cryptographically signing the transaction payload.
            </p>
          </div>

          <div className="bg-[#0b0e14] border border-[#1f2937] p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center">
              <Database size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">SoDEX Execution Engine</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Spot trading operations are routed through our dedicated API bridge connecting directly to the SoDEX high-frequency matching engine, ensuring zero-slippage execution.
            </p>
          </div>

          <div className="bg-[#0b0e14] border border-[#1f2937] p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">Security & Audits</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              All interactions require explicit user signatures via Web3 wallet providers. No user private keys are ever stored on our servers. The contracts implement strict reentrancy guards and parameter validation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
