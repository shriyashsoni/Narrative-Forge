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
import DeveloperDocs from './components/DeveloperDocs';
import Footer from './components/Footer';
import { useAccount } from 'wagmi';

function LandingPage() {
  return (
    <>
      <Hero />
      <TrustedSection />
      <FreedomSection />
      <PrecisionSection />
      <Footer />
    </>
  );
}

function App() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  // Removed forced redirect to allow connected users to visit the homepage

  const isDocs = location.pathname === '/docs';

  return (
    <main className="bg-white min-h-screen">
      {!isDocs && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/docs" element={<DeveloperDocs />} />
      </Routes>
    </main>
  );
}

export default App;
