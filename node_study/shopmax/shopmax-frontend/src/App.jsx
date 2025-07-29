import './styles/common.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ItemCreatePage from './pages/ItemCreatePage'

import { checkAuthStatusThunk } from './features/authSlice'
import ItemListPage from './pages/ItemListPage'
import ItemEditPage from './pages/ItemEditPage'
import ItemSellDetailPage from './pages/ItemSellDetailPage'
import MyOrderListPage from './pages/MyOrderListPage'
import TokenPage from './pages/TokenPage'
import ChatPage from './pages/ChatPage'
import ChartPage from './pages/ChartPage'

function App() {
   const dispatch = useDispatch()
   const location = useLocation()
   const { isAuthenticated, user } = useSelector((state) => state.auth) //로그인 상태, 로그인 한 사용자 정보

   // 새로고침시 지속적인 로그인 상태 확인을 위해 사용
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

            {/* 상품리스트 */}
            {/* navigate로 상품리스트 페이지 이동시 key값 덕분에 언마운트 후 마운트 된다 */}
            <Route path="/items/createlist" element={<ItemListPage key={location.key} />} />

            {/* 상품등록 */}
            <Route path="/items/create" element={<ItemCreatePage />} />

            {/* 상품수정 */}
            <Route path="/items/edit/:id" element={<ItemEditPage />} />

            {/* 상품 상세페이지 */}
            <Route path="/items/detail/:id" element={<ItemSellDetailPage />} />

            {/* 주문내역 페이지 */}
            <Route path="/myorderlist" element={<MyOrderListPage />} />

            {/* 토큰 발급 페이지 */}
            <Route path="/token" element={<TokenPage />} />

            {/* 채팅 페이지 */}
            <Route path="/chat" element={<ChatPage />} />

            {/* 차트페이지 */}
            <Route path="/chart" element={<ChartPage />} />
         </Routes>
         <Footer />
      </>
   )
}

export default App
