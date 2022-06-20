// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select(".story");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.75);
  step.style("height", stepH + "px");

  var figureHeight = window.innerHeight * 0.9;
  var figureMarginTop = (window.innerHeight - figureHeight) / 2;

  figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  // response = { element, direction, index }

  // add color to current step only
  step.classed("is-active", function(d, i) {
    return i === response.index;
  });

  if (map.isStyleLoaded()) {
    if (response.index == 0) {
      map.setPaintProperty("step02", "circle-radius", 0);
    }

    if (response.index == 1) {
      map.setPaintProperty("step02", "circle-radius", 12);
      map.setPaintProperty("step03", "circle-radius", 0);
    }

    if (response.index == 2) {
      map.setPaintProperty("step02", "circle-radius", 6);
      map.setPaintProperty("step03", "circle-radius", 12);
      map.setPaintProperty("step04", "circle-radius", 0);
    }

    if (response.index == 3) {
      map.setPaintProperty("step03", "circle-radius", 6);
      map.setPaintProperty("step04", "circle-radius", 12);
      map.setPaintProperty("step05", "circle-radius", 0);
      map.setPaintProperty("step05Line", "line-opacity", 0);
    }

    if (response.index == 4) {
      map.setPaintProperty("step04", "circle-radius", 6);
      map.setPaintProperty("step05", "circle-radius", 12);
      map.setPaintProperty("step05Line", "line-opacity", 0.8);
      map.setPaintProperty("step06", "circle-radius", 0);
    }

    if (response.index == 5) {
      map.setPaintProperty("step05", "circle-radius", 6);
      map.setPaintProperty("step05Line", "line-opacity", 0.35);
      map.setPaintProperty("step06", "circle-radius", 12);
      map.setPaintProperty("step07", "circle-radius", 0);
    }

    if (response.index == 6) {
      map.setPaintProperty("step06", "circle-radius", 6);
      map.setPaintProperty("step07", "circle-radius", 12);
      map.setPaintProperty("step08", "circle-radius", 0);
    }

    if (response.index == 7) {
      map.setPaintProperty("step07", "circle-radius", 6);
      map.setPaintProperty("step08", "circle-radius", 12);
      map.setPaintProperty("step09", "circle-radius", 0);
    }

    if (response.index == 8) {
      map.setPaintProperty("step08", "circle-radius", 6);
      map.setPaintProperty("step09", "circle-radius", 12);
      map.setPaintProperty("step10", "circle-radius", 0);
    }

    if (response.index == 9) {
      map.flyTo({ center: [-73.3530307, 40.7228315] });
      map.setPaintProperty("step09", "circle-radius", 6);
      map.setPaintProperty("step10", "circle-radius", 12);
      map.setPaintProperty("step11", "circle-radius", 0);
    }

    if (response.index == 10) {
      map.setPaintProperty("step10", "circle-radius", 6);
      map.setPaintProperty("step11", "circle-radius", 12);
      map.setPaintProperty("step12", "circle-radius", 0);
    }

    if (response.index == 11) {
      map.setPaintProperty("step11", "circle-radius", 6);
      map.setPaintProperty("step12", "circle-radius", 12);
      map.setPaintProperty("step13", "circle-radius", 0);
    }

    if (response.index == 12) {
      map.setPaintProperty("step12", "circle-radius", 6);
      map.setPaintProperty("step13", "circle-radius", 12);
      map.setPaintProperty("step14", "circle-radius", 0);
    }

    if (response.index == 13) {
      map.setPaintProperty("step13", "circle-radius", 6);
      map.setPaintProperty("step14", "circle-radius", 12);
      map.setPaintProperty("step15", "circle-radius", 0);
      map.setPaintProperty("step15Line", "line-opacity", 0);
    }

    if (response.index == 14) {
      map.setPaintProperty("step14", "circle-radius", 6);
      map.setPaintProperty("step15", "circle-radius", 12);
      map.setPaintProperty("step15Line", "line-opacity", 0.8);
      map.setPaintProperty("step16A", "circle-radius", 0);
      map.setPaintProperty("step16B", "circle-radius", 0);
      map.setPaintProperty("step16C", "circle-radius", 0);
      map.setPaintProperty("step16ALine", "line-opacity", 0);
      map.setPaintProperty("step16BLine", "line-opacity", 0);
      map.setPaintProperty("step16CLine", "line-opacity", 0);
    }

    if (response.index == 15) {
      map.setPaintProperty("step15", "circle-radius", 6);
      map.setPaintProperty("step15Line", "line-opacity", 0.35);
      map.setPaintProperty("step16A", "circle-radius", 12);
      map.setPaintProperty("step16B", "circle-radius", 12);
      map.setPaintProperty("step16C", "circle-radius", 12);
      map.setPaintProperty("step16ALine", "line-opacity", 0.8);
      map.setPaintProperty("step16BLine", "line-opacity", 0.8);
      map.setPaintProperty("step16CLine", "line-opacity", 0.8);
      map.setPaintProperty("step17", "circle-radius", 0);
      map.setPaintProperty("step17Line", "line-opacity", 0);
    }

    if (response.index == 16) {
      map.setPaintProperty("step16A", "circle-radius", 6);
      map.setPaintProperty("step16B", "circle-radius", 6);
      map.setPaintProperty("step16C", "circle-radius", 6);
      map.setPaintProperty("step16ALine", "line-opacity", 0.35);
      map.setPaintProperty("step16BLine", "line-opacity", 0.35);
      map.setPaintProperty("step16CLine", "line-opacity", 0.35);
      map.setPaintProperty("step17", "circle-radius", 12);
      map.setPaintProperty("step17Line", "line-opacity", 0.8);
      map.setPaintProperty("step18", "circle-radius", 0);
      map.setPaintProperty("step18Line", "line-opacity", 0);
    }

    if (response.index == 17) {
      map.setPaintProperty("step17Line", "line-opacity", 0.35);
      map.setPaintProperty("step17", "circle-radius", 6);
      map.setPaintProperty("step18", "circle-radius", 12);
      map.setPaintProperty("step18Line", "line-opacity", 0.8);
      map.setPaintProperty("step19", "circle-radius", 0);
      map.setPaintProperty("step19Line", "line-opacity", 0);
    }

    if (response.index == 18) {
      map.setPaintProperty("step18Line", "line-opacity", 0.35);
      map.setPaintProperty("step18", "circle-radius", 6);
      map.setPaintProperty("step19", "circle-radius", 12);
      map.setPaintProperty("step19Line", "line-opacity", 0.8);
      map.setPaintProperty("step20", "circle-radius", 0);
    }

    if (response.index == 19) {
      map.setPaintProperty("step19Line", "line-opacity", 0.35);
      map.setPaintProperty("step19", "circle-radius", 6);
      map.setPaintProperty("step20", "circle-radius", 12);
      map.setPaintProperty("step21", "circle-radius", 0);
      map.setPaintProperty("step21Lines", "line-opacity", 0);
    }

    if (response.index == 20) {
      map.setPaintProperty("step20", "circle-radius", 6);
      map.setPaintProperty("step21", "circle-radius", 12);
      map.setPaintProperty("step21Lines", "line-opacity", 0.8);
      map.setPaintProperty("step22", "circle-radius", 0);
    }

    if (response.index == 21) {
      map.setPaintProperty("step21Lines", "line-opacity", 0.35);
      map.setPaintProperty("step21", "circle-radius", 6);
      map.setPaintProperty("step22", "circle-radius", 12);
      map.setPaintProperty("step22Line", "line-opacity", 0.8);
      map.setPaintProperty("step23", "circle-radius", 0);
    }

    if (response.index == 22) {
      map.setPaintProperty("step22Line", "line-opacity", 0.35);
      map.setPaintProperty("step22", "circle-radius", 6);
      map.setPaintProperty("step23", "circle-radius", 12);
      map.setPaintProperty("step24Lines", "line-opacity", 0);
      map.setPaintProperty("step02", "circle-color", "#b51f24");
      map.setPaintProperty("step04", "circle-color", "#b51f24");
      map.setPaintProperty("step05", "circle-color", "#b51f24");
    }

    if (response.index == 23) {
      map.setPaintProperty("step23", "circle-radius", 6);
      map.setPaintProperty("step24Lines", "line-opacity", 0.8);
      map.setPaintProperty("step02", "circle-color", "#059E3D");
      map.setPaintProperty("step04", "circle-color", "#059E3D");
      map.setPaintProperty("step05", "circle-color", "#059E3D");
    }

    if (response.index == 24) {
      map.setPaintProperty("step24Lines", "line-opacity", 0.35);
    }
  }

  // update graphic based on step
  // figure.select("p").text(response.index + 1);
}

