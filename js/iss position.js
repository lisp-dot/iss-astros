const PositionURL = 'http://api.open-notify.org/iss-now.json';
const refresh_button = document.querySelector ( '#refresh_position' );
const coordinatesHtml = document.querySelector ( '#position' );
const coordinatesFooter = document.querySelector ( '#coordinatesFooter' );
const switchMapSkin = document.querySelector ( '#MapSatelite' );
let position;
let skin = createMap0;

function getPosition ( PositionURL, callback ) {
    const xhr = new XMLHttpRequest();
    xhr.open ( 'GET', PositionURL );
    xhr.onload = () => {
        if ( xhr.status == 200 ) {
            position = JSON.parse ( xhr.responseText );
            coordinatesFooter.innerHTML = `
            Latitude: ${position.iss_position.latitude} Longitude: ${position.iss_position.longitude}
            `
            document.querySelector ( 'a' ).href = `https://www.google.pl/maps/@${position.iss_position.latitude},${position.iss_position.longitude},8.25z`
            return callback( position );
        }
    }
    xhr.send();
}

var latLng = L.latLng( 0, 0);
var mymap = L.map('mapid').setView(latLng, 4);
var myIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [60, 35],
    shadowUrl: 'iss background.png',
    shadowSize: [100, 70],
});
var marker = L.marker([50.505, 30.57], {icon: myIcon}).addTo(mymap);

function createMap0 ( position ) {
    mymap.panTo ( [position.iss_position.latitude, position.iss_position.latitude], animate=true );
    marker.setLatLng ( [ position.iss_position.latitude, position.iss_position.latitude ]);
        


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm90dGluZ2hhbSIsImEiOiJjazZoM25iM3Iwc2hvM21scjhuZGljM3oxIn0.8E9vKkRXKDz68Tl3qv2pvA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    accessToken: 'your.mapbox.access.token',
    }).addTo(mymap);
}

function createMap1 ( position ) {
    mymap.panTo ( [position.iss_position.latitude, position.iss_position.latitude], animate=true );
    marker.setLatLng ( [ position.iss_position.latitude, position.iss_position.latitude ]);
        


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm90dGluZ2hhbSIsImEiOiJjazZoM25iM3Iwc2hvM21scjhuZGljM3oxIn0.8E9vKkRXKDz68Tl3qv2pvA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'your.mapbox.access.token',
    }).addTo(mymap);
}

getPosition ( PositionURL, skin ); 
setInterval ( () => getPosition ( PositionURL, skin ), 10000 );

refresh_button.addEventListener ( 'click', () => getPosition ( PositionURL, skin ) );
switchMapSkin.addEventListener ( 'click', ()=> {
    if ( skin == createMap0 ) {
        skin = createMap1;
        getPosition ( PositionURL, skin );
    } else {
        skin = createMap0;
        getPosition ( PositionURL, skin );
    }
});