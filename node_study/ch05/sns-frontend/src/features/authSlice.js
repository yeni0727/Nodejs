import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, registerUser, logoutUser, checkAuthStatus } from '../api/snsApi'

/*
?(optional chaining)
error = {} // rep가 undifined인 상태
error.response.data 사용시 TypeError 발생! (Cannot read property 'data' of undefined)
(error.response?.data?.message)사용시 res와 data가 undifined여도 에러가 발생하지x

*/

//회원가입
//rejectWithValue():에러메세지를 rej에 action.payload로 전달할때사용
export const registerUserThunk = createAsyncThunk('/auth/registerUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await registerUser(userData)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 로그인
export const loginUserThunk = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginUser(credentials)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 로그아웃
// _(언더바)는 매개변수 값이 없을 때 사용
export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutUser()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 로그인 상태확인
export const checkAuthStatusThunk = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null, // 사용자 정보 객체
      isAuthenticated: false, // 로그인 상태(true: 로그인, false: 로그아웃)
      loading: false,
      error: null,
   },
   reducers: {
      //에러스테이트 초기화 해주는 함수
      clearAuthError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         // 회원가입
         .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(registerUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 로그인
         .addCase(loginUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 로그아웃
         .addCase(logoutUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutUserThunk.fulfilled, (state) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null // 로그아웃 후 유저 정보 초기화
         })
         .addCase(logoutUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 로그인 상태 확인
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            // 로그인 상태일지 로그아웃 상태일지 모르기 때문에 아래와 같이 값을 준다
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user || null
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.isAuthenticated = false
            state.user = null
         })
   },
})

export const { clearAuthError } = authSlice.actions
export default authSlice.reducer
