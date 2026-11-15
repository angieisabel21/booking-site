// Hotels page: shows hotels from data/hotels.json for the destination and category
// chosen in the search menus. Picking a hotel saves it so booking.html can show it.

const destinationSelect = document.getElementById("destination");
const categorySelect = document.getElementById("hotel-category");
const searchButton = document.getElementById("search-hotels");
const hotelStatus = document.getElementById("hotel-status");
const hotelList = document.getElementById("hotel-list");

let allHotels = [];

// Labels shown on each card for the hotel category
const categoryLabels = {
  luxury: "Luxury",
  "mid-range": "Mid-Range",
  budget: "Budget"
};

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

// Works out how many nights the trip is from the dates picked on the home page.
// Returns 0 if no dates are saved yet.
function tripNights() {
  const checkin = readChoice("checkin");
  const checkout = readChoice("checkout");
  if (!checkin || !checkout) {
    return 0;
  }

  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round((new Date(checkout) - new Date(checkin)) / oneDay);
}

// Builds the HTML for one hotel card
function hotelCard(hotel) {
  const isSelected = hotel.id === readChoice("hotelId");
  const buttonText = isSelected ? "Selected ✓" : "Select hotel";
  const buttonClass = isSelected ? "select-button selected" : "select-button";

  const amenitiesList = hotel.amenities
    .map(function (item) { return `<li>${item}</li>`; })
    .join("");

  // Show the total for the whole stay if we know how many nights it is
  const nights = tripNights();
  let total = "";
  if (nights > 0) {
    total = `<span class="total">${formatPrice(hotel.pricePerNight * nights)} for ${nights} night${nights === 1 ? "" : "s"}</span>`;
  }

  return `
    <div class="card">
      <span class="badge">${categoryLabels[hotel.category]}</span>
      <h3>${hotel.name}</h3>
      <img src="${hotel.image}" alt="${hotel.name}">
      <p class="stars" aria-label="${hotel.stars} star hotel">${"★".repeat(hotel.stars)}</p>
      <ul>${amenitiesList}</ul>
      <p class="price"><strong>${formatPrice(hotel.pricePerNight)}</strong> per night ${total}</p>
      <button type="button" class="${buttonClass}" data-id="${hotel.id}">${buttonText}</button>
    </div>`;
}

// Shows the hotels that match the two search menus
function showHotels() {
  const destinationId = destinationSelect.value;
  const category = categorySelect.value;
  const placeName = destinationSelect.options[destinationSelect.selectedIndex].text;

  const matches = allHotels.filter(function (hotel) {
    const placeMatches = hotel.destinationId === destinationId;
    const categoryMatches = category === "all" || hotel.category === category;
    return placeMatches && categoryMatches;
  });

  if (matches.length === 0) {
    hotelStatus.textContent = "No hotels found in " + placeName + " for that category yet.";
    hotelList.innerHTML = "";
  } else {
    hotelStatus.textContent = matches.length + " hotel" + (matches.length === 1 ? "" : "s") + " found in " + placeName;
    hotelList.innerHTML = matches.map(hotelCard).join("");
  }
}

// Search button runs the search
searchButton.addEventListener("click", showHotels);

// When a "Select hotel" button is clicked, save the hotel for the booking page
hotelList.addEventListener("click", function (event) {
  const button = event.target.closest(".select-button");
  if (!button) {
    return; // the click wasn't on a select button
  }

  const hotel = allHotels.find(function (h) { return h.id === button.dataset.id; });

  try {
    // booking.js shows the "hotel" value in its Check Hotel box
    sessionStorage.setItem("hotel", hotel.name);
    sessionStorage.setItem("hotelId", hotel.id); // used to highlight the chosen card
    showHotels(); // redraw so the green button moves to this card
    showSteps("hotels.html"); // update the progress bar and show the Next button
  } catch (error) {
    alert("Could not save your hotel: " + error.message);
  }
});

// Load the hotels, start on the destination the visitor already picked, then show them
loadJson("data/hotels.json")
  .then(function (hotels) {
    allHotels = hotels;

    const savedDestination = readChoice("destinationId");
    if (savedDestination && destinationSelect.querySelector(`option[value="${savedDestination}"]`)) {
      destinationSelect.value = savedDestination;
    }

    showHotels();
    showSteps("hotels.html");
  })
  .catch(function (error) {
    console.error(error);
    hotelStatus.textContent = "Couldn't load data — open this page with Live Server.";
  });
