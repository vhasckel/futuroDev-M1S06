const post = document.getElementById("post");
const feed = document.getElementById("feed");

//função para publicar um post
const publishPost = () => {
  let content = post.value.trim();

  if (content !== "") {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMin = currentDate.getMinutes();
    const timestamp = `${currentDate.toLocaleDateString()} ${currentHour}:${currentMin}`;
    const newPost = `
        <div class="card">
            <p class="data">${timestamp}</p>
            <div class="content">${content}</div>
        </div>
        `;
    feed.innerHTML = newPost + feed.innerHTML;

    savePost(timestamp, content);

    post.value = "";
  }
};

//função para salvar post no localStorage
const savePost = (timestamp, content) => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.push({ timestamp, content });

  localStorage.setItem("posts", JSON.stringify(posts));
};

//função para carregar posts já existentes do localStorage, caso haja
const loadPosts = () => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.reverse();

  let postsHTML = posts
    .map(
      (post) => `
    <div class="card">
    <p class="data">${post.timestamp}</p>
    <div class="content">${post.content}</div>
</div>
    `
    )
    .join("");

  feed.innerHTML = postsHTML;
};

loadPosts();
