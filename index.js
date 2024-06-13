document.addEventListener('DOMContentLoaded', () => {
	const apiKey = '33cec71c7b0949a29a7143521240906'; 
	const baseUrl = 'http://api.weatherapi.com/v1/forecast.json';
    
	const locationInput = document.getElementById('location-input');
	const searchBtn = document.getElementById('search-btn');
	const currentLocationBtn = document.getElementById('current-location-btn');

	const fetchWeather = async (location) => {
    	const url = `${baseUrl}?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`;
    	try {
        	const response = await fetch(url);
        	const data = await response.json();

        	// Populate current weather
        	document.getElementById('current-location').textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
        	document.getElementById('current-icon').src = `https:${data.current.condition.icon}`;
        	document.getElementById('current-icon').alt = data.current.condition.text;
        	document.getElementById('current-condition').textContent = data.current.condition.text;
        	document.getElementById('current-date').textContent = `Date: ${data.location.localtime}`;
        	document.getElementById('current-temp').textContent = `Temperature: ${data.current.temp_c}°C`;
        	document.getElementById('current-humidity').textContent = `Humidity: ${data.current.humidity}%`;
        	document.getElementById('current-wind').textContent = `Wind: ${data.current.wind_kph} kph ${data.current.wind_dir}`;

        	// Populate 3-day forecast
        	for (let i = 0; i < 3; i++) {
            	const forecastDay = data.forecast.forecastday[i];
            	document.getElementById(`forecast-date${i+1}`).textContent = `Date: ${forecastDay.date}`;
            	document.getElementById(`forecast-icon${i+1}`).src = `https:${forecastDay.day.condition.icon}`;
            	document.getElementById(`forecast-icon${i+1}`).alt = forecastDay.day.condition.text;
            	document.getElementById(`forecast-condition${i+1}`).textContent = forecastDay.day.condition.text;
            	document.getElementById(`forecast-temp${i+1}`).textContent = `Max Temp: ${forecastDay.day.maxtemp_c}°C, Min Temp: ${forecastDay.day.mintemp_c}°C`;
            	document.getElementById(`forecast-humidity${i+1}`).textContent = `Humidity: ${forecastDay.day.avghumidity}%`;
            	document.getElementById(`forecast-wind${i+1}`).textContent = `Wind: ${forecastDay.day.maxwind_kph} kph`;
        	}
            
    	} catch (error) {
        	console.error('Error fetching weather data:', error);
        	alert('Error fetching weather data. Please try again.');
    	}
	};

	searchBtn.addEventListener('click', () => {
    	const location = locationInput.value;
    	if (location) {
        	fetchWeather(location);
    	} else {
        	alert('Please enter a location.');
    	}
	});

	currentLocationBtn.addEventListener('click', () => {
    	if (navigator.geolocation) {
        	navigator.geolocation.getCurrentPosition((position) => {
            	const { latitude, longitude } = position.coords;
            	const location = `${latitude},${longitude}`;
            	fetchWeather(location);
        	}, (error) => {
            	console.error('Error getting current location:', error);
            	alert('Error getting current location. Please ensure location services are enabled.');
        	});
    	} else {
        	alert('Geolocation is not supported by this browser.');
    	}
	});
});







