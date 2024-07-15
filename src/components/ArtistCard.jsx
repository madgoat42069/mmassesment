import React from 'react';
import { Link } from 'react-router-dom';

const ArtistCard = ({ artist, index }) => {
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className="absolute inset-0 justify-center items-center backdrop-blur-sm bg-opacity-50 group-hover:flex">
          {/* Overlay content can be added here */}
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/artists/${artist._id}`}>{artist.name}</Link>
        </p>
        {/* Additional artist details can be added here */}
      </div>
    </div>
  );
};

export default ArtistCard;
