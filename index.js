let body = document.getElementsByTagName('body')[0];
let labirinth = document.getElementById('labirinth');

for (let i = 0; i < 10; i++) {
  let elem = document.createElement('div');
  elem.classList.add('vertical');
  elem.style.left = i*10 + '%';
  labirinth.appendChild(elem);
}

let hero = document.getElementById('hero');
let x = 100;
let y = 100;
let speedx = 0;
let speedy = 0;
let mousex = 0;
let mousey = 0;
let mousemove = false;

document.addEventListener('mousemove', (e) => {
  mousex = e.clientX - 8;
  mousey = e.clientY - 8;
  mousemove = true;
})

document.addEventListener('click', (e) => {
  mousex = e.clientX - 8;
  mousey = e.clientY - 8;
  if ((mousex > 15) && (mousex < (800 - 15))) {
    if ((mousey > 16) && (mousey < (800 - 16))) {
      let elem = document.createElement('img');
      elem.classList.add('planet');
      elem.src = 'assets/meteor.png';
      elem.style.left = mousex - 15 + 'px';
      elem.style.top = mousey - 16 + 'px';
      labirinth.appendChild(elem);
    }
  }
})

setInterval(() => {
  if (mousemove) {
    let dist = Math.sqrt((mousex - x) * (mousex - x) + (mousey - y) * (mousey - y));
    if (dist > 1) {
      speedx += 10 * (mousex - x) / dist / dist;
      speedy += 10 * (mousey - y) / dist / dist;
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
    // hero.style.left = mousex - (hero.width / 2) + 'px';
    // hero.style.top = mousey - (hero.height / 2) + 'px';
  }
}, 1000 / 60);
