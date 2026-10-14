# booking-site
Web Design Booking Site Group Project

## Team & who owns what

Each person owns their page's HTML, CSS and JS files. Ask the owner before editing someone else's files.
All pages live in the main (root) folder. Every page links `css/home.css` for the shared nav, banner and card styles, then its own CSS file.

| Page | Files | Owner |
|------|-------|-------|
| Home | `index.html`, `css/home.css`, `js/search.js` | _Caleb_ |
| Destinations | `destinations.html`, `css/destinations.css`, `js/destinations.js` | _name_ |
| Vacation Packages | `packages.html`, `css/packages.css`, `js/packages.js`, `data/packages.json` | _name_ |
| Plan Your Trip | `plan-trip.html`, `css/plan-trip.css`, `js/plan-trip.js` | _name_ |
| About Us | `about.html`, `css/about.css` | _name_ |
| Travel Tips | `travel-tips.html`, `css/travel-tips.css` | _name_ |
| Contact Us | `contact.html`, `css/contact.css`, `js/contact.js` | _name_ |
| Data files (hotels, flights, destinations) | `data/*.json` | _name_ |

## Folder structure

```
index.html        Home page
destinations.html All pages sit here in the main folder
packages.html     (plan-trip.html, about.html, travel-tips.html, contact.html)
css/              home.css for shared styles + one CSS file per page
js/               One JS file per page
data/             JSON files with destinations, hotels, flights and packages
images/           Pictures (lowercase-with-hyphens.jpg)
```

## Data

We don't use a real database. The site's data lives in **JSON files** in the `data/` folder, and bookings are saved in the browser with **localStorage**.

### JSON files (read-only catalog)

| File | What's in it | Fields |
|------|--------------|--------|
| `data/destinations.json` | Places you can travel to | `id`, `name`, `country`, `image`, `description` |
| `data/hotels.json` | Hotels | `id`, `name`, `destinationId`, `stars`, `pricePerNight`, `image`, `amenities` |
| `data/flights.json` | Flights | `id`, `from`, `to`, `destinationId`, `airline`, `departure`, `arrival`, `price` |
| `data/packages.json` | Vacation packages | `id`, `name`, `type` (`cruise`, `resort`, `honeymoon` or `family`), `destinationId`, `nights`, `pricePerPerson`, `image`, `description`, `includes` |

`destinationId` links a hotel, flight or package to a destination's `id` (e.g. `"italy"`).

**Reading a file in JavaScript:**

```js
// All pages are in the main folder, so the path starts with "data/"
fetch("data/hotels.json")
  .then(response => response.json())
  .then(hotels => {
    console.log(hotels); // an array of hotel objects
  });
```

> `fetch()` only works when the page is opened with **Live Server** (or on GitHub Pages), not by double-clicking the HTML file.

**Rules for editing JSON:**
- Use double quotes `"` only, and no comma after the last item in a list.
- VS Code underlines mistakes in red; fix them before committing.
- Ask the data owner before renaming or removing a field, since other pages depend on the names.
- The sample hotel/flight records are placeholders; replace them with real ones (hotel images still need to be added to `images/`).

### localStorage (bookings)

The website can't write to the JSON files, so bookings are saved in the visitor's browser. Everyone uses the same key: **`bookings`**.

```js
// Save a booking
const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
bookings.push({ name: "Alex", hotelId: "santa-monica-inn", nights: 3, total: 480 });
localStorage.setItem("bookings", JSON.stringify(bookings));

// Read bookings
const saved = JSON.parse(localStorage.getItem("bookings")) || [];
```

Bookings only exist in the browser where they were made. That's fine for a class project.

## How to run it

1. Open the folder in VS Code.
2. Install the **Live Server** extension.
3. Once `index.html` exists, right-click it → **Open with Live Server**.

## How we work together

1. Pull the latest `main` before starting.
2. Make a new branch for your task (e.g. `hotels-page`).
3. Commit small changes with clear messages ("Add hotel cards").
4. Push your branch and open a **Pull Request**.
5. A teammate reviews it, then it gets merged into `main`.

**Rules:** don't push straight to `main`; use lowercase-with-hyphens file names; 2-space indentation.
