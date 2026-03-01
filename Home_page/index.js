document.addEventListener("click", function(e) {
  if (e.target.classList.contains("add-to-cart")){
    
    let product = e.target.closest(".card");
    let data = {
      id: Date.now(), // unique ID
      name: product.dataset.name,
      price: Number(product.dataset.price),
      img: product.dataset.img,
      qty: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let exist = cart.find(i => i.name === data.name);

    if (exist) exist.qty++;
    else cart.push(data);

    localStorage.setItem("cart", JSON.stringify(cart));

    e.target.innerText = "✓";
setTimeout(() => {
  e.target.innerText = "+";
}, 800);
  }
});

window.addEventListener("load", async () => {
  await Clerk.load();

  const authBtn = document.getElementById("auth-btn");
  const authLink = document.getElementById("auth-link");

  if (Clerk.user) {
    // Change button text to user's name
    authBtn.textContent = Clerk.user.firstName || "User";

    // Remove link to sign page
    authLink.removeAttribute("href");

    // Optional: logout on click
    authBtn.onclick = async () => {
      await Clerk.signOut();
      window.location.reload();
    };
  }
});


let selectedRating = 0;

document.addEventListener("DOMContentLoaded", function () {

  const stars = document.querySelectorAll(".star");
  const reviewBtn = document.getElementById("submit-review");
  const reviewContainer = document.getElementById("reviews-container");

  // STAR CLICK
  stars.forEach(star => {
    star.addEventListener("click", function () {
      selectedRating = this.dataset.value;
      updateStars(selectedRating);
    });
  });

  function updateStars(rating) {
    stars.forEach(star => {
      star.classList.remove("selected");
      if (star.dataset.value <= rating) {
        star.classList.add("selected");
      }
    });
  }

  // LOAD REVIEWS
  function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviewContainer.innerHTML = "";

  reviews.forEach((review, index) => {
    reviewContainer.innerHTML += `
      <div class="review-card-clean">
        <h4>${review.name}</h4>
        <div class="rating">${"★".repeat(review.rating)}</div>
        <p>${review.text}</p>
        <button class="delete-review" data-index="${index}">
          Delete
        </button>
      </div>
    `;
  });
}
// DELETE REVIEW
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("delete-review")) {
    
    const index = e.target.dataset.index;
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.splice(index, 1);

    localStorage.setItem("reviews", JSON.stringify(reviews));

    loadReviews();
  }
});

  // POST REVIEW
  reviewBtn.addEventListener("click", function () {
    const name = document.getElementById("review-name").value.trim();
    const text = document.getElementById("review-text").value.trim();

    if (!name || !text || selectedRating == 0) {
      alert("Please fill all fields and select rating!");
      return;
    }

    const newReview = {
      name,
      text,
      rating: Number(selectedRating)
    };

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.unshift(newReview);

    localStorage.setItem("reviews", JSON.stringify(reviews));

    // reset
    document.getElementById("review-name").value = "";
    document.getElementById("review-text").value = "";
    selectedRating = 0;
    updateStars(0);

    loadReviews();
  });

  loadReviews();

});