// https://www.youtube.com/watch?time_continue=348&v=3cxyFXt15aM&feature=emb_title
// GEE case study use

// Timelapse
// https://earthengine.google.com/timelapse/


// USA crop data 2018-2020
// Iowa corn and soybean
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2018-01-01', '2019-12-31'))
                  .first();
var cropLandcover = dataset.select('cropland');
Map.setCenter(-100.55, 40.71, 4);
Map.addLayer(cropLandcover, {}, 'Crop Landcover');

// Near Real Time Methane
// AOI: Tundra Permafrost, Cattle Production, Lake Emissions
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .select('CH4_column_volume_mixing_ratio_dry_air')
  .filterDate('2019-06-01', '2019-07-16');

var band_viz = {
  min: 1750,
  max: 1900,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(collection.mean(), band_viz, 'S5P CH4');
Map.setCenter(0.0, 0.0, 2);


// Level 1 Administration Layers
var dataset = ee.FeatureCollection("FAO/GAUL/2015/level1");

Map.setCenter(7.82, 49.1, 4);

var styleParams = {
  fillColor: 'b5ffb4',
  color: '00909F',
  width: 1.0,
};

dataset = dataset.style(styleParams);
Map.addLayer(dataset, {}, 'First Level Administrative Units');