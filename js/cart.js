let cartItems = JSON.parse(localStorage.getItem("cart"));

if (cartItems) {
  const cartList = document.getElementById("cart-lists");
  cartItems.forEach((cartItem) => {
    const cartDiv = document.createElement("div");
    cartDiv.classList.add("col-sm-1", "col-md-3", "col-lg-4", "g-3");
    cartDiv.innerHTML = `
            <div class="p-3 card card_shadow product-card" data-category="${cartItem.category}">
                <div class="img_container">
                    <img id="product-img" src="${cartItem.image}" class="rounded card-img-top" alt="${cartItem.name}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${cartItem.name}</h5>
                    <div class="d-flex justify-content-between align-items-center">
                      <small class="text-body-secondary">
                          <span id="product_price">${cartItem.price}</span>.00 $
                      </small>

                      <button id="checkout-btn" type="button" class="btn btn-primary">CheckOut</button>
                    </div>
                  </div>
                </div>

            `;
    cartList.appendChild(cartDiv);
  });
} else {
  alert("Your cart is empty!");
  // Redirect to index.html
  window.location.href = "index.html";
}

$(document).ready(function () {
  $("#checkout-btn").on("click", () => {
    localStorage.removeItem("cart");
    $("#cart-lists").empty();

    alert("Thanks for shopping with us.");
    // updateCartUI();
    // Redirect to index.html
    window.location.href = "index.html";
  });
});
