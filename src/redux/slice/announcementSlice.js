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
        `/announcements?limit=${payload.limit}&page=${payload.page}`
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

export const storeAnnouncement = createAsyncThunk(
  "announcements/store",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosClient.post("/announcements", payload);
      return data;
    } catch (error) {
      if (error.response.status == 422) {
        if (error.response.data.message_error) {
          return thunkAPI.rejectWithValue({
            password: error.response.data.message_error,
          });
        } else {
          return thunkAPI.rejectWithValue(error.response.data.errors);
        }
      } else {
        return thunkAPI.rejectWithValue({
          status: error.response.status,
          message: "server error",
        });
      }
    }
  }
);

export const editAnnouncement = createAsyncThunk(
    "announcements/edit",
    async ({id, payload}, thunkAPI) => {
      try {
        const { data } = await axiosClient.put(`/announcements/${id}`, payload);
        return data;
      } catch (error) {
        if (error.response.status == 422) {
          if (error.response.data.message_error) {
            return thunkAPI.rejectWithValue({
              password: error.response.data.message_error,
            });
          } else {
            return thunkAPI.rejectWithValue(error.response.data.errors);
          }
        } else {
          return thunkAPI.rejectWithValue({
            status: error.response.status,
            message: "server error",
          });
        }
      }
    }
  );

  export const deleteAnnouncement = createAsyncThunk(
    "announcements/destroy",
    async (payload, thunkAPI) => {
      try {
        const { data } = await axiosClient.delete(`/announcements/${payload}`);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue({
            status: error.response.status,
            message: "server error",
        });
      }
    }
  );

const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    removeErrors: (state) => {
      state.errors = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeAnnouncement.pending, (state) => {
        state.btnLoading = true;
        state.isSuccess = '';
        state.errors = null;
      })
      .addCase(storeAnnouncement.rejected, (state, action) => {
        state.btnLoading = false;
        state.isSuccess = '';
        state.errors = action.payload;
      })
      .addCase(storeAnnouncement.fulfilled, (state, action) => {
        state.errors = null;
        state.btnLoading = false;
        state.isSuccess = 'store';
      })

      .addCase(editAnnouncement.pending, (state) => {
        state.btnLoading = true;
        state.isSuccess = '';
        state.errors = null;
      })
      .addCase(editAnnouncement.rejected, (state, action) => {
        state.btnLoading = false;
        state.isSuccess = '';
        state.errors = action.payload;
      })
      .addCase(editAnnouncement.fulfilled, (state, action) => {
        state.errors = null;
        state.btnLoading = false;
        state.isSuccess = 'edited';
      })

      .addCase(deleteAnnouncement.pending, (state) => {
        state.btnLoading = true;
        state.isSuccess = '';
        state.errors = null;
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.btnLoading = false;
        state.isSuccess = '';
        state.errors = action.payload;
        console.log(state.errors);
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.errors = null;
        state.btnLoading = false;
        state.isSuccess = 'deleted';
      })

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

export const {removeErrors} = announcementSlice.actions;
export default announcementSlice.reducer;
