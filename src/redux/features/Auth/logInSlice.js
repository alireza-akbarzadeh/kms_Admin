import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import ResponseHandler from "../../../helper/ResponseHandler";
import {Http, Alert} from "../../../helper";

// const ENDPOINT = process.env.REACT_APP_BASE_URL;
const ENDPOINT = 'https://back.deriko.net/';


// ********************* USER Login IN  FUNCTIONALITY*********************

export const Auth = createAsyncThunk(
    "Authentication/Auth",
    async (data, {rejectWithValue}) => {
        try {
            const res = await axios.post(ENDPOINT + "admin/auth/login", data, {
                withCredentials: true,
            });
            if (res.status === 200) {
                Alert.SUCCESS(res.data.message);
                Cookies.set("token", res.data.data?.token);
                window.location.href = "/dashboard/app";
                return {
                    data: res.data,
                };
            }
        } catch (error) {
            Alert.ERROR(error?.response?.data?.error);
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
const authSlice = createSlice({
    name: "Authentication",
    initialState: initialState,
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(Auth.pending, (state) => {
                state.loading = true;
            })
            .addCase(Auth.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(Auth.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.errors = action.payload;
            }),
});

export default authSlice.reducer;
