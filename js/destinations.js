// Javascript for Destinations page

const destinationList = document.getElementById("destination-list");

// Reads the destination the visitor already picked (the booking page reads the same key)
function getSelectedDestination() {
  try {
    return sessionStorage.getItem("destination");
  } catch (error) {
    return null;
  }
}

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
      <div class="card-actions">
        <button type="button" class="select-button" data-name="${destination.name}" data-id="${destination.id}">Select destination</button>
        <a class="card-button" href="packages.html?destination=${destination.id}">View packages</a>
      </div>
    </div>`;
}

// Shows which card is selected: green "Selected ✓" button on that card, normal buttons on the rest
function showSelected() {
  const selectedName = getSelectedDestination();
  const buttons = destinationList.querySelectorAll(".select-button");

  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].dataset.name === selectedName) {
      buttons[i].textContent = "Selected ✓";
      buttons[i].classList.add("selected");
    } else {
      buttons[i].textContent = "Select destination";
      buttons[i].classList.remove("selected");
    }
  }
}

// When a "Select destination" button is clicked, save it so booking.html can show it
destinationList.addEventListener("click", function (event) {
  const button = event.target.closest(".select-button");
  if (!button) {
    return; // the click wasn't on a select button
  }

  try {
    sessionStorage.setItem("destination", button.dataset.name);
    // The id (e.g. "italy") lets the Flights, Hotels and Packages pages show matching options
    sessionStorage.setItem("destinationId", button.dataset.id);
    showSelected();
    showSteps("destinations.html"); // update the progress bar and show the Next button
  } catch (error) {
    alert("Could not save your destination: " + error.message);
  }
});

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

    // Highlight the destination picked on an earlier visit
    showSelected();
    showSteps("destinations.html");
  })
  .catch(function (error) {
    console.error(error);
    destinationList.innerHTML =
      '<p class="load-error">Couldn\'t load data — open this page with Live Server.</p>';
  });
