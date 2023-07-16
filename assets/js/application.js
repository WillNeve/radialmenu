const menu = document.querySelector('.radial-menu');
const menuToggle = menu.querySelector('.toggle');
const buttons = menu.querySelectorAll('.button');
const buttonsContainer = menu.querySelector('.button-container');
const menuTransitionTime = parseInt(menu.dataset.transitionDuration);
buttonsContainer.style.transition = `transform ${menuTransitionTime / 2000}s linear`;

const buttonOffset = (menu.offsetWidth / 2) - 40;
const buttonCount = buttons.length
const buttonTransitionTime = (menuTransitionTime / buttonCount).toFixed(2);
const angleGap = 360 / buttonCount;

let menuLocked = false;

const openMenu = (_event) => {
  menuToggle.classList.add('active')
  buttonsContainer.classList.add('active')
  if (menuLocked) {
    return;
  }
  menuLocked = true;
  setTimeout(() => {
    menuLocked = false;
    mousePos = { x: _event.clientX, y: _event.clientY };

  }, menuTransitionTime);
  for (let i = 0; i < buttonCount; i++) {
    const angleDeg = angleGap * (i)
    const angleRad = angleDeg * Math.PI/180
    let xOffset = Math.sin(angleRad) * buttonOffset;
    let yOffset = Math.cos(angleRad) * buttonOffset;
    yOffset = yOffset * -1
    setTimeout(() => {
      buttons[i].style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      buttons[i].classList.add('active');
    }, i * (buttonTransitionTime/2));
  }
};

const closeMenu = (_event) => {
  if (menuLocked) {
    return
  }
  menuToggle.classList.remove('active')
  menuLocked = true;
  setTimeout(() => {
    menuLocked = false;
  }, menuTransitionTime);
  buttonsContainer.classList.remove('active')
  for (let i = (buttonCount - 1); i >= 0; i--) {
    setTimeout(() => {
      buttons[i].style.transform = `translate(0px, 0px)`;
      buttons[i].classList.remove('active');
    }, ((i - buttonCount) * -1) * (buttonTransitionTime/2));
  }
};


menuToggle.addEventListener('mouseover', openMenu);
menu.addEventListener('mouseleave', closeMenu)
