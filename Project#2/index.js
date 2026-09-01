const sidebar = document.getElementById("sidebar");
const navss = document.getElementById("navss");
const sidebarImg = sidebar.querySelector("img");
const links = document.querySelectorAll(".nav-link");

sidebar.onclick = () => {
  navss.classList.toggle("open");

  if (navss.classList.contains("open")) {
    sidebarImg.src = "imgs/close-svgrepo-com.svg";
    sidebarImg.alt = "close";
  } else {
    sidebarImg.src = "imgs/align-left-svgrepo-com.svg";
    sidebarImg.alt = "menu";
  }
};

links.forEach((link) => {
  link.onclick = (event) => {
    event.preventDefault();
    navss.classList.remove("open");

    sidebarImg.src = "imgs/align-left-svgrepo-com.svg";
    sidebarImg.alt = "menu";
  };
});
async function loadProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/products");

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products = await response.json();

        const container = document.getElementById("products-container");

        products.forEach(function(product) {

            const section = document.createElement("section");

            section.className = "product-card";

            section.innerHTML =
                '<div class="product-image">' +
                    '<img src="' + product.image + '" alt="' + product.name + '">' +
                '</div>' +
                '<div class="product-info">' +
                    product.name + " $" + product.price +
                    '<div class="product-description">' +
                        product.description +
                    '</div>' +
                '</div>';

            container.appendChild(section);
        });

    } catch (error) {
        console.error("Error loading products:", error);
    }
}

loadProducts();
const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const newProduct = {
        name: document.getElementById("product-name").value,
        price: Number(document.getElementById("product-price").value),
        category: document.getElementById("product-category").value,
        description: document.getElementById("product-description").value,
        image: document.getElementById("product-image").value
    };

    try {
        const response = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        if (!response.ok) {
            throw new Error("Failed to add product");
        }

        const product = await response.json();

console.log("Product added:", product);

productForm.reset();

const container = document.getElementById("products-container");

const section = document.createElement("section");

section.className = "product-card";

section.innerHTML =
    '<div class="product-image">' +
        '<img src="' + product.image + '" alt="' + product.name + '">' +
    '</div>' +
    '<div class="product-info">' +
        product.name + " $" + product.price +
        '<div class="product-description">' +
            product.description +
        '</div>' +
        '<button class="delete-product" data-id="' + product.id + '">' +
            'Delete' +
        '</button>' +
    '</div>';

container.appendChild(section);

    } catch (error) {
        console.error("Error:", error);
    }
});
document.addEventListener("click", async function(event) {
    if (!event.target.classList.contains("delete-product")) {
        return;
    }

    const id = event.target.getAttribute("data-id");

    try {
        const response = await fetch(
            "http://localhost:3000/api/products/" + id,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete product");
        }

        event.target.closest(".product-card").remove();

        console.log("Product deleted");

    } catch (error) {
        console.error("Error:", error);
    }
});