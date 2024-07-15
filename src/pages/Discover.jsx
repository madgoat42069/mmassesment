import { useState, useEffect } from 'react';
import { SongCard, Loader, Error } from '../components';
import { useDispatch, useSelector } from 'react-redux';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/artists/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover Pop
        </h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.map(artist => (
          artist.albums.map(album => (
            album.songs.map((song, i) => (
              <SongCard
                key={song._id}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
              />
            ))
          ))
        ))}
      </div>
    </div>
  );
};

export default Discover;

