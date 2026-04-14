let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const product = button.closest(".product");
        const id = product.dataset.id;
        const name = product.dataset.name;
        const price = parseInt(product.dataset.price);
        const existing = cart.find((item) => item.id === id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCart();
        alert(`${name} added to cart!`);
    });
});

function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutTotal = document.getElementById("checkout-total");
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItems.innerHTML = cart
        .map(
            (item) => `
        <div class="cart-item">
            <p>${item.name} x${item.quantity} - ₹${item.price * item.quantity}</p>
            <button onclick="changeQuantity('${item.id}', -1)">-</button>
            <button onclick="changeQuantity('${item.id}', 1)">+</button>
            <button onclick="removeItem('${item.id}')">Remove</button>
        </div>
    `,
        )
        .join("");
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total;
    checkoutTotal.textContent = total;
}

function changeQuantity(id, delta) {
    const item = cart.find((i) => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) removeItem(id);
        else updateCart();
    }
}

function removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
}

document.getElementById("cart-link").addEventListener("click", () => {
    document.getElementById("cart").classList.toggle("hidden");
});

document.getElementById("checkout-btn").addEventListener("click", () => {
    document.getElementById("cart").classList.add("hidden");
    document.getElementById("checkout").classList.remove("hidden");
});

document.getElementById("continue-shopping").addEventListener("click", () => {
    document.getElementById("cart").classList.add("hidden");
});

document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    alert(
        `Order placed successfully!\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nTotal: ₹${document.getElementById("checkout-total").textContent}\n(Demo only - contact bakery for real orders)`,
    );
    cart = [];
    updateCart();
    document.getElementById("checkout").classList.add("hidden");
});
