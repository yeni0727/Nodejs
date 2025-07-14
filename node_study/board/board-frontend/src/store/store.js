import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import boardWriteReducer from '../features/boardWriteSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      boardWrite: boardWriteReducer,
   },
})

export default store
