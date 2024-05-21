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


export const getInboundCases = createAsyncThunk(
  "clients/getInboundCases",
  async ({ botId, startDate, endDate }, { getState, rejectWithValue }) => {
      try {
          const { user } = getState();
          const response = await axios.get(`https://admindev.inceptia.ai/api/v1/inbound-case/`, {
              headers: {
                  'Authorization': `JWT ${user.token}`
              },
              params: {
                  bot: botId,
                  local_updated__date__gte: startDate,
                  local_updated__date__lte: endDate
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
    inboundCases: [],  // Añadir un nuevo campo para almacenar los casos
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handlers para getClients
      .addCase(getClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.bots = action.payload;
        state.loading = false;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Handlers para getInboundCases
      .addCase(getInboundCases.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInboundCases.fulfilled, (state, action) => {
        state.inboundCases = action.payload;
        state.loading = false;
      })
      .addCase(getInboundCases.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

  
  export default clientsSlice.reducer;