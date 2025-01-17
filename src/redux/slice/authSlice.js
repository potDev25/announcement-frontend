import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axiosClient/axiosClient";

export const loginUser = createAsyncThunk('auth/loginUser', 
    async (payload, thunkAPI) => {
        try {
            const {data} = await axiosClient.post('/users/login', payload)
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
  token: localStorage.getItem('user_token'),
  loading: false,
  btnLoading: false,
  error: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      (state.user = {}),
        (state.token = null),
        localStorage.removeItem("user_token");
    },
  },
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
            console.log(action.payload);
        })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
