document.addEventListener('DOMContentLoaded', function() {
  // Auth guard - check login status
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const user = localStorage.getItem('user');

  if (!token || !userRole || !user || userRole !== 'admin') {
    alert('Admin access required. Please login as admin.');
    window.location.href = 'login.html?role=admin';
    return;
  }

  // Existing admin functionality
  let books = JSON.parse(localStorage.getItem('books')) || [];
  const bookList = document.getElementById('bookList');
  const bookCount = document.getElementById('bookCount');
  const searchInput = document.getElementById('searchBooks');
  const form = document.getElementById('addBookForm');
  const errorEl = document.getElementById('formError');
  const submitBtn = form.querySelector('button[type=\"submit\"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const loader = submitBtn.querySelector('.loader');

  // Show logged-in user info
  const userInfo = JSON.parse(user);
  const header = document.querySelector('.admin-container h2') || document.createElement('h2');
  header.textContent = `Admin Panel - Welcome, ${userInfo.name || userInfo.email}`;
  if (!document.querySelector('.admin-container h2')) {
    document.querySelector('.admin-container').insertBefore(header, document.querySelector('.admin-container').firstChild);
  }

  function renderBooks(filter = '') {
    bookList.innerHTML = '';
    const filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.author.toLowerCase().includes(filter.toLowerCase())
    );

    filteredBooks.forEach((book, index) => {
      const div = document.createElement('div');
      div.className = 'book-card';
      div.innerHTML = `
        <img src="${book.cover || 'https://via.placeholder.com/280x200/667eea/ffffff?text=Book+Cover'}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/280x200/667eea/ffffff?text=Book+Cover'">
        <h4>${book.title}</h4>
        <div class="book-meta">
          <strong>${book.author}</strong> | ${book.genre || 'Uncategorized'}
        </div>
        <div class="book-actions">
          <button class="btn-delete" onclick="deleteBook(${index})">
            <i class="fas fa-trash"></i> Delete
          </button>
          <a href="#" class="btn-preview" onclick="previewBook('${book.title}'); return false;">
            <i class="fas fa-eye"></i> Preview
          </a>
        </div>
      `;
      bookList.appendChild(div);
    });

    bookCount.textContent = filteredBooks.length;
  }

  function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
  }

  window.deleteBook = function(index) {
    if (confirm('Delete this book?')) {
      books.splice(index, 1);
      saveBooks();
      renderBooks(searchInput.value);
    }
  };

  window.previewBook = function(title) {
    alert(`Preview mode: ${title}\\n(In full app, this would open book preview with sample pages)`);
  };

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const cover = document.getElementById('cover').value.trim();

    if (!title || !author) {
      errorEl.textContent = 'Title and author are required.';
      errorEl.style.display = 'block';
      return;
    }

    // Show loader
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    loader.style.display = 'inline-block';

    // Simulate upload delay
    setTimeout(() => {
      books.unshift({
        id: Date.now(),
        title,
        author,
        genre: genre || 'Uncategorized',
        cover: cover || null,
        added: new Date().toISOString()
      });
      saveBooks();
      form.reset();
      errorEl.style.display = 'none';
      renderBooks(searchInput.value);

      // Hide loader
      submitBtn.disabled = false;
      btnText.style.display = 'block';
      loader.style.display = 'none';

      alert('Book added successfully!');
    }, 1500);
  });

  searchInput.addEventListener('input', function() {
    renderBooks(this.value);
  });

  // Logout button (add to nav if exists)
  const nav = document.querySelector('.auth-nav-buttons');
  if (nav && !nav.querySelector('.btn-logout')) {
    const logoutBtn = document.createElement('a');
    logoutBtn.href = '#';
    logoutBtn.className = 'btn-nav';
    logoutBtn.title = 'Logout';
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
    logoutBtn.onclick = function(e) {
      e.preventDefault();
      if (confirm('Logout?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
      }
    };
    nav.appendChild(logoutBtn);
  }

  // Initial render
  renderBooks();
});
