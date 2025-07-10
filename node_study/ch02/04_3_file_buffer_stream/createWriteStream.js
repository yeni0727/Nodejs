const fs = require('fs')

const wirteStream = fs.createWriteStream('./writeme2.txt')

//글쓰기
wirteStream.write('이 글을 씁니다.\n')
wirteStream.write('한번더 씁니다')

//'finish'이벤트: 쓰기 스트림이 종료 되었을때 콜백함수 실행
wirteStream.on('finish', () => {
   console.log('파일쓰기 완료')
})

//스트림 종료(더 이상 쓸 데이터가 없을을 알림)
wirteStream.end()
