function getMeals() {
  return JSON.parse(localStorage.getItem("meals") || "[]");
}

function renderSummary() {
  const meals = getMeals();
  const summary = {};

  // Calculate summary data
  meals.forEach(meal => {
    meal.tags.forEach(tag => {
      if (!summary[tag]) summary[tag] = { count: 0, total: 0 };
      summary[tag].count++;
      summary[tag].total += meal.satisfaction || 0;
    });
  });

  // Convert to array for sorting
  const summaryArray = Object.entries(summary).map(([tag, data]) => ({
    tag,
    count: data.count,
    rating: (data.total / data.count).toFixed(2)
  }));

  // Sort the data
  const sortBy = document.querySelector('.summary-table th.sortable.active')?.dataset.sort || 'tag';
  const sortOrder = document.querySelector('.summary-table th.sortable.active')?.classList.contains('desc') ? -1 : 1;

  summaryArray.sort((a, b) => {
    if (sortBy === 'tag') {
      return sortOrder * a.tag.localeCompare(b.tag);
    } else if (sortBy === 'count') {
      return sortOrder * (a.count - b.count);
    } else {
      return sortOrder * (a.rating - b.rating);
    }
  });

  // Render the table
  const body = document.getElementById("summary-body");
  body.innerHTML = '';

  summaryArray.forEach(item => {
    const row = document.createElement("tr");
    const stars = Array(5).fill().map((_, i) =>
      `<i class="fa-star ${i < Math.round(item.rating) ? 'fas' : 'far'}"></i>`
    ).join('');

    row.innerHTML = `
      <td class="tag-cell">#${item.tag}</td>
      <td class="count-cell">${item.count}</td>
      <td class="rating-cell">
        <div class="stars">${stars}</div>
        <span class="numeric-rating">${item.rating}</span>
      </td>
    `;
    body.appendChild(row);
  });
}

// Add sorting functionality
document.addEventListener("DOMContentLoaded", () => {
  renderSummary();

  document.querySelectorAll('.summary-table th.sortable').forEach(header => {
    header.addEventListener('click', () => {
      // Remove active class from all headers
      document.querySelectorAll('.summary-table th.sortable').forEach(h => {
        h.classList.remove('active', 'asc', 'desc');
      });

      // Add appropriate classes to clicked header
      header.classList.add('active');
      if (header.classList.contains('desc')) {
        header.classList.remove('desc');
        header.classList.add('asc');
      } else {
        header.classList.remove('asc');
        header.classList.add('desc');
      }

      renderSummary();
    });
  });
});
