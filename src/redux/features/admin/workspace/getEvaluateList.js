import Cookies from "js-cookie";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const getEvaluateList = createAsyncThunk(
    "GetEvaluateList/evaluates",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/customers/evaluates/index/${id}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);
const getEvaluateListSlice = createSlice({
    name: "GetEvaluateList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getEvaluateList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getEvaluateList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getEvaluateList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default getEvaluateListSlice.reducer;
