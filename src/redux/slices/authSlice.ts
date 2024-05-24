import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorResponse, LoginCredentials, UserData, UserState } from '../../Interfaces/Auth/AuthInterfaces';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Acción asíncrona para iniciar sesión de usuario.
 * Envía credenciales de usuario y espera recibir datos del usuario junto con un token JWT.
 * Maneja los errores devolviendo un mensaje de error específico.
 *
 * @param {LoginCredentials} credentials Credenciales de inicio de sesión del usuario, incluyendo email y contraseña.
 * @returns {Promise<UserData>} Datos del usuario y token JWT si el inicio de sesión es exitoso.
 */

export const getUser = createAsyncThunk<UserData, LoginCredentials, { rejectValue: ErrorResponse }>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post<{ token: string } & UserData>('/login/', { email, password });
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ message: error.response.data });
    }
  }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
      userData: null,
      token: null,
      isLoading: false,
      error: null
    } as UserState,
    reducers: {},
    /**
     * Reducers adicionales para manejar estados de la acción getUser.
     * Actualiza el estado de carga, los datos del usuario y maneja los errores según el resultado de la acción.
     */
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
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            groups: action.payload.groups,
            is_active: action.payload.is_active,
          };
          state.token = action.payload?.token ?? null;
          state.isLoading = false;
        })
        .addCase(getUser.rejected, (state, action) => {
          state.error = action.payload?.message ?? null;
          state.isLoading = false;
        });
    }
  });

export default userSlice.reducer;