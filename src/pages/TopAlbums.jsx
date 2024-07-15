import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader, Error } from '../components';
import axios from 'axios';
import AlbumCard from '../components/AlbumCard'; // Assuming AlbumCard is in a separate file

const TopAlbums = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/artists/albums');
        setData(response.data);
        setIsFetching(false);
      } catch (err) {
        setError(true);
        setIsFetching(false);
      }
    };

    fetchArtists();
  }, []);

  if (isFetching) return <Loader title="Loading Albums..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Top Albums</h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((album, index) => (
          <AlbumCard key={index} album={album} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TopAlbums;

