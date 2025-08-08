import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

let checkUser = JSON.parse(localStorage.getItem('user'))


const initialState = {
    user: checkUser ? checkUser : null,
    userLoading: false,
    userSuccess: false,
    userError: false,
    userMessage: ''
}




export const checkMail = createAsyncThunk('check-mail', async (email, thunkAPI) => {
    try {
        let response = await axios.post('http://localhost:5174/api/users/verify-mail', { email })
        return response.data
    } catch (error) {
        console.log(error.response.data.message)
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


export const registerUser = createAsyncThunk('reg-user', async (userData, thunkAPI) => {
    try {
        let response = await axios.post('http://localhost:5174/api/users/register-user', userData)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})




export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkMail.pending, (state, action) => {
                state.userLoading = true
            })
            .addCase(checkMail.rejected, (state, action) => {
                state.userLoading = false
                state.userError = true
                state.userMessage = action.payload
            })
            .addCase(checkMail.fulfilled, (state, action) => {
                state.userLoading = false
                state.userSuccess = true
            })
            .addCase(registerUser.pending, (state, action) => {
                state.userLoading = true
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.userLoading = false
                state.userError = true
                statusbar.userMessage = action.payload
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userLoading = false
                state.userSuccess = true
                state.user = action.payload
            })
    }
})


export default userSlice.reducer