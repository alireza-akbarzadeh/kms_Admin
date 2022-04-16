import Cookies from "js-cookie";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* Show Project List FUNCTIONALITY*********************


export const showTeamList = createAsyncThunk(
    "GetTeamList/Team",
    async ({currentId, detailsId}, {rejectWithValue}) => {
        const res = await Http(`admin/customers/teams/show/${currentId}/${detailsId}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);
const showTeamListSlice = createSlice({
    name: "GetTeamList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showTeamList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(showTeamList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showTeamList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default showTeamListSlice.reducer;
