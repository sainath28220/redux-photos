import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const removeUser = createAsyncThunk('user/remove',async (user) => {
  const response = await axios.delete(`http://localhost:3001/users/${user.id}`);
  return response.data
})

export { removeUser };