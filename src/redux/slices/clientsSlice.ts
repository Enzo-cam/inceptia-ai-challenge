import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Bot, ClientState, GetInboundCasesParams, InboundCase, InboundCasesResponse } from "../../Interfaces/Clients/ClientInterfaces";
import { RootState } from "../store";

const initialState: ClientState = {
  bots: [],
  inboundCases: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
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

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Acción asíncrona para obtener una lista de bots desde el servidor.
 * Requiere autenticación y utiliza el token del usuario almacenado en el estado.
*/
export const getClients = createAsyncThunk<Bot[], void, { state: RootState, rejectValue: string }>(
  "clients/getClients",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await api.get<Bot[]>("/clients/", {
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


/**
 * Acción asíncrona para obtener los casos entrantes de un bot específico dentro de un rango de fechas.
 * Utiliza parámetros de filtrado y requiere autenticación.
*/
export const getInboundCases = createAsyncThunk<InboundCasesResponse, GetInboundCasesParams, { state: RootState, rejectValue: string }>(
  "clients/getInboundCases",
  async ({ botId, startDate, endDate }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await api.get<InboundCasesResponse>("/inbound-case/", {
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



const clientsSlice = createSlice({
  name: "clients",
  initialState,
  /**
   * Reducers para actualizar el estado del slice de clientes.
   * Incluye funciones para ajustar las fechas de filtrado y el filtro activo.
  */ 
  reducers: {
    setFromDate: (state, action: PayloadAction<string>) => {
      state.dateFilter.from = action.payload;
      state.activeFilter = 'Todos'; 
    },
    setUntilDate: (state, action: PayloadAction<string>) => {
      state.dateFilter.until = action.payload;
      state.activeFilter = 'Todos'; 
    },
    setActiveFilter: (state, action: PayloadAction<string>) => {
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
        state.errorCases = action.error.message ?? null;
        state.loadingCases = false;
      });
  },
});

export const { setFromDate, setUntilDate, setActiveFilter } = clientsSlice.actions;
export default clientsSlice.reducer;
