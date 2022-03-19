import * as d3 from 'd3';

d3.select("body").append("div").attr("class","container");
d3.select(".container").append("strong").text("Nombre de posts par utilisateur : ");

Promise.all([
    d3.json('https://jsonplaceholder.typicode.com/posts'),
    d3.json('https://jsonplaceholder.typicode.com/users')
])
    .then(([posts, users]) => {
        /manipulation des données/
        //faire un map sur le tableau de users
        //ajouter pour chaque user un tableau avec les titres qui correspondent à l'id du user en question
        //faire ca avec un filter
        let nouveauTab = new Array();
        let userTab = users.map((user) => {
            let tableauPosts = posts.filter(post => post.userId === user.id);
            let tableauTitres = tableauPosts.title;
            let objet = new Object(
                { 
                    nom_utilisateur: user.name,
                    ville: user.address.city,
                    nom_companie: user.company.name,
                    titres_posts: [
                        tableauTitres
                    ]
                }
            );
            nouveauTab.push(objet);
        })
        console.log(nouveauTab);

        users.forEach(user => {
            let postFiltre = posts.filter(post=>post.userId === user.id)
           
            d3.select(".container").append("p").text(user.name+" : "+postFiltre.length+" posts");
          })
          let tailleMax = 0;
          let idTailleMax;
          posts.forEach(index => {
          if (index.body.length > tailleMax) {
            tailleMax = index.body.length;
            idTailleMax = index.userId;
          }
    });

    const WIDTH = 500
    const HEIGHT = 500

    d3.select("body").append("div").attr("class","mon-svg");
    d3.select(".mon-svg").append("svg");
    const tailleSvg = d3.select("svg").attr("width", WIDTH).attr("height", HEIGHT)
  
    const widthRect = 30;
    tailleSvg.selectAll("rect")
      .data()
      .enter()
      .append("rect")
 /*      .attr('x', (d,i) => (i*20+40))
      .attr('y', d => 300-d*10)
      .attr('width', widthRect)
      .attr('height', d => d*10)
      .attr('stroke', 'black')
      .attr('fill', '#69a3b2');
 */
}); 