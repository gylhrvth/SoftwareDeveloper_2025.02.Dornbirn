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
