import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER  Store Profile  FUNCTIONALITY*********************

export const storeDepartmentAdminAction = createAsyncThunk(
    "StoreDepartmentAdminAction/store",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/department/add", {method: "post", data});
        const mainData = ResponseHandler({res});

    }
);

const storeDepartmentAdminSlice = createSlice({
    name: "StoreDepartmentAdminAction",
    initialState: {
        data: {},
        error: [],
        loading: false,
        isSuccess: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(storeDepartmentAdminAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(storeDepartmentAdminAction.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(storeDepartmentAdminAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});
export default storeDepartmentAdminSlice.reducer;
