
async function loadPage() {
    await model.getDataFromDB()
    render.renderData(model.cityData)
}

async function search() {
    const search = $("input")
    let message = "You already have the data for this city"
    const cityName = search.val().toLowerCase()
    if (!model.cityData[cityName]) {
        await model.getCityData(cityName)
        message = ""
        render.renderData(model.cityData)
    }
    $(".msg").text(message)
    search.val("")

}

$(".cities").on("click", `.${DELETE_ICON_CLASS}`, function () {
    const cityName = $(this).siblings(".city-name").html()
    model.removeCity(cityName.toLocaleLowerCase())
    render.renderData(model.cityData)
})

$(".cities").on("click", `.${SAVE_ICON_CLASS}`, function () {
    const cityName = $(this).siblings(".city-name").html()
    model.saveCity(model.cityData[cityName])
    render.renderData(model.cityData)
})

const model = new Model()
const render = new Renderer()
loadPage()
//new Renderer().renderData()
//m.removeCity()
// m.getDataFromDB()

