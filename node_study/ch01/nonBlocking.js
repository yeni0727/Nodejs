// 논블로킹 방식으로 작성한 코드
// 이전 작업이 끝나는걸 기다리지 않고 다음 작업을 수행
//settimeout(콜백함수,0)
function longRunningTask() {
   // 오래걸리는 작업
   console.log('작업끝')
}

console.log('시작')
//오래걸리는 작업에 셋타임아웃주면 논블로킹 처리를 해줌
setTimeout(longRunningTask, 0)
console.log('다음작업')
