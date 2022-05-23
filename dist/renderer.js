class Renderer {
    renderData(weatherData) {
        console.log(weatherData);
        const htmlTemp = $("#weather-template")
        const source = htmlTemp.html()
        const template = Handlebars.compile(source);
        const newHtml = $(".cities")
        newHtml.empty()
        newHtml.append(template({obj:weatherData}))
    }
}