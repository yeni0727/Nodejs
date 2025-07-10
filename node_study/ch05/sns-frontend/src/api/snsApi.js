import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL
const snsApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json', //req,res를 json객체로주고받겠다
   },
   withCredentials: true, //세션이나 쿠키를 요청에 포함
   /*
    5173->프론트엔드
    8000->백엔드
    req,res 주소가 다른 경우 보안상 서로 통신X
    주소가 다른데 통신하는 경우 cors 에러 발생
    주소가 다르면 쿠키와 세션도 주고받지 못하므로 아래 설정 필요
    */
})

//회원 가입 (userData:회원가입 창에서 입력한 데이터)
export const registerUser = async (userData) => {
   try {
      console.log('userdata: ', userData)

      const response = await snsApi.post('/auth/join', userData)
      console.log('res: ', response)

      return response
   } catch (error) {
      console.error(`API Request오류:&{error.message}`)
      throw error
   }
}
