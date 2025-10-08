import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { documentService } from '../../api/services/documentService';

export const fetchDocuments = createAsyncThunk(
  'documents/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await documentService.getDocuments();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createDocument = createAsyncThunk(
  'documents/create',
  async (documentData, { rejectWithValue }) => {
    try {
      const response = await documentService.createDocument(documentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateDocument = createAsyncThunk(
  'documents/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await documentService.updateDocument(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  'documents/delete',
  async (id, { rejectWithValue }) => {
    try {
      await documentService.deleteDocument(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const documentSlice = createSlice({
  name: 'documents',
  initialState: {
    items: [],
    currentDocument: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentDocument: (state, action) => {
      state.currentDocument = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        const index = state.items.findIndex(doc => doc.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.items = state.items.filter(doc => doc.id !== action.payload);
      });
  },
});

export const { clearError, setCurrentDocument } = documentSlice.actions;
export default documentSlice.reducer;
