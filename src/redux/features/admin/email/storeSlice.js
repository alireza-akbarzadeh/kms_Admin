import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER  Store Profile  FUNCTIONALITY*********************

export const storeEmailAction = createAsyncThunk(
    "StoreEmailAction/store",
    async ({data}, {rejectWithValue}) => {
        const res = await Http("admin/config/email", {method: "post", data});
        const mainData = ResponseHandler({res});

    }
);

const storeEmailSlice = createSlice({
    name: "StoreEmailAction",
    initialState: {
        data: {},
        error: [],
        loading: false,
        isSuccess: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(storeEmailAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(storeEmailAction.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(storeEmailAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});
export default storeEmailSlice.reducer;
