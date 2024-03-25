import { createSlice } from '@reduxjs/toolkit';

const storedAccessToken = localStorage.getItem('accessToken');

const accessToken = storedAccessToken != null ? JSON.parse(storedAccessToken) : null;

const storedUserInfo = localStorage.getItem('loginObject');

const userInfo = storedUserInfo != null ? JSON.parse(storedUserInfo) : null;

const initialState = {
    error: null,
    accessToken: accessToken,
    user: userInfo
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', JSON.stringify(action.payload));
        },
        setLoginInfo: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('loginObject', JSON.stringify(action.payload));
        },
    },
});

export const { setError, setAccessToken, setLoginInfo } = appSlice.actions;
export default appSlice.reducer;
