import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, Http} from "../../../helper";
import ResponseHandler from "../../../helper/ResponseHandler";


// *********************   Update Notify Setting  FUNCTIONALITY *********************

export const getNotifySettingAction = createAsyncThunk("admin/config/notify",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/config/notify", {method: "get"});
        return ResponseHandler({res, index: true});
    });

const getNotifySettingSlice = createSlice({
    name: "GetNotifySetting",
    initialState: {
        data: {}, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(getNotifySettingAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(getNotifySettingAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(getNotifySettingAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default getNotifySettingSlice.reducer;
