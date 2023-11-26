const screenSizeElement = document.querySelector('#screenSizeElement');
const geolocation = document.querySelector('#geolocation');
const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', function() {
    // Get screen size
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    screenSizeElement.textContent = `The user screen size: ${screenWidth} x ${screenHeight}`;

    // Get geolocation
    if ('geolocation' in navigator) {
        geolocation.textContent = 'checking the location';
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            geolocation.textContent = `The user geolocation: Широта: ${latitude} °, Долгота: ${longitude} °`;
        }, function(error) {
            geolocation.textContent = 'The location info is not available';
        });
    } else {
        geolocation.textContent = 'Geolocation is not supported';
    }
});
