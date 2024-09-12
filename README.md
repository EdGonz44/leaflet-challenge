# leaflet-challenge

## Project Overview
The purpose of this project was to create a map visualization of all of the earthquakes that have ocurred in the last week (from the time that the json file was called). This was done through the usage of leaflet, and involved pulling a json file on earthquake data in the last week from the USGS (United States Geological Survey) site. 

### Earthquake Visualization
The visualization creates a map of the world with circles placed on the locations where earthquakes occurred. These circles differ in size based on the magnitude of the earthquak that they represent, and differ in color based on said earthquake's depth of occurence. At the same time, each circle when clicked on provides a popup that details its coordinates, magnitude, and depth. A legend is provided at the bottom right in order to detail which range of depth is represented by what color. For reference, this is the JavaScript file used to build the map: [logic.js](https://github.com/EdGonz44/leaflet-challenge/blob/main/static/js/logic.js); and this is the CSS file for the styling of the site: [style.css](https://github.com/EdGonz44/leaflet-challenge/blob/main/static/css/style.css).

### HTML Deployment
The website for the deployment of the Earthquake Visualization was created using the [index.html](https://github.com/EdGonz44/leaflet-challenge/blob/main/index.html) file.


## Project Structure

The project repository should have the following structure:

```plaintext
leaflet-challenge
│
├── static/js
|   ├── css
|       ├── style.css
|   ├── js
|       ├── logic.js
├── README.md
└──index.html


```
