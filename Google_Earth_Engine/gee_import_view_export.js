// Authors:       Michael Hann
// Purpose:       import dataset into GEE, and position the map for viewing
// Date Uploaded: Dec 6, 2021
// Date Updated:  Dec 6, 2021

// insert code into https://code.earthengine.google.com/
// you will need an account and to sign up for google earth engine (free).

// Open the dataset
var dataset = ee.ImageCollection('USDA/NASS/CDL')
// specify filter (in this case 'date')
                  .filter(ee.Filter.date('2015-01-01', '2015-12-31'))
// select first entry
                  .first();
// select a layer from the dataset
var cropLandcover = dataset.select('cropland'); 

// Display the layers on the map
// Initialize map position
Map.setCenter(-100.55, 40.71, 4); 
// add layer to map
Map.addLayer(cropLandcover, {}, 'Crop Landcover');

// this is a .shp table describing an area of interest.
// New -> Shapefiles --(upload)--> mouse over shapefile --> 
// click far right arrow ('Import into script') --> Rename --> add to map via below
Map.addLayer(aoi)  

// Export the image, specifying scale and region.
// Check 'Tasks' heading on the right to actually run on the GEE server
Export.image.toDrive({
// choose image
  image: cropLandcover,
  description: 'cropClassification',
// region: table,
  maxPixels: 1e9,                       // make sure you don't print too many pixels
  scale: 30,                            // metres/pixel
  crs: 'EPSG:32615'                     // set CRS; (WGS 84 / UTM zone 15N) aka Iowa/Minnesota
                                        // check https://epsg.io/ for your EPSG
 });