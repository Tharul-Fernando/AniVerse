document.addEventListener("DOMContentLoaded", function() {
    
    // Grabbing the main card space where everything will load
    var displaySpace = document.getElementById("detailsSpace");
    
    // Snagging the movie title from the browser address bar parameters
    var parameters = new URLSearchParams(window.location.search);
    var targetTitle = parameters.get("title");

    // If a user accidentally lands here without clicking a movie, show a basic warning
    if (targetTitle === null || targetTitle === "") {
        displaySpace.innerHTML = "<p class = 'error-message'>Error: No movie title selected.</p>";
        return;
    }

    // Reading flat data XML file directly
    fetch("movies.xml")
        .then(function(res) { 
            return res.text(); 
        })
        .then(function(xmlDataText) {
            
            // Converting the raw text string into readable XML nodes
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlDataText, "text/xml");
            var mediaNodes = xmlDoc.getElementsByTagName("media");
            var matchFound = false;

            // Simple loop searching for the movie that matches address bar title
            for (var i = 0; i < mediaNodes.length; i++) {
                var xmlTitle = mediaNodes[i].getElementsByTagName("title")[0].textContent.trim();
                
                if (xmlTitle.toLowerCase() === targetTitle.toLowerCase()) {
                    matchFound = true;

                    // Directly updating HTML elements with the XML record values
                    document.getElementById("movieTitle").textContent = xmlTitle;
                    document.getElementById("movieType").textContent = mediaNodes[i].getElementsByTagName("type")[0].textContent.trim().toUpperCase();
                    document.getElementById("movieYear").textContent = mediaNodes[i].getElementsByTagName("year")[0].textContent.trim();
                    document.getElementById("movieRating").textContent = mediaNodes[i].getElementsByTagName("rating")[0].textContent.trim();
                    document.getElementById("movieDescription").textContent = mediaNodes[i].getElementsByTagName("description")[0].textContent.trim();
                    
                    // Updating our main poster image attributes safely
                    var imgElement = document.getElementById("moviePoster");
                    imgElement.src = mediaNodes[i].getElementsByTagName("image")[0].textContent.trim();
                    imgElement.alt = xmlTitle + " Cover Art";

                    // Passing the exact movie title forward to the review page if they click review
                    document.getElementById("reviewLink").href = "review.html?movie=" + encodeURIComponent(xmlTitle);

                    // Building the genre tags loop manually
                    var genreContainer = document.getElementById("genresContainer");
                    genreContainer.innerHTML = ""; 
                    
                    var genreNodes = mediaNodes[i].getElementsByTagName("genres")[0].getElementsByTagName("genre");
                    
                    for (var j = 0; j < genreNodes.length; j++) {
                        var spanElement = document.createElement("span");
                        spanElement.className = "tag details-tag";
                        spanElement.textContent = genreNodes[j].textContent.trim();
                        genreContainer.appendChild(spanElement);
                    }
                    
                    // Stop looping immediately after finding the match
                    break; 
                }
            }

            // If the movie wasn't found in the XML file, throw a basic warning
            if (matchFound === false) {
                displaySpace.innerHTML = "<p class = 'error-message'>Could not find the requested title.</p>";
            }
        })
        .catch(function(error) {
            console.error("XML Error:", error);
            displaySpace.innerHTML = "<p class = 'error-message'>Failed to communicate with the XML file.</p>";
        });
});