
const firebaseConfig = {
    apiKey: "AIzaSyDNmSo3TjdUv6cGQkoI0zCTzg555ywgZrQ",
    authDomain: "robot-4317a.firebaseapp.com",
    databaseURL: "https://robot-4317a-default-rtdb.firebaseio.com",
    projectId: "robot-4317a",
    storageBucket: "robot-4317a.appspot.com",
    messagingSenderId: "8114338279",
    appId: "1:8114338279:web:cb3bfb28e4cf540ec96542",
    measurementId: "G-493548DCGR"
  };

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
var database = firebase.database();

database.ref("Temperature_C").on("value",function(snapshot){
    var temp = snapshot.val();
    document.getElementById("nhietdo1").innerHTML = temp;
});

database.ref("Temperature_F").on("value",function(snapshot){
    var temp = snapshot.val();
    document.getElementById("nhietdo2").innerHTML = temp;
});

database.ref("Humidity").on("value",function(snapshot){
    var temp = snapshot.val();
    document.getElementById("doam1").innerHTML = temp;
});

database.ref("Rain").on("value",function(snapshot){
    var temp = snapshot.val();
    document.getElementById("Rain").innerHTML = temp;
});

database.ref("Light").on("value",function(snapshot){
    var temp = snapshot.val();
    document.getElementById("Light").innerHTML = temp;
});
database.ref("LM35").on("value",function(snapshot){
    var temp = snapshot.val();
    document.getElementById("nhietdoPIN").innerHTML = temp;
});
database.ref("Volt").on("value",function(snapshot){
    var temp = snapshot.val();
    document.getElementById("DungluongPIN").innerHTML = temp;
});

database.ref("GPS_TIME").on("value",function(snapshot){
  var temp = snapshot.val();
  document.getElementById("TIME").innerHTML = temp;
});
// Reference to the root of your database where GPS data is stored
const locationRef = database.ref();

// Initialize the map
const map = L.map('map').setView([21.0278, 105.8342], 5);

// Add initial tile layer to the map
let tileLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

// Create a reference to OpenStreetMap tile layer
const osmTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create a polyline for GPS track
const polyline = L.polyline([], {color: 'blue', dashArray: '5, 5', weight: 2}).addTo(map);

// Create a marker for current GPS position
let marker;

// Listen for changes in GPS data
locationRef.on('value', function(snapshot) {
    try {
        const locationData = snapshot.val();

        // Check if location data exists
        if (locationData) {
            const latitude = parseFloat(locationData.GPS_N);
            const longitude = parseFloat(locationData.GPS_E);

            // Update the marker position
            if (marker) {
                marker.setLatLng([latitude, longitude]);
            } else {
                marker = L.marker([latitude, longitude]).addTo(map);
            }

            // Add the current position to the polyline
            polyline.addLatLng([latitude, longitude]);

            // Pan the map to the marker's position
            map.panTo([latitude, longitude]);

            console.log("Updated location: Latitude " + latitude + ", Longitude " + longitude);
        } else {
            console.log("No location data available");
        }
    } catch (error) {
        console.error("Error getting location data: ", error);
    }
});

// Create a control to toggle between satellite and regular map
const mapToggleControl = L.control({position: 'topleft'});

mapToggleControl.onAdd = function () {
    const div = L.DomUtil.create('div', 'leaflet-bar');
    return div;
};

mapToggleControl.addTo(map);

// Event listener for map toggle checkbox
// Event listener for map toggle checkbox
const toggleSatelliteCheckbox = document.getElementById('toggleSatellite');

toggleSatelliteCheckbox.addEventListener('change', function() {
    if (toggleSatelliteCheckbox.checked) {
        // Switch to satellite mode
        map.removeLayer(osmTileLayer);
        tileLayer.addTo(map);
    } else {
        // Switch to regular map mode
        map.removeLayer(tileLayer);
        osmTileLayer.addTo(map);
    }
});

var imageUrl = 'https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png';
var imageBounds = [[16.0, 112.8], [17.05, 111.0]]; 

var imageOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(map);

var imageUrl = 'https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png';
var imageBounds = [[9.2, 112.6], [9.67, 113.5]]; 

var imageOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(map);



