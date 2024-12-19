const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// 정적 파일 제공 (public 폴더 내 파일 제공)
app.use(express.static(path.join(__dirname, 'public')));

// 사용자 폴더 설정
const userFolder = path.join(__dirname, 'public/data');

// 사용자 폴더 확인 및 생성
if (!fs.existsSync(userFolder)) {
  fs.mkdirSync(userFolder, { recursive: true }); // 폴더가 없으면 생성
}

// Multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, userFolder); // 사용자 폴더에 파일 저장
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; // 고유 파일 이름 생성
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 이미지 업로드 엔드포인트
app.post('/upload-image', upload.single('file'), (req, res) => {
  try {
    const filePath = `data/${req.file.filename}`; // 업로드된 파일 경로 (public 기준)
    console.log('업로드 성공:', filePath);
    res.json({ location: filePath }); // TinyMCE가 요구하는 JSON 응답
  } catch (err) {
    console.error('업로드 실패:', err);
    res.status(500).json({ error: '이미지 업로드 실패' });
  }
});

// 서버 실행
app.listen(3000, () => {
  console.log('서버가 실행 중입니다: http://localhost:3000');
});