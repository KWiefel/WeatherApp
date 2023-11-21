
const cityName = document.body.querySelector("input")
const submitBtn = document.body.querySelector("button")
const main = document.body.querySelector("main");
const outputWrapper = document.createElement('section');
main.append(outputWrapper);

const getLatLon = () => {
    cityName.addEventListener("input", ()=> {
        let api = ""
        let isANumber = isNaN(cityName.value) === false
        if (isANumber) {
            if (cityName.value.length >= 5) {
                api = `https://api.openweathermap.org/data/2.5/forecast?zip=${Number(cityName.value)},de&units=metric&appid=8ff0dd8b9a61cd670eec3ca9cba7e8f2`
                resetPage()
                fetch(api)
                .then(response => response.json())
                .then(weatherData => {
                    const dataStorage = {...weatherData}
                    outputWrapper.classList.add("output__wrapper");
                    renderWeatherZip(weatherData)
                })
            }

        } else {
            api = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=1&appid=8ff0dd8b9a61cd670eec3ca9cba7e8f2`
            resetPage()
            fetch(api)
            .then(response => response.json())
            .then(cityData => {
                const lat = (cityData[0].lat.toFixed(2))
                const lon = (cityData[0].lon.toFixed(2))
                const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=8ff0dd8b9a61cd670eec3ca9cba7e8f2`
                fetch(api)
                .then(response => response.json())
                .then(weatherData => {
                    const dataStorage = {...weatherData}
                    outputWrapper.classList.add("output__wrapper");
                    renderWeatherInfo(cityData, dataStorage)
                })
        })
        }
})}

getLatLon()



const renderWeatherZip = (weather) => {
    const outputWrapper = document.body.querySelector(".output__wrapper");
    outputWrapper.innerHTML = ""

    const upcomingWrapper = document.createElement('article');
    upcomingWrapper.classList.add("upcommingWrapper")
    

    const outputDataToday = document.createElement('div');
    outputDataToday.classList.add("output__dataToday");

    const extrainfo = document.createElement('div');
    extrainfo.classList.add("extraInfo");
    
    const cityName = document.createElement('p');
    cityName.classList.add("outputName");
    cityName.textContent = `${weather.city.name}`;
    
    const cityTemp = document.createElement('p');
    cityTemp.classList.add("outputTemp");
    cityTemp.textContent = Math.floor(weather.list[0].main.temp) + "°";
    
    const cityDescription = document.createElement('p');
    cityDescription.textContent = weather.list[0].weather[0].main;

    const bigFontWrapper = document.createElement('div');
    
    bigFontWrapper.append(cityName, cityTemp)
    // appending the elements to the HTML-Body
    
    extrainfo.append(cityDescription)
    outputDataToday.append(bigFontWrapper, extrainfo);
    outputWrapper.append(outputDataToday, upcomingWrapper);
    
    
    
    // Booleans for background change
    const rainy = weather.list[0].weather[0].description.toLowerCase().includes("rain")
    const sunny = weather.list[0].weather[0].description.toLowerCase().includes("sky")
    const snow = weather.list[0].weather[0].description.toLowerCase().includes("snow")
    const cloudy = weather.list[0].weather[0].description.toLowerCase().includes("cloud")

    const background = document.body.querySelector("header > section")
    if (rainy) {
        background.style.backgroundImage = 'url("./assets/img/rain.gif")'
    }
    if (sunny) {
        background.style.backgroundImage = 'url("./assets/img/sunny.gif")'
    }
    if (snow) {
        background.style.backgroundImage = 'url("./assets/img/snow.gif")'
    }
    if (cloudy) {
        background.style.backgroundImage = 'url("./assets/img/cloudy.gif")'
    }

    renderUpcomingWeather(weather);
}





const renderWeatherInfo = (city, weather) => {

    // Creating HTML Elements and rendering the data to the elements!
    
    const outputWrapper = document.body.querySelector(".output__wrapper");
    outputWrapper.innerHTML = ""

    const upcomingWrapper = document.createElement('article');
    upcomingWrapper.classList.add("upcommingWrapper")
    

    const outputDataToday = document.createElement('div');
    outputDataToday.classList.add("output__dataToday");

    const extrainfo = document.createElement('div');
    extrainfo.classList.add("extraInfo");
    
    const cityName = document.createElement('p');

    cityName.classList.add("outputName");
    cityName.textContent = `${city[0].name}`;
    
    const cityTemp = document.createElement('p');
    cityTemp.classList.add("outputTemp");
    cityTemp.textContent = Math.floor(weather.list[0].main.temp) + "°";
    
    
    // const cityCloudiness = document.createElement('p');
    // cityCloudiness.classList.add("outputCloudiness");
    // cityCloudiness.textContent = weather.list[0].clouds.all + "%";
    
    const cityDescription = document.createElement('p');
    cityDescription.textContent = weather.list[0].weather[0].main;
 
    const bigFontWrapper = document.createElement('div');
    
    bigFontWrapper.append(cityName, cityTemp)
    // appending the elements to the HTML-Body
    
    extrainfo.append(cityDescription)
    outputDataToday.append(bigFontWrapper, extrainfo);
    outputWrapper.append(outputDataToday, upcomingWrapper);
    
    
    
    // Booleans for background change
    const rainy = weather.list[0].weather[0].description.toLowerCase().includes("rain")
    const sunny = weather.list[0].weather[0].description.toLowerCase().includes("sky")
    const snow = weather.list[0].weather[0].description.toLowerCase().includes("snow")
    const cloudy = weather.list[0].weather[0].description.toLowerCase().includes("cloud")

    const background = document.body.querySelector("header > section")
    if (rainy) {
        background.style.backgroundImage = 'url("./assets/img/rain.gif")'
    }
    if (sunny) {
        background.style.backgroundImage = 'url("./assets/img/sunny.gif")'
    }
    if (snow) {
        background.style.backgroundImage = 'url("./assets/img/snow.gif")'
    }
    if (cloudy) {
        background.style.backgroundImage = 'url("./assets/img/cloudy.gif")'
    }

    renderUpcomingWeather(weather);
}

const renderUpcomingWeather = (weather) => {

    const outputUpcoming = document.createElement('div');
    const outputWrapper = document.body.querySelector(".output__wrapper")
    const upcomingWrapper = document.body.querySelector(".upcommingWrapper")

    for (let i = 7; i <= 39; i += 8) {

        

        const cityTemp = document.createElement('p');
        // cityTemp.classList.add("outputTemp");
        cityTemp.textContent = Math.floor(weather.list[i].main.temp) + "°";
        
        const cityCloudiness = document.createElement('p');
        // cityCloudiness.classList.add("outputCloudiness");
        cityCloudiness.textContent = weather.list[i].clouds.all + "%";
        
        const cityDescription = document.createElement('img');
        // cityDescription.classList.add("outputWeatherDescription");
        const icon = weather.list[i].weather[0].icon;
        const iconURL = "http://openweathermap.org/img/w/" + icon + ".png"
        cityDescription.setAttribute("src", iconURL)

        const extraInfoUpcoming = document.createElement('div');
        extraInfoUpcoming.classList.add("extraInfo");
        extraInfoUpcoming.append(cityDescription)

        const upcomingDay = document.createElement('div');
        upcomingDay.classList.add("upcomingDay")
        upcomingDay.append(cityTemp, extraInfoUpcoming)
        

        upcomingWrapper.append(upcomingDay);

    }
}



const resetPage = () => {
    if(cityName.value.length === 0 )
    window.location.reload()
}