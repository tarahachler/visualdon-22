import * as d3 from 'd3'
import * as L from 'leaflet';

// Pour importer les données
// import file from '../data/data.csv'

import population_totale from '../data/population_total.csv'
import pib_par_habitant from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import esperance_de_vie from '../data/life_expectancy_years.csv'


const populationTotale = [];
population_totale.forEach(element => {
    let tabPays2021 = []
    tabPays2021.push(element['country']);
    tabPays2021.push(element['2021']); //taille du cercle proportionnelle à ça //chiffre nbr population 2021
    
    populationTotale.push(tabPays2021);
    
});

const pibParHabitant = [];
pib_par_habitant.forEach(element => {
    let tabPays2021 = []
    tabPays2021.push(element['country']);
    tabPays2021.push(element['2021']);
    
    pibParHabitant.push(tabPays2021);
    
});

const esperanceDeVie = [];
esperance_de_vie.forEach(element => {
    let tabPays2021 = []
    tabPays2021.push(element['country']);
    tabPays2021.push(element['2021']);
    
    esperanceDeVie.push(tabPays2021);
    
});

console.log(populationTotale);
console.log(pibParHabitant);
console.log(esperanceDeVie);


//console.log(pibParHabitant[0][0]); //devrait afficher le premier pays //CA MARCHE !!

//trouver le min et max espérence de vie
let esperenceMin = 200;
let esperenceMax = 0;
esperanceDeVie.forEach(element => {
    if (element[1] > esperenceMax) {
        esperenceMax = element[1];
    }
    if (element[1] < esperenceMin) {
        esperenceMin = element[1];
    }
});

//trouver le min et max pib
let pibMin = 999999999999;
let pibMax = 0;
pibParHabitant.forEach(element => {
    if (element[1] > pibMax) {
        pibMax = element[1];
    }
    if (element[1] < pibMin) {
        pibMin = element[1];
    }
});

//Créer les axes X et Y
const div1 = d3.select("#partie1");
const margin = { top: 10, right: 40, bottom: 10, left: 40 },
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

const svg1 = div1.append('svg')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


const echelleX = d3.scaleLinear()
.domain([pibMin, pibMax]) //définir avec variables de csv
.range([0, width]); // pas compris

const echelleY = d3.scaleLinear()
.domain([esperenceMin, esperenceMax]) //définir avec variables de csv
.range([height, 0]); // pas compris


const axeX = d3.axisTop(echelleX);
const axeY = d3.axisLeft(echelleY);

svg1.append('g')
   .attr("transform", "translate(20," + height + ")")
   .call(axeX);

svg1.append('g')
   .attr("transform", "translate(20, 0)")   
   .call(axeY);

   //fonctionne au dessus


//créer des cercles de la bonne taille et les placer au bon endroit

/* for (let index = 0; index < populationTotale.length; index++) {
    svg1.append("circle")
    .attr("cx", axeX(pibParHabitant[index][1]))
    .attr("cy", axeY(esperanceDeVie[index][1]))
    .attr("r", (populationTotale[index][1])/ 1000)
    .style("fill", "blue");
    
} */



  
  const tabCercles = svg1.selectAll("circle")
    .data(pibParHabitant)
    .enter()
    .append("circle");

  const unCercle = tabCercles
                    .attr("cx", function(index) {
                        return axeX(pibParHabitant[index][1]);
                    });
        
                     /*    tabCercles.select("circle")
                            .attr("cx", axeX(pibParHabitant[index][1]))
                            .attr("cy", axeY(esperanceDeVie[index][1]))
                            .attr("r", (populationTotale[index][1])/ 1000)
                            .style("fill", "blue");
                      }); */
/*     .circle(i => {
      i.attr("cx", axeX(pibParHabitant[i][1]))
      .attr("cy", i => axeY(esperanceDeVie[i][1]))
      .attr("r", i => (populationTotale[i][1])/ 1000)
      .style("fill", "blue");
    }) */

/* 
    .attr("cx", i => axeX(pibParHabitant[i][1]))
    .attr("cy", i => axeY(esperanceDeVie[i][1]))
    .attr("r", i => (populationTotale[i][1])/ 1000)
    .style("fill", "blue"); */
  


//Partie 2 :
//visualiser l'espérance de vie sur une carte

const div2 = d3.select("#partie2");

const svg2 = div2.append('svg')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let cx = 50;
let cy = 50;
let zoom = 10;
let fondDeCarte = ('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19, 
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
});
//

let objetGeojson = 'https://leaflet-extras.github.io/leaflet-providers/preview/#filter=OpenStreetMap.Mapnik';

let map = new L.map('#map').setView([cx, cy], zoom);
L.tileLayer(fondDeCarte).addTo(map);
L.Marker([cx,cy]).addTo(map);
L.geoJSON(objetGeojson).addTo(map);

svg2.call(map);


/* // Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues[7]);

// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
  .await(ready);

function ready(error, topo) {

  let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
  }

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
    } */

/* let projection = d3.geoMercator()
.fitSize([width,height], esperance_de_vie)


let path = d3.geoPath()
.projection(projection)

svg.selectAll("path")
.data(data.features)
.join(enter => enter.append('path')
.attr("d",path)
.attr("fill","none")
.attr("stroke-width",1))

svg.append('circle')
.attr("cx", projection([6.6412, 46.7785])[0])
.attr("cy", projection([6.6412, 46.7785])[1])
.attr("fill", "red")
.attr("r", 3) */



//Partie 3 :
//Récupérer les donneés pour chaque année
const popTotale = [];
const espDeVie = [];
const pib = [];

for (let index = 1800; index <= 2100; index++) {
  
    population_totale.forEach(element => {
    let tabPays = []
    tabPays.push(element['country']);
    tabPays.push(element[index]); //taille du cercle proportionnelle à ça //chiffre nbr population 
    
    popTotale.push(tabPays);
    });
  
    population_totale.forEach(element => {
    let tabPays = []
    tabPays.push(element['country']);
    tabPays.push(element[index]);
    
    espDeVie.push(tabPays);
    });

    
    population_totale.forEach(element => {
    let tabPays = []
    tabPays.push(element['country']);
    tabPays.push(element[index]);
    
    pib.push(tabPays);
    });


}

//Créer les axes X et Y
const div3 = d3.select("#partie3");


const svg3 = div3.append('svg')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svg3.append('g')
   .attr("transform", "translate(20," + height + ")")
   .call(axeX);

svg3.append('g')
   .attr("transform", "translate(20, 0)")   
   .call(axeY);

popTotale.forEach(annee => {
  selection.data(popTotale)
  .join(enter => enter              
    .append('circle')              
    .attr('cx', d => d.valeur) 
    .attr('cy', d => d.valeur)
    .attr('r', d => d.valeur),    
        update => update            
        .append('circle')              
        .attr('cx', d => d.valeur) 
        .attr('cy', d => d.valeur)
        .attr('r', d => d.valeur),      
        exit => exit              
    .remove()              
    )
    .append('circle');
})

//////////////////////
