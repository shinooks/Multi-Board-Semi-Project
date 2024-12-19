// Showdown Markdown Parser 초기화
const showdownConverter = new showdown.Converter();

// Markdown 에디터 초기화
function initializeMarkdownEditor(initialContent = '') {
  const editorElement = document.getElementById('editor');
  editorElement.style.display = 'block'; // 에디터 표시
  editorElement.value = showdownConverter.makeMarkdown(initialContent); // 초기 콘텐츠를 Markdown으로 변환
  editorElement.setAttribute('placeholder', '여기에 Markdown 텍스트를 입력하세요...');
}

// Markdown 에디터에서 Markdown 내용 가져오기
function getMarkdownContent() {
  const editorElement = document.getElementById('editor');
  return editorElement.value || '';
}

// Markdown 에디터에서 HTML로 변환된 내용 가져오기
function getMarkdownAsHTML() {
  const markdownContent = getMarkdownContent();
  return showdownConverter.makeHtml(markdownContent); // Markdown을 HTML로 변환
}

// Markdown 에디터 종료
function destroyMarkdownEditor() {
  const editorElement = document.getElementById('editor');
  editorElement.value = ''; // 콘텐츠 초기화
  editorElement.style.display = 'none'; // 에디터 숨김
}
