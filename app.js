const express = require('express');
const app = express();
const PORT = 3000;

// 'public' 폴더를 정적 파일 경로로 설정
app.use(express.static('public'));

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
