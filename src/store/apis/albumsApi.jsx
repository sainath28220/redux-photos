import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001'
  }),
  endpoints(builder){
    return{
      FetchAlbums: builder.query({
        query:(user)=>{
          return{
            url: '/albums',
            params: {
              userId: user.id
            },
            method: 'GET'
          };
        }
      })
    };
  }
});

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };