import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

export const fetchComplaints = createAsyncThunk('complaints/fetch', async () => {
  const res = await api.get('/complaints');
  return res.data;
});

export const addComplaint = createAsyncThunk('complaints/add', async (complaint) => {
  const res = await api.post('/complaints', complaint);
  return res.data;
});

export const updateComplaint = createAsyncThunk('complaints/update', async ({ id, data }) => {
  const res = await api.put(`/complaints/${id}`, data);
  return res.data;
});

export const deleteComplaint = createAsyncThunk('complaints/delete', async (id) => {
  await api.delete(`/complaints/${id}`);
  return id;
});

const slice = createSlice({
  name: 'complaints',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaints.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addComplaint.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateComplaint.fulfilled, (state, action) => {
        state.list = state.list.map(c => c._id === action.payload._id ? action.payload : c);
      })
      .addCase(deleteComplaint.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c._id !== action.payload);
      });
  }
});

export default slice.reducer;
