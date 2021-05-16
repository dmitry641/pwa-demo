window.addEventListener("load", async () => {
  await loadPosts();
});

async function loadPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_page=3&_limit=20"
  );
  const json = await res.json();
  const posts = document.querySelector(".posts");
  posts.innerHTML = json.map(cardHTML).join("\n");
}

function cardHTML(item) {
  return `
  <div class="card">
    <div class="card-title">
      ${item.title}
    </div>
    <div class="card-body">
      ${item.body}
    </div>
  </div>
  `;
}
