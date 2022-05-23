
class Model {
    constructor() {
        this.cityData = {}
    }
    async getDataFromDB() {
        try {
            const response = await axios.get('/cities')
            response.data.forEach(city => {
                this.cityData[city.name.toLowerCase()] = city
                this.cityData[city.name.toLowerCase()].saved = DELETE_ICON_CLASS
            });
        }
        catch (error) {
            throw ("Can not fetch data fron the database");
        }
    }

    async getCityData(cityName) {
        try {
            const response = await axios.get(`/city/${cityName}`)
            this.cityData[response.data.name.toLowerCase()] = response.data
            this.cityData[response.data.name.toLowerCase()].saved = SAVE_ICON_CLASS
        }
        catch (error) {
            $(".msg").text("Please search for a valid city 😩")
            throw(error)
        }

    }


    saveCity(cityData) {
        this.cityData[cityData.name].saved=DELETE_ICON_CLASS
        axios.post('/city',cityData).then(function (response) {
            
        }).catch(function (error) {
            throw (error)
        });

    }

    async removeCity(cityName) {
        try {
            delete this.cityData[cityName]
            await axios.delete(`/city/${cityName}`)
        } catch (error) {
            throw ("Failed to delete item");
        }
    }
}


