import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser } from '../api/snsApi'

export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData) => {
   const response = await registerUser(userData)
   return response.data.user
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null, //사용자 정보 객체
      isAuthenticated: false, //로그인상태 t:로 f:아웃
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {},
})

export default authSlice.reducers
