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
