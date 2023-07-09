let products = [];
fetch("book.json", {
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})
  .then((response) => response.json())
  .then((Data) => {
    let html = "";
    for (i = 0; i < Data.length; i++) {
      {
        if (Data[i].categories.indexOf("Most-popular") != -1) {
          let htmlSegment = `
          <div class="spacing">
          <div class="best-selling">
            <img
              src="${Data[i].image}"
              alt=""
              class="best-image"
            />
            <img
              src="https://s3-alpha-sig.figma.com/img/7e8e/d46b/4b0c8b88c72a2cde69f59e0e2d8ae645?Expires=1688947200&Signature=XStWC7kko~RgB3ZkjpQ9BmKW4hwlejZiylc1WxR~3FpFZFlMRkgUmmE8rFuwJ9OEpYV9IhVlBNH8FzMwlPj31p0k~p5KsdAN0HsUrlGMOWen4PURFBG4Yp~wR1LwGUYPfPu2UtNZnKVwWcHWy87ndLEtU9wqfIRlu~ZUpzF5PwFh5s6w~JJwH6L86MV62cJjxTltD1iwtT~nLcvbp18aAmtAHTCPYN0xj5zynch~9HvXMAPYOLbCE14FGkjBP79U04cHAcFHI-riQxhvnjEWZbtQjVXihbZJfwX~fLRf1QvVwVEGK35vEqi2Jm7nsfUslutzJacS93ltZoqdVIb93Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt=""
              style="width: 120.266px; height: 36.551px; flex-shrink: 0"
            />
            <h4 style="text-align: center; font-weight: 700">${Data[i].title}</h4>
            <div class="star-spacing">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
            </div>
            <p class="best-word">
              ${Data[i].detail}
            </p>
            <div class="buttons-container">
              <button class="button-arounder" onclick="location.href = '${Data[i].link}';">Find more here</button>
            </div>
          </div>
        </div>
                          `;
          html += htmlSegment;
        }
      }
    }

    let container = document.querySelector(".bestselling");
    container.innerHTML = html;
  });
console.log(products);

const currentUser = JSON.parse(localStorage.getItem("currentusers"));

if (localStorage.getItem("login") == "true") {
  console.log(localStorage.getItem("login"));
  const logincontainer = document.getElementById("login-container");
  logincontainer.innerHTML = `<h1 style="font-family: 'Josefin Slab', serif;">Welcome ${currentUser.displayName}</h1><button onclick="logout()">Logout</button>`;
}
document.getElementById("Non-fiction").onclick = function () {
  location.href = "Non-fiction.html";
};
document.getElementById("Fiction").onclick = function () {
  location.href = "Fiction.html";
};
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
window.addEventListener("scroll", function () {
  var scrollTopButton = document.getElementById("scrollTopButton");
  if (window.pageYOffset > 300) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
});

document
  .getElementById("scrollTopButton")
  .addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
