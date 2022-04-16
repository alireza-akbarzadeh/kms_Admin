import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "../../../helper";
import ResponseHandler from "../../../helper/ResponseHandler";

// ********************* USER  Store Profile  FUNCTIONALITY*********************

export const storeAdminDepartemanAction = createAsyncThunk(
    "StoreAdminDepartemanAction/store",
    async ({data}, {rejectWithValue}) => {
        const res = await Http("admin/department/add", {method: "post", data});
        return ResponseHandler({res});
    }
);

const storeAdminDepartemanSlice = createSlice({
    name: "StoreAdminDepartemanAction",
    initialState: {
        data: {},
        error: [],
        loading: false,
        isSuccess: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(storeAdminDepartemanAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(storeAdminDepartemanAction.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(storeAdminDepartemanAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});
export default storeAdminDepartemanSlice.reducer;
