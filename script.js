const converter = new showdown.Converter({
  tables: true,
  ghCompatibleHeaderId: true,
  simpleLineBreaks: true,
  strikethrough: true,
  emoji: true,
  tasklists: true,
  smoothLivePreview: true,
  parseImgDimensions: true,
  openLinksInNewWindow: true,
  backslashEscapesHTMLTags: false, // HTML 태그 유지
});
let currentMode = '기본모드'; // 초기 모드

// TinyMCE 초기화 스크립트
tinymce.init({
  selector: '#editor',
  height: 500,
  menubar: false,
  branding: false,
  automatic_uploads: true, // 이미지 자동 업로드
  images_upload_url: '/upload-image',
  plugins:  ['anchor','autolink','charmap','codesample',
              'emoticons','image','link','lists','media',
              'searchreplace','table','visualblocks','wordcount',
            ],      
  toolbar: 'media | undo redo | blocks | textformat | bold italic underline strikethrough | forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | outdent indent |  bullist numlist tabletools misc| modeselect',
  toolbar_groups: {
    textformat: {
      icon: 'change-case',
      tooltip: '글꼴',
      items: 'fontfamily | fontsize | lineheight',
    },
    media: {
      icon: 'image',
      tooltip: '첨부',
      items: 'anchor link unlink image media',
    },
    tabletools: {
      icon: 'table',
      tooltip: '표',
      items: 'table tableprops | tableinsertrowbefore tableinsertrowafter tabledelete',
    },
    misc: {
      icon: 'image-options',
      tooltip: '더보기',
      items: 'hr blockquote charmap emoticons codesample ',
    },
  },
  toolbar_mode: 'floating',
  setup: (editor) => {
    editor.ui.registry.addMenuButton('modeselect', {
      text: '모드 선택',
      fetch: (callback) => {
        callback([
          { type: 'menuitem', text: '기본모드', onAction: () => switchMode('기본모드') },
          { type: 'menuitem', text: 'Markdown', onAction: () => switchMode('Markdown') },
          { type: 'menuitem', text: 'HTML', onAction: () => switchMode('HTML') },
        ]);
      },
    });
  },
});

// 모드 전환 함수
function switchMode(mode) {
  const title = document.getElementById('title');
  const markdownEditor = document.getElementById('markdown-editor');
  const htmlEditor = document.getElementById('html-editor');
  const richTextEditor = document.getElementById('editor');

  if (mode === '기본모드') {
    if (currentMode === 'Markdown') tinymce.get('editor').setContent(converter.makeHtml(markdownEditor.value));
    if (currentMode === 'HTML') tinymce.get('editor').setContent(htmlEditor.value);

    if (!tinymce.get('editor')) {
      tinymce.init({ selector: '#editor' });
    }

    richTextEditor.style.display = '';
    markdownEditor.style.display = 'none';
    htmlEditor.style.display = 'none';
  } else if (mode === 'Markdown') {
    if (currentMode === '기본모드') markdownEditor.value = converter.makeMarkdown(tinymce.get('editor').getContent());
    if (currentMode === 'HTML') markdownEditor.value = converter.makeMarkdown(htmlEditor.value);

    if (tinymce.get('editor')) {
      tinymce.get('editor').remove();
    }

    richTextEditor.style.display = 'none';
    markdownEditor.style.display = '';
    htmlEditor.style.display = 'none';
  } else if (mode === 'HTML') {
    if (currentMode === '기본모드') htmlEditor.value = tinymce.get('editor').getContent();
    if (currentMode === 'Markdown') htmlEditor.value = converter.makeHtml(markdownEditor.value);

    if (tinymce.get('editor')) {
      tinymce.get('editor').remove();
    }

    richTextEditor.style.display = 'none';
    markdownEditor.style.display = 'none';
    htmlEditor.style.display = '';
  }

  currentMode = mode;
  console.log(`${mode} 모드로 전환되었습니다.`);
}

// 게시 버튼 이벤트
document.getElementById('submit').addEventListener('click', async () => {
  const title = document.getElementById('title').value;
  let content = '';

  if (currentMode === '기본모드') {
    content = tinymce.get('editor').getContent();
  } else if (currentMode === 'Markdown') {
    content = converter.makeHtml(document.getElementById('markdown-editor').value);
  } else if (currentMode === 'HTML') {
    content = document.getElementById('html-editor').value;
  }

  const postData = {
    postid: Date.now().toString(),
    author: 'user1',
    title: title,
    content: [
      {
        html: content,
        markdown: currentMode === 'Markdown' ? document.getElementById('markdown-editor').value : converter.makeMarkdown(content),
      },
    ],
  };

  console.log('전송 데이터:', postData);

  try {
    const response = await fetch('/save-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      alert('게시글이 저장되었습니다!');
    } else {
      alert('저장에 실패했습니다.');
    }
  } catch (error) {
    console.error('전송 오류:', error);
  }
});