let isEdit = false;

async function initializeMeals() {
  const mealsFromStorage = localStorage.getItem("meals");
  if (!mealsFromStorage) {
    try {
      const response = await fetch("https://gist.githubusercontent.com/abdalabaaji/b858d603dd6215b6e93627a4f3eeb7f0/raw/21db65d8353957f910f4a4cf093ba9394dc45ca1/meals");
      const meals = await response.json();
      localStorage.setItem("meals", JSON.stringify(meals));
    } catch (error) {
      console.error("Failed to fetch meals from server:", error);
    }
  }
}

function getMeals() {
  return JSON.parse(localStorage.getItem("meals") || "[]");
}

function updateTagFilter() {
  const meals = getMeals();
  const tagFilter = document.getElementById("tagFilter");
  const allTags = new Set();

  meals.forEach(meal => {
    meal.tags.forEach(tag => allTags.add(tag));
  });

  tagFilter.innerHTML = '<option value="">All Tags</option>';
  allTags.forEach(tag => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    tagFilter.appendChild(option);
  });
}

function renderMeals(searchText = "", dateFilter = "", tagFilter = "") {
  const meals = getMeals();
  const container = document.getElementById("meals-list");
  if (!container) return;
  container.innerHTML = "";

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesDate = !dateFilter || new Date(meal.date).toISOString().split('T')[0] === dateFilter;
    const matchesTag = !tagFilter || meal.tags.includes(tagFilter);
    return matchesSearch && matchesDate && matchesTag;
  });

  filteredMeals.forEach(meal => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${meal.image || 'https://via.placeholder.com/150'}" alt="${meal.title}" class="meal-img"/>
      <div class="card-content">
        <h3>${meal.title}</h3>
        <p><strong>Date:</strong> ${new Date(meal.date).toLocaleString()}</p>
        <p><strong>Tags:</strong> ${meal.tags.map(tag => `<span class="tag">${tag}</span>`).join(" ")}</p>
        <p><strong>Calories:</strong> ${meal.calories} kcal</p>
        <div class="rating">
          <strong>Satisfaction:</strong>
          <div class="stars" data-meal-id="${meal.id}">
            ${Array(5).fill().map((_, i) => `
              <i class="fa-star ${i < meal.satisfaction ? 'fas' : 'far'}" 
                 data-rating="${i + 1}"></i>
            `).join('')}
          </div>
        </div>
        <button onclick="toggleDescription(this)">Show Description</button>
        <p class="description hidden">${meal.description}</p>
        <div class="actions-btns">
          <button onclick='editMeal(${JSON.stringify(meal)})' class="edit-btn">✏️ Edit</button>
          <button onclick='deleteMeal(${meal.id})' class="delete-btn">🗑️ Delete</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Add event listeners for star ratings
  document.querySelectorAll('.stars').forEach(starsContainer => {
    starsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-star')) {
        const mealId = parseInt(starsContainer.dataset.mealId);
        const rating = parseInt(e.target.dataset.rating);
        updateMealRating(mealId, rating);
      }
    });
  });
}

function updateMealRating(mealId, rating) {
  const meals = getMeals();
  const updatedMeals = meals.map(meal => {
    if (meal.id === mealId) {
      return { ...meal, satisfaction: rating };
    }
    return meal;
  });
  localStorage.setItem("meals", JSON.stringify(updatedMeals));
  renderMeals(
    document.getElementById("search").value,
    document.getElementById("dateFilter").value,
    document.getElementById("tagFilter").value
  );
}

function deleteMeal(id) {
  if (!confirm("Are you sure you want to delete this meal?"))
    return;
  const meals = getMeals();
  const updatedMeals = meals.filter(meal => meal.id !== id);
  localStorage.setItem("meals", JSON.stringify(updatedMeals));
  renderMeals();
}

function toggleDescription(button) {
  const desc = button.nextElementSibling;
  if (desc.classList.contains("hidden")) {
    desc.classList.remove("hidden");
    button.textContent = "Hide Description";
  } else {
    desc.classList.add("hidden");
    button.textContent = "Show Description";
  }
}

function editMeal(meal) {
  isEdit = true;
  localStorage.setItem("editingMeal", JSON.stringify(meal));
  window.location.href = "pages/add.html";
}

document.addEventListener("DOMContentLoaded", async () => {
  await initializeMeals();
  updateTagFilter();
  renderMeals();

  const search = document.getElementById("search");
  const dateFilter = document.getElementById("dateFilter");
  const tagFilter = document.getElementById("tagFilter");

  if (search) {
    search.addEventListener("input", () => renderMeals(
      search.value,
      dateFilter.value,
      tagFilter.value
    ));
  }

  if (dateFilter) {
    dateFilter.addEventListener("change", () => renderMeals(
      search.value,
      dateFilter.value,
      tagFilter.value
    ));
  }

  if (tagFilter) {
    tagFilter.addEventListener("change", () => renderMeals(
      search.value,
      dateFilter.value,
      tagFilter.value
    ));
  }
});
