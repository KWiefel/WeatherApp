
const cityName = "London"

const getLat = () => {
    const api = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=8ff0dd8b9a61cd670eec3ca9cba7e8f2`
    fetch(api)
    .then(response => response.json())
    .then(data => {
        const lat = (data[0].lat.toFixed(2))
        const lon = (data[0].lon.toFixed(2))
        const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8ff0dd8b9a61cd670eec3ca9cba7e8f2`
        fetch(api)
        .then(answer => answer.json())
        .then(cityData => {
            const dataStorage = {...cityData}
            console.log(dataStorage)
        })
    })
}

getLat()




