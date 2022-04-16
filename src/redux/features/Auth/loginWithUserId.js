import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// const ENDPOINT = process.env.REACT_APP_BASE_URL;
const ENDPOINT = 'https://back.deriko.net/';


// ********************* USER Login IN  FUNCTIONALITY*********************

export const loginWithUserID = createAsyncThunk(
    "loginWithUserID/login",
    async (data, {rejectWithValue}) => {
        try {
            const res = await axios.post(ENDPOINT + "admin/auth/loginByUser", data, {
                withCredentials: true,
            });
            if (res.status === 200) {

                return {
                    data: res.data,
                };
            }
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

const initialState = {
    data: {},
    errors: {},
    loading: false,
    isSuccess: null,
};
const loginWithUserSlice = createSlice({
    name: "loginWithUserID",
    initialState: initialState,
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(loginWithUserID.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginWithUserID.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(loginWithUserID.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.errors = action.payload;
            }),
});

export default loginWithUserSlice.reducer;
