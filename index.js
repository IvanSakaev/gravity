let width = 800;
let height = 600;

let lab_width = 8;
let lab_height = 6;
let walls = [
  [0, 0, 0, 6],
  [0, 0, 8, 0],
  [0, 6, 8, 6],
  [8, 0, 8, 6],
  [0, 4, 1, 4],
  [1, 1, 1, 3],
  [1, 4, 1, 5],
  [1, 3, 5, 3],
  [2, 1, 2, 2],
  [2, 4, 2, 5],
  [2, 5, 5, 5],
  [3, 1, 3, 2],
  [3, 3, 3, 4],
  [3, 1, 5, 1],
  [4, 4, 5, 4],
  [4, 2, 6, 2],
  [5, 0, 5, 1],
  [5, 3, 5, 4],
  [5, 4, 6, 4],
  [6, 1, 6, 4],
  [6, 5, 6, 6],
  [6, 1, 7, 1],
  [6, 3, 7, 3],
  [6, 5, 7, 5],
  [7, 4, 7, 5],
  [7, 2, 8, 2],
];

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
let x = width / lab_width / 2;
let y = height / lab_height / 2;
let speedx = 0;
let speedy = 0;
let planets = [];

labirinth.style.width = width + 'px';
labirinth.style.height = height + 'px';

if (mode === 'labirinth') {
  for (let i = 0; i < walls.length; i++) {
    let elem = document.createElement('div');
    if (walls[i][0] === walls[i][2]) {
      elem.classList.add('vertical');
      elem.style.height = (walls[i][3] - walls[i][1]) / lab_height * 100 + '%';
    } else if (walls[i][1] === walls[i][3]) {
      elem.classList.add('horizontal');
      elem.style.width = (walls[i][2] - walls[i][0]) / lab_width * 100 + '%';
    }
    elem.style.left = walls[i][0] / lab_width * 100 + '%';
    elem.style.top = walls[i][1] / lab_height * 100 + '%';
    labirinth.appendChild(elem);
  }
}

if (mode === 'random') {
  for (let i = 0; i < 25; i++) {
    let elem = document.createElement('img');
    elem.classList.add('planet');
    elem.src = 'assets/meteor.png';
    let a = Math.random() * (width - 30);
    let b = Math.random() * (height - 32);
    elem.style.left = a + 'px';
    elem.style.top = b + 'px';
    labirinth.appendChild(elem);
    planets.push([a + 15, b + 16]);
  }
}

document.addEventListener('click', (e) => {
  let mousex = e.clientX - 8;
  let mousey = e.clientY - 8;
  if ((mousex > 15) && (mousex < (width - 15))) {
    if ((mousey > 16) && (mousey < (height - 16))) {
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
  let dist = Math.sqrt((planet[0] - x) * (planet[0] - x) + (planet[1] - y) * (planet[1] - y)) / 5;
  if (dist > 1) {
    speedx += (planet[0] - x) / dist / dist;
    speedy += (planet[1] - y) / dist / dist;
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
  } else if (x > (width - hero.width / 2)) {
    x = (width - hero.width / 2);
    speedx = 0;
  }
  if (y < (hero.height / 2)) {
    y = hero.height / 2;
    speedy = 0;
  } else if (y > (height - hero.height / 2)) {
    y = (height - hero.height / 2);
    speedy = 0;
  }

  hero.style.left = x - (hero.width / 2) + 'px';
  hero.style.top = y - (hero.height / 2) + 'px';
}, 1000 / 60);
