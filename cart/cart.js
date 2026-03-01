let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Increase Qty
function increaseQty(id) {
  let item = cart.find(i => i.id == id);
  item.qty++;
  saveCart();
  renderCart();
}

// Decrease Qty
function decreaseQty(id) {
  let item = cart.find(i => i.id == id);
  if (item.qty > 1) item.qty--;
  saveCart();
  renderCart();
}

// Remove Item
function removeItem(id) {
  cart = cart.filter(i => i.id != id);
  saveCart();
  renderCart();
}

// Render Cart UI
function renderCart() {
   let container = document.getElementById("cart-items");
  let emptyBox = document.getElementById("empty-box");
  let priceBox = document.querySelector(".price-box");
  let bottomBar = document.querySelector(".bottom-bar");
  // let cartHead = document.querySelector("#head");

  container.innerHTML = "";

 
  if (cart.length === 0) {
    emptyBox.style.display = "block";   // show empty message
    priceBox.style.display = "none";    // hide price details box
    bottomBar.style.display = "none";   // hide place order button
    // cartHead.style.display = "none";
    return;
  }


  emptyBox.style.display = "none";      // hide empty message
  priceBox.style.display = "block";     // show price box
  bottomBar.style.display = "flex";


  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <div class="item-img"><img src="${item.img}"></div>

        <div class="item-details">
          <div class="item-title">${item.name}</div>
          <div class="item-price">₹${item.price}</div>

          <div class="qty-box">
            <button class="qty-btn" onclick="decreaseQty(${item.id})">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
          </div>

          <div class="actions">
            <span onclick="removeItem(${item.id})">REMOVE</span>
          </div>
        </div>
      </div>`;
  });

  // Price Details
  let discount = subtotal * 0.10;
  let delivery = subtotal > 500 ? 0 : 49;
  let total = subtotal - discount + delivery;

  document.getElementById("item-count").innerText = cart.length;
  document.getElementById("price").innerText = "₹" + subtotal;
  document.getElementById("discount").innerText = "-₹" + discount.toFixed(0);
  document.getElementById("delivery").innerText = delivery === 0 ? "Free" : "₹" + delivery;
  document.getElementById("total").innerText = "₹" + total.toFixed(0);
  document.getElementById("save-text").innerText = `You save ₹${discount.toFixed(0)} on this order`;
}

renderCart();

let placeBtn = document.querySelector('#place-order');
const modal = document.getElementById("address-modal");
const submitBtn = document.getElementById("submit-address");
const cancelBtn = document.getElementById("cancel-btn");

placeBtn?.addEventListener("click", function () {

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Show modal instead of redirect
  modal.style.display = "flex";
});

// Cancel button
cancelBtn?.addEventListener("click", function () {
  modal.style.display = "none";
});

// Submit address
submitBtn?.addEventListener("click", function () {
  const address = document.getElementById("delivery-address").value.trim();

  if (address === "") {
    alert("Please enter delivery address!");
    return;
  }

  // Create order object
  const order = {
    id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    items: cart,
    address: address,
    date: new Date().toLocaleString()
  };

  // localStorage.setItem("latestOrder", JSON.stringify(order));
  // Get existing orders or empty array
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Push new order
orders.push(order);

// Save back to localStorage
localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");

  // Redirect after address submit
  window.location.href = "../orderPlace/placed.html";
});

// Close modal when clicking outside
window.addEventListener("click", function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
    
