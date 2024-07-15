/* eslint-disable no-unused-vars */
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Error, Loader } from '../components';
import {
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
} from '../redux/Services/shazamcore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  //
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery({ artistId });
  const { data, isFetching: isFetchingArtistTopsongs } = useGetArtistTopSongsQuery({ artistId });
  // eslint-disable-next-line
  console.log(data, artistData);
  //
  //
  if (isFetchingArtistDetails) {
    return <Loader title="Searching artist details..." />;
  }
  if (isFetchingArtistTopsongs) {
    return <Loader title="Searching Songs..." />;
  }
  const Artist = artistData.data[0]?.attributes;
  if (error) return <Error />;
  //
  return (
    <div className="flex flex-col">
      <div className="relative w-full flex flex-col ">
        <div className="w-full rounded-2xl bg-gradient-to-l from-transparent to to-black sm:h-48 h-58" />
        <div className="absolute inset-0 flex items-center">
          <img
            src={Artist?.artwork?.url
              .replace('{w}', '500')
              .replace('{h}', '500')}
            className="ml-2 sm:w-44 w-24 sm:h-44 h-24 rounded-2xl object-cover  shadow-xl shadow-black"
            alt="ART"
          />
          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">
              {Artist?.name}
            </p>
            <p className="font-weight-500 text-white">
              {Artist?.genreNames[0]}
            </p>
          </div>
        </div>
      </div>
      <p className="font-bold sm:text-2xl text-xl mt-6 text-white">
        Related Songs
      </p>
      {data && data.data?.map((oneD) => (
        <div
          className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
            activeSong?.title === oneD.attributes?.name
              ? 'bg-[#4c426e]'
              : 'bg-transparent'
          } py-2 p-4 rounded-lg cursor-pointer mb-2`}
        >
          {/* <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3> */}
          <div className="flex-1 flex flex-row justify-between items-center">
            <img
              className="w-20 h-20 rounded-lg"
              src={Artist?.artwork?.url
                .replace('{w}', '500')
                .replace('{h}', '500')}
              alt={oneD.attributes?.name}
            />
            <div className="flex-1 flex flex-col justify-center mx-3">
              {/* <Link to={`/songs/${oneD.id}`}> */}
              <p className="text-xl font-bold text-white">
                {oneD.attributes.name}
              </p>
              {/* </Link> */}
              <p className="text-base text-gray-300 mt-1">
                {oneD.attributes?.artistName}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistDetails;