function setupStickyfill() {
  d3.selectAll(".sticky").each(function() {
    Stickyfill.add(this);
  });
}

function init() {
  setupStickyfill();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly .story .step",
      offset: 0.5,
      debug: false // turn back on for the line
    })
    .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

// kick things off
init();

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFuZGVubmV5IiwiYSI6Indwc05iZW8ifQ.X8KMtaHslofn7K0TY8A8Ug";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [-72.9376117, 40.855779],
  zoom: 9
});

map.scrollZoom.disable();

//map.scrollZoom.disable();

map.on("load", function() {
  // Lines

  map.addSource("step05Line", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          // Maureen's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-73.1790966, 40.8021165],
              [-72.9129887, 40.796087]
            ]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step05Line",
    type: "line",
    source: "step05Line",
    paint: {
      "line-width": 3,
      "line-color": "#b51f24",
      "line-opacity": 0
    }
  });

  map.addSource("step15Line", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          // Maureen's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-73.86232, 40.829701],
              [-73.376259, 40.624613]
            ]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step15Line",
    type: "line",
    source: "step15Line",
    paint: {
      "line-width": 3,
      "line-color": "#b51f24",
      "line-opacity": 0
    }
  });

  map.addSource("step16ALine", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          // Maureen's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-73.9813194, 40.757136],
              [-73.374864, 40.625077]
            ]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step16ALine",
    type: "line",
    source: "step16ALine",
    paint: {
      "line-width": 3,
      "line-color": "#b51f24",
      "line-opacity": 0
    }
  });

  map.addSource("step16BLine", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          // Maureen's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-73.2213584, 40.8075961],
              [-73.373233, 40.62559]
            ]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step16BLine",
    type: "line",
    source: "step16BLine",
    paint: {
      "line-width": 3,
      "line-color": "#b51f24",
      "line-opacity": 0
    }
  });

  map.addSource("step16CLine", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          // Maureen's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-73.3530307, 40.7228315],
              [-73.377814, 40.624157]
            ]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step16CLine",
    type: "line",
    source: "step16CLine",
    paint: {
      "line-width": 3,
      "line-color": "#b51f24",
      "line-opacity": 0
    }
  });

  map.addSource("step17Line", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          // Maureen's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-72.782624, 40.87809],
              [-73.359936, 40.629753]
            ]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step17Line",
    type: "line",
    source: "step17Line",
    paint: {
      "line-width": 3,
      "line-color": "#b51f24",
      "line-opacity": 0
    }
  });

  map.addSource("step18Line", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          // Maureen's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-72.823336, 40.862609],
              [-73.334313, 40.63716]
            ]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step18Line",
    type: "line",
    source: "step18Line",
    paint: {
      "line-width": 3,
      "line-color": "#b51f24",
      "line-opacity": 0
    }
  });

  map.addSource("step19Line", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          // Maureen's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-73.334077, 40.637266],
              [-73.6473005, 40.6734285]
            ]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step19Line",
    type: "line",
    source: "step19Line",
    paint: {
      "line-width": 3,
      "line-color": "#b51f24",
      "line-opacity": 0
    }
  });

  map.addSource("step21Lines", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          // Jane Doe No. 7's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-73.009932, 40.682775],
              [-73.449677, 40.606655]
            ]
          }
        },
        {
          // Jane Doe No. 3's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-73.6473005, 40.6734285],
              [-73.47802, 40.600857]
            ]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step21Lines",
    type: "line",
    source: "step21Lines",
    paint: {
      "line-width": 3,
      "line-color": "#b51f24",
      "line-opacity": 0
    }
  });

  map.addSource("step22Line", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          // Jane Doe No. 7's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-73.2767838, 40.6384703],
              [-73.271089, 40.639732]
            ]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step22Line",
    type: "line",
    source: "step22Line",
    paint: {
      "line-width": 3,
      "line-color": "#b51f24",
      "line-opacity": 0
    }
  });

  map.addSource("step24Lines", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          // Rita Tangredi's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-72.8080842, 40.8413791],
              [-72.970514, 40.755681]
            ]
          }
        },
        {
          // Colleen McNamee's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-72.8080842, 40.8413791],
              [-73.1790966, 40.8021165]
            ]
          }
        },
        {
          // Sandra Costilla's line
          type: "Feature",
          properties: {
            color: "#F7455D" // red
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [-72.8080842, 40.8413791],
              [-72.4107357, 40.933967]
            ]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step24Lines",
    type: "line",
    source: "step24Lines",
    paint: {
      "line-width": 3,
      "line-color": "#000000",
      "line-opacity": 0
    }
  });

  // Dots

  map.addSource("step02", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-72.970514, 40.755681]
          },
          properties: {
            title: "Rita Tangredi"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step02",
    type: "circle",
    source: "step02",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step03", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-72.4107357, 40.933967]
          },
          properties: {
            title: "Sandra Costilla"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step03",
    type: "circle",
    source: "step03",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step04", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.1790966, 40.8021165]
          },
          properties: {
            title: "Colleen McNamee Last Seen"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step04",
    type: "circle",
    source: "step04",
    paint: {
      "circle-radius": 0,
      "circle-color": "#f1ad4e",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step05", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-72.9129887, 40.796087]
          },
          properties: {
            title: "Colleen McNamee Remains"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step05",
    type: "circle",
    source: "step05",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step06", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.009932, 40.682775]
          },
          properties: {
            title: "Jane Doe No 7 Initial"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step06",
    type: "circle",
    source: "step06",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step07", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.6473005, 40.6734285]
          },
          properties: {
            title: "Jane Doe No 3 Initial"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step07",
    type: "circle",
    source: "step07",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step08", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-72.823336, 40.862609]
          },
          properties: {
            title: "Jane Doe No 6 Initial"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step08",
    type: "circle",
    source: "step08",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step09", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-72.782624, 40.87809]
          },
          properties: {
            title: "Jessica Taylor's Initial"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step09",
    type: "circle",
    source: "step09",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step10", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.9813194, 40.757136]
          },
          properties: {
            title: "Maureen Brainard-Barnes Initial"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step10",
    type: "circle",
    source: "step10",
    paint: {
      "circle-radius": 0,
      "circle-color": "#f1ad4e",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step11", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.86232, 40.829701]
          },
          properties: {
            title: "Melissa Barthelemy Initial"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step11",
    type: "circle",
    source: "step11",
    paint: {
      "circle-radius": 0,
      "circle-color": "#f1ad4e",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step12", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.2767838, 40.6384703]
          },
          properties: {
            title: "Shannan's last known"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step12",
    type: "circle",
    source: "step12",
    paint: {
      "circle-radius": 0,
      "circle-color": "#f1ad4e",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step13", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.2213584, 40.8075961]
          },
          properties: {
            title: "Megan's last known"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step13",
    type: "circle",
    source: "step13",
    paint: {
      "circle-radius": 0,
      "circle-color": "#f1ad4e",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step14", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.3530307, 40.7228315]
          },
          properties: {
            title: "Amber's last known"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step14",
    type: "circle",
    source: "step14",
    paint: {
      "circle-radius": 0,
      "circle-color": "#f1ad4e",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step15", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.376259, 40.624613]
          },
          properties: {
            title: "Melissa's remains"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step15",
    type: "circle",
    source: "step15",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step16A", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.374864, 40.625077]
          },
          properties: {
            title: "Maureen's remains"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step16A",
    type: "circle",
    source: "step16A",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step16B", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.373233, 40.62559]
          },
          properties: {
            title: "Megan's remains"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step16B",
    type: "circle",
    source: "step16B",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step16C", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.377814, 40.624157]
          },
          properties: {
            title: "Amber's remains"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step16C",
    type: "circle",
    source: "step16C",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step17", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.359936, 40.629753]
          },
          properties: {
            title: "Jessica Taylor's remains"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step17",
    type: "circle",
    source: "step17",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step18", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.334313, 40.63716]
          },
          properties: {
            title: "Jane Doe No 6's final remains"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step18",
    type: "circle",
    source: "step18",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step19", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.334077, 40.637266]
          },
          properties: {
            title: "Jane Doe No 6's final remains"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step19",
    type: "circle",
    source: "step19",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step20", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.369828, 40.626528]
          },
          properties: {
            title: "John Doe's final remains"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step20",
    type: "circle",
    source: "step20",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step21", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.449677, 40.606655]
          },
          properties: {
            title: "Jane Doe No. 7's final remains"
          }
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.47802, 40.600857]
          },
          properties: {
            title: "Jane Doe No. 3's final remains"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step21",
    type: "circle",
    source: "step21",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step22", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.271089, 40.639732]
          },
          properties: {
            title: "Shannan's final remains"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step22",
    type: "circle",
    source: "step22",
    paint: {
      "circle-radius": 0,
      "circle-color": "#b51f24",
      "circle-stroke-color": "white",
      "circle-stroke-width": 2
    }
  });

  map.addSource("step23", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-72.8080842, 40.8413791]
          },
          properties: {
            title: "John Bittrolff's home"
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "step23",
    type: "circle",
    source: "step23",
    paint: {
      "circle-radius": 0,
      "circle-color": "#000000",
      "circle-stroke-color": "#666666",
      "circle-stroke-width": 2
    }
  });

  // End
});
