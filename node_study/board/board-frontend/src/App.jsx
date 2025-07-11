import './styles/common.css'
import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatusThunk } from './features/authSlice'
import { useEffect } from 'react'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth) //로그인 상태 가져오기(로그아웃일때null)
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
         </Routes>
      </>
   )
}

export default App
