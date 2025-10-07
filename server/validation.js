export function validateLogin(login) {
  if (!login || login.trim().length < 3) {
    return 'Логин должен быть не менее 3 символов';
  }
  return null;
}

// Проверка пароля (не меньше 6 символов)
export function validatePassword(password) {
  if (!password || password.length < 6) {
    return 'Пароль должен быть не менее 6 символов';
  }
  return null;
}

// Проверка формы логина/регистрации
export function validateForm(login, password, confirmPassword = null) {
  const loginError = validateLogin(login);
  const passwordError = validatePassword(password);
  let confirmError = null;

  // Если есть поле подтверждения пароля, проверяем совпадение
  if (confirmPassword !== null && password !== confirmPassword) {
    confirmError = 'Пароли не совпадают';
  }

  return {
    loginError,
    passwordError,
    confirmError,
    isValid: !loginError && !passwordError && !confirmError
  };
}
