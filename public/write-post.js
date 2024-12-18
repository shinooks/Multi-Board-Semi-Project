document.addEventListener("DOMContentLoaded", function () {
    // 에디터 초기화
    const quill = new Quill("#html-editor", { theme: "snow" });
    const markdownEditor = new toastui.Editor({
      el: document.querySelector("#markdown-editor"),
      height: "200px",
      initialEditType: "wysiwyg",
      previewStyle: "vertical",
    });
    const canvas = new fabric.Canvas("svg-editor");
    canvas.setWidth(400);
    canvas.setHeight(200);
  
    // 저장된 데이터
    const content = { html: "", markdown: "", svg: "" };
  
    // 에디터 전환 로직
    const editorMode = document.getElementById("editor-mode");
    const htmlContainer = document.getElementById("html-editor-container");
    const markdownContainer = document.getElementById("markdown-editor-container");
    const svgContainer = document.getElementById("svg-editor-container");
  
    editorMode.addEventListener("change", () => {
      const mode = editorMode.value;
  
      // 데이터 저장
      content.html = quill.root.innerHTML;
      content.markdown = markdownEditor.getMarkdown();
      content.svg = canvas.toSVG();
  
      // 에디터 전환
      htmlContainer.style.display = "none";
      markdownContainer.style.display = "none";
      svgContainer.style.display = "none";
  
      if (mode === "html") {
        htmlContainer.style.display = "block";
        quill.root.innerHTML = content.html;
      } else if (mode === "markdown") {
        markdownContainer.style.display = "block";
        markdownEditor.setMarkdown(content.markdown);
      } else if (mode === "svg") {
        svgContainer.style.display = "block";
        canvas.loadFromSVG(content.svg, () => canvas.renderAll());
      }
    });
  
    // Save 버튼 클릭 이벤트
    document.getElementById("save-button").addEventListener("click", () => {
      const result = {
        html: quill.root.innerHTML,
        markdown: markdownEditor.getMarkdown(),
        svg: canvas.toSVG(),
      };
      console.log("Saved content:", JSON.stringify(result, null, 2));
      alert("Content saved! Check the console for details.");
    });
  
    // SVG 추가 함수
    window.addRectangle = () => canvas.add(new fabric.Rect({ left: 50, top: 50, fill: "blue", width: 50, height: 50 }));
    window.addCircle = () => canvas.add(new fabric.Circle({ left: 150, top: 50, fill: "green", radius: 30 }));
    window.addText = () => canvas.add(new fabric.Text("Hello", { left: 250, top: 50, fill: "red" }));
  });
  