import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

// ---------- Async Thunks ----------

// Fetch all complaints
export const fetchComplaints = createAsyncThunk('complaints/fetch', async () => {
  const res = await api.get('/api/complaints'); // ✅ include /api
  return res.data;
});

// Add a new complaint
export const addComplaint = createAsyncThunk('complaints/add', async (complaint) => {
  const res = await api.post('/api/complaints', complaint);
  return res.data;
});

// Update complaint by ID
export const updateComplaint = createAsyncThunk(
  'complaints/update',
  async ({ id, data }) => {
    const res = await api.put(`/api/complaints/${id}`, data);
    return res.data;
  }
);

// Delete complaint by ID
export const deleteComplaint = createAsyncThunk('complaints/delete', async (id) => {
  await api.delete(`/api/complaints/${id}`);
  return id;
});

// ---------- Slice ----------
const complaintsSlice = createSlice({
  name: 'complaints',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaints.pending, (state) => {
        state.status = 'loading';
      })
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
        state.list = state.list.map(c =>
          c._id === action.payload._id ? action.payload : c
        );
      })
      .addCase(deleteComplaint.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c._id !== action.payload);
      });
  }
});

export default complaintsSlice.reducer;
