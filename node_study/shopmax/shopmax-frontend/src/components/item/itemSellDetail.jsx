import { Box, Typography, Button, Alert, CardMedia } from '@mui/material'
import Grid from '@mui/material/Grid'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import NumberInput from '../../styles/NumberInput'

import { formatWithComma } from '../../utils/priceSet'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemByIdThunk } from '../../features/itemSlice'
import { useState, useEffect } from 'react'

function ItemSellDetail() {
   const { id } = useParams() // item의 id
   const dispatch = useDispatch()
   const { item, error, loading } = useSelector((state) => state.items)
   const [count, setCount] = useState(1) // 수량
   const [orderPrice, setOrderPrice] = useState(0) // 총 상품가격
   const [orderComplete, setOrderComplete] = useState(false) // 주문완료 상태

   //수량 증가 가격 계산
   //처음 상세페 들어왔을때도 가격을 보여주기 위해 useEff사용
   useEffect(() => {
      if (item) {
         //상품이 있다면 가격*수량
         setOrderPrice(item.price * count)
      }
   }, [item, count]) //수량이 바뀔때마다 총 가격 변경

   //상품 데이터 불러오기
   useEffect(() => {
      dispatch(fetchItemByIdThunk(id))
   }, [dispatch, id])

   return (
      <>
         {item && (
            <Box sx={{ padding: '20px' }}>
               {/* 위쪽 상세(썸네일 이미지, 가격, 수량) */}
               <Grid
                  container
                  spacing={4}
                  sx={{ justifyContent: 'center', alignItems: 'center' }} // 추가된 스타일
               >
                  <Grid container spacing={10}>
                     {/* 썸네일 대표 이미지 */}
                     <Grid xs={12} md={6}>
                        <CardMedia component="img" image={`${import.meta.env.VITE_APP_API_URL}${item.Imgs.filter((img) => img.repImgYn === 'Y')[0].imgUrl}`} alt={item.itemNm} sx={{ width: '450px', borderRadius: '8px' }} />
                     </Grid>

                     {/* 오른쪽 상세 정보 */}
                     <Grid xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                           <LocalMallIcon sx={{ color: '#ffab40', fontSize: '32px' }} />
                           {item.itemNm}
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                           가격: {formatWithComma(String(item.price))}원
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                           재고: {item.stockNumber}개
                        </Typography>

                        {item.itemSellStatus === 'SOLD_OUT' ? (
                           <Alert severity="error">품절</Alert>
                        ) : (
                           <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
                              <NumberInput
                                 value={count}
                                 onChange={(e) => {
                                    setCount(Number(e.target.value))
                                 }}
                                 min={1}
                                 max={item.stockNumber}
                                 step={1}
                              />
                              <Typography variant="h6">총 가격:{formatWithComma(String(orderPrice))}</Typography>
                              <Button variant="contained" color="primary">
                                 구매하기
                              </Button>
                           </Box>
                        )}
                     </Grid>
                  </Grid>
               </Grid>

               {/* 상세 이미지, 상세 설명 */}
               <Box sx={{ marginTop: '180px' }}>
                  <Typography variant="h5" gutterBottom>
                     상세 정보
                  </Typography>
                  <Typography variant="body1" gutterBottom sx={{ mt: 4, mb: 5 }}>
                     {item.itemDetail}
                  </Typography>
                  <Grid container spacing={2}>
                     {item.Imgs.map((img, index) => (
                        <Grid key={index} xs={12} sm={6} md={4}>
                           <CardMedia component="img" image={`${import.meta.env.VITE_APP_API_URL}${img.imgUrl}`} alt={`상세이미지 ${index + 1}`} sx={{ width: '100%', borderRadius: '8px' }} />
                        </Grid>
                     ))}
                  </Grid>
               </Box>
            </Box>
         )}
      </>
   )
}

export default ItemSellDetail
