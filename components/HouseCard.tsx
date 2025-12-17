import React from 'react';
import { Listing } from '../types';
import { Navigation, Bed, Bath, Expand } from 'lucide-react';

interface HouseCardProps {
  listing: Listing;
  onClose: () => void;
  onAnalyze: (listing: Listing) => void;
}

const HouseCard: React.FC<HouseCardProps> = ({ listing, onClose, onAnalyze }) => {
  const handleGetDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${listing.lat},${listing.lng}&travelmode=driving`;
        window.open(url, '_blank');
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="w-80 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans">
      <div className="relative h-48">
        <img 
          src={listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-md">
          {listing.type}
        </div>
      </div>
      
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-lg leading-tight text-slate-800">{listing.title}</h3>
        <p className="text-slate-500 text-xs truncate">{listing.address}</p>
        
        <div className="flex gap-4 text-slate-600 text-sm my-2">
          <div className="flex items-center gap-1">
            <Bed size={14} /> <span>{listing.bed}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={14} /> <span>{listing.bath}</span>
          </div>
          <div className="flex items-center gap-1">
            <Expand size={14} /> <span>{listing.sqft} ft²</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2 pt-3 border-t border-slate-100">
          <span className="font-bold text-lg text-blue-600">${listing.price}<span className="text-xs text-slate-400 font-normal">/night</span></span>
          <div className="flex gap-2">
            <button 
              onClick={() => onAnalyze(listing)}
              className="bg-indigo-50 text-indigo-600 p-2 rounded-full hover:bg-indigo-100 transition-colors"
              title="Ask AI"
            >
              <span className="text-xs font-bold">AI</span>
            </button>
            <button 
              onClick={handleGetDirections}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-1 shadow-lg shadow-blue-200"
              title="Get Directions"
            >
              <Navigation size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;