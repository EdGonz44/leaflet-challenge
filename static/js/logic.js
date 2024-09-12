// Store json file needed for data.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Creating our initial map object:

let myMap = L.map("map", {
    center: [34.092232, -117.435051],
    zoom: 5
  });

  
  
  // Adding a tile layer (the background map image) to map:
 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

// GET request on queryURL for json.
d3.json(queryUrl).then(function (data) {
    // Make data into a data.features object and send to createFeatures function.
    createFeatures(data.features)
    // console.log(data.features);
});

function depthColor(depth) {
    if (depth <= 10) return "Green";
    else if (depth <= 30) return "light green";
    else if (depth <= 50) return "yellow";
    else if (depth <= 70) return "orange";
    else if (depth <= 90) return "salmon";
    else  return "red";
};


function createFeatures(features) {
    
    // console.log('Min:', Math.min(...features.properties.mag));
    for (let i = 0; i < features.length; i++) {
        // console.log(features[i].geometry.coordinates[2]);
        // console.log(features[i].properties.mag);
        // console.log(features[i].geometry.coordinates.slice(0,2));
        // console.log(features[i]);
        // Add circles to the map.
        L.circle(features[i].geometry.coordinates.slice(0,2).reverse(), {
            fillOpacity: 0.75,
            color: depthColor(features[i].geometry.coordinates[2]),
            // fillColor: depthColor(features[i].geometry.coordinates[2]),
            // Adjust the radius.
            radius: features[i].properties.mag * 10000
            }).bindPopup(`<h3>${features[i].properties.place}</h3> <hr> <p>Time: ${new Date (features[i].properties.time)}</p>`).addTo(myMap);
        };
    };
    

    
 