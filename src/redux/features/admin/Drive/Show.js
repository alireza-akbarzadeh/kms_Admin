import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";


// ********************* Admin Files  FUNCTIONALITY*********************

export const showDriveList = createAsyncThunk(
    "ShowDriveList/Drive",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/customers/drives/index/${id}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);

const showDriveListSlice = createSlice({
    name: "ShowDriveList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showDriveList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(showDriveList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showDriveList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default showDriveListSlice.reducer;
