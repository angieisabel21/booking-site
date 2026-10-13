# booking-site
Web Design Booking Site Group Project

## Team & who owns what

Each person owns their page's HTML, CSS and JS files. Ask the owner before editing someone else's files.
These are the planned files; none have been created yet.

| Area | Files | Owner |
|------|-------|-------|
| Shared header/footer, base styles, helpers | `css/base.css`, `js/main.js` | _name_ |
| Sample data | `js/data.js` | _name_ |
| Home page + search | `index.html`, `css/home.css`, `js/search.js` | _name_ |
| Destinations | `pages/destinations.html`, `css/destinations.css`, `js/destinations.js` | _name_ |
| Hotels | `pages/hotels.html`, `css/hotels.css`, `js/hotels.js` | _name_ |
| Flights | `pages/flights.html`, `css/flights.css`, `js/flights.js` | _name_ |
| Booking + confirmation | `pages/booking.html`, `pages/confirmation.html`, `css/booking.css`, `js/booking.js`, `js/confirmation.js` | _name_ |

## Folder structure

```
index.html        Home page (goes in the main folder)
pages/            All other pages (destinations.html, hotels.html, ...)
css/              base.css for shared styles + one CSS file per page
js/               main.js for shared helpers, data.js for sample data,
                  + one JS file per page
images/           Pictures (lowercase-with-hyphens.jpg)
```

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
