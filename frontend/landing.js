document.addEventListener('DOMContentLoaded', function() {
  // Add search input if not exists
  const hero = document.querySelector('.hero');
  if (!document.getElementById('search')) {
    const searchDiv = document.createElement('div');
    searchDiv.innerHTML = `
      <div class="input-group" style="max-width: 400px; margin: 0 auto 2rem;">
        <label><i class="fas fa-search"></i> Search Books</label>
        <input type="text" id="search" placeholder="Search by title or author..." style="padding: 1rem 1.25rem; border-radius: 50px; border: none; background: rgba(255,255,255,0.9); font-size: 1rem;">
      </div>
    `;
    hero.appendChild(searchDiv.firstElementChild);
  }

  const userRole = localStorage.getItem('userRole') || 'user';
  const navButtons = document.querySelector('.nav-buttons');
  if (userRole === 'admin') {
    navButtons.innerHTML += `<a href="admin.html" class="btn-nav"><i class="fas fa-crown"></i> Admin</a>`;
    navButtons.innerHTML += `<a href="dashboard.html" class="btn-nav"><i class="fas fa-tachometer-alt"></i> Dashboard</a>`;
  } else {
    navButtons.innerHTML += `<a href="dashboard.html" class="btn-nav"><i class="fas fa-tachometer-alt"></i> Dashboard</a>`;
  }

  // Search functionality
  const search = document.getElementById('search') || document.createElement('input');
  search.addEventListener("input", function() {
    const value = this.value.toLowerCase();
    document.querySelectorAll(".book").forEach(book => {
      book.style.display = book.innerText.toLowerCase().includes(value) ? "block" : "none";
    });

    // Save search
    const user = JSON.parse(localStorage.getItem('user'));
    if (value.length > 2 && user) {
      let searches = JSON.parse(localStorage.getItem(`searches_${user.email}`)) || [];
      searches.unshift({term: value, date: Date.now()});
      searches = searches.slice(0, 50);
      localStorage.setItem(`searches_${user.email}`, JSON.stringify(searches));
    }
  });

  // Theme toggle
  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.onclick = () => document.body.classList.toggle("dark");
  }

  // Rating
  document.querySelectorAll(".book").forEach(book => {
    const id = book.dataset.id;
    const stars = book.querySelectorAll(".star");
    stars.forEach(star => {
      star.onclick = () => {
        let rating = star.dataset.rate;
        localStorage.setItem("rating" + id, rating);
        stars.forEach(s => s.classList.remove("active"));
        stars.forEach(s => {
          if (s.dataset.rate <= rating) s.classList.add("active");
        });
      };
    });
  });
});
