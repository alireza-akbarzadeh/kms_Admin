import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const getDepartmentList = createAsyncThunk(
    "GetDepartmentList/list",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/department", {method: "get"});
        return ResponseHandler({res, index: true});
    }
);

const getDepartmentListSlice = createSlice({
    name: "GetDepartmentList",
    initialState: {
        data: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getDepartmentList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getDepartmentList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getDepartmentList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default getDepartmentListSlice.reducer;
