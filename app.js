const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// 정적 파일 제공 (public 폴더 내 파일 제공)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // JSON 데이터 파싱 미들웨어

// 서버 실행
app.listen(3000, () => {
  console.log('서버가 실행 중입니다: http://localhost:3000');
});

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




// 게시글 저장 파일 경로
const POSTS_FILE = path.join(__dirname, 'posts.json');

// 게시글 저장 라우터
app.post('/save-post', (req, res) => {
  const postData = req.body; // 클라이언트에서 전송된 데이터

  // 데이터 검증
  if (!postData || !postData.title || !postData.content) {
    return res.status(400).send({ error: '요청 데이터가 잘못되었습니다.' });
  }

  // 기존 데이터 읽기
  let posts = [];
  if (fs.existsSync(POSTS_FILE)) {
    const fileContent = fs.readFileSync(POSTS_FILE, 'utf-8');
    posts = JSON.parse(fileContent);
  }

  // 새 게시글 추가
  posts.push(postData);

  // 데이터 저장
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf-8');

  console.log('새 게시글 저장 완료:', postData);
  res.status(200).send({ message: '게시글 저장 완료' });
});