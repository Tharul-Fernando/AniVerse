document.addEventListener("DOMContentLoaded", function() {
    
    // Grabbing the form elements using the exact IDs in HTML structure
    var reviewForm = document.getElementById("mainReviewForm");
    var movieSelect = document.getElementById("movieDropdown");
    var customField = document.getElementById("customMovieField");
    var ratingSlider = document.getElementById("ratingBar");
    var ratingVal = document.getElementById("ratingNumber");
    var reviewText = document.getElementById("reviewMessege");
    var countDisplay = document.getElementById("characterCount");

    // Check if details.html passed a title string parameter through the address link
    var urlParams = new URLSearchParams(window.location.search);
    var autoSelectedMovie = urlParams.get("movie");
    
    if (autoSelectedMovie) {
        // Standard loop looking for a title match inside dropdown selections
        for (var i = 0; i < movieSelect.options.length; i++) {
            if (movieSelect.options[i].value === autoSelectedMovie) {
                movieSelect.selectedIndex = i;
                break;
            }
        }
    }

    // Toggling the hidden text field box if the user clicks 'Other' selection
    movieSelect.addEventListener("change", function() {
        if (this.value === "other") {
            customField.style.display = "block";
        } else {
            customField.style.display = "none";
            customField.value = "";
        }
    });

    // Updating the visual score output context string when the range slider shifts
    ratingSlider.addEventListener("input", function() {
        ratingVal.textContent = parseFloat(this.value).toFixed(1) + " / 10";
    });

    // Real-time counter capturing text string field boundaries dynamically
    reviewText.addEventListener("input", function() {
        var currentLength = this.value.length;
        countDisplay.textContent = currentLength + "/1000 characters";
    });

    // Validations executed when the submit button object gets pressed
    reviewForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Collecting user text inputs safely
        var nameInput = document.getElementById("userName").value.trim();
        var emailInput = document.getElementById("userEmail").value.trim();
        var chosenMovie = movieSelect.value;
        var customMovie = customField.value.trim();
        var selectedGenre = document.getElementById("genreDropdown").value;
        var isAgreed = document.getElementById("agreeTerms").checked;
        
        // Loop through the radio nodes to capture selection values manually
        var recommendation = "";
        var radioButtons = document.getElementsByName("recommendTitle");
        
        for (var j = 0; j < radioButtons.length; j++) {
            if (radioButtons[j].checked) {
                recommendation = radioButtons[j].value;
                break;
            }
        }

        // Basic conditional verification checks
        if (nameInput === "") {
            alert("Please enter your full name.");
            return;
        }

        if (nameInput.indexOf(".")!== -1) {
            alert("Please enter your full name instead of using initials.");
            return;
        }

        if (emailInput === "" || emailInput.indexOf("@") === -1 || emailInput.indexOf(".") === -1) {
            alert("Please enter a valid email address.");
            return;
        }

        if (chosenMovie === "") {
            alert("Please select a title to review.");
            return;
        }

        if (chosenMovie === "other" && customMovie === "") {
            alert("Please enter your custom movie title.");
            return;
        }

        if (selectedGenre === "") {
            alert("Please select a primary genre.");
            return;
        }

        if (recommendation === "") {
            alert("Please indicate if you recommend this title.");
            return;
        }

        // Enforcing the 25 character coursework specification limit explicitly
        if (reviewText.value.length < 25) {
            alert("Your review description must be at least 25 characters long.");
            return;
        }

        if (!isAgreed) {
            alert("You must agree to the terms and conditions before submitting.");
            return;
        }

        // If all conditions clear, alert success status and clear form objects
        var finalTitle = chosenMovie;
        if (chosenMovie === "other") {
            finalTitle = customMovie;
        }
        
        alert("Thank you! Your review for '" + finalTitle + "' has been successfully submitted.");
        
        reviewForm.reset();
        ratingVal.textContent = "5.0";
        countDisplay.textContent = "0/1000 characters";
        customField.style.display = "none";
    });
});