const form = document.getElementById("add-categorie-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCategorie = {
    name: event.target.name.value,
    image: event.target.image.value,
  };

  fetchCreateNewCategorie(newCategorie);
});

async function fetchCreateNewCategorie(categorie) {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories/", {
    method: "POST",
    body: JSON.stringify(categorie),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    window.location.href = "/categories";
  } else {
    throw Error("Failed to create new categorie!");
  }
}
