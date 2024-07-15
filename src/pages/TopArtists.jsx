import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArtistCard, Loader, Error } from '../components';

const TopArtists = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/artists');
        setData(response.data);
        setIsFetching(false);
      } catch (err) {
        setError(true);
        setIsFetching(false);
      }
    };

    fetchArtists();
  }, []);

  if (isFetching) return <Loader title="Loading top Artists..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Top Artists</h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.map((artist, i) => (
          <ArtistCard key={artist._id} artist={artist} index={i} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
