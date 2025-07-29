import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import itemReducer from '../features/itemSlice'
import orderReducer from '../features/orderSlice'
import tokenReducer from '../features/tokenSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      items: itemReducer,
      order: orderReducer,
      token: tokenReducer,
   },
})

export default store
