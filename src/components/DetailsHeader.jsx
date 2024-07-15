import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const Artist = artistData?.artists[artistId]?.attributes;

  return (
    <div className="relative w-full flex flex-col ">
      <div className="w-full rounded-2xl bg-gradient-to-l from-transparent to to-black sm:h-48 h-58" />
      <div className="absolute inset-0 flex items-center">
        <img
          src={
            artistId
              ? Artist?.artwork?.url.replace('{w}', '500').replace('{h}', '500')
              : songData?.images?.coverart
          }
          className="ml-2 sm:w-44 w-24 sm:h-44 h-24 rounded-2xl object-cover  shadow-xl shadow-black"
          alt="ART"
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? Artist?.name : songData?.title}
          </p>
          {!artistId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className="text-base text-gray-400 mt-2">
                {songData?.subtitle}
              </p>
            </Link>
          )}
          <p className="font-weight-500 text-white">
            {artistId ? Artist?.genreNames[0] : songData?.genres?.primary}
          </p>
        </div>
      </div>
    </div>
  );
};
export default DetailsHeader;
