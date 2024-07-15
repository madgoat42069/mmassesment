/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import { SongCard, Loader, Error } from '../components';
import { useGetSongsBySearchQuery } from '../redux/Services/shazamcore';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Search = () => {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery({ searchTerm });
  // eslint-disable-next-line
  console.log(data);
  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;
  const songs = data.tracks?.hits?.map((song) => song.track);
  return (
    <div className="flex flex-col ">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Search results for{' '}
          <span className="text-[#b49bd3]">{searchTerm}</span>
        </h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
