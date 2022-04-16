import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";
import storeWorkSpace from "./storeWorkSpace";

// ********************* USER  Store Profile  FUNCTIONALITY*********************

export const storeWorkSpaceAction = createAsyncThunk(
    "storeWorkSpaceAction/store",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/customers/types", {method: "post", data});
        return ResponseHandler({res});
    }
);

const storeWorkSpaceSlice = createSlice({
    name: "storeWorkSpaceAction",
    initialState: {
        data: {},
        error: [],
        loading: false,
        isSuccess: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(storeWorkSpaceAction.pending, (state) => {
                state.loading = true;
                state.isSuccess = null;
            })
            .addCase(storeWorkSpaceAction.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(storeWorkSpaceAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});
export default storeWorkSpaceSlice.reducer;
