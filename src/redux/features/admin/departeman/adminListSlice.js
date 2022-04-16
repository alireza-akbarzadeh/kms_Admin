import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const adminList = createAsyncThunk(
    "AdminList/list",
    async ({department, isPaginate}, {rejectWithValue}) => {
        const res = await Http(`admin/index?isPaginate=${isPaginate}&department=${department}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);

const adminListSlice = createSlice({
    name: "AdminList",
    initialState: {
        data: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(adminList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(adminList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(adminList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default adminListSlice.reducer;
