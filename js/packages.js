// Vacation Packages page: builds a card for each package in data/packages.json.

const packageList = document.getElementById("package-list");
const filterButtons = document.querySelectorAll(".filter-button");
const destinationFilter = document.getElementById("destination-filter");

const destinationFromUrl = new URLSearchParams(window.location.search).get("destination");


const typeLabels = {
  cruise: "Cruise",
  resort: "Resort",
  honeymoon: "Honeymoon",
  family: "Family"
};

let allPackages = [];
let destinationNames = {}; // e.g. { italy: "Italy", mexico: "Mexico" }
let selectedType = "all";

// Load a JSON file and turn it into a JavaScript array
function loadJson(path) {
  return fetch(path).then(function (response) {
    if (!response.ok) {
      throw new Error("Could not load " + path);
    }
    return response.json();
  });
}

// format dollar amounts to include commas
function formatPrice(amount) {
  return "$" + amount.toLocaleString("en-US");
}

// Builds the HTML for one package card
function packageCard(pkg) {
  const includesList = pkg.includes
    .map(function (item) { return `<li>${item}</li>`; })
    .join("");

  return `
    <div class="card">
      <span class="badge">${typeLabels[pkg.type]}</span>
      <h3>${pkg.name}</h3>
      <img src="${pkg.image}" alt="${pkg.name}">
      <p class="trip-info">${destinationNames[pkg.destinationId]} · ${pkg.nights} nights</p>
      <p>${pkg.description}</p>
      <ul>${includesList}</ul>
      <p class="price">From <strong>${formatPrice(pkg.pricePerPerson)}</strong> per person</p>
    </div>`;
}

// Shows only the packages that match the selected type and destination
function showPackages() {
  const matches = allPackages.filter(function (pkg) {
    const typeMatches = selectedType === "all" || pkg.type === selectedType;
    const destinationMatches = !destinationFromUrl || pkg.destinationId === destinationFromUrl;
    return typeMatches && destinationMatches;
  });

  if (matches.length === 0) {
    packageList.innerHTML = '<p class="list-message">No packages match this filter yet.</p>';
  } else {
    packageList.innerHTML = matches.map(packageCard).join("");
  }
}

// When a filter button is clicked, highlight it and update the cards
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (b) { b.classList.remove("selected"); });
    button.classList.add("selected");

    selectedType = button.dataset.type;
    showPackages();
  });
});

// Load the packages and destination names, then show the cards
Promise.all([
  loadJson("data/packages.json"),
  loadJson("data/destinations.json")
])
  .then(function (results) {
    allPackages = results[0];

    results[1].forEach(function (destination) {
      destinationNames[destination.id] = destination.name;
    });

    // If we came from the Destinations page, say which destination is shown
    if (destinationFromUrl) {
      const name = destinationNames[destinationFromUrl] || destinationFromUrl;
      destinationFilter.innerHTML =
        `Showing packages in <strong>${name}</strong> · <a href="packages.html">Show all</a>`;
    }

    showPackages();
  })
  .catch(function (error) {
    console.error(error);
    packageList.innerHTML =
      '<p class="list-message error">Couldn\'t load data — open this page with Live Server.</p>';
  });
