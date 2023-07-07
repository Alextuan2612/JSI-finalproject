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
