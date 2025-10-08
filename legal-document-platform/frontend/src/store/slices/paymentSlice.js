import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { paymentService } from '../../api/services/paymentService';

export const initiatePayment = createAsyncThunk(
  'payment/initiate',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await paymentService.createOrder(paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'payment/verify',
  async (verificationData, { rejectWithValue }) => {
    try {
      const response = await paymentService.verifyPayment(verificationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPaymentHistory = createAsyncThunk(
  'payment/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentService.getPaymentHistory();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    currentOrder: null,
    history: [],
    loading: false,
    error: null,
    verificationStatus: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.verificationStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verificationStatus = action.payload;
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  },
});

export const { clearError, clearCurrentOrder } = paymentSlice.actions;
export default paymentSlice.reducer;
