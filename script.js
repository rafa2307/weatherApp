function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const location = data.name;
            const temp = data.main.temp;
            const description = data.weather[0].description;

            document.getElementById('location').innerText = `Location: ${location}`;
            document.getElementById('temp').innerText = `Temperature: ${temp}`;
            document.getElementById('description').innerText = `Description: ${description}`;
        })
        .catch(error => {
            alert('City not found. Please try again.');
        });
}