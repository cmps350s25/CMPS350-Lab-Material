function getMeals() {
  return JSON.parse(localStorage.getItem("meals") || "[]");
}

function saveMeals(meals) {
  localStorage.setItem("meals", JSON.stringify(meals));
}

// Initialize star rating
function initializeStarRating() {
  const stars = document.querySelectorAll('#satisfaction-stars i');
  const hiddenInput = document.getElementById('satisfaction');

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.rating);
      hiddenInput.value = rating;

      // Update star icons
      stars.forEach((s, index) => {
        if (index < rating) {
          s.classList.remove('far');
          s.classList.add('fas');
        } else {
          s.classList.remove('fas');
          s.classList.add('far');
        }
      });
    });

    // Add hover effect
    star.addEventListener('mouseover', () => {
      const rating = parseInt(star.dataset.rating);
      stars.forEach((s, index) => {
        if (index < rating) {
          s.classList.remove('far');
          s.classList.add('fas');
        }
      });
    });

    star.addEventListener('mouseout', () => {
      const currentRating = parseInt(hiddenInput.value);
      stars.forEach((s, index) => {
        if (index < currentRating) {
          s.classList.remove('far');
          s.classList.add('fas');
        } else {
          s.classList.remove('fas');
          s.classList.add('far');
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const editing = JSON.parse(localStorage.getItem("editingMeal"));
  if (editing) {
    document.getElementById("page-title").textContent = "Edit Meal";
    document.getElementById("meal-id").value = editing.id;
    document.getElementById("title").value = editing.title;
    document.getElementById("tags").value = editing.tags.join(", ");
    document.getElementById("calories").value = editing.calories;
    document.getElementById("description").value = editing.description;
    document.getElementById("satisfaction").value = editing.satisfaction;
    document.getElementById("image").value = editing.image || "";

    // Set initial star rating
    const stars = document.querySelectorAll('#satisfaction-stars i');
    stars.forEach((star, index) => {
      if (index < editing.satisfaction) {
        star.classList.remove('far');
        star.classList.add('fas');
      }
    });

    localStorage.removeItem("editingMeal");
  }

  initializeStarRating();
});

document.getElementById("meal-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("meal-id").value;
  const meal = {
    id: id ? parseInt(id) : Date.now(),
    title: document.getElementById("title").value,
    tags: document.getElementById("tags").value.split(",").map(t => t.trim()),
    calories: parseInt(document.getElementById("calories").value) || 0,
    description: document.getElementById("description").value,
    satisfaction: parseInt(document.getElementById("satisfaction").value) || 0,
    image: document.getElementById("image").value,
    date: new Date().toISOString(),
    userId: 1
  };

  const meals = getMeals();
  const updated = meals.some(m => m.id === meal.id)
    ? meals.map(m => m.id === meal.id ? meal : m)
    : [...meals, meal];

  saveMeals(updated);

  // Show success message
  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.innerHTML = '<i class="fas fa-check"></i> Saved Successfully!';
  submitBtn.style.backgroundColor = '#4CAF50';

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1500);
});

// document.addEventListener("DOMContentLoaded", function () {
//   const editing = JSON.parse(localStorage.getItem("editingMeal"));
//   const pageTitle = document.getElementById("page-title");
//   if (editing) {
//     pageTitle.textContent = "Edit Meal";
//   } else {
//     pageTitle.textContent = "Add New Meal";
//   }
// });
