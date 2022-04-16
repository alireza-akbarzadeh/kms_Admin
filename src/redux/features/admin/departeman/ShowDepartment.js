import Cookies from "js-cookie";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const showDepartmentList = createAsyncThunk(
    "GetSmsList/sms",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/department/${id}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);

const showDepartmentListSlice = createSlice({
    name: "GetSmsList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showDepartmentList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(showDepartmentList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showDepartmentList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default showDepartmentListSlice.reducer;
