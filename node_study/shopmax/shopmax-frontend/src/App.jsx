import './styles/common.css'
import { Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './features/authSlice'
import ItemCreatePage from './pages/ItemCreatePage'
import ItemListPage from './pages/ItemListPage'
import ItemEditPage from './pages/ItemEditPage'
import ItemSellDetailPage from './pages/ItemSellDetailPage'

function App() {
   const dispatch = useDispatch()
   const location = useLocation()
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   //새로고침시 지속적인 로그인 상태 확인을 위해 사용
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* 상품 리스트 */}
            <Route path="/items/createlist" element={<ItemListPage key={location.key} />} />

            {/* 상품 등록 */}
            <Route path="/items/create" element={<ItemCreatePage />} />

            {/* 상품 수정 */}
            <Route path="/items/edit/:id" element={<ItemEditPage key={location.key} />} />

            {/* 상품 상세페이지 */}
            <Route path="/items/detail/:id" element={<ItemSellDetailPage />} />
         </Routes>
         <Footer />
      </>
   )
}

export default App
