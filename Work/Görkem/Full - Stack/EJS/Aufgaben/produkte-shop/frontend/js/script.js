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
    tableBody.appendChild(row);
  });
}

function updateTotalPrice(row) {
  const priceCell = row.querySelector('.price-cell');
  const qtyInput = row.querySelector('.qty-input');
  const totalCell = row.querySelector('.total-cell');
  const price = parseFloat(priceCell.textContent.replace('$', '').replace(',', '.'));
  const qty = parseInt(qtyInput.value) || 1;
  totalCell.textContent = '$' + (price * qty).toFixed(2);
}
