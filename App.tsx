import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import AIAssistant from './components/AIAssistant';
import { MOCK_LISTINGS } from './constants';
import { Listing } from './types';
import { Key, ArrowRight } from 'lucide-react';

const getEnv = (key: string) => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return '';
};

// Use the provided token as a fallback for this demo session
const DEMO_TOKEN = "pk.eyJ1Ijoic3N0dGVldnZlZW5ubm4iLCJhIjoiY21peWN2bjllMDY2ZzNkc2ViY2tscnpnayJ9.6eHgoIFkVVwVeYjlh-YxPA";

function App() {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenInput, setTokenInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Try env var
    const envToken = getEnv('NEXT_PUBLIC_MAPBOX_TOKEN');
    
    // 2. Try local storage
    const storedToken = localStorage.getItem('vantage_mapbox_token');

    // 3. Use Env, Stored, or the Demo Token provided by user
    const tokenToUse = (envToken && !envToken.includes('placeholder')) ? envToken : (storedToken || DEMO_TOKEN);

    if (tokenToUse) {
      setMapboxToken(tokenToUse);
    }
    
    setIsLoading(false);
  }, []);

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      localStorage.setItem('vantage_mapbox_token', tokenInput.trim());
      setMapboxToken(tokenInput.trim());
    }
  };

  const handleListingSelect = (listing: Listing | null) => {
    setSelectedListing(listing);
    if (listing) {
       // Optional: auto-open chat logic
    }
  };

  if (isLoading) {
    return <div className="w-full h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
  }

  // If no token is found (and no demo token), render the Entry Modal
  if (!mapboxToken) {
    return (
      <div className="w-full h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-indigo-600 p-6 text-white text-center">
            <h1 className="text-2xl font-bold mb-2">Welcome to Vantage</h1>
            <p className="text-indigo-100 text-sm">PropTech Visualization Demo</p>
          </div>
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-indigo-50 p-4 rounded-full">
                <Key className="text-indigo-600" size={32} />
              </div>
            </div>
            
            <h2 className="text-center text-xl font-bold text-slate-800 mb-2">Mapbox API Key Required</h2>
            <p className="text-center text-slate-500 mb-6 text-sm">
              To render the 3D maps, this demo requires a public Mapbox Access Token.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Public Token</label>
                <input 
                  type="text" 
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="pk.eyJ1..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              
              <button 
                onClick={handleTokenSubmit}
                disabled={!tokenInput}
                className="w-full bg-indigo-600 text-white rounded-lg py-3 font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Launch App</span>
                <ArrowRight size={16} />
              </button>

              <p className="text-xs text-center text-slate-400 mt-4">
                Don't have one? <a href="https://mapbox.com" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Get a free token from Mapbox</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      {/* Main Map Area */}
      <div className="flex-1 relative">
        <MapComponent 
          listings={MOCK_LISTINGS} 
          selectedListing={selectedListing}
          onSelectListing={handleListingSelect}
          mapboxToken={mapboxToken}
        />
        
        {/* Floating AI Assistant */}
        <AIAssistant 
          selectedListing={selectedListing} 
          isOpen={isAIChatOpen} 
          setIsOpen={setIsAIChatOpen} 
        />
      </div>
    </div>
  );
}

export default App;