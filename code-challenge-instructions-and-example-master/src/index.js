function helloThere() {
  return "Hello there."
}

console.log(helloThere())

document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const errorMessage = document.getElementById("modal-message");

  errorModal.classList.add("hidden");

  const handleServerResponse = (response) => {
    if (response === "success") {
      event.target.innerHTML = `Like! <span class="like-glyph activated-heart">&#x2665;</span>`;
    } else {
      errorModal.classList.remove("hidden");
      errorMessage.textContent = "Server Error. Please try again.";

      setTimeout(() => {
        errorModal.classList.add("hidden");
      }, 3000);
    }
  };

  const handleLikeAction = (event) => {
    const likeGlyph = event.target;

    mimicServerCall()
      .then((response) => handleServerResponse(response))
      .catch(() => {
        errorModal.classList.remove("hidden");
        errorMessage.textContent = "Network Error. Please try again.";

        setTimeout(() => {
          errorModal.classList.add("hidden");
        }, 3000);
      });

    likeGlyph.classList.toggle("activated-heart");
  };

  const likeButtons = document.querySelectorAll(".like");
  likeButtons.forEach((button) => {
    button.addEventListener("click", handleLikeAction);
  });
});

function mimicServerCall() {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.random();

    setTimeout(() => {
      if (randomNumber < 0.8) {
        resolve("success");
      } else {
        reject("error");
      }
    }, 1000);
  });
}
