document.addEventListener('DOMContentLoaded', init);

function init(){
    loadProducts();
}

async function loadProducts() {
    try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Serverfehler beim Laden');
        const products = await res.json();
        renderProductTable(products);
    }  catch (err) {
        console.error(err);
    }
}

async function deleteProduct(id) {
    try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (!res.ok) throw Error('Löschen fehlgeschlagen');
    } catch (err) {
        console.error('Fehler beim Löschen', err);
    }
}

function renderProductTable(products) {
  const tableBody = document.querySelector('#product-table tbody');
  if (!tableBody) return;
  tableBody.innerHTML = '';
  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <button class="remove-btn" title="Remove">
          <span>&#128465;</span>
        </button>
        <button class="edit-btn" title="Edit">
        <span class="material-symbols-outlined">
        stylus</span>
        </button>
      </td>
      <td>
        <img src="/img/${product.image || 'placeholder.png'}" alt="${product.name}" class="product-img" />
      </td>
      <td>${product.name}</td>
      <td class="price-cell">$${product.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="1" class="qty-input" />
      </td>
      <td class="total-cell">$${product.price.toFixed(2)}</td>
      <td>
        <button class="add-btn edit-btn" title="In den Warenkorb"
        onclick="addToCart(${product.id}, '${escapeHTML(product.name)}', ${product.price}, '${product.image || 'placeholder.png'}', this)">
        <span class="material-symbols-outlined">add_shopping_cart</span>
        </button>
      </td>
    `;
    row.querySelector('.qty-input').addEventListener('input', () => updateTotalPrice(row));
    row.querySelector('.remove-btn').addEventListener('click', async () => {
        await deleteProduct(product.id);
        loadProducts();
    });
    row.querySelector('.edit-btn').addEventListener('click', () => openEditModal(product));
    tableBody.appendChild(row);
  });
}

// Öffnet das Modal und füllt die Felder
function openEditModal(product){
  document.getElementById('edit-id').value = product.id;
  document.getElementById('edit-name').value = product.name;
  document.getElementById('edit-price').value = product.price;
  document.getElementById('edit-description').value = product.description || '';
  document.getElementById('edit-image').value = product.image || '';
  document.getElementById('editModal').style.display = 'block';
}

// Schließt das Modal
document.getElementById('closeEditModal').onclick = function() {
  document.getElementById('editModal').style.display = 'none';
};

// PATCH-Request beim Absenden des Formulars
document.getElementById('editProductForm').onsubmit = async function(e) {
  e.preventDefault();
  const id = document.getElementById('edit-id').value;
  const name = document.getElementById('edit-name').value;
  const price = document.getElementById('edit-price').value;
  const description = document.getElementById('edit-description').value;
  const image = document.getElementById('edit-image').value;
  const res = await fetch(`/api/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, description, image })
  });
  if (res.ok) {
    document.getElementById('editModal').style.display = 'none';
    loadProducts();
  } else {
    //alert('Fehler beim Bearbeiten');
  }
};

function updateTotalPrice(row) {
  const priceCell = row.querySelector('.price-cell');
  const qtyInput = row.querySelector('.qty-input');
  const totalCell = row.querySelector('.total-cell');
  const price = parseFloat(priceCell.textContent.replace('$', '').replace(',', '.'));
  const qty = parseInt(qtyInput.value) || 1;
  totalCell.textContent = '$' + (price * qty).toFixed(2);
}

let cart = [];

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#39;'
  }[tag]));
}

function openCart() {
  document.getElementById('sidebar-cart').style.display = 'block';
  renderCart();
}

function closeCart() {
  document.getElementById('sidebar-cart').style.display = 'none';
}

function addToCart (id, name, price, image, btn) {
  let qty = 1;
  if (btn) {
    const row = btn.closest('tr');
    const qtyInput = row.querySelector('.qty-input');
    if (qtyInput) qty = parseInt(qtyInput.value) || 1;
  }
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, name, price, image, qty });
  }
  saveCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
    renderCart();
  }
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  if (cart.length === 0) {
    cartItems.innerHTML = '<em>Warenkorb ist leer.</em>';
    document.getElementById('cart-total').innerText = '0,00 €';
    
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = '0';
    return;
  
  }

let sum = 0;
  cartItems.innerHTML = cart.map(item => {
    sum += item.price * item.qty;
    return `
      <div style="display:flex;align-items:center;margin-bottom:1rem;">
        <img src="/img/${item.image || 'placeholder.png'}" alt="${escapeHTML(item.name)}" width="50" style="margin-right:1rem;">
        <div style="flex:1;">
          <strong>${escapeHTML(item.name)}</strong><br>
          <span>${item.price.toFixed(2)} €</span>
        </div>
        <div>
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <span style="margin:0 0.5rem;">${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <button onclick="removeFromCart(${item.id})" style="margin-left:1rem;">🗑️</button>
      </div>
    `;
  }).join('');
  document.getElementById('cart-total').innerText = sum.toFixed(2) + ' €';

  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = cart.reduce((a, b) => a + b.qty, 0);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const data = localStorage.getItem('cart');
  cart = data ? JSON.parse(data) : [];
}

window.addEventListener('load', () => {
  loadCart();
  renderCart();
});
