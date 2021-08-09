const positionUrl = 'http://api.open-notify.org/iss-now.json';
const refreshButton = document.querySelector ('#refreshPosition');
const coordinatesFooter = document.querySelector ('#coordinatesFooter');
const switchMapSkin = document.querySelector ('#mapSatelite');
let skin = generateMapLayer;

function getPosition(positionUrl, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open ('GET', positionUrl);
    xhr.onload = () => {
        if (xhr.status == 200) {
            const position = JSON.parse (xhr.responseText);
            const googleMapsLink = document.querySelector('#googleMaps');
            googleMapsLink.innerHTML = (`Latitude: ${position.iss_position.latitude} Longitude: ${position.iss_position.longitude}`);
            googleMapsLink.href = `https://www.google.pl/maps/@${position.iss_position.latitude},${position.iss_position.longitude},8.25z`
            return callback(position);
        }
    }
    xhr.send();
}

let latLng = L.latLng(0, 0);
let mymap = L.map('mapid').setView(latLng, 4);
let myIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [60, 35],
    shadowUrl: 'issBackgroundImg2.png',
    shadowSize: [100, 70],
});
let marker = L.marker([50.505, 30.57], {icon: myIcon}).addTo(mymap);

function generateMapLayer(position) {
    mymap.panTo([position.iss_position.latitude, position.iss_position.longitude], animate=true);
    marker.setLatLng([position.iss_position.latitude, position.iss_position.longitude]);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm90dGluZ2hhbSIsImEiOiJjazZoM25iM3Iwc2hvM21scjhuZGljM3oxIn0.8E9vKkRXKDz68Tl3qv2pvA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/satellite-v9',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
}

function generateSateliteLayer(position) {
    mymap.panTo([position.iss_position.latitude, position.iss_position.longitude], animate=true);
    marker.setLatLng([position.iss_position.latitude, position.iss_position.longitude]);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm90dGluZ2hhbSIsImEiOiJjazZoM25iM3Iwc2hvM21scjhuZGljM3oxIn0.8E9vKkRXKDz68Tl3qv2pvA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
}

getPosition(positionUrl, skin); 
setInterval(() => getPosition(positionUrl, skin), 10000);

refreshButton.addEventListener ('click', () => getPosition(positionUrl, skin));
switchMapSkin.addEventListener ('click', ()=> {
    if (skin == generateMapLayer) {
        skin = generateSateliteLayer;
        getPosition(positionUrl, skin);
        //Czy ten inner HTML moze tu zostac?
        switchMapSkin.innerHTML = 'Satelite Layer';
    } else {
        skin = generateMapLayer;
        getPosition(positionUrl, skin);
        switchMapSkin.innerHTML = 'Map Layer';
    }
});
