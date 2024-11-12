import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const photoApi = createApi({
  reducerPath: 'photoApi', // a unique name for the API slice
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://chaw.giize.com/api/v1/', // Base URL for API
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query({
      query: () => 'photos', // Endpoint to fetch photos
    }),
  }),
});

export const { useGetPhotosQuery } = photoApi;
