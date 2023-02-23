import { configureStore } from '@reduxjs/toolkit';
import {usersReducer} from './slices/usersSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { albumsApi } from './apis/albumsApi'

const store = configureStore({
  reducer:{
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer, //same as [reducerpath in albumsApi]albums: albumsApi.reducer
  },
  middleware: (getDefaultMiddleWare) =>{
    return getDefaultMiddleWare()
    .concat(albumsApi.middleware);
  }
})

//setup listeners one time
setupListeners(store.dispatch);

export { store }
export * from './thunks/fetchUsers'
export * from './thunks/addUser'
export * from './thunks/removeUser'
export { useFetchAlbumsQuery,useAddAlbumMutation } from './apis/albumsApi'