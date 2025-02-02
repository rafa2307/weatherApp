// this the function that gets called when the button get weather button gets clicked
function getWeather() {
    const city = document.getElementById('city').value; // user input
    const errorMessage = document.getElementById('error-message'); // error message for when user inputs a city that does not exist or if the input is left blank
    const loadingMessage = document.getElementById("loading-message"); // lets the user know the data is being fetched
    errorMessage.innerText = ""; // empty text for the error-message element
    loadingMessage.style.display = "none"; // hiding the loading message from the user

    // We check if the city input is empty
    if(city === ""){
        // error we display if the city input is empty
        errorMessage.innerText = "Please enter a city name.";
        return;
    }
    const apiKey = API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    // Showing the loading message to the user before fetching the data
    loadingMessage.style.display = "block";
    // fetching data
    fetch(apiUrl)
        .then(response => {
            // Checking if the user entered a fake city
            if (!response.ok){
                throw new Error("City not found.");
            }
            return response.json();
        })
        .then(data => {
            // We check to see if the data object is empty
            if(!data.main || !data.weather || data.weather.length === 0){
                throw new Error("Weather data unavailable.");
            }

            const location = data.name;
            const temp = data.main.temp;
            const description = data.weather[0].description;

            document.getElementById('location').innerText = `Location: ${location}`;
            document.getElementById('temp').innerText = `Temperature: ${temp}`;
            document.getElementById('description').innerText = `Description: ${description}`;
        })
        .catch(error => {
            errorMessage.innerText = error.message;
        })
        .finally(() => {
            loadingMessage.style.display = "none";
        });
}

function getWeatherByLocation() {
    const errorMessage = document.getElementById('error-message');
    const loadingMessage = document.getElementById('loading-message');

    errorMessage.innerText = "";
    loadingMessage.style.display = "none";

    if(!navigator.geolocation){
        errorMessage.innerText = "Geolocation is not supported by your browser."
        return;
    }

    loadingMessage.style.display = "block";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoord(lat, lon);
        }, 
        (error) => {
            errorMessage.innerText = "Unable to retrieve your location.";
            loadingMessage.style.display = "none";
        }
    );
}

function fetchWeatherByCoord(lat, lon){
    const apiKey = API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl)
        .then(response => {
            // Checking if the user entered a fake city
            if (!response.ok){
                throw new Error("Weather data unavailable.");
            }
            return response.json();
        })
        .then(data => {
            const location = data.name;
            const temp = data.main.temp;
            const description = data.weather[0].description;

            document.getElementById('location').innerText = `Location: ${location}`;
            document.getElementById('temp').innerText = `Temperature: ${temp}`;
            document.getElementById('description').innerText = `Description: ${description}`;
        })
        .catch(error => {
            errorMessage.innerText = error.message;
        })
        .finally(() => {
            loadingMessage.style.display = "none";
        });
}

document.getElementById('location-btn').addEventListener('click', getWeatherByLocation);