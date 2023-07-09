const currentUser = JSON.parse(localStorage.getItem("currentusers"));

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
let products = [];
const searchInput = document.querySelector("#search");
const productCardTemplate = document.querySelector("[product-template]");
const productCardcontainer = document.querySelector("[product-card-container]");
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  products.forEach((users) => {
    console.log(users.name);
    const isVisible = users.name.toLowerCase().includes(value);
    users.element.classList.toggle("hide", !isVisible);
  });
});
console.log(searchInput);
fetch("Author.json", {
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
      const number = card.querySelector("[number]");
      const detail = card.querySelector("[product-details]");
      detail.textContent = product.detail;
      title.textContent = product.Name;
      image.src = product.image;
      number.textContent = product.Number;
      productCardcontainer.append(card);
      return { name: product.Name, element: card };
    });
  });
