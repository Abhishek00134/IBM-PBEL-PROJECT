document.addEventListener("click", function(e) {
  if (e.target.tagName === "BUTTON" &&( e.target.innerText === "+")){
    
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

    alert("Added to Cart!");
  }
});