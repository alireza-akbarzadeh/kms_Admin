import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER  Store Profile  FUNCTIONALITY*********************

export const storeDepartmentAction = createAsyncThunk(
    "StoreDepartmentAction/store",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/department", {method: "post", data});
        const mainData = ResponseHandler({res});

    }
);

const storeDepartmentSlice = createSlice({
    name: "StoreDepartmentAction",
    initialState: {
        data: {},
        error: [],
        loading: false,
        isSuccess: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(storeDepartmentAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(storeDepartmentAction.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(storeDepartmentAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});
export default storeDepartmentSlice.reducer;
