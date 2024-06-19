let cartItems = JSON.parse(localStorage.getItem("cart"));

const cartBtn = $("#cart-btn");
cartBtn.html(`
          <button id="checkout-btn" class="btn btn-danger checkout-btn btn-lg">Check Out</button>
      `);

function showCartItems(cartItems) {
  const cartList = $("#cart-lists");

  // Clear the previous list
  cartList.empty();

  if (!cartItems || cartItems.length === 0) {
    alert("Your cart is empty!");
    // Redirect to index.html
    window.location.href = "index.html";
  } else {
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
  }
}

showCartItems(cartItems);

$(document).ready(function () {
  $("#checkout-btn").on("click", () => {
    // window.location.href = "cart.html";
    $("#cart-section").addClass("displayNone");

    $("#receipt_section").removeClass("displayNone");

    // alert("Thanks for shopping with us.");
    // updateCartUI();

    function showReceipt() {
      // Date section
      const date = new Date();
      const formattedDate = formatDate(date);
      $("#receipt_date").text(formattedDate);

      // Unique order id ( have to change later and save for the check )
      $("#order_id").text(new Date().getTime());

      // change user name for thanks
      let signedInUsername = JSON.parse(localStorage.getItem("loginState"));
      $("#ordered_user").text(signedInUsername.name);

      //loop the added cart to show
      let cartItems = JSON.parse(localStorage.getItem("cart"));

      cartItems.forEach((cartItem) => {
        $("#receipt_list_ol").append(`
          <li>
            <div id="receipt_list_container">
              <div id="receipt_img_desc">
                <img src="${cartItem.image}" alt=""${cartItem.image}" />
                <h3>${cartItem.name}</h3>
              </div>
              <div id="receipt_product_price">
                <h3>$${cartItem.price}.00</h3>
              </div>
            </div>
          </li>
        `);
      });

      $("#receipt_total_number").text("$" + cartTotalPrice() + ".00");
    }

    showReceipt();
  });
  $(document).ready(function () {
    $("#save_receipt_btn").on("click", function () {
      // To remove the button in saved picture
      $("#receipt_button").addClass("displayNone");

      // Ensure receipt section is visible and added to the document
      $("#receipt_section").removeClass("displayNone");

      // Function to download the receipt as an image
      const receiptContainer = $("#receipt_section");

      setTimeout(() => {
        // Get the container element after it's added to the document
        const receiptContainer = document.getElementById("receipt_section");

        html2canvas(receiptContainer)
          .then((canvas) => {
            const link = document.createElement("a");
            link.download = "receipt.png";
            link.href = canvas.toDataURL("image/png");
            link.click();

            // Clear localStorage
            localStorage.removeItem("cart");

            // Redirect to index.html
            window.location.href = "index.html";
          })
          .catch((error) => {
            console.error("Error generating receipt image:", error);
            alert("Error generating receipt image. Please try again later.");
          });
      }, 300); // Adjust delay time as needed
    });
    $("#save_receipt_close").on("click", function () {
      //close save button
      $("#receipt_section").addClass("displayNone");

      //Say thanks you
      alert("Thanks for shopping with us.");

      // Clear localStorage
      localStorage.removeItem("cart");

      // Redirect to index.html
      window.location.href = "index.html";
    });
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
  cartTotalPrice();
  console.log(cartTotalPrice());
  $("#total-price").text("$" + cartTotalPrice());
});

function cartTotalPrice() {
  let totalprice = 0;
  cartItems.forEach((cartItem) => {
    totalprice += cartItem.price;
  });
  return totalprice;
}

$("#total-price").text("$" + cartTotalPrice());

console.log(cartTotalPrice());

// Purchase Receipt Section Start Here

function formatDate(date) {
  // Helper function to add leading zero if needed
  function addLeadingZero(number) {
    return number < 10 ? "0" + number : number;
  }

  // Extract parts of the date
  const day = addLeadingZero(date.getDate());
  const month = addLeadingZero(date.getMonth() + 1); // Months are zero-based
  const year = date.getFullYear();

  // Extract parts of the time
  let hours = date.getHours();
  const minutes = addLeadingZero(date.getMinutes());
  const seconds = addLeadingZero(date.getSeconds());

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const formattedHours = addLeadingZero(hours);

  // Combine into the desired format
  const formattedDate = `${day}/${month}/${year}, ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  return formattedDate;
}
