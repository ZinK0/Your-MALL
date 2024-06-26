// Function to fetch products and display them
let fetched_data;

$(document).ready(function () {
  setLoginProfile(loginState);

  async function fetchProducts() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/ZinK0/Your-MALL/main/data/products.json"
      );
      const products = await response.json();

      // changing objects into array
      fetched_data = products;
      console.log(typeof products);
      console.log("products", products);

      // Display products

      //Test
      //   updateCartUI();
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

    // Filter the products on home page
    $("#product-categories-btns").on(
      "click",
      "#product-filter-btn",
      function () {
        //Test
        const productsList = document.getElementById("products-list");
        productsList.innerHTML = "";
        console.log("Product Filter button is working");

        let selectedCategory = $(this).data("category");
        //Test
        console.log(selectedCategory);

        console.log("selected category working", selectedCategory);
        if (selectedCategory == "all") {
          console.log("All is working");
          fetchProducts();
        } else {
          console.log("ELSE is working");
          // Test
          console.log(fetched_data);

          //Create the array for the filtered products
          let filteredProducts = fetched_data.filter(
            (product) => product.category === selectedCategory
          );
          console.log("filtered product working ==>", filteredProducts);

          const productsList = document.getElementById("products-list");

          filteredProducts.forEach((product) => {
            // Test
            console.log(product.id);
            const productDiv = document.createElement("div");
            productDiv.classList.add(
              "col-sm-12",
              "col-md-4",
              "col-lg-3",
              "g-3"
            );
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
        }
      }
    );
  }
  // Call the function to fetch products on page load
  fetchProducts();
});

// Cart Section Start Here
// Empty list for cart  items
// take cart from localstorage if there is or start empty list
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Notification for cart added items
function updateCartUI() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart || cart.length == 0) {
    // $("#cart-items-noti").addClass("cart-nothing");
    console.log("CartUI with no cart");
  } else {
    $("#cart-items-noti").text(cart.length);
    $("#cart-items-noti").removeClass("cart-nothing");

    $("#cart-items-noti").addClass("cart-show");

    console.log("CartUI with  cart");
  }
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// Get the login state
let loginState = JSON.parse(localStorage.getItem("loginState"));
console.log(loginState);

$(document).ready(function () {
  //updateCartUI();
  $("#products-list").on("click", ".add-to-cart", function () {
    let product = {
      id: $(this).data("id"),
      cartItemID: $(this).data("id") + "-" + new Date().getTime(),
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
    if (!loginState || loginState.state === false) {
      alert("You need to login before adding to your cart!");
      window.location.href = "login.html";
    } else {
      addToCart(product);
      // alert("Added Successfully!");
    }
    // console.log(loginState.state);
    // console.log("hello");
    updateCartUI();
  });
});

// Change login profile when the login state is true
function setLoginProfile(loginState) {
  if (!loginState || loginState.state === false) {
    console.log("Gest mode can't add to shopping cart");
  } else {
    $(".login-nav-btn").replaceWith(`
    <li class="nav-item">
        <div class="profile-img">
            <img src="./images/profiles/Profile Male.svg" alt="" />
        </div>
    </li>
    `);
  }
}

setLoginProfile(loginState);

// Logout Button Section
function logoutBtnAdd(state) {
  if (!state || state.state === false) {
    console.log("Can' add logout button without login");
  } else {
    $("#logout-btn-container").append(`
        <button id="logout-btn">Logout</button>
        `);
  }
}

logoutBtnAdd(loginState);

$("#logout-btn").on("click", function () {
  localStorage.removeItem("loginState");

  //reload
  window.location.href = "index.html";
});
