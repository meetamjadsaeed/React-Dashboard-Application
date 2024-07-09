import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AppService from "../../services/appServices";

export const getAllUsers = createAsyncThunk(
  "CRUD/getAllUsers",
  async ({ pageNumber }) => {
    try {
      const getAllUsersResponse = await AppService.getAllUsers({
        pageNumber: pageNumber,
      });
      return getAllUsersResponse.data?.data;
    } catch (error) {
      throw error;
    }
  }
);

const CRUDSlice = createSlice({
  name: "CRUD",
  initialState: {
    loading: false,
    CRUDData: [],
    error: null,
  },
  reducers: {
    AddItem: (state, action) => {
      const newItem = { ...action.payload };
      if (!state.CRUDData.some((item) => item?.id === newItem?.id)) {
        state.CRUDData = [...state.CRUDData, newItem];
      }
    },

    RemoveItem: (state, action) => {
      state.CRUDData = [
        ...state.CRUDData.filter((val, index) => index !== action.payload),
      ];
    },

    ClearItems: (state, action) => {
      state.CRUDData = [];
    },

    UpdateItem: (state, action) => {
      const updatedItemIndex = state.CRUDData.findIndex(
        (value) => value?.id === action?.payload?.id
      );

      if (updatedItemIndex >= 0) {
        const updatedItem = {
          ...state.CRUDData[updatedItemIndex],
          data: {
            ...state.CRUDData[updatedItemIndex].data,
          },
        };

        const updatedData = [...state.CRUDData];
        updatedData[updatedItemIndex] = updatedItem;

        state.CRUDData = updatedData;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        const newItems = action.payload.filter(
          (newItem) => !state.CRUDData.some((item) => item?.id === newItem?.id)
        );
        state.CRUDData = [...state.CRUDData, ...newItems];
        state.error = null;
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const CRUDActions = CRUDSlice.actions;
export default CRUDSlice.reducer;
