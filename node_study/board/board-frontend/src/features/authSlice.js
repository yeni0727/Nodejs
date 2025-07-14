import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginMember, registerMember, logoutMember, checkAuthStatus } from '../api/boardApi'

//회원가입
export const registerMemberThunk = createAsyncThunk('/auth/registerMember', async (memberData, { rejectWithValue }) => {
   try {
      const response = await registerMember(memberData)
      return response.data.member
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

//로그인
export const loginMemberThunk = createAsyncThunk('/auth/loginMember', async (credential, { rejectWithValue }) => {
   try {
      const response = await loginMember(credential)
      return response.data.member
   } catch (error) {
      return rejectWithValue(error.response?.data.message)
   }
})

//로그아웃
//_는 매개변수 값이 없을때 사용
export const logoutMemberThunk = createAsyncThunk('auth/logoutMember', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutMember()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

//로그인 상태확인
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
      user: null, //사용자 정보 객체
      isAuthenticated: false, //로그인상태 t:로 f:아웃
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      //회원가입
      builder.addCase(registerMemberThunk.pending, (state) => {
         state.loading = true
         state.error = null
      })
      builder.addCase(registerMemberThunk.fulfilled, (state, action) => {
         state.loading = false
         state.user = action.payload
      })
      builder.addCase(registerMemberThunk.rejected, (state, action) => {
         state.loading = false
         state.error = action.payload
      })
      //로그인
      builder
         .addCase(loginMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginMemberThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload
         })
         .addCase(loginMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      //로그아웃
      builder
         .addCase(logoutMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutMemberThunk.fulfilled, (state) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null //로그아웃 후 유저 정보 초기화
         })
         .addCase(logoutMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      //로그인 상태 확인
      builder
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            //상태가 어떨지 모르기 때문에 아래와같이 값을 준다

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

export default authSlice.reducer
