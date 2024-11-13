import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const photoApi = createApi({
  reducerPath: 'photoApi', // a unique name for the API slice
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bluetv.x10.mx/api/v1/', // Base URL for API
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query({
      query: () => 'photos', // Endpoint to fetch photos
    }),
  }),
});

export const { useGetPhotosQuery } = photoApi;
