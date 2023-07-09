let products = [];
const searchInput = document.querySelector("#search");
const productCardTemplate = document.querySelector("[product-template]");
const productCardcontainer = document.querySelector("[product-card-container]");
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  products.forEach((users) => {
    const isVisible = users.name.toLowerCase().includes(value);
    users.element.classList.toggle("hide", !isVisible);
  });
});
console.log(searchInput);
fetch("book.json", {
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})
  .then((response) => response.json())
  .then((Data) => {
    products = Data.map((product) => {
      const card = productCardTemplate.content.cloneNode(true).children[0];
      const title = card.querySelector("[product-header]");
      const image = card.querySelector("[image-main]");
      const author = card.querySelector("[product-author]");
      const detail = card.querySelector("[product-details]");
      const link = card.querySelector("[link-more]");
      link.addEventListener("click", function () {
        location.href = product.link;
      });
      detail.textContent = product.detail;
      author.textContent = product.author;
      image.src = product.image;
      title.textContent = product.title;
      productCardcontainer.append(card);
      return { name: product.title, element: card };
    });
  });
const commentForm = document.getElementById("commentForm");
const nameInput = document.getElementById("nameInput");
const commentInput = document.getElementById("commentInput");
const commentsContainer = document.getElementById("commentsContainer");
const currentUser = JSON.parse(localStorage.getItem("currentusers"));

// Load comments from localStorage on page load
window.addEventListener("load", function () {
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];

  savedComments.forEach(function (comment) {
    createCommentElement(comment.name, comment.commentText);
  });
});
commentForm.addEventListener("submit", function (event) {
  if (localStorage.getItem("login") == "true") {
    event.preventDefault();

    const name = currentUser.displayName;
    const commentText = commentInput.value;
    if (name.trim() !== "" && commentText.trim() !== "") {
      createCommentElement(name, commentText);

      // Save comment to localStorage
      const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
      savedComments.push({ name: name, commentText: commentText });
      localStorage.setItem("comments", JSON.stringify(savedComments));

      commentInput.value = "";
    }
  } else {
    alert("Please login before using");
  }
});

function createCommentElement(name, commentText) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  const nameElement = document.createElement("h3");
  nameElement.textContent = name;

  const commentTextElement = document.createElement("p");
  commentTextElement.textContent = commentText;

  commentElement.appendChild(nameElement);
  commentElement.appendChild(commentTextElement);

  commentsContainer.appendChild(commentElement);
}
if (localStorage.getItem("login") == "true") {
  console.log(localStorage.getItem("login"));
  const logincontainer = document.getElementById("login-container");
  logincontainer.innerHTML = `<h1 style="font-family: 'Josefin Slab', serif;">Welcome ${currentUser.displayName}</h1><button onclick="logout()">Logout</button><button onclick="redirect()">Profile</button>`;
}

if (localStorage.getItem("login") == "false") {
  const logincontainer = document.getElementById("login-container");
  logincontainer.innerHTML = `
<button
          class="login-signup"
          onclick="window.location.href='test.html';"
        >
          Login
        </button>`;
}
function logout() {
  const logincontainer = document.getElementById("login-container");
  logincontainer.innerHTML = `
<button
          class="login-signup"
          onclick="window.location.href='test.html';"
        >
          Login
        </button>`;
  localStorage.setItem("login", "false");
}
function redirect() {
  location.href = "Profile.html";
}
