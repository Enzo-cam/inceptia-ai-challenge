import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const getClients = createAsyncThunk(
    "clients/getClients",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.get('https://admindev.inceptia.ai/api/v1/clients/', {
        headers: {
          'Authorization': `JWT ${user.token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Definición del slice de clients
const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
      bots: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getClients.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getClients.fulfilled, (state, action) => {
          state.bots = action.payload;
          state.loading = false;
        })
        .addCase(getClients.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
        });
    },
  });
  
  export default clientsSlice.reducer;