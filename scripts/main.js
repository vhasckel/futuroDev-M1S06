const postInput = document.getElementById("post");
const feedContainer = document.getElementById("feed");
const profileUsername = document.getElementById("username").textContent;
const profileName = document.getElementById("name").textContent;
const profilePicture = document.getElementById("picture").src;

const createPostElement = (post) => {
  const { uuid, timestamp, content } = post;
  return `
    <div id="${uuid}" class="card">
    <div class="infos">
        <div class="profile-post">
            <img src="${profilePicture}" alt="Profile Picture" class="profile-picture">
            <h3 class="name">${profileName}</h3>
            <span class="username">${profileUsername}</span>
        </div>
    <div class="data">
    <p >${timestamp}</p>
    </div>
    </div>

    <div class="content">${content}</div>
    <button class="delete-btn" onclick="deletePost('${uuid}')">Deletar</button>
    </div>
  </div>
    `;
};

//função para publicar um post
const publishPost = () => {
  let content = post.value.trim();

  if (content !== "") {
    const uuid = self.crypto.randomUUID();
    console.log(uuid);
    const currentDate = new Date();
    const timestamp = `${currentDate.toLocaleDateString()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    const newPost = { uuid, timestamp, content };

    const postElement = createPostElement(newPost);

    feedContainer.insertAdjacentHTML("afterbegin", postElement);

    savePost(newPost);
    post.value = "";
  }
};

//função para salvar post no localStorage
const savePost = (post) => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.push(post);

  localStorage.setItem("posts", JSON.stringify(posts));
};

//função para carregar posts já existentes do localStorage, caso haja
const loadPosts = () => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.reverse();

  const postsHTML = posts.map(createPostElement).join("");
  feedContainer.innerHTML = postsHTML;
};

//função para deletar um post
const deletePost = (uuid) => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts = posts.filter((post) => post.uuid !== uuid);
  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts();
};

loadPosts();
