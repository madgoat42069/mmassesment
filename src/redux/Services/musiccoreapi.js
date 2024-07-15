import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const musicApi = createApi({
  reducer: 'musicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:5000',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    GetTopCharts: builder.query({ query: () => '/charts/track' }),
    GetSongDetails: builder.query({
      query: ({ songId }) => `/songs/get-details?key=${songId}&locale=en-US`,
    }),
    GetSongsRelated: builder.query({
      query: ({ songId }) => `/songs/list-recommendations?key=${songId}&locale=en-US`,
    }),
    GetArtistDetails: builder.query({
      query: ({ artistId }) => `/artists/get-details?id=${artistId}&l=en-US`,
    }),
    GetArtistTopSongs: builder.query({
      query: ({ artistId }) => `/artists/get-top-songs?id=${artistId}&l=en-US`,
    }),
    GetTopAlbumsDetails: builder.query({
      query: () => `/api/artists/albums`,
    }),
    GetSongsBySearch: builder.query({
      query: ({ searchTerm }) => `/search?term=${searchTerm}&locale=en-US&offset=0&limit=5'`,
    }),
  }),

});
export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongsRelatedQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
  useGetTopAlbumsDetailsQuery,
  useGetSongsBySearchQuery,
} = musicApi;


