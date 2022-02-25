function domForEach(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback) {
    domForEach(selector, ele => ele.addEventListener(event, callback));
}

domOn('#rectangle', 'click', evt => {
  let rect = document.getElementById('rectangle');
  if(rect.getAttribute('fill') == 'red'){
  rect.setAttribute('fill', 'blue');
  } else {
    rect.setAttribute('fill', 'red');
  }
});

domOn('#donut', 'mouseover', evt => {
    let donut = document.querySelector('#donut');
       let rayon = donut.getAttribute('r');
        if(rayon == 60){
            donut.setAttribute('r', rayon*2);
            
        } else {
            console.log('oui');
            donut.setAttribute('r', rayon/2);
     
        }
    });
