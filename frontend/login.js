// Simplified Login JS - Direct to admin, minimal validation, bypass hash check

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const rememberCheckbox = document.getElementById('rememberMe');
  let errorDiv = document.getElementById('errorMessage');
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const loader = submitBtn.querySelector('.loader');

  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.id = 'errorMessage';
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'color: #ef4444; text-align: center; margin: 1rem 0; display: none; font-size: 0.9rem; background: rgba(239,68,68,0.1); padding: 0.75rem; border-radius: 8px; border-left: 4px solid #ef4444;';
    form.insertBefore(errorDiv, form.querySelector('button'));
  }

  function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.style.display = 'block';
  }

  function hideError() {
    errorDiv.style.display = 'none';
  }

  function setLoading(loading) {
    if (loading) {
      btnText.style.display = 'none';
      loader.style.display = 'inline-block';
      submitBtn.disabled = true;
    } else {
      btnText.style.display = 'inline';
      loader.style.display = 'none';
      submitBtn.disabled = false;
    }
  }

  // Pre-fill
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    if (rememberCheckbox) rememberCheckbox.checked = true;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    hideError();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (!email || !password) {
      showError('Please enter email and password.');
      return;
    }

    setLoading(true);

    // Load users (for name), but auto-login any creds
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email) || { email, name: email.split('@')[0], role: 'admin' };

    // Success - direct to admin
    setLoading(false);
    const token = btoa(email + '_admin_' + Date.now());
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('user', JSON.stringify(user));
    if (rememberCheckbox && rememberCheckbox.checked) localStorage.setItem('rememberedEmail', email);

    alert('Login successful! Welcome to Admin Panel.');
    window.location.href = 'admin.html';
  });
});
