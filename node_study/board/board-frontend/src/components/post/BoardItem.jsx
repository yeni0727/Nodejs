import { Card, CardMedia, CardContent, Typography, Box, CardActions, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import dayjs from 'dayjs' //날짜 시간 포맷해주는 패키지
import { Link } from 'react-router-dom'

function BoardItem({ post, isAuthenticated, member }) {
   // 게시물 삭제
   const onClickDelete = (id) => {
      console.log('삭제할 게시물 ID:', id)
   }

   return (
      <Card style={{ margin: '20px 0' }}>
         {post.img && <CardMedia sx={{ height: 400, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} image={`${import.meta.env.VITE_APP_API_URL}/uploads/${post.img}`} title={post.title} />}
         <CardContent>
            {/* 작성자 정보 - Member 모델 기준 */}
            <Link to={`/my/${post.Member.id}`} style={{ textDecoration: 'none' }}>
               <Typography sx={{ color: 'primary.main' }}>@{post.Member.name}</Typography>
            </Link>

            {/* 작성일 */}
            <Typography variant="body2" color="text.secondary">
               {dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </Typography>

            {/* 제목 */}
            <Typography variant="h6" component="div" sx={{ mt: 1 }}>
               {post.title}
            </Typography>

            {/* 내용 */}
            <Typography variant="body2" sx={{ mt: 1 }}>
               {post.content}
            </Typography>
         </CardContent>

         <CardActions>
            {/* 좋아요 버튼 */}
            <Button size="small" color="primary">
               <FavoriteBorderIcon fontSize="small" />
            </Button>

            {/* 수정/삭제 버튼 - 로그인한 사용자가 작성자일 때만 표시 */}
            {isAuthenticated && post.Member.id === member.id && (
               <Box sx={{ p: 2 }}>
                  <Link to={`/posts/edit/${post.id}`}>
                     <IconButton aria-label="edit" size="small">
                        <EditIcon fontSize="small" />
                     </IconButton>
                  </Link>
                  <IconButton aria-label="delete" size="small" onClick={() => onClickDelete(post.id)}>
                     <DeleteIcon fontSize="small" />
                  </IconButton>
               </Box>
            )}
         </CardActions>
      </Card>
   )
}

export default BoardItem
