// Javascript for Destinations page

const destinationList = document.getElementById("destination-list");

// Load a JSON file and turn it into a JavaScript array
function loadJson(path) {
  return fetch(path).then(function (response) {
    if (!response.ok) {
      throw new Error("Could not load " + path);
    }
    return response.json();
  });
}

// Format dollar amounts to include commas 
function formatPrice(amount) {
  return "$" + amount.toLocaleString("en-US");
}

// Finds the lowest value a field
function cheapest(items, destinationId, priceField) {
  const prices = items
    .filter(function (item) { return item.destinationId === destinationId; })
    .map(function (item) { return item[priceField]; });

  if (prices.length === 0) {
    return null;
  }
  return Math.min(...prices);
}

// create the HTML for one destination card
function destinationCard(destination, hotels, flights) {
  const hotelPrice = cheapest(hotels, destination.id, "pricePerNight");
  const flightPrice = cheapest(flights, destination.id, "price");

  
  const priceParts = [];
  if (hotelPrice !== null) {
    priceParts.push("Hotels from " + formatPrice(hotelPrice) + "/night");
  }
  if (flightPrice !== null) {
    priceParts.push("Flights from " + formatPrice(flightPrice));
  }

  return `
    <div class="card">
      <h3>${destination.name}</h3>
      <img src="${destination.image}" alt="${destination.name}">
      <p class="country">${destination.country}</p>
      <p>${destination.description}</p>
      <p class="prices">${priceParts.join(" · ")}</p>
      <a class="card-button" href="packages.html?destination=${destination.id}">View packages</a>
    </div>`;
}

// Load all three files
Promise.all([
  loadJson("data/destinations.json"),
  loadJson("data/hotels.json"),
  loadJson("data/flights.json")
])
  .then(function (results) {
    const destinations = results[0];
    const hotels = results[1];
    const flights = results[2];

    destinationList.innerHTML = destinations
      .map(function (destination) { return destinationCard(destination, hotels, flights); })
      .join("");
  })
  .catch(function (error) {
    console.error(error);
    destinationList.innerHTML =
      '<p class="load-error">Couldn\'t load data — open this page with Live Server.</p>';
  });
