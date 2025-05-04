let cart = [];

const cartItemsContainer = document.getElementById("cartItems");
const totalPriceElement = document.getElementById("totalPrice");

// Produktdaten
const products = [
    { id: 1, name: "Leiter", price: 79, category: "bauutensilien" },
    { id: 2, name: "Bohrhammer", price: 189, category: "bauutensilien" },
    { id: 3, name: "Bremscheibe", price: 59, category: "autoteile" },
    { id: 4, name: "Autobatterie", price: 99, category: "autoteile" },
    { id: 5, name: "Akkuschrauber", price: 129, category: "werkzeuge" },
    { id: 6, name: "Bohrmaschine", price: 149, category: "werkzeuge" },
    { id: 7, name: "Schweißgerät", price: 349, category: "schweissgeraete" },
    { id: 8, name: "Schweißhelm", price: 69, category: "schweissgeraete" },
    { id: 9, name: "Staubsauger", price: 199, category: "elektrogeraete" },
    { id: 10, name: "Kaffeemaschine", price: 59, category: "elektrogeraete" },
    { id: 11, name: "Hammer", price: 25, category: "heimwerkerbedarf" },
    { id: 12, name: "Schraubenschlüssel", price: 39, category: "heimwerkerbedarf" },
];

function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `
            <p>${product.name} x ${item.quantity} - €${(product.price * item.quantity).toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += product.price * item.quantity;
    });

    totalPriceElement.innerHTML = `Gesamt: €${total.toFixed(2)}`;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    updateCart();
}

// Beispiel: Produkte hinzufügen
addToCart(1);  // Leiter hinzufügen
addToCart(5);  // Akkuschrauber hinzufügen
addToCart(9);  // Staubsauger hinzufügen

document.getElementById("checkoutButton").addEventListener("click", function() {
    alert("Zur Kasse gehen!");
});



