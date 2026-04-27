import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import { Loading } from './pages/Loading';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loading key="loading" />
        ) : (
          <div key="app-layout" className="w-full">
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          </div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
