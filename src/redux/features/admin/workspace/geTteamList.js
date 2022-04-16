import Cookies from "js-cookie";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const getTeamList = createAsyncThunk(
    "GetTeamList/team",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/customers/teams/index/${id}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);
const getTeamListSlice = createSlice({
    name: "GetTeamList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getTeamList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTeamList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getTeamList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default getTeamListSlice.reducer;
