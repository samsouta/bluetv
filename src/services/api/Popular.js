import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const Popular = createApi({
    reducerPath : "popular",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1"
    }),

    endpoints: (builder) => ({
        getPopular: builder.query({
            query: () => '/popular',
        }),
    })
}) 

export const {useGetPopularQuery} = Popular;