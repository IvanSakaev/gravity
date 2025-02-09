const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let mode = 'labirinth';
if (urlParams.has('mode')) {
  let m = urlParams.get('mode');
  if (m === 'sandbox') {
    mode = 'sandbox';
  } else if (m === 'random') {
    mode = 'random';
  }
}

let labirinth = document.getElementById('labirinth');
let hero = document.getElementById('hero');
let x = 400;
let y = 400;
let speedx = 0;
let speedy = 0;
let planets = [];

if (mode === 'labirinth') {
  for (let i = 0; i < 10; i++) {
    let elem = document.createElement('div');
    elem.classList.add('vertical');
    elem.style.left = i*10 + '%';
    labirinth.appendChild(elem);
  }
}

if (mode === 'random') {
  for (let i = 0; i < 50; i++) {
    let elem = document.createElement('img');
    elem.classList.add('planet');
    elem.src = 'assets/meteor.png';
    let a = Math.random() * (800 - 30);
    let b = Math.random() * (800 - 32);
    elem.style.left = a + 'px';
    elem.style.top = b + 'px';
    labirinth.appendChild(elem);
    planets.push([a + 15, b + 16]);
  }
}

document.addEventListener('click', (e) => {
  let mousex = e.clientX - 8;
  let mousey = e.clientY - 8;
  if ((mousex > 15) && (mousex < (800 - 15))) {
    if ((mousey > 16) && (mousey < (800 - 16))) {
      let elem = document.createElement('img');
      elem.classList.add('planet');
      elem.src = 'assets/meteor.png';
      elem.style.left = mousex - 15 + 'px';
      elem.style.top = mousey - 16 + 'px';
      labirinth.appendChild(elem);
      planets.push([mousex, mousey]);
    }
  }
})

function moveByGravity(planet) {
  let dist = Math.sqrt((planet[0] - x) * (planet[0] - x) + (planet[1] - y) * (planet[1] - y));
  if (dist > 1) {
    speedx += 5 * (planet[0] - x) / dist / dist;
    speedy += 5 * (planet[1] - y) / dist / dist;
  }
}

setInterval(() => {
  for (let i = 0; i < planets.length; i++){
    moveByGravity(planets[i]);
  }
  x += speedx;
  y += speedy;

  if (x < (hero.width / 2)) {
    x = hero.width / 2;
    speedx = 0;
  } else if (x > (800 - hero.width / 2)) {
    x = (800 - hero.width / 2);
    speedx = 0;
  }
  if (y < (hero.height / 2)) {
    y = hero.height / 2;
    speedy = 0;
  } else if (y > (800 - hero.height / 2)) {
    y = (800 - hero.height / 2);
    speedy = 0;
  }

  hero.style.left = x - (hero.width / 2) + 'px';
  hero.style.top = y - (hero.height / 2) + 'px';
}, 1000 / 60);
