document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts-container");
  
    // 글쓰기 버튼 이벤트 핸들러
    const writeButton = document.getElementById("write-post-button");
    writeButton.addEventListener("click", () => {
      window.location.href = "/write-post.html"; // 글쓰기 페이지로 이동
    });
  
    // 게시글 데이터 가져오기
    fetch("posts.json")
      .then(response => {
        if (!response.ok) throw new Error("Failed to load posts.json");
        return response.json();
      })
      .then(data => renderPosts(data.posts))
      .catch(error => {
        console.error("Error loading posts:", error);
        postsContainer.innerHTML = "<p>데이터를 불러오는데 실패했습니다.</p>";
      });
  
    // 게시글 렌더링 함수
    function renderPosts(posts) {
      posts.forEach(post => {
        const postHTML = `
          <div class="post-container">
            <div class="thumbnail">
              <a href="${post.links.storyUrl}" target="_blank">
                <img src="${post.thumbnail.small}" alt="${post.title}">
              </a>
            </div>
            <div class="post-details">
              <h2><a href="${post.links.storyUrl}" target="_blank">${post.title}</a></h2>
              <p>${post.subtitle}</p>
              <div class="author">
                <img src="${post.author.profileImage}" alt="${post.author.name}">
                <a href="${post.author.publicationUrl || post.links.authorUrl}" target="_blank">
                  ${post.author.name}
                </a>
              </div>
              <div class="stats">
                <span>조회수: ${post.stats.views}회</span> |
                <span>댓글: ${post.stats.responses || 0}개</span> |
                <span>작성일: ${post.createdAt}</span>
              </div>
            </div>
          </div>
        `;
        postsContainer.insertAdjacentHTML("beforeend", postHTML);
      });
    }
  });
  