import React from 'react';
import { Link } from 'react-router-dom';

const AlbumCard = ({ album, index, isPlaying, activeSong }) => {
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className="absolute inset-0 justify-center items-center backdrop-blur-sm bg-opacity-50 group-hover:flex">
          {/* Overlay content can be added here */}
        </div>
        <img alt={album.title} src={album.image || 'default-image.jpg'} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/albums/${album._id}`}>{album.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={`/artists/${album.artist._id}`}>{album.artist.name}</Link>
        </p>
      </div>
    </div>
  );
};

export default AlbumCard;
