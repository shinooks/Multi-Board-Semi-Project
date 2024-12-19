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
    let currentMode = '기본모드'; // 초기 모드

    // 모드 선택 버튼 추가
    editor.ui.registry.addMenuButton('modeselect', {
      text: '기본 모드', // 툴바 버튼 텍스트
      tooltip: '에디터 모드 선택',
      fetch: (callback) => {
        const items = [
          {
            type: 'menuitem',
            text: '기본모드',
            onAction: () => {
              currentMode = '기본모드';
              editor.setContent('<p>기본모드로 전환되었습니다.</p>');
              console.log('현재 모드:', currentMode);
            },
          },
          {
            type: 'menuitem',
            text: 'Markdown',
            onAction: () => {
              currentMode = 'Markdown';
              editor.setContent('<pre><code># Markdown 모드</code></pre>');
              console.log('현재 모드:', currentMode);
            },
          },
          {
            type: 'menuitem',
            text: 'HTML',
            onAction: () => {
              currentMode = 'HTML';
              editor.setContent('<p>&lt;p&gt;HTML 모드&lt;/p&gt;</p>');
              console.log('현재 모드:', currentMode);
            },
          },
        ];
        callback(items); // 메뉴 항목 반환
      },
    });
  },
});

// 게시하기 버튼 전송 이벤트
document.getElementById('submit').addEventListener('click', async () => {
  const title = document.getElementById('title').value;
  const content = tinymce.get('editor').getContent();
  const author = 'user1';

  if (!title.trim() || !content.trim()) {
    alert('제목과 내용을 모두 입력해주세요!');
    return;
  }

  const postData = {
    postid: Date.now().toString(),
    author: author,
    title: title,
    content: [
      {
        html: content,
        markdown: "",
        svg: "",
      },
    ],
  };

  console.log('전송 데이터:', postData);

  try {
    const response = await fetch('/save-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      alert('게시글이 성공적으로 저장되었습니다!');
      document.getElementById('title').value = '';
      tinymce.get('editor').setContent('');
    } else {
      alert('저장 중 오류가 발생했습니다.');
    }
  } catch (error) {
    console.error('서버 요청 중 오류:', error);
    alert('저장 중 오류가 발생했습니다.');
  }
});
