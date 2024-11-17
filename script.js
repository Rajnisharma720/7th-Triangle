

async function fetchProducts() {
    try {
        var response = await fetch("https://interveiw-mock-api.vercel.app/api/getProducts");
        var data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Function to render products in the DOM
function renderProducts(products) {
    const parentDiv = document.getElementById("parent");
    parentDiv.innerHTML = ""; // Clear existing content
    products.forEach((item) => {
        const product = item.product;
        parentDiv.innerHTML += `
            <div class='col-lg-3 col-6 my-3'>
                <div class='card'>
                    <div class='card-img'>
                        <img src='${product.image.src}' width="100%" alt="${product.title}" />
                    </div>
                    <div class='card-body align-items-center my-2'>
                        <h6 class="card-title">${product.title}</h6>
                        <h4 class="card-price mb-3">Rs. ${generateRandomPrice()}</h4>
                        <button class='btn btn-primary w-100' onclick='printProductDetails(${JSON.stringify(product)})'><i class="fa-solid fa-cart-shopping"></i>Add To Cart</button>
                    </div>
                </div>
            </div>`;
    });
}

// Function to handle button click to load products
document.getElementById("loadProducts").addEventListener("click", async () => {
    const loadButton = document.getElementById("loadProducts");
    loadButton.disabled = true; // Disable button while loading
    loadButton.innerText = "Loading...";
    
    const data = await fetchProducts();
    if (data) {
        renderProducts(data.data);
    }

    loadButton.innerText = "Load Products"; // Re-enable button
    loadButton.disabled = false;
    loadButton.style.display = "none"
});

// Function to print product details
function printProductDetails(product) {
    console.log("Product Details:", product);
}

// Sort functionality
const sortDropdown = document.getElementById("sort")
sortDropdown.addEventListener("change", (e) => {
    const sortValue = e.target.value;
    let sortedProducts;

    if (sortValue === "low-to-high") {
      sortedProducts = [...product].sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-to-low") {
      sortedProducts = [...product].sort((a, b) => b.price - a.price);
    }  `21`

    renderProducts(sortedProducts);
  });


//Generate Random Price

function generateRandomPrice() {
    return Math.floor(Math.random() * (1000 )) + 500;
}

const cards = apiResponse.cards.map(card => ({
    ...card,
    price: generateRandomPrice(),
}));


//Sort By price

function renderCards(sortedCards) {
    const container = document.getElementById("cardsContainer");
    container.innerHTML = ""; // Clear previous content

    sortedCards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.textContent = `${card.price} - $${card.price}`;
        container.appendChild(cardElement);
    });
}

// Initial render with unsorted cards
renderCards(cards);

// Add event listener to the dropdown
const sortOrderSelect = document.getElementById("sort");

sortOrderSelect.addEventListener("change", (event) => {
    const sortOrder = event.target.value;

    let sortedCards;
    if (sortOrder === "low-to-high") {
        sortedCards = [...cards].sort((a, b) => a.price - b.price); // Sort Low to High
    } else if (sortOrder === "high-to-low") {
        sortedCards = [...cards].sort((a, b) => b.price - a.price); // Sort High to Low
    }

    // Re-render cards with sorted data
    renderCards(sortedCards);
});
