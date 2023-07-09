const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");
const commentsContainer = document.getElementById("commentsContainer");

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const commentText = commentInput.value;
  if (commentText.trim() !== "") {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.textContent = commentText;

    commentsContainer.appendChild(commentElement);

    commentInput.value = "";
  }
});
