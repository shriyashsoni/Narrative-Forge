import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedSection from './components/TrustedSection';
import FreedomSection from './components/FreedomSection';
import PrecisionSection from './components/PrecisionSection';
import Dashboard from './components/Dashboard';
import Trade from './components/Trade';
import Contracts from './components/Contracts';
import Whitepaper from './components/Whitepaper';
import { useAccount } from 'wagmi';

function LandingPage() {
  return (
    <>
      <Hero />
      <TrustedSection />
      <FreedomSection />
      <PrecisionSection />
    </>
  );
}

function App() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isConnected && location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [isConnected, location, navigate]);

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/docs" element={<Whitepaper />} />
      </Routes>
    </main>
  );
}

export default App;
