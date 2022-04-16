import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// *********************   Update Notify Setting  FUNCTIONALITY *********************

export const getCustomerListAction = createAsyncThunk("admin/customerList",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/customers", {method: "get"});
        return ResponseHandler({res, index: true});
    });

const getCustomerListSlice = createSlice({
    name: "GetCustomerList",
    initialState: {
        data: {}, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(getCustomerListAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCustomerListAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(getCustomerListAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default getCustomerListSlice.reducer;
