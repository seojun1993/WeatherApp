import { useEffect, useState, CSSProperties } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';
import WeatherBox from './component/WeatherBox';
import WeatherBtn from './component/WeatherBtn';
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. 앱이 실행되자마자 현재기반의 날씨가 보인다.
// 2. 날씨 정보에는 도씨, 섭씨, 화씨, 날씨상태
// 3. 5개의 버튼이 있다 (1개는 현재 위치, 4개는 다른 도시)
// 4. 도시 버튼을 클릭 할 때 도시별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const cities = ['Paris', 'New york', 'Tokyo', 'Seoul']
  const colorArr = ['primary', 'secondary', 'success', 'danger']
  let [loading, setLoading] = useState(true);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon)
    })
  }

  const getWeatherByCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f4cc891603e0f9fd6101ae14e3ba42f9&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();

    setWeather(data);
    setLoading(false);
  }

  const getWeatherByCity = async(city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f4cc891603e0f9fd6101ae14e3ba42f9&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();

    setWeather(data);
    setLoading(false);
  }

  useEffect(() => {
    city === '' ? getCurrentLocation() : getWeatherByCity(city);
  }, [city])

  return (
    <div>
      { loading ? (
        <div className='container'>
          <ClipLoader color='red' loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/>
        </div>
      ) : (
        <div className='container'>
          <WeatherBox weather={weather}/>
          <WeatherBtn cities={cities} colorArr={colorArr} setCity={setCity}/>
      </div>
      )}

    </div>
  );
}

export default App;
