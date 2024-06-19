let cartItems = JSON.parse(localStorage.getItem("cart"));

function showCartItems(cartItems) {
  const cartList = $("#cart-lists");

  // Clear the previous list
  cartList.empty();

  if (cartItems.length > 0) {
    const cartBtn = $("#cart-btn");
    cartBtn.html(`
          <button id="checkout-btn" class="btn btn-danger checkout-btn">Check Out</button>
      `);
    const cartList = document.getElementById("cart-lists");
    cartItems.forEach((cartItem) => {
      const cartDiv = document.createElement("li");
      cartDiv.classList.add("list-item");
      // cartDiv.classList.add("col-sm-1", "col-md-3", "col-lg-4", "g-3");
      cartDiv.innerHTML = `
      <div id="cart-items-container">
        <div id="cart-item">
          <img src="${cartItem.image}" alt="${cartItem.image}" />
          <div id="cart-item-info">
            <h5>${cartItem.name}</h5>
            <p>ID : ${cartItem.id}</p>
          </div>
        </div>
        <div>
          <h5 id="cart-item-price">$${cartItem.price}.00</h5>
          <button id="cart-remove-btn" data-id="${cartItem.id}" data-cid="${cartItem.cartItemID}" data-name="${cartItem.name}" data-price="${cartItem.price}" data-image="${cartItem.image}" data-category="${cartItem.category}"><i class="bi bi-x-circle h3"></i></button>
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
}

showCartItems(cartItems);

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

$(document).on("click", "#cart-remove-btn", function () {
  // localStorage.
  let selectedItem = $(this).data("cid");

  // Make the list without the selectedItem ( mean remove )
  cartItems = cartItems.filter((item) => item.cartItemID !== selectedItem);

  // Update the cart items in local storage
  localStorage.setItem("cart", JSON.stringify(cartItems));
  console.log(selectedItem);
  showCartItems(cartItems);
});
