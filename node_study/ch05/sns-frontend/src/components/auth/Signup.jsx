import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material'
import { useState } from 'react'

function Signup() {
   const [email, setEmail] = useState('')
   const [nick, setNick] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('') //패스워드확인
   const [isSignupComplete, setIsSignupComplete] = useState(false) // 회원가입  완료 여부

   return (
      <Container maxWidth="sm">
         <Typography variant="h4" gutterBottom>
            회원가입
         </Typography>

         {/* {error && (
            <Typography color="error" align="center">
               {error}
            </Typography>
         )} */}

         <TextField label="이메일" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />

         <TextField label="사용자 이름" variant="outlined" fullWidth margin="normal" value={nick} onChange={(e) => setNick(e.target.value)} />

         <TextField label="비밀번호" variant="outlined" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

         <TextField label="비밀번호 확인" variant="outlined" type="password" fullWidth margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

         {/* <Button variant="contained" color="primary" onClick={handleSignup} fullWidth disabled={loading} style={{ marginTop: '20px' }}>
            {loading ? <CircularProgress size={24} /> : '회원가입'}
         </Button> */}
      </Container>
   )
}

export default Signup
