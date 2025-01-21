import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axiosClient/axiosClient";

export const loginUser = createAsyncThunk('auth/loginUser', 
    async (payload, thunkAPI) => {
        try {
            const { data } = await axiosClient.post('/users/login', payload);
            return data;
        } catch (error) {
            const response = error.response;

            if (response?.status === 422) {                
                if (response.data.message_error) {
                    return thunkAPI.rejectWithValue({
                        password: response.data.message_error
                    });
                } else {
                    return thunkAPI.rejectWithValue(response.data.errors);
                }
            } else {
                return thunkAPI.rejectWithValue({
                    status: response?.status || 500,
                    message: response?.data?.message || 'Server error',
                });
            }
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logout', 
    async (_, thunkAPI) => {
        try {
            const { data } = await axiosClient.get('/users/logout');
            return data;
        } catch (error) {
            const response = error.response;
            return thunkAPI.rejectWithValue({
                status: response?.status || 500,
                data: response?.data || 'An error occurred',
                message: response?.statusText || 'Server error',
            });
        }
    }
);


export const getUser = createAsyncThunk('auth/getUser', 
    async (_, thunkAPI) => {
        try {
            const { data } = await axiosClient.get('/users');
            return data;
        } catch (error) {
            const response = error.response;
            return thunkAPI.rejectWithValue({
                status: response?.status || 500,
                data: response?.data || 'An error occurred',
                message: response?.statusText || 'Server error',
            });
        }
    }
);


const initialState = {
  user: null,
  token: localStorage.getItem('user_token'),
  loading: false,
  btnLoading: false,
  error: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
        .addCase(loginUser.pending, (state) => {
            state.btnLoading = true;
            state.error = null
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.btnLoading = false;
            state.error = action.payload
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.btnLoading = false;
            state.user = action.payload.user
            state.token = action.payload.user_token
            localStorage.setItem('user_token', action.payload.user_token)
        })

        .addCase(logoutUser.pending, (state) => {
            state.btnLoading = true;
            state.error = null
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.btnLoading = false;
            state.error = action.payload
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.btnLoading = false;
            state.user = null
            state.token = null
            localStorage.removeItem('user_token')
        })

        .addCase(getUser.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.token = null;
            state.user = null;
            state.error = action.payload
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.user);
            state.user = action.payload.user
        })
  },
});

export const {  } = authSlice.actions;
export default authSlice.reducer;
