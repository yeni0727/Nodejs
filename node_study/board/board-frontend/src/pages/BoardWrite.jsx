import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { writePost, resetWriteState } from '../features/boardWriteSlice'
import BoardWriteForm from '../components/post/BoardWriteForm'
import { useNavigate } from 'react-router-dom'

function BoardWrite() {
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error, success } = useSelector((state) => state.boardWrite)

   // handleSubmit에서 이미지를 받으므로 image 상태는 필요 없음
   const handleSubmit = (e, imageFile) => {
      e.preventDefault()

      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (imageFile) formData.append('img', imageFile)

      dispatch(writePost(formData))
   }

   useEffect(() => {
      if (success) {
         alert('게시글 업로드 성공')
         dispatch(resetWriteState())
         setTitle('')
         setContent('')
         navigate('/')
      } else if (error) {
         alert('게시글 업로드 실패')
      }
   }, [success, error, dispatch, navigate])

   return (
      <div>
         {loading && <p>업로드 중...</p>}
         <BoardWriteForm
            title={title}
            content={content}
            setTitle={setTitle}
            setContent={setContent}
            handleSubmit={handleSubmit} // handleSubmit에만 전달
         />
      </div>
   )
}

export default BoardWrite
