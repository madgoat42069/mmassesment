/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, i, data, isPlaying, activeSong }) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center backdrop-blur-sm  bg-opactiy-50 group-hover:flex ${
            activeSong?.title === song.title
              ? 'flex backdrop-blur-sm  bg-opactiy-70'
              : 'hidden'
          }`}
        >
        </div>
        <img alt={song.title} src={song.images?.coverart} />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className=" text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artist
                ? `/artists/${song?.artist[0]?.adamid}`
                : '/top-artists'
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
