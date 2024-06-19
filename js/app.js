// Function to fetch products and display them
$(document).ready(function () {
  async function fetchProducts() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/ZinK0/Your-MALL/main/data/products.json"
      );
      const products = await response.json();
      console.log(products);

      // Display products
      const productsList = document.getElementById("products-list");
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("col-sm-12", "col-md-4", "col-lg-3", "g-3");
        productDiv.innerHTML = `
            <div class="p-3 card card_shadow product-card" data-category="${product.category}">
                <div class="img_container">
                    <img id="product-img" src="${product.image}" class="rounded card-img-top" alt="${product.name}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <div class="d-flex justify-content-between align-items-center">
                      <small class="text-body-secondary">

                        $<span id="product_price">${product.price}</span>
                      </small>

                      <div class="btn-group">
                        <button id="add-to-cart" class="fav_add" >
                          <i class="add-to-cart bi bi-bag-plus-fill h3" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}" data-category="${product.category}"></i>
                        </button>
                        <button class="fav_add">
                          <i class="bi bi-bag-heart-fill h3"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

            `;
        productsList.appendChild(productDiv);
      });
    } catch (error) {
      console.error("Error fetching the products:", error);
    }
  }
  // Call the function to fetch products on page load
  fetchProducts();
});

// Cart Section Start Here
// Empty list for cart  items
// take cart from localstorage if there is or start empty list
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  // updateCartUI();
}

// Get the login state
let loginState = JSON.parse(localStorage.getItem("loginState"));
console.log(loginState);

$(document).ready(function () {
  //   updateCartUI();
  $("#products-list").on("click", ".add-to-cart", function () {
    let product = {
      id: $(this).data("id"),
      name: $(this).data("name"),
      price: $(this).data("price"),
      image: $(this).data("image"),
      category: $(this).data("category"),
    };
    // console.log($(this).data("price"));
    // console.log($(this).data("image"));
    // console.log($(this).data("id"));

    // Initialize login state if not already set
    if (!localStorage.getItem("loginState")) {
      localStorage.setItem("loginState", JSON.stringify({ state: false }));
    }

    // Check the loginstate and precess the add to cart function
    if (loginState.state) {
      addToCart(product);
      // alert("Added Successfully!");
    } else {
      alert("You need to login before adding to your cart!");
      window.location.href = "login.html";
    }
    // console.log(loginState.state);
    // console.log("hello");
  });
});

// Change login profile when the login state is true
function setLoginProfile(loginState) {
  if (loginState.state) {
    $(".login-nav-btn").replaceWith(`
    <li class="nav-item">
        <div class="profile-img">
            <img src="./images/profiles/Profile Male.svg" alt="" />
        </div>
    </li>
    `);
  } else {
    console.log("Gest mode can't add to shopping cart");
  }
}

setLoginProfile(loginState);
