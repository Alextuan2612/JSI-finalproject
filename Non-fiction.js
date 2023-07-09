let products = [];
const searchInput = document.querySelector("#search");
const productCardTemplate = document.querySelector("[product-template]");
const productCardcontainer = document.querySelector("[product-card-container]");
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  products.forEach((users) => {
    if (users) {
      const isVisible = users.name.toLowerCase().includes(value);
      users.element.classList.toggle("hide", !isVisible);
    }
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
    console.log(Data);
    products.push(
      ...Data.map((product) => {
        if (product.categories.indexOf("Non-fiction") != -1) {
          const card = productCardTemplate.content.cloneNode(true).children[0];
          const title = card.querySelector("[product-header]");
          const image = card.querySelector("[image-main]");
          const author = card.querySelector("[product-author]");
          const detail = card.querySelector("[product-details]");
          card.addEventListener("click", function () {
            location.href = product.link;
          });
          detail.textContent = product.detail;
          author.textContent = product.author;
          image.src = product.image;
          title.textContent = product.title;
          productCardcontainer.append(card);
          return {
            name: product.title,
            categories: product.categories,
            element: card,
          };
        }
      })
    );
  });
console.log(products);
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
