import Cookies from "js-cookie";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const getProjectList = createAsyncThunk(
    "GetProjectList/project",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/customers/projects/index/${id}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);
const getProjectListSlice = createSlice({
    name: "GetProjectList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getProjectList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getProjectList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getProjectList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default getProjectListSlice.reducer;
