import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, Http} from "../../../../../helper";
import ResponseHandler from "../../../../../helper/ResponseHandler";


// ********************* USER  Report   FUNCTIONALITY*********************

export const reportUserAction = createAsyncThunk(
    "reportUser/Report", async ({
                                    id,
                                    withDetail = false
                                }, {rejectWithValue}) => {

        const params = withDetail ? `admin/customers/report/user/${id}?withDetail=true` : `admin/customers/report/user/${id}`;

        const res = await Http(params, {method: "get"});
        return ResponseHandler({res, index: true});
    });

const reportUserSlice = createSlice({
    name: "reportUser", initialState: {
        data: {}, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(reportUserAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(reportUserAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(reportUserAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default reportUserSlice.reducer;
