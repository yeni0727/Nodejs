import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { uploadPost } from '../api/boardApi'

export const writePost = createAsyncThunk('board/writePost', async (formData, thunkAPI) => {
   try {
      const response = await uploadPost(formData)
      return response.data
   } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
   }
})

const boardWriteSlice = createSlice({
   name: 'boardWrite',
   initialState: {
      loading: false,
      error: null,
      success: false,
   },
   reducers: {
      resetWriteState: (state) => {
         state.loading = false
         state.error = null
         state.success = false
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(writePost.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(writePost.fulfilled, (state) => {
            state.loading = false
            state.success = true
         })
         .addCase(writePost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || '에러 발생'
         })
   },
})

export const { resetWriteState } = boardWriteSlice.actions
export default boardWriteSlice.reducer
