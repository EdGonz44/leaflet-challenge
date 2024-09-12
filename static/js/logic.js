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
});

function depthColor(depth) {
    if (depth <= 10) return "Green";
    else if (depth <= 30) return "greenyellow";
    else if (depth <= 50) return "yellow";
    else if (depth <= 70) return "orange";
    else if (depth <= 90) return "orangered";
    else  return "red";
};

// Function to convert magnitude to a positive radius
function magnitudeToRadius(magnitude) {
    const minMag = 1; // Minimum magnitude to prevent negative or zero radii
    const maxMag = 10; // Maximum magnitude for scaling purposes
    const minRadius = 100; // Minimum radius in pixels or meters
    const maxRadius = 1000; // Maximum radius in pixels or meters

    // Convert negative magnitudes to positive
    magnitude = Math.abs(magnitude);

    // Ensure magnitude is within the expected range
    magnitude = Math.max(magnitude, minMag);

    // Scale magnitude to radius using logarithmic scaling
    return Math.log(magnitude) / Math.log(maxMag) * (maxRadius - minRadius) + minRadius;
}

function createFeatures(features) {
    
    // console.log('Min:', Math.min(...features.properties.mag));
    for (let i = 0; i < features.length; i++) {
        // Add circles to the map.
        L.circle(features[i].geometry.coordinates.slice(0,2).reverse(), {
            fillOpacity: 0.75,
            color: depthColor(features[i].geometry.coordinates[2]),
            // Adjust the radius.
            radius: magnitudeToRadius(features[i].properties.mag) * 100
            }).bindPopup(`<h3>${features[i].properties.place}</h3> <hr> <p>Magnitude: ${(features[i].properties.mag)} <br />
            Location: ${(features[i].geometry.coordinates.slice(0,2).reverse())} <br />
             Depth: ${(features[i].geometry.coordinates[2])}</p>`).addTo(myMap);
        };
    };

// Set up the legend.
let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let labels = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'];
    let colors = ['green', 'greenyellow', 'yellow', 'orange', 'orangered', 'red'];

    // Create a list for the legend items
    let legendItems = labels.map((label, index) => {
        return '<li style="background-color: ' + colors[index] + '"></li> ' + label;
    }).join("<br>"); // Add <br> between items

    // Add the legend title and items
    div.innerHTML = '<h1>Depth of Earthquake</h1>' +
                    '<ul>' + legendItems + '</ul>';

    return div;
};

// Adding the legend to the map
legend.addTo(myMap);

