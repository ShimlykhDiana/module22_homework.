const timezoneInfo = document.querySelector('#timezone-info');
const timezoneButton = document.querySelector('#timezone-button');

timezoneButton.addEventListener('click', function() {
    // Получить геолокацию пользователя
    if ('geolocation' in navigator) {
        timezoneInfo.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Создать URL для запроса к Timezone API
            const apiUrl = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;
            // Fetch initiates an HTTP GET request to the URL specified in apiUrl. It sends a request to the server to retrieve data.
            fetch(apiUrl) 
                .then(response => response.json()) //After making the request, the .then function is used to handle the response. It takes the response object and calls the .json() method on it. This method parses the response body as JSON and returns a promise that resolves to the JavaScript object that results from parsing the JSON response.
                .then(data => { // Once the JSON response has been successfully parsed, the resulting JavaScript object is passed as the data parameter to this .then function. Here, you can access and use the data from the API response.
                    timezoneInfo.textContent = `Временная зона: ${data.timezone}\nМестное дата и время: ${data.date_time_txt}`;
                })
                .catch(error => {
                    timezoneInfo.textContent = 'Не удалось получить информацию о времени.';
                });
        }, function(error) {
            timezoneInfo.textContent = 'Информация о местоположении недоступна';
        });
    } else {
        timezoneInfo.textContent = 'Геолокация не поддерживается вашим браузером';
    }
});
