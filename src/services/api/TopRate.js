import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const TopRate = createApi({
    reducerPath : "toprate",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1"
    }),

    endpoints: (builder) => ({
        getTopRate: builder.query({
            query: () => '/toprates',
        }),
    })
}) 

export const {useGetTopRateQuery} = TopRate;