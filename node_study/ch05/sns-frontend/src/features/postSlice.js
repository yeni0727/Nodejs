import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost } from '../api/snsApi'

//게시물 등록
export const createPostThunk = createAsyncThunk('post/createPost', async (postData, { rejectedWithValue }) => {
   try {
      console.log('postData :', postData)
      const response = await createPost(postData)

      console.log(response)
      return response.data.post
   } catch (error) {
      return rejectedWithValue(error.respose?.data?.message)
   }
})

//게시물 수정
// export const updatePostThunk = createAsyncThunk('posts/updatePost', async (data, { rejectWithValue }) => {
//    try {
//    } catch (error) {
//       return rejectWithValue(error.response?.data?.message)
//    }
// })

// //게시물 삭제
// export const deletePostThunk = createAsyncThunk('posts/deletePost', async (id, { rejectWithValue }) => {
//    try {
//    } catch (error) {
//       return rejectWithValue(error.response?.data?.message)
//    }
// })

// //특정 게시물 가져오기
// export const fetchPostByIdThunk = createAsyncThunk('posts/fetchPostById', async (id, { rejectWithValue }) => {
//    try {
//    } catch (error) {
//       return rejectWithValue(error.response?.data?.message)
//    }
// })

// //전체 게시물 가져오기
// export const fetchPostsThunk = createAsyncThunk('posts/fetchPosts', async (page, { rejectWithValue }) => {
//    try {
//    } catch (error) {
//       return rejectWithValue(error.response?.data?.message)
//    }
// })

const postSlice = createSlice({
   name: 'posts',
   initialState: {
      post: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 게시물 등록
      builder
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 게시물 리스트 불러오기
      //    builder
      //       .addCase(fetchPostsThunk.pending, (state) => {
      //          state.loading = true
      //          state.error = null
      //       })
      //       .addCase(fetchPostsThunk.fulfilled, (state, action) => {
      //          state.loading = false
      //          state.posts = action.payload.posts
      //          state.pagination = action.payload.pagination
      //       })
      //       .addCase(fetchPostsThunk.rejected, (state, action) => {
      //          state.loading = false
      //          state.error = action.payload
      //       })
      //    // 특정 게시물 불러오기
      //    builder
      //       .addCase(fetchPostByIdThunk.pending, (state) => {
      //          state.loading = true
      //          state.error = null
      //       })
      //       .addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
      //          state.loading = false
      //          state.post = action.payload.post
      //       })
      //       .addCase(fetchPostByIdThunk.rejected, (state, action) => {
      //          state.loading = false
      //          state.error = action.payload
      //       })
      //    // 게시물 삭제
      //    builder
      //       .addCase(deletePostThunk.pending, (state) => {
      //          state.loading = true
      //          state.error = null
      //       })
      //       .addCase(deletePostThunk.fulfilled, (state) => {
      //          state.loading = false
      //       })
      //       .addCase(deletePostThunk.rejected, (state, action) => {
      //          state.loading = false
      //          state.error = action.payload
      //       })
      //    // 게시물 수정
      //    builder
      //       .addCase(updatePostThunk.pending, (state) => {
      //          state.loading = true
      //          state.error = null
      //       })
      //       .addCase(updatePostThunk.fulfilled, (state) => {
      //          state.loading = false
      //       })
      //       .addCase(updatePostThunk.rejected, (state, action) => {
      //          state.loading = false
      //          state.error = action.payload
      //       })
   },
})

export default postSlice.reducer
