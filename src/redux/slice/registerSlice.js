import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axiosClient/axiosClient";

export const registerUser = createAsyncThunk('auth/registerUser', 
    async (payload, thunkAPI) => {
        try {
            const {data} = await axiosClient.post('/users/register', payload)
            return data;
        } catch (error) {
            if(error.response.status == 422){                
                if(error.response.data.message_error){
                    return thunkAPI.rejectWithValue({
                        password: error.response.data.message_error
                    })
                }else{
                    return thunkAPI.rejectWithValue(error.response.data.errors)
                }
            }else{
                return thunkAPI.rejectWithValue({
                    status: error.response.status,
                    message: 'server error'
                })
            }
        }
    }
);

const initialState = {
  user: {},
  btnLoading: false,
  error: [],
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) => {
    builder
        .addCase(registerUser.pending, (state) => {
            state.btnLoading = true;
            state.error = null
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.btnLoading = false;
            state.error = action.payload
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.error = null
            state.btnLoading = false;
            window.location.replace('/login')
        })
  },
});

export default registerSlice.reducer;
