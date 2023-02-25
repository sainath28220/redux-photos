import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
  reducerPath: (result,err,user)=>{
    return [{ type: 'Album',id: user.id }];
  },
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001'
  }),
  endpoints(builder){
    return{
      addAlbum: builder.mutation({
        invalidatesTags: ['Album'],
        query: (user) => {
          return{
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName()
            }
          }
        }
      }),
      fetchAlbums: builder.query({
        providesTags: (result,err,user) => {
          return [{ type: 'Album', id: user.id }]
        },
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

export const { useFetchAlbumsQuery,useAddAlbumMutation } = albumsApi;
export { albumsApi };