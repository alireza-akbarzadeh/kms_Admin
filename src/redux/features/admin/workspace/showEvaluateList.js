import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const showEvaluateList = createAsyncThunk(
    "ShowEvaluateList/show evaluates",
    async ({currentId, detailsId}, {rejectWithValue}) => {
        const res = await Http(`admin/customers/evaluates/show/${currentId}/${detailsId}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);
const showEvaluateListSlice = createSlice({
    name: "ShowEvaluateList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showEvaluateList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(showEvaluateList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showEvaluateList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default showEvaluateListSlice.reducer;
