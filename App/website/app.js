// creating variable to hold the new Date
let d = new Date();
let newDate = d.toDateString();

// creating variables to hold the base Url of our Api
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
// creating variable to hold our special Api Key
let apiKey = ",&appid=5cdf8b465928beff5531a356dc3b3f6f&units=metric";
// declaring our server as local host and port
const server = "http://127.0.0.1:4000";
// add an event when clicking the generate button.
document.getElementById("generate").addEventListener("click", performAction);
// the callback function to run after the event happens.
function performAction(e) {
    // var to hold the user's input in the zipcode field
    const newZip = document.getElementById("zip").value;
    // var to hold the user's input in the feelings field.
    const feelings = document.getElementById("feelings").value;
    // calling first the getWeather function and using .then() method to make chain promises as we want to get data and then post data and update the UI.
    getWeather(newZip).then(function(data) {
        console.log(data);
        if (data) {
            const {
                main: temp,
                name: city,
                weather: [{ description }],
            } = data;
        }
        const info = {
            newDate,
            temp: Math.round(data.main.temp),
            feelings,
        };
        postData(server + "/add", info);
        updateUI();
    });
}

// implementation of our Get method used to get data from the Weather Api.
const getWeather = async(zip) => {
    const res = await fetch(baseURL + zip + apiKey);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// implementation of our post method to post data
const postData = async(url = "", info = {}) => {
    console.log(info);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(info),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// the implementation of the Update function which update the UI with the data retrieved from Server.
const updateUI = async() => {
    const request = await fetch(server + "/all");
    try {
        const allData = await request.json();
        document.getElementById("date").innerHTML = `Date: ${allData.newDate}`;
        document.getElementById("temp").innerHTML = `Temperature: ${allData.temp}`;
        document.getElementById(
            "content"
        ).innerHTML = `I feel: ${allData.feelings}`;
    } catch (error) {
        console.log("error", error);
    }
};