// Flights page: builds a card for each flight in data/flights.json.
// If the visitor already picked a destination, only flights to that place are shown.
// Picking a flight saves it so booking.html can show it.

const flightList = document.getElementById("flight-list");
const flightNote = document.getElementById("flight-note");

let allFlights = [];

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

// Turns "2026-12-15T18:30" into "6:30 PM"
function formatTime(dateTime) {
  return new Date(dateTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

// Builds the HTML for one flight card
function flightCard(flight) {
  const isSelected = flight.id === readChoice("flightId");
  const buttonText = isSelected ? "Selected ✓" : "Select flight";
  const buttonClass = isSelected ? "select-button selected" : "select-button";

  // If the flight lands on a later date than it leaves, add "+1 day"
  const nextDay = flight.arrival.slice(0, 10) > flight.departure.slice(0, 10) ? " (+1 day)" : "";

  return `
    <div class="card">
      <h3>${flight.to}</h3>
      <img src="images/airline_booking.jpg" alt="Airplane flying to ${flight.to}">
      <p class="airline">${flight.airline}</p>
      <p class="route">From ${flight.from}</p>
      <p class="times">Departs ${formatTime(flight.departure)} · Arrives ${formatTime(flight.arrival)}${nextDay}</p>
      <p class="price"><strong>${formatPrice(flight.price)}</strong> per person</p>
      <button type="button" class="${buttonClass}" data-id="${flight.id}">${buttonText}</button>
    </div>`;
}

// Shows the flights for the chosen destination (or all of them if none is chosen yet)
function showFlights() {
  const destinationId = readChoice("destinationId");
  const destinationName = readChoice("destination");

  let flights = allFlights;
  if (destinationId) {
    flights = allFlights.filter(function (flight) { return flight.destinationId === destinationId; });
    flightNote.innerHTML = `Showing flights to <strong>${destinationName}</strong> · <a href="destinations.html">Change destination</a>`;
  } else {
    flightNote.innerHTML = `Showing all flights · <a href="destinations.html">Pick a destination first</a> to see matching flights`;
  }

  if (flights.length === 0) {
    flightList.innerHTML = '<p class="list-message">No flights to this destination yet.</p>';
  } else {
    flightList.innerHTML = flights.map(flightCard).join("");
  }
}

// When a "Select flight" button is clicked, save the flight for the booking page
flightList.addEventListener("click", function (event) {
  const button = event.target.closest(".select-button");
  if (!button) {
    return; // the click wasn't on a select button
  }

  const flight = allFlights.find(function (f) { return f.id === button.dataset.id; });

  try {
    // booking.js shows the "airline" value in its Check Flight box
    sessionStorage.setItem("airline", flight.airline + ": " + flight.from + " → " + flight.to);
    sessionStorage.setItem("flightId", flight.id); // used to highlight the chosen card
    showFlights(); // redraw so the green button moves to this card
    showSteps("flights.html"); // update the progress bar and show the Next button
  } catch (error) {
    alert("Could not save your flight: " + error.message);
  }
});

// Load the flights, then show them
loadJson("data/flights.json")
  .then(function (flights) {
    allFlights = flights;
    showFlights();
    showSteps("flights.html");
  })
  .catch(function (error) {
    console.error(error);
    flightList.innerHTML =
      '<p class="list-message error">Couldn\'t load data — open this page with Live Server.</p>';
  });
