import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axiosClient/axiosClient";

const initialState = {
    announcements: [],
    btnLoading: false,
    isLoading: false,
    isSuccess: '',
    paginations: {},
    errors: [],
  };

export const getAnnouncments = createAsyncThunk(
  "announcements/index",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosClient.get(
        `/guests-announcements?limit=${payload.limit}&page=${payload.page}`
      );
      return data;
    } catch (error) {
      const response = error.response;
      return thunkAPI.rejectWithValue({
        status: response?.status || 500,
        data: response?.data || "An error occurred",
        message: response?.statusText || "Server error",
      });
    }
  }
);



const guestSlice = createSlice({
  name: "announcements",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncments.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(getAnnouncments.rejected, (state, action) => {
        state.isLoading = true;
        state.errors = action.payload;
      })
      .addCase(getAnnouncments.fulfilled, (state, action) => {
        state.errors = null;
        state.isLoading = false;
        state.announcements = action.payload.data;
        state.paginations = {
          prev_page_url: action.payload.prev_page_url,
          first_page_url: action.payload.next_page_url,
        };
      });
  },
});

export default guestSlice.reducer;
