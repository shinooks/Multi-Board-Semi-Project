function initializeTinyMCE(initialContent = '') {
    tinymce.init({
      selector: '#editor',
      height: 500,
      menubar: false,
      branding: false,
      automatic_uploads: true,
      images_upload_url: '/upload-image',
      plugins: [
        'anchor', 'autolink', 'charmap', 'codesample',
        'emoticons', 'image', 'link', 'lists',
        'media', 'searchreplace', 'table',
        'visualblocks', 'wordcount',
      ],
      toolbar:
        'media | undo redo | blocks | textformat | bold italic underline strikethrough | forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist tabletools misc | modeselect',
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
          items: 'hr blockquote charmap emoticons codesample',
        },
      },
      toolbar_mode: 'floating',
      setup: (editor) => {
        editor.ui.registry.addMenuButton('modeselect', {
          text: '모드 선택',
          fetch: (callback) => {
            callback([
              { type: 'menuitem', text: '기본모드', onAction: () => switchEditorMode('기본모드') },
              { type: 'menuitem', text: 'Markdown', onAction: () => switchEditorMode('Markdown') },
              { type: 'menuitem', text: 'HTML', onAction: () => switchEditorMode('HTML') },
            ]);
          },
        });
        editor.on('init', () => {
          editor.setContent(initialContent); // 초기 콘텐츠 설정
        });
      },
    });
  }
  
  function getTinyMCEContent() {
    return tinymce.get('editor')?.getContent() || '';
  }
  
  function destroyTinyMCE() {
    if (tinymce.get('editor')) {
      tinymce.get('editor').remove();
    }
  }
  