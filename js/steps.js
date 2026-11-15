// Shared booking steps used by the Destinations, Flights, Hotels and Packages pages.
// It draws the "Step 2 of 6" progress bar and the "Next" button that moves the
// visitor to the following page once they've made a choice.
//
// How a page uses it:
//   1. Add <div id="step-progress"></div> and <div id="next-step"></div> to the HTML
//   2. Load this file BEFORE the page's own script
//   3. Call showSteps("flights.html") when the page loads and after each selection

// The steps in order. "key" is the sessionStorage item that step saves
// (booking.js reads the same keys).
const bookingSteps = [
  { label: "Dates", page: "index.html", key: "checkin", next: "Pick your dates" },
  { label: "Destination", page: "destinations.html", key: "destination", next: "Choose your destination" },
  { label: "Flight", page: "flights.html", key: "airline", next: "Choose your flight" },
  { label: "Hotel", page: "hotels.html", key: "hotel", next: "Choose your hotel" },
  { label: "Package", page: "packages.html", key: "package", next: "Choose a package" },
  { label: "Book", page: "booking.html", key: null, next: "Review and book your trip" }
];

// Reads a saved choice. Returns null if nothing is saved (or storage is blocked).
function readChoice(key) {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

// Builds the link for a step. Packages gets the chosen destination added
// so it only shows packages for that place.
function stepLink(step) {
  const destinationId = readChoice("destinationId");
  if (step.page === "packages.html" && destinationId) {
    return "packages.html?destination=" + destinationId;
  }
  return step.page;
}

// Draws the progress bar and the Next button for the current page
function showSteps(currentPage) {
  const progress = document.getElementById("step-progress");
  const nextStep = document.getElementById("next-step");

  // Find where the current page is in the list
  let currentIndex = 0;
  for (let i = 0; i < bookingSteps.length; i++) {
    if (bookingSteps[i].page === currentPage) {
      currentIndex = i;
    }
  }

  // Progress bar: one link per step. Done steps get a check mark.
  if (progress) {
    let html = `<p class="step-count">Step ${currentIndex + 1} of ${bookingSteps.length}</p><ol class="step-list">`;

    for (let i = 0; i < bookingSteps.length; i++) {
      const step = bookingSteps[i];
      const isDone = step.key !== null && readChoice(step.key) !== null;

      let className = "";
      if (i === currentIndex) {
        className = "current";
      } else if (isDone) {
        className = "done";
      }

      const mark = isDone ? "✓ " : "";
      html += `<li class="${className}"><a href="${stepLink(step)}">${mark}${step.label}</a></li>`;
    }

    progress.innerHTML = html + "</ol>";
  }

  // Next button: only shows once this step's choice has been made
  if (nextStep) {
    const current = bookingSteps[currentIndex];
    const following = bookingSteps[currentIndex + 1];

    if (following && readChoice(current.key) !== null) {
      nextStep.innerHTML = `<a class="next-button" href="${stepLink(following)}">Next: ${following.next} →</a>`;
    } else {
      nextStep.innerHTML = "";
    }
  }
}
