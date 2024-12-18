const modeSelect = document.getElementById('mode-select');
const saveBtn = document.getElementById('save-btn');

const richEditor = document.getElementById('rich-editor');
const markdownEditor = document.getElementById('markdown-editor');
const htmlEditor = document.getElementById('html-editor');

let editorData = {
  content: {
    html: '',
    markdown: ''
  }
};

// 모드 변경 이벤트
modeSelect.addEventListener('change', () => {
  const mode = modeSelect.value;
  switchMode(mode);
});

// 모드 전환 함수
function switchMode(mode) {
  if (mode === 'rich') {
    markdownEditor.style.display = 'none';
    htmlEditor.style.display = 'none';
    richEditor.style.display = 'block';
    richEditor.innerHTML = htmlEditor.value || markdownToHtml(markdownEditor.value);
  } else if (mode === 'markdown') {
    richEditor.style.display = 'none';
    htmlEditor.style.display = 'none';
    markdownEditor.style.display = 'block';
    markdownEditor.value = htmlToMarkdown(richEditor.innerHTML || htmlEditor.value);
  } else if (mode === 'html') {
    richEditor.style.display = 'none';
    markdownEditor.style.display = 'none';
    htmlEditor.style.display = 'block';
    htmlEditor.value = richEditor.innerHTML || markdownToHtml(markdownEditor.value);
  }
}

// 저장 버튼 이벤트
saveBtn.addEventListener('click', () => {
  editorData.content.html = richEditor.innerHTML;
  editorData.content.markdown = markdownEditor.value;

  console.log('저장된 데이터:', JSON.stringify(editorData, null, 2));
  alert('데이터가 JSON 형식으로 저장되었습니다. 콘솔을 확인해주세요.');
});

// 간단한 변환 함수
function markdownToHtml(md) {
  return md.replace(/### (.*?)\n/g, '<h3>$1</h3>')
           .replace(/## (.*?)\n/g, '<h2>$1</h2>')
           .replace(/- (.*?)\n/g, '<li>$1</li>')
           .replace(/\n/g, '<br>');
}

function htmlToMarkdown(html) {
  return html.replace(/<h3>(.*?)<\/h3>/g, '### $1\n')
             .replace(/<h2>(.*?)<\/h2>/g, '## $1\n')
             .replace(/<li>(.*?)<\/li>/g, '- $1\n')
             .replace(/<br>/g, '\n');
}
