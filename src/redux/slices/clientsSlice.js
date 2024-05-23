import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bots: [],
  inboundCases: [],
  loading: false,
  error: null,
  dateFilter: {
    // Asegúrate de tener esto en el estado inicial
    from: "",
    until: "",
  },
  activeFilter: 'Todos',  // Asegúrate de inicializar el filtro activo
};

// Thunk para obtener los clientes
export const getClients = createAsyncThunk(
  "clients/getClients",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.get(
        "https://admindev.inceptia.ai/api/v1/clients/",
        {
          headers: {
            Authorization: `JWT ${user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para obtener los casos entrantes basados en el bot y fechas
export const getInboundCases = createAsyncThunk(
  "clients/getInboundCases",
  async ({ botId, startDate, endDate }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.get(
        "https://admindev.inceptia.ai/api/v1/inbound-case/",
        {
          headers: {
            Authorization: `JWT ${user.token}`,
          },
          params: {
            bot: botId,
            local_updated__date__gte: startDate,
            local_updated__date__lte: endDate,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice de Redux para manejar el estado de los clientes y sus casos
const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setFromDate: (state, action) => {
      state.dateFilter.from = action.payload;
      state.activeFilter = 'Todos';  // Resetear el filtro activo a 'Todos' cuando se cambia la fecha 'from'
    },
    setUntilDate: (state, action) => {
      state.dateFilter.until = action.payload;
      state.activeFilter = 'Todos';  // Resetear el filtro activo a 'Todos' cuando se cambia la fecha 'from'
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;  
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClients.pending, (state) => {
        state.loadingBots = true;
        state.errorBots = null;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.bots = action.payload;
        state.loadingBots = false;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.errorBots = action.error.message;
        state.loadingBots = false;
      })
      .addCase(getInboundCases.pending, (state) => {
        state.loadingCases = true;
        state.errorCases = null;
      })
      .addCase(getInboundCases.fulfilled, (state, action) => {
        state.inboundCases = action.payload;
        state.loadingCases = false;
      })
      .addCase(getInboundCases.rejected, (state, action) => {
        state.errorCases = action.error.message;
        state.loadingCases = false;
      });
  },
});

export const { setFromDate, setUntilDate, setActiveFilter } = clientsSlice.actions;
export default clientsSlice.reducer;
