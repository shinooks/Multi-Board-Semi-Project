function initializeHTMLEditor(initialContent = '') {
    const editorElement = document.getElementById('editor');
    editorElement.style.display = 'block'; // 에디터 표시
    editorElement.value = initialContent; // 초기 콘텐츠 설정
    editorElement.setAttribute('placeholder', 'HTML 코드를 입력하세요...');
  }
  
  // HTML 콘텐츠 가져오기
  function getHTMLContent() {
    const editorElement = document.getElementById('editor');
    return editorElement.value || '';
  }
  
  // HTML 에디터 종료
  function destroyHTMLEditor() {
    const editorElement = document.getElementById('editor');
    editorElement.value = ''; // 콘텐츠 초기화
    editorElement.style.display = 'none'; // 에디터 숨김
  }
  