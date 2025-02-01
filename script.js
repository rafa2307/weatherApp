function getWeather() {
    const city = document.getElementById('city').value;
    const errorMessage = document.getElementById('error-message');
    const loadingMessage = document.getElementById("loading-message");
    errorMessage.innerText = "";
    loadingMessage.style.display = "none";

    if(city === ""){
        errorMessage.innerText = "Please enter a city name.";
        return;
    }
    const apiKey = API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    loadingMessage.style.display = "block";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok){
                throw new Error("City not found.");
            }
            return response.json();
        })
        .then(data => {
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