const categoriesList = document.getElementById("categories-list");

async function fetchCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");
  if (!res.ok) {
    throw Error("Failed to fetch categories");
  }
  const categories = await res.json();
  //console.log(categories);

  categories.forEach((category) => {
    const { name, image, id } = category;

    const categoryCard = document.createElement("li");
    categoryCard.id = "category-" + id;
    categoryCard.classList.add("category-card");

    const categoryName = document.createElement("h2");
    const categoryImg = document.createElement("img");

    categoryName.textContent = name;
    categoryImg.src = image;

    categoryCard.append(categoryName, categoryImg);
    categoriesList.appendChild(categoryCard);

    const form = document.createElement("form");
    form.classList.add("edit-form");

    const editBtn = document.createElement("button");
    editBtn.classList.add("act-button");
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("act-button");
    deleteBtn.textContent = "Delete";

    editBtn.onclick = () => {
      if (form.style.display === "block") {
        form.style.display = "none";
      } else {
        form.style.display = "block";
      }
    };

    deleteBtn.onclick = () => {
      fetchDeleteCategorie(id);
    };

    form.innerHTML = `<input type="text" name="name" placeholder="Name" value="${name}" /><input type="text" name="image" placeholder="image" value="${image}" /><button class="act-button" type="submit">Save</button>`;
    categoryCard.append(editBtn, deleteBtn, form);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      // console.log(event.target.name.value);
      // console.log(event.target.image.value);

      fetchUpdateCategory(
        id,
        event.target.name.value,
        event.target.image.value,
        categoryCard
      );
    });
  });
}

fetchCategories();

async function fetchUpdateCategory(id, name, image, categoryCard) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, image }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    categoryCard.firstChild.textContent = name;
    categoryCard.getElementByTagName("img")[0].src = image;
  }
}

async function fetchDeleteCategorie(id) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
    method: "DELETE",
  });
  const categoryCard = document.getElementById("category-" + id);
  if (res.ok) {
    categoriesList.removeChild(categoryCard);
  } else {
    throw Error("Failed to remove categorie!");
  }
}
