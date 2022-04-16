import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER  Store Profile  FUNCTIONALITY*********************

export const storeSmsAction = createAsyncThunk(
    "StoreSmsAction/store",
    async ({data}, {rejectWithValue}) => {
        const res = await Http("admin/config/sms", {method: "post", data});
        return ResponseHandler({res});
    }
);

const storeSmsSlice = createSlice({
    name: "StoreSmsAction",
    initialState: {
        data: {},
        error: [],
        loading: false,
        isSuccess: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(storeSmsAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(storeSmsAction.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(storeSmsAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});
export default storeSmsSlice.reducer;
