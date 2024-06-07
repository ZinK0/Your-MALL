// Function to fetch products and display them
async function fetchProducts() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/ZinK0/Your-MALL/main/data/products.json"
    );
    const products = await response.json();

    // Display products
    const productsList = document.getElementById("products-list");
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("col-sm-1", "col-md-3", "col-lg-4", "g-3");
      productDiv.innerHTML = `

      <div class="p-3 card card_shadow product-card" data-category="${product.category}">
          <img id="product-img" src="${product.image}" class="rounded card-img-top" alt="${product.name}">
          <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-body-secondary">
                    <span id="product_price">${product.price}</span>.00 $
                </small>

                <div class="btn-group">
                  <button class="fav_add">
                    <i class="bi bi-bag-plus-fill h3"></i>
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


