import * as d3 from 'd3'

// Pour importer les données
// import file from '../data/data.csv'

import population_totale from '../data/population_total.csv'
import pib_par_habitant from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import esperance_de_vie from '../data/life_expectancy_years.csv'
console.log(esperance_de_vie);
console.log(pib_par_habitant);

const populationTotale = [];
population_totale.forEach(element => {
    let tabPays2021 = []
    tabPays2021.push(element['country']);
    tabPays2021.push(element['2021']); //taille du cercle proportionnelle à ça
    
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
const esperenceMin = 200;
const esperenceMax = 0;
esperanceDeVie.forEach(element => {
    if (element[1] > esperenceMax) {
        esperenceMax = element[1];
    }
    if (element[1] < esperenceMin) {
        esperenceMin[1] = element[1];
    }
});

//trouver le min et max pib
const pibMin = 999999999999;
const bibMax = 0;
pibParHabitant.forEach(element => {
    if (element[1] > pibMax) {
        pibMax = element[1];
    }
    if (element[1] < pibMin) {
        pibMin[1] = element[1];
    }
});

//Créer les axes X et Y
const body = d3.select("body");
const margin = { top: 10, right: 40, bottom: 10, left: 40 },
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

const svg = body.append('svg')         
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

svg.append('g')
   .attr("transform", "translate(20," + height + ")")
   .call(axeX);

svg.append('g')
   .attr("transform", "translate(20, 0)")   
   .call(axeY);


//créer des cercles de la bonne taille et les placer au bon endroit

for (let index = 0; index < populationTotale.length; index++) {
    svg.append("circle")
    .attr("cx", axeX(pibParHabitant[index][1]))
    .attr("cy", axeY(esperanceDeVie[index][1]))
    .attr("r", (populationTotale[index][1])/ 10000)
    .style("fill", "blue");
    
}

