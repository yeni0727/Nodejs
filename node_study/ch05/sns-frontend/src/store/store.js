import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import PostReducer from '../features/postSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      posts: PostReducer,
   },
})

export default store
