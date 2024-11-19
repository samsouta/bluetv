import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const DetailApi = createApi({
  reducerPath: 'DetailApi',
  baseQuery: fetchBaseQuery({ baseUrl:'https://bluetv.x10.mx/api/v1' }),
  endpoints: (builder) => ({
    getMovieById: builder.query({
      query: (id) => {
        return `/movies/${id}`;
      },
      // Optional: Add additional logging for response data
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

// Export the auto-generated hook for the `getMovieById` query
export const { useGetMovieByIdQuery } = DetailApi;
