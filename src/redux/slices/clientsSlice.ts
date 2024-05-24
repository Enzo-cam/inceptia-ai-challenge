import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Bot, ClientState, GetInboundCasesParams, InboundCase } from "../../Interfaces/Clients/ClientInterfaces";
import { RootState } from "../store";

const initialState: ClientState = {
  bots: [],
  inboundCases: [],
  loadingBots: false,
  loadingCases: false,
  errorBots: null,
  errorCases: null,
  dateFilter: {
    from: "",
    until: "",
  },
  activeFilter: 'Todos',
};

// Thunk para obtener los clientes
export const getClients = createAsyncThunk<Bot[], void, { state: RootState, rejectValue: string }>(
  "clients/getClients",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.get<Bot[]>("https://admindev.inceptia.ai/api/v1/clients/", {
        headers: {
          Authorization: `JWT ${user.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getInboundCases = createAsyncThunk<InboundCase[], GetInboundCasesParams, { state: RootState, rejectValue: string }>(
  "clients/getInboundCases",
  async ({ botId, startDate, endDate }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.get<InboundCase[]>("https://admindev.inceptia.ai/api/v1/inbound-case/", {
        headers: {
          Authorization: `JWT ${user.token}`,
        },
        params: { bot: botId, local_updated__date__gte: startDate, local_updated__date__lte: endDate },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice de Redux para manejar el estado de los clientes y sus casos
const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setFromDate: (state, action: PayloadAction<string>) => {
      state.dateFilter.from = action.payload;
      state.activeFilter = 'Todos';  // Resetear el filtro activo a 'Todos' cuando se cambia la fecha 'from'
    },
    setUntilDate: (state, action: PayloadAction<string>) => {
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
        // Asegúrate de que el valor asignado nunca sea 'undefined'
        state.errorBots = action.error.message ?? null;
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
        // Asegúrate de que el valor asignado nunca sea 'undefined'
        state.errorCases = action.error.message ?? null;
        state.loadingCases = false;
    });
  },
});

export const { setFromDate, setUntilDate, setActiveFilter } = clientsSlice.actions;
export default clientsSlice.reducer;
