# AniVerse

A movie and anime catalogue built with **HTML, CSS, JavaScript, and XML**. AniVerse explores browser-side data loading, catalogue interactions, detail pages, and form validation without a backend framework.

## Features

- Load catalogue entries from [movies.xml](movies.xml).
- Search titles and filter by genre.
- Sort catalogue entries by rating.
- Open detail pages with poster art, descriptions, genres, release year, and rating.
- Carry the selected title into a review form.
- Validate review inputs and display a live rating value and character count.

**Review-form behaviour:** submission is simulated with a browser alert and form reset. Reviews are not sent to a server or saved in a database.

## Run Locally

Clone the repository and serve its root over HTTP:

```bash
git clone https://github.com/Tharul-Fernando/AniVerse.git
cd AniVerse
python -m http.server 8000
```

Open **http://localhost:8000** in a modern browser. Python is only used here as a convenient local web server; the application itself runs in the browser.

Use HTTP rather than opening the HTML files directly with `file://`, because the catalogue and detail pages fetch the XML data.

## Repository Guide

| File | Purpose |
| --- | --- |
| [index.html](index.html) | Home page |
| [library.html](library.html) / [library.js](library.js) | Catalogue rendering, search, filtering, and sorting |
| [details.html](details.html) / [details.js](details.js) | Individual title details |
| [review.html](review.html) / [review.js](review.js) | Review form and client-side validation |
| [movies.xml](movies.xml) / [movies.xsd](movies.xsd) | Catalogue records and XML schema |
| [style.css](style.css) | Shared styles |
| [images](images) | Poster and site image assets |
| [about.html](about.html) | About page |

## Try the Main Flow

1. Open the library and search for a title.
2. Filter by genre and change the rating sort order.
3. Open a title's details and follow its review link.
4. Complete the form to try its validation and simulated submission.

## Scope

This is a static catalogue and frontend demonstration. It does not provide video streaming, user accounts, or persistent review storage. Film and anime names and artwork remain the property of their respective owners.

## Author

**Tharul Fernando** — BSc (Hons) Artificial Intelligence and Data Science undergraduate at IIT.

[GitHub](https://github.com/Tharul-Fernando) · [LinkedIn](https://www.linkedin.com/in/tharul-fernando/) · [Email](mailto:tharulnithwara@gmail.com)
