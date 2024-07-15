import React, { useState } from 'react';
import axios from 'axios';

const AlbumCard = ({ album, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [albumDetails, setAlbumDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAlbumDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/artists/${index}/details`);
      setAlbumDetails(response.data);
      setShowDetails(true);
      setIsLoading(false);
    } catch (err) {
      setError('Error fetching album details');
      setIsLoading(false);
    }
  };

  const toggleDetails = () => {
    if (showDetails) {
      setShowDetails(false);
    } else {
      fetchAlbumDetails();
    }
  };

  return (
    <div
      className="relative w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <img
          alt={album.title}
          src={album.cover || 'default-album-cover.jpg'}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute bottom-4 left-4">
          <button
            onClick={toggleDetails}
            className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold text-lg text-white truncate">{album.title}</p>
        <p className="text-sm truncate text-gray-300 mt-1">{album.artist}</p>
      </div>
      {showDetails && (
        <div className="mt-4">
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {albumDetails && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{albumDetails.title}</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                  Close
                </button>
              </div>
              <p className="text-gray-700 mt-2">{albumDetails.description.trim()}</p>
              <ul className="mt-4">
                {albumDetails.songs.map((song, idx) => (
                  <li key={idx} className="text-gray-700">
                    {song.title} - {song.length}
                  </li>
                ))}
              </ul>
            </div>

  )
}
</div>
)}
</div>
)
  ;
};

export default AlbumCard;

