import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL
const snsApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json', //req,res를 json객체로주고받겠다
   },
   withCredentials: true, //세션이나 쿠키를 요청에 포함
})

//회원 가입
export const registerMember = async (memberData) => {
   try {
      console.log('memberdata: ', memberData)

      const response = await snsApi.post('/auth/join', memberData)
      console.log('res: ', response)

      return response
   } catch (error) {
      console.log(`API Request오류: ${error.message}`)
      throw error
   }
}

//로그인
export const loginMember = async (credential) => {
   try {
      console.log('credential: ', credential)
      const response = await snsApi.post('/auth/login', credential)

      return response
   } catch (error) {
      console.log(`API Request오류: ${error.message}`)
      throw error
   }
}

//로그아웃
export const logoutMember = async () => {
   try {
      const response = await snsApi.get('/auth/logout')
      return response
   } catch (error) {
      console.log(`API Request오류: ${error.message}`)
      throw error
   }
}

//상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await snsApi.get('/auth/status')
      return response
   } catch (error) {
      console.log(`API Request오류: ${error.message}`)
      throw error
   }
}
