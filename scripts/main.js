const post = document.getElementById("post");
const feed = document.getElementById("feed");

//função para publicar um post
const publishPost = () => {
  let content = post.value.trim();

  if (content !== "") {
    const uuid = self.crypto.randomUUID();
    console.log(uuid);
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMin = currentDate.getMinutes();
    const timestamp = `${currentDate.toLocaleDateString()} ${currentHour}:${currentMin}`;
    const newPost = `
        <div id="${uuid}" class="card">
            <p class="data">${timestamp}</p>
            <div class="content">${content}</div>
            <button onclick="deletePost('${uuid}')">Deletar</button>
        </div>
        `;
    feed.innerHTML = newPost + feed.innerHTML;

    savePost(timestamp, content, uuid);

    post.value = "";
  }
};

//função para salvar post no localStorage
const savePost = (timestamp, content, uuid) => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.push({ timestamp, content, uuid });

  localStorage.setItem("posts", JSON.stringify(posts));
};

//função para carregar posts já existentes do localStorage, caso haja
const loadPosts = () => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.reverse();

  let postsHTML = posts
    .map(
      (post) => `
    <div id="${post.uuid}" class="card">
    <p class="data">${post.timestamp}</p>
    <div class="content">${post.content}</div>
    <button onclick="deletePost('${post.uuid}')">Deletar</button>
</div>
    `
    )
    .join("");

  feed.innerHTML = postsHTML;
};

//função para deletar um post
const deletePost = (uuid) => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts = posts.filter((post) => post.uuid !== uuid);
  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts();
};

loadPosts();
