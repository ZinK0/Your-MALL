let cartItems = JSON.parse(localStorage.getItem("cart"));

if (cartItems) {
  const cartList = document.getElementById("cart-lists");
  cartItems.forEach((cartItem) => {
    const cartDiv = document.createElement("li");
    // cartDiv.classList.add("col-sm-1", "col-md-3", "col-lg-4", "g-3");
    cartDiv.innerHTML = `
                    <div class="cart-list-container">
                        <div class="cart-list-img">
                            <img width="150px" src="${cartItem.image}" alt="${cartItem.name}"/>
                            <p>${cartItem.name}</p>
                        </div>
                        <div class="cart-list-price>
                            <p>${cartItem.price}</p>
                        </div>
                    </div>
            `;
    cartList.appendChild(cartDiv);
  }
const cartBtn = document.getElementById("cart-btn");


  );
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
