/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongsRelatedQuery,
} from '../redux/Services/musiccoreapi';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // Fetching song details and related songs using Redux queries/hooks
  const { data: songData, isLoading: isFetchingSongDetails, isError: songDetailsError } = useGetSongDetailsQuery(songid);
  const { data: relatedSongs, isLoading: isFetchingRelatedSongs, isError: relatedSongsError } = useGetSongsRelatedQuery(songid);

  // Loading state
  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title="Searching song details..." />;
  }

  // Error handling
  if (songDetailsError || relatedSongsError) {
    return <Error />;
  }

  // Play and pause handlers
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, relatedSongs, i }));
    dispatch(playPause(true));
  };

  // Rendering song details and related songs
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={songData.artistId} songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData.sections.map(section => {
            if (section.type === 'LYRICS' && section.text) {
              return section.text.map((line, index) => (
                <p key={index} className="text-gray-400 text-base my-1">{line}</p>
              ));
            } else {
              return <p key="not-found" className="text-gray-400 text-base my-1">Lyrics not found!</p>;
            }
          })}
        </div>
      </div>
      <RelatedSongs
        songs={relatedSongs} // Assuming relatedSongs is an array of songs
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
