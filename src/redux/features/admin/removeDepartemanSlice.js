import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

//components
import {Http} from "../../../helper";
import ResponseHandler from "../../../helper/ResponseHandler";

// ********************* Admin Delete Sms  FUNCTIONALITY*********************


export const removeDepartmentAdminAction = createAsyncThunk(
    "DeleteDeleteDepartmentAdmin/Delete",
    async (data, {rejectWithValue}) => {
        const res = await Http(`admin/department/remove/`, {method: "post", data});
        return ResponseHandler({res});
    }
);

const deleteDeleteDepartmentAdminSlice = createSlice({
    name: "DeleteDeleteDepartmentAdmin",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(removeDepartmentAdminAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(removeDepartmentAdminAction.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(removeDepartmentAdminAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default deleteDeleteDepartmentAdminSlice.reducer;
