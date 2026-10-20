// Storing all processed movies from the XML in a simple global array
var movieDataset = [];
var selectedGenre = "All";

document.addEventListener("DOMContentLoaded", function() {
    // Grabbing the HTML hooks using the basic IDs defined in library.html
    var gridContainer = document.getElementById("movieGridContainer");
    var searchInput = document.getElementById("searchInput");
    var sortField = document.getElementById("sortField");
    var genreButtons = document.querySelectorAll(".filter-btn");

    // Fetching our XML file locally
    fetch("movies.xml")
        .then(function(response) { 
            return response.text(); 
        })
        .then(function(xmlText) {
            // Parsing the text string into an actual readable XML Document object
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlText, "text/xml");
            var mediaElements = xmlDoc.getElementsByTagName("media");

            // Standard loop to read every single <media> block in XML file
            for (var i = 0; i < mediaElements.length; i++) {
                var element = mediaElements[i];
                
                // Extracting multiple genres out of the nested tags manually
                var genresContainer = element.getElementsByTagName("genres")[0];
                var genreNodes = genresContainer.getElementsByTagName("genre");
                var genreArray = [];
                
                for (var j = 0; j < genreNodes.length; j++) {
                    genreArray.push(genreNodes[j].textContent.trim());
                }

                // Extracting the rating raw text string ("9.0/10") and splitting it to get just the float number
                var rawRating = element.getElementsByTagName("rating")[0].textContent;
                var parsedRating = parseFloat(rawRating.split("/")[0]);

                // Shoving a clean object map into dataset array
                movieDataset.push({
                    title: element.getElementsByTagName("title")[0].textContent.trim(),
                    type: element.getElementsByTagName("type")[0].textContent.trim(),
                    year: element.getElementsByTagName("year")[0].textContent.trim(),
                    rating: parsedRating,
                    genres: genreArray,
                    img: element.getElementsByTagName("image")[0].textContent.trim()
                });
            }
            
            // Checking if the home page passed a specific genre link in the address bar parameters
            var urlParams = new URLSearchParams(window.location.search);
            var urlGenre = urlParams.get("genre");
            if (urlGenre) {
                selectedGenre = urlGenre;
                // Simple loop to visually toggle the active filter button state
                for (var k = 0; k < genreButtons.length; k++) {
                    genreButtons[k].classList.remove("active");
                    if (genreButtons[k].getAttribute("data-genre").toLowerCase() === selectedGenre.toLowerCase()) {
                        genreButtons[k].classList.add("active");
                    }
                }
            }

            // Render cards right after loading everything successfully
            renderLibrary();
        })
        .catch(function(error) {
            console.error("XML Database loading error:", error);
            gridContainer.innerHTML = "<p class = 'error-message'>Failed to load XML database records.</p>";
        });

    function renderLibrary() {
        gridContainer.innerHTML = "";
        var searchText = searchInput.value.toLowerCase().trim();
        var sortingStrategy = sortField.value;
        var filteredItems = [];

        // STEP 1: Loop through everything and match against filters
        for (var i = 0; i < movieDataset.length; i++) {
            var item = movieDataset[i];
            
            // Checking genre match conditions manually
            var matchesGenre = false;
            if (selectedGenre === "All") {
                matchesGenre = true;
            } else {
                if (item.genres.indexOf(selectedGenre) !== -1) {
                    matchesGenre = true;
                }
            }

            // Checking text search match conditions manually
            var matchesSearch = false;
            if (item.title.toLowerCase().indexOf(searchText) !== -1) {
                matchesSearch = true;
            }

            // If it passes both requirements, push it to display temporary array
            if (matchesGenre && matchesSearch) {
                filteredItems.push(item);
            }
        }

        // STEP 2: Basic conditional sort options
        if (sortingStrategy === "ratingHigh") {
            filteredItems.sort(function(a, b) { return b.rating - a.rating; });
        } else if (sortingStrategy === "ratingLow") {
            filteredItems.sort(function(a, b) { return a.rating - b.rating; });
        }

        // If nothing matches array loops, show a clear warning message
        if (filteredItems.length === 0) {
            gridContainer.innerHTML = "<p class = 'error-message'>No matching titles found in the library.</p>";
            return;
        }

        // STEP 3: Generate the cards dynamically using standard loops and string building
        for (var i = 0; i < filteredItems.length; i++) {
            var item = filteredItems[i];
            var tagsHTML = "";
            
            for (var t = 0; t < item.genres.length; t++) {
                tagsHTML += "<span class = 'tag'>" + item.genres[t] + "</span>";
            }

            var card = document.createElement("div");
            card.className = "card";
            
            card.innerHTML = `
                <div class = "poster-box">
                    <img src = "${item.img}" class = "poster-img" alt = "${item.title}">
                    <span class = "type-badge">${item.type}</span>
                </div>
                <div class = "info-box">
                    <h3>${item.title}</h3>
                    <div class = "tags">${tagsHTML}</div>
                    <div class = "meta-box">
                        <span>${item.year}</span>
                        <span style = "color: #ffa502; font-weight: bold;">★ ${item.rating.toFixed(1)}/10</span>
                    </div>
                </div>
                <a href = "details.html?title=${encodeURIComponent(item.title)}" class = "btn">View Details</a>
            `;
            gridContainer.appendChild(card);
        }
    }

    // Input hooks calling our filtering functions instantly when typed or changed
    searchInput.addEventListener("input", function() {
        renderLibrary();
    });

    sortField.addEventListener("change", function() {
        renderLibrary();
    });

    // Simple loop adding dynamic click event triggers to pill selection buttons
    for (var i = 0; i < genreButtons.length; i++) {
        genreButtons[i].addEventListener("click", function() {
            for (var j = 0; j < genreButtons.length; j++) {
                genreButtons[j].classList.remove("active");
            }
            this.classList.add("active");
            selectedGenre = this.getAttribute("data-genre");
            renderLibrary();
        });
    }
});