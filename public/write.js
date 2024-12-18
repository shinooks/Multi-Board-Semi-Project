document.addEventListener("DOMContentLoaded", () => {
    // 탭 버튼과 에디터 DOM 요소
    const editorTabs = document.querySelectorAll("#editor-tabs button");
    const editors = document.querySelectorAll(".editor-container");
  
    // 에디터 초기화
    const quill = new Quill("#rich-editor", { theme: "snow" }); // Rich Text Editor
    const markdownEditor = document.getElementById("markdown-editor");
    const htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-editor"), {
      lineNumbers: true,
      mode: "htmlmixed",
      theme: "default",
    });
  
    // 탭 전환 이벤트
    editorTabs.forEach(button => {
      button.addEventListener("click", () => {
        editors.forEach(editor => editor.classList.remove("active"));
        document.getElementById(`${button.dataset.mode}-editor`).classList.add("active");
      });
    });
  
    // 게시글 데이터 저장
    document.getElementById("submit-post").addEventListener("click", () => {
      const title = document.getElementById("post-title").value;
  
      const content = {
        html: htmlEditor.getValue(),
        markdown: markdownEditor.value,
        graphics: { drawio: "", excalidraw: "" },
      };
  
      if (quill.root.innerHTML.trim()) {
        content.html = quill.root.innerHTML;
      }
  
      const newPost = {
        postId: Date.now().toString(),
        title,
        content,
        metadata: {
          author: "익명",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      };
  
      console.log("저장된 게시글:", JSON.stringify(newPost, null, 2));
      alert("게시글이 저장되었습니다!");
    });
  });
  