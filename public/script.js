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
  toolbar: 'media | undo redo | blocks | textformat | bold italic underline strikethrough | forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | outdent indent |  bullist numlist tabletools misc| ',
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
});

document.getElementById('submit').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const content = tinymce.get('editor').getContent();

  console.log('제목:', title);
  console.log('내용:', content);

  alert('글이 성공적으로 게시되었습니다!');
});
