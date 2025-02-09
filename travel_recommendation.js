async function search() {
  const searchTerm = document
    .querySelector(".keyword")
    .value.trim()
    .toLowerCase();
  const recommendationsContainer = document.querySelector(".recommendation");
  recommendationsContainer.innerHTML = "";
  if (!searchTerm) {
    return;
  }

  try {
    const response = await fetch("data.json");
    const data = await response.json();

    let results = [];

    console.log(searchTerm);

    if (["beach", "beaches"].includes(searchTerm)) {
      results = data.beaches;
    } else if (["temple", "temples"].includes(searchTerm)) {
      results = data.temples;
    } else {
      data.countries.forEach((country) => {
        if (country.name.toLowerCase().includes(searchTerm)) {
          results.push(country);
        }
        country.cities.forEach((city) => {
          if (city.name.toLowerCase().includes(searchTerm)) {
            results.push(city);
          }
        });
      });
    }

    if (results.length > 0) {
      recommendationsContainer.innerHTML = results
        .map(
          (item) => `
              <div class="result-item">
                  <img src="${item.imageUrl}" alt="${item.name}" width="100" style="width: 100%; height: 200px">
                  <div style="padding: 16px">
                   <h3>${item.name}</h3>
                  <p style="font-size: 16px">${item.description}</p>
                  </div>
              </div>
          `
        )
        .join("");
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
}

function clearSearch() {
  const searchTerm = document.querySelector(".keyword");
  searchTerm.value = "";
  const recommendationsContainer = document.querySelector(".recommendation");
  recommendationsContainer.innerHTML = "";
}
