// Professional Signup JS - LocalStorage backend auth
// Simple password hash: btoa(email + password + 'salt') for demo security

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signupForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const tosCheckbox = document.getElementById('tos');
  const errorDiv = document.createElement('div');
  errorDiv.id = 'errorMessage';
  errorDiv.style.cssText = 'color: #ef4444; text-align: center; margin: 1rem 0; display: none; font-size: 0.9rem; background: rgba(239,68,68,0.1); padding: 0.75rem; border-radius: 8px; border-left: 4px solid #ef4444;';
  form.parentNode.insertBefore(errorDiv, form.nextSibling);

  // Predefined admin user
  const ADMIN_EMAIL = 'admin@bookverse.com';
  const ADMIN_PASS_HASH = btoa(ADMIN_EMAIL + 'admin123' + 'bookverse_salt');

  // Regex patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z\\s]{2,50}$/;

  function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.style.display = 'block';
  }

  function hideError() {
    errorDiv.style.display = 'none';
  }

  function simpleHash(str) {
    return btoa(str + 'bookverse_salt');
  }

  function setLoading(loading) {
    const submitBtn = form.querySelector('button[type=\"submit\"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
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

  function validatePasswordStrength(pwd) {
    if (pwd.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(pwd)) return 'Password must contain an uppercase letter.';
    if (!/[0-9]/.test(pwd)) return 'Password must contain a number.';
    return null;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    hideError();
    setLoading(true);

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    // Validation
    if (!name || !nameRegex.test(name)) {
      showError('Name must contain 2-50 letters and spaces only.');
      setLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      showError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    const pwdStrength = validatePasswordStrength(password);
    if (pwdStrength) {
      showError(pwdStrength);
      setLoading(false);
      return;
    }

    if (!tosCheckbox.checked) {
      showError('You must accept Terms of Service.');
      setLoading(false);
      return;
    }

    // Load users
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email exists (except admin)
    if (users.find(u => u.email === email)) {
      showError('Email already registered. Please login.');
      setLoading(false);
      return;
    }

    // Add new user
    const passwordHash = simpleHash(email + password);
    users.push({
      email,
      passwordHash,
      name,
      role: 'admin',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('users', JSON.stringify(users));

    setLoading(false);
    alert('Account created successfully! Please login.');
    window.location.href = 'login.html';
  });
});
