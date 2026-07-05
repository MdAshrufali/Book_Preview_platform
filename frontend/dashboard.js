document.addEventListener('DOMContentLoaded', function() {
  const userRole = localStorage.getItem('userRole') || 'user';
  const user = JSON.parse(localStorage.getItem('user')) || {email: 'unknown', name: 'User'};

  if (!user.email) {
    alert('Please login first');
    window.location.href = 'login.html';
    return;
  }

  // Redirect admin to admin panel
  if (userRole === 'admin') {
    window.location.href = 'admin.html';
    return;
  }

  // Elements for user dashboard
  const form = document.getElementById("uploadForm");
  const booksDiv = document.getElementById("books");
  const searchesDiv = document.getElementById("searches");
  const userInfo = document.getElementById("userInfo");

  // Set user info
  userInfo.textContent = `Hi ${user.name || user.email} (${user.email})`;

  // User-specific data
  let books = JSON.parse(localStorage.getItem(`books_${user.email}`)) || [];
  let searches = JSON.parse(localStorage.getItem(`searches_${user.email}`)) || [];

  displayBooks();
  displaySearches();

  form.onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title || !author) {
      alert('Title and author required');
      return;
    }

    const book = {
      id: Date.now(),
      title,
      author, 
      description,
      uploadedAt: new Date().toLocaleString()
    };

    books.unshift(book);
    localStorage.setItem(`books_${user.email}`, JSON.stringify(books));
    form.reset();
    displayBooks();
    alert('Book uploaded!');
  };

  function displayBooks() {
    booksDiv.innerHTML = "";
    books.forEach(book => {
      const div = document.createElement("div");
      div.className = "book card";
      div.innerHTML = `
        <div class="book-header">
          <h3>${book.title}</h3>
          <p class="book-author">${book.author}</p>
          <small>Uploaded: ${book.uploadedAt}</small>
        </div>
        ${book.description ? `<p class="book-desc">${book.description}</p>` : ''}
        <div class="book-actions">
          <button onclick="editBook(${book.id})"><i class="fas fa-edit"></i></button>
          <button onclick="deleteBook('${user.email}', ${book.id})" class="btn-danger"><i class="fas fa-trash"></i></button>
        </div>
      `;
      booksDiv.appendChild(div);
    });
  }

  function displaySearches() {
    searchesDiv.innerHTML = "";
    if (searches.length === 0) {
      searchesDiv.innerHTML = '<p>No previous searches. Search on landing page!</p>';
      return;
    }
    searches.slice(-10).reverse().forEach((search, index) => {
      const div = document.createElement("div");
      div.className = "search-item";
      div.innerHTML = `
        <span>#${index + 1} "${search.term}" - ${new Date(search.date).toLocaleDateString()}</span>
        <button onclick="removeSearch('${user.email}', ${index})">Remove</button>
      `;
      searchesDiv.appendChild(div);
    });
  }
});

// Global functions
function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('userRole');
  window.location.href = 'index.html';
}

function deleteBook(userEmail, bookId) {
  let books = JSON.parse(localStorage.getItem(`books_${userEmail}`)) || [];
  books = books.filter(b => b.id !== bookId);
  localStorage.setItem(`books_${userEmail}`, JSON.stringify(books));
  location.reload();
}

function editBook(bookId) {
  alert('Edit feature coming soon!');
}

function removeSearch(userEmail, index) {
  let searches = JSON.parse(localStorage.getItem(`searches_${userEmail}`)) || [];
  searches.splice(index, 1);
  localStorage.setItem(`searches_${userEmail}`, JSON.stringify(searches));
  location.reload();
}
