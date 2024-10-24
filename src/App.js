import React, { useEffect, useState } from 'react';

function App() {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL
  console.log("APi url" + `${apiUrl}/weatherforecast`);
  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await fetch(`${apiUrl}/weatherforecast`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setForecast(data);
      } catch (error) {
        setError('Error fetching weather data: ' + error.message);
      }
    };

    fetchWeatherForecast();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Weather Forecast</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {forecast.map((item, index) => (
          <li key={index}>
            {item.date}: {item.temperatureC}°C - {item.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
