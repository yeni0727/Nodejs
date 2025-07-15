import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { uploadPost, getPosts } from '../api/boardApi'

// 게시물 등록
export const writePost = createAsyncThunk('board/writePost', async (formData, { rejectWithValue }) => {
   try {
      console.log('Data :', formData)
      const response = await uploadPost(formData)
      console.log(response)

      return response
   } catch (err) {
      return rejectWithValue(err.response?.data?.message)
   }
})

// 게시물 불러오기
export const fetchPostsThunk = createAsyncThunk('board/fetchPosts', async (page, { rejectWithValue }) => {
   try {
      console.log('page: ', page)
      const response = await getPosts(page)

      console.log(response)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const boardSlice = createSlice({
   name: 'board',
   initialState: {
      post: null, // 게시글 데이터
      posts: [], // 게시글 리스트 (배열형태라 빈배열로 줌)
      pagination: null, // 페이징 객체
      loading: false,
      error: null,
   },
   reducers: {
      resetWriteState: (state) => {
         state.loading = false
         state.error = null
         state.post = null
      },
   },
   extraReducers: (builder) => {
      // 게시물 등록
      builder
         .addCase(writePost.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(writePost.fulfilled, (state, action) => {
            console.log('writePost.fulfilled 실행됨')
            console.log('action.payload:', action.payload)
            state.loading = false
            state.post = action.payload
            console.log('state.post 저장 후:', state.post)
         })
         .addCase(writePost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || '에러 발생'
         })

      // 게시물 리스트 불러오기
      builder
         .addCase(fetchPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.pagination = action.payload.pagination
         })
         .addCase(fetchPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || '게시물을 불러오는 중 오류가 발생했습니다'
         })
   },
})

export const { resetWriteState } = boardSlice.actions
export default boardSlice.reducer
