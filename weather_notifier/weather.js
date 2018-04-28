class Weather {
    constructor(city, state){
        this.apiKey = 'e7f534cbb6e97307';
        this.city = city;
        this.state = state;

    }

    // Fetch weather from api
    async getWeather(){
        const response = await fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json`);
        const responseData = await response.json();
        return responseData.current_observation;
    }

    // Change weather location
    changeLocation(city, state){
        this.city = city;
        this.state = state;
    }
}