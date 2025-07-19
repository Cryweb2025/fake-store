const categoriesList = document.getElementById("categories-list");

async function fetchCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");
  const categories = await res.json();
  //console.log(categories);

  categories.forEach((category) => {
    const { name, image } = category;

    const categoryCard = document.createElement("li");
    categoryCard.classList.add("category-card");

    const categoryName = document.createElement("h2");
    const categoryImg = document.createElement("img");

    categoryName.textContent = name;
    categoryImg.src = image;

    categoryCard.append(categoryName, categoryImg);
    categoriesList.appendChild(categoryCard);
  });
}

fetchCategories();
