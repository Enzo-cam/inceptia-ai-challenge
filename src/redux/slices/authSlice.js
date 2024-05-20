import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

// Configura la instancia de Axios y definiendo la URL
const api = axios.create({
  baseURL: 'https://admindev.inceptia.ai/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Async thunk para el login
export const getUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/login/', { email, password });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice para manejar el estado del login
const userSlice = createSlice({
    name: 'user',
    initialState: {
      userData: null,
      token: null,
      isLoading: false,
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.userData = {
            id: action.payload.id,
            email: action.payload.email,
            firstName: action.payload.first_name,
            lastName: action.payload.last_name,
            groups: action.payload.groups,
            isActive: action.payload.is_active,
          };
          state.token = action.payload.token;
          state.isLoading = false;
        })
        .addCase(getUser.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        });
    }
  });

export default userSlice.reducer;
