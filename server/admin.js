// server/admin.js
import { getUsers, getProducts } from './mockDB.js';
import { getCurrentUser, logoutUser } from './auth.js';


const currentUser = getCurrentUser();
if (!currentUser || currentUser.role !== 'admin') {
  alert('Доступ запрещён! Только администратор может просматривать эту страницу.');
  window.location.href = 'index.html';
}


const usersTableBody = document.querySelector('#users-table tbody');
const productsTableBody = document.querySelector('#products-table tbody');
const addUserBtn = document.getElementById('addUserBtn');
const addProductBtn = document.getElementById('addProductBtn');
const logoutBtn = document.getElementById('logoutBtn');

async function loadUsers() {
  try {
    const users = await getUsers();
    usersTableBody.innerHTML = users
      .map(u => `
        <tr>
          <td>${u.id}</td>
          <td>${u.login}</td>
          <td>${u.name}</td>
          <td>${u.role || 'user'}</td>
          <td>
            <button class="action-btn edit-btn" onclick="editUser(${u.id})">✏️</button>
            <button class="action-btn delete-btn" onclick="deleteUser(${u.id})">🗑️</button>
          </td>
        </tr>
      `)
      .join('');
  } catch (err) {
    console.error('Ошибка загрузки пользователей:', err);
    usersTableBody.innerHTML = '<tr><td colspan="5">Ошибка загрузки данных</td></tr>';
  }
}

async function loadProducts() {
  try {
    const products = await getProducts();
    productsTableBody.innerHTML = products
      .map(p => `
        <tr>
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.description}</td>
          <td>${p.price} ₽</td>
          <td>
            <button class="action-btn edit-btn" onclick="editProduct(${p.id})">✏️</button>
            <button class="action-btn delete-btn" onclick="deleteProduct(${p.id})">🗑️</button>
          </td>
        </tr>
      `)
      .join('');
  } catch (err) {
    console.error('Ошибка загрузки товаров:', err);
    productsTableBody.innerHTML = '<tr><td colspan="5">Ошибка загрузки данных</td></tr>';
  }
}

addUserBtn.addEventListener('click', () => {
  const login = prompt('Введите логин:');
  const password = prompt('Введите пароль:');
  const name = prompt('Введите имя:');
  const role = confirm('Сделать администратором?') ? 'admin' : 'user';

  if (!login || !password || !name) return alert('Все поля обязательны!');

  alert(`Пользователь "${login}"`);
});

addProductBtn.addEventListener('click', () => {
  const name = prompt('Название товара:');
  const description = prompt('Описание:');
  const price = prompt('Цена:');
  const image = prompt('Ссылка на изображение:');

  if (!name || !price) return alert('Название и цена обязательны!');

  alert(`Товар "${name}" добавлен (визуально).`);
});

window.deleteUser = function (id) {
  if (confirm(`Удалить пользователя ID ${id}?`)) {
    alert(`Пользователь ${id} удалён (визуально)`);
  }
};

window.editUser = function (id) {
  alert(`Редактирование пользователя ID ${id} (визуально)`);
};

window.deleteProduct = function (id) {
  if (confirm(`Удалить товар ID ${id}?`)) {
    alert(`Товар ${id} удалён (визуально)`);
  }
};

window.editProduct = function (id) {
  alert(`Редактирование товара ID ${id} (визуально)`);
};

logoutBtn.addEventListener('click', () => {
  logoutUser();
  window.location.href = 'index.html';
});

loadUsers();
loadProducts();
