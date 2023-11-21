const cityName = document.body.querySelector("input");
const submitBtn = document.body.querySelector("button");

const getLatLon = () => {
  cityName.addEventListener("input", () => {
    const api = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=1&appid=8ff0dd8b9a61cd670eec3ca9cba7e8f2`;
    fetch(api)
      .then((response) => response.json())
      .then((cityData) => {
        const lat = cityData[0].lat.toFixed(2);
        const lon = cityData[0].lon.toFixed(2);
        const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=8ff0dd8b9a61cd670eec3ca9cba7e8f2`;
        fetch(api)
          .then((response) => response.json())
          .then((weatherData) => {
            const dataStorage = { ...weatherData };
            renderWeatherInfo(cityData, dataStorage);
          });
      });
  });
};

getLatLon();

const renderWeatherInfo = (city, weather) => {
  // Creating HTML Elements and rendering the data to the elements
  const main = document.body.querySelector("main");

  const outputWrapper = document.createElement("section");
  outputWrapper.classList.add("output__wrapper");

  const outputDataToday = document.createElement("div");
  outputDataToday.classList.add("output__dataToday");

  const cityName = document.createElement("p");
  console.log(city);
  cityName.classList.add("outputName");
  cityName.textContent = city[0].name;

  const cityTemp = document.createElement("p");
  cityTemp.classList.add("outputTemp");
  cityTemp.textContent = Math.floor(weather.list[0].main.temp) + "°";

  const cityCloudiness = document.createElement("p");
  cityCloudiness.classList.add("outputCloudiness");
  cityCloudiness.textContent = weather.list[0].clouds.all + "%";

  const cityDescription = document.createElement("p");
  cityDescription.classList.add("outputWeatherDescription");
  cityDescription.textContent = weather.list[0].weather[0].description;

  const extraInfo = document.createElement("div");
  extraInfo.classList.add("extraInfo");

  // appending the elements to the HTML-Body

  extraInfo.append(cityCloudiness, cityDescription);
  outputDataToday.append(cityName, cityTemp);
  outputWrapper.append(outputDataToday);
  main.append(outputWrapper);

  // Booleans for background change
  const rainy = weather.list[0].weather[0].description
    .toLowerCase()
    .includes("rain");
  const sunny = weather.list[0].weather[0].description
    .toLowerCase()
    .includes("sky");
  const snow = weather.list[0].weather[0].description
    .toLowerCase()
    .includes("snow");
  const cloudy = weather.list[0].weather[0].description
    .toLowerCase()
    .includes("cloud");
  console.log(rainy, snow, sunny, cloudy);
  if (rainy) {
    document.body.style.backgroundImage = 'url("./assets/img/rain.gif")';
  }
  if (sunny) {
    document.body.style.backgroundImage = 'url("./assets/img/sunny.gif")';
  }
  if (snow) {
    document.body.style.backgroundImage = 'url("./assets/img/snow.gif")';
  }
  if (cloudy) {
    document.body.style.backgroundImage = 'url("./assets/img/cloudy.gif")';
  }

  renderUpcomingWeather(weather);
  console.log("ok");
};

const renderUpcomingWeather = (weather) => {
  const outputUpcoming = document.createElement("div");
  const outputWrapper = document.body.querySelector(".output__wrapper");

  for (let i = 7; i <= 39; i += 8) {
    const cityTemp = document.createElement("p");
    cityTemp.classList.add("outputTemp");
    cityTemp.textContent = Math.floor(weather.list[i].main.temp) + "°";

    const cityCloudiness = document.createElement("p");
    cityCloudiness.classList.add("outputCloudiness");
    cityCloudiness.textContent = weather.list[i].clouds.all + "%";

    const cityDescription = document.createElement("p");
    cityDescription.classList.add("outputWeatherDescription");
    cityDescription.textContent = weather.list[i].weather[0].description;

    const extraInfoUpcoming = document.createElement("div");
    extraInfoUpcoming.classList.add("extraInfo");
    extraInfoUpcoming.append(cityCloudiness, cityDescription);

    outputUpcoming.append(
      cityTemp,
      cityCloudiness,
      cityDescription,
      extraInfoUpcoming
    );
    outputWrapper.append(outputUpcoming);
    console.log(weather.list[i].dt_txt);
    console.log(weather.list[i]);
  }
};
