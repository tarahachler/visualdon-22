import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

let r = 40
let c1 = 50;
let c2 = 150;
const body = d3.select("body");
const svg = body.append('svg');
const group1 = svg.append("svg:g");

const cercle1 = group1.append("svg:circle")
    .attr('cx', c1)
    .attr('cy', c1)
    .attr("fill", "#E92528")
    .attr("r", r);

const text1 = group1.append('svg:text')
    .attr('x', c1)
    .attr('y', (c1 + (r*2)))
    .attr('font-size', 20)
    .text('HEYOOOO');
const group2 = svg.append("svg:g");
const cercle2 = group2.append("svg:circle")
    .attr('cx', c2)
    .attr('cy', c2)
    .attr("fill", "violet")
    .attr("r", r);

    const text2 = group2.append('svg:text')
    .attr('x', c2)
    .attr('y', (c2 + (r*2)))
    .attr('font-size', 20)
    .text('ADIEUUU');

const cercle3 = svg.append("circle")
    .attr('cx', 250)
    .attr('cy', 250)
    .attr("fill", "blue")
    .attr("r", r);

svg.attr('width', 600)
svg.attr('height', 1000)

cercle1.attr('cx', c1 + 50)
cercle2.attr('cx', c2 + 50)

cercle3.on("click", () => {
        cercle1.attr('cx', 200);
        cercle3.attr('cx', 200);
    })

const tableau = [20, 5, 25, 8, 15];

svg.selectAll('rect')
.data(tableau)
.enter()
.append('rect')
.attr('height', d => d)
.attr('width', 20)
.attr('x',(d, i) =>  ((i*100)+10))
.attr('y', 300);