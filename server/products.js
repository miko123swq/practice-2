// products.js
import { products } from './mockDB.js';

// Отрисовка одной карточки товара
export function renderProductCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description || ''}</p>
      <span class="price">${product.price} ₽</span>
    </div>
  `;
}

// Отрисовка списка товаров в контейнере
export function renderProductList(container) {
  container.innerHTML = products.map(renderProductCard).join('');

  // Обработчик клика на карточку
  container.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.dataset.id;
      window.location.href = `product.html?id=${productId}`;
    });
  });
}

// Получение товара по id для product.html
export function getProductById(id) {
  return products.find(p => p.id == id);
}
