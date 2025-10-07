// main.js
import { users, products } from './mockDB.js';
import { loginUser, registerUser, getCurrentUser, logoutUser } from './auth.js';
import { validateForm } from './validation.js';
import { renderProductList, getProductById } from './products.js';

// ------------------ Логика каталога ------------------
if (document.querySelector('.product-list')) {
  const container = document.querySelector('.product-list');
  renderProductList(container);
}

// ------------------ Логика страницы товара ------------------
if (document.querySelector('.product-page')) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = getProductById(productId);

  if (product) {
    const img = document.querySelector('.product-page img');
    const title = document.querySelector('.product-info h1');
    const desc = document.querySelector('.product-info p');
    const price = document.querySelector('.product-info .price');

    img.src = product.image;
    img.alt = product.name;
    title.textContent = product.name;
    desc.textContent = product.description;
    price.textContent = `${product.price} ₽`;
  }
}

// ------------------ Логика входа и регистрации ------------------
if (document.querySelector('.form-container')) {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm'); // для регистрации

    let login = loginInput.value.trim();
    let password = passwordInput.value;
    let confirm = confirmInput ? confirmInput.value : null;

    const { isValid, loginError, passwordError, confirmError } = validateForm(login, password, confirm);

    if (!isValid) {
      alert(`${loginError || ''} ${passwordError || ''} ${confirmError || ''}`.trim());
      return;
    }

    // Регистрация
    if (confirmInput) {
      const result = registerUser(login, password, login);
      if (result.success) {
        alert('Регистрация успешна!');
        window.location.href = 'index.html';
      } else {
        alert(result.error);
      }
    } 
    // Вход
    else {
      const result = loginUser(login, password);
      if (result.success) {
        alert('Вход успешен!');
        window.location.href = 'index.html';
      } else {
        alert(result.error);
      }
    }
  });
}
