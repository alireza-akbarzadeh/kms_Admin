import Cookies from "js-cookie";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* Show Project List FUNCTIONALITY*********************


export const showProjectList = createAsyncThunk(
    "GetProjectList/Project",
    async ({currentId, detailsId}, {rejectWithValue}) => {
        const res = await Http(`admin/customers/projects/show/${currentId}/${detailsId}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);
const showProjectListSlice = createSlice({
    name: "GetProjectList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showProjectList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(showProjectList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showProjectList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default showProjectListSlice.reducer;
