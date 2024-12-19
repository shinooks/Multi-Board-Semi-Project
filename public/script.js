let currentEditorMode = '기본모드'; // 현재 에디터 모드 (기본값: TinyMCE)

// 에디터 모드 전환
function switchEditorMode(mode) {
  let content = getCurrentEditorContent(); // 현재 에디터 콘텐츠 가져오기

  // 기본모드에서 Markdown으로 전환 시 경고 표시
  if (currentEditorMode === '기본모드' && mode === 'Markdown') {
    const userConfirmed = confirm(
      'Markdown 모드로 전환하면 일부 서식(글꼴, 색상 등)이 적용되지 않을 수 있습니다. 계속하시겠습니까?'
    );
    if (!userConfirmed) return; // 사용자가 취소하면 전환 중단
  }

  // 현재 모드의 에디터 종료
  if (currentEditorMode === '기본모드') destroyTinyMCE();
  if (currentEditorMode === 'Markdown') destroyMarkdownEditor();
  if (currentEditorMode === 'HTML') destroyHTMLEditor();

  // 선택된 모드의 에디터 초기화
  if (mode === '기본모드') initializeTinyMCE(content);
  if (mode === 'Markdown') initializeMarkdownEditor(content);
  if (mode === 'HTML') initializeHTMLEditor(content);

  currentEditorMode = mode; // 현재 모드 업데이트
}

// 현재 에디터 콘텐츠 가져오기
function getCurrentEditorContent() {
  if (currentEditorMode === '기본모드') return getTinyMCEContent();
  if (currentEditorMode === 'Markdown') return getMarkdownContent();
  if (currentEditorMode === 'HTML') return getHTMLContent();
  return '';
}
