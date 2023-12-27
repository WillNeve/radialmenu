import './stylesheets/style.scss';

class RadialMenu {
  constructor(menu) {
    this.menu = menu
    this.menuToggle = this.menu.querySelector('.toggle');
    this.buttons = this.menu.querySelectorAll('.button');
    console.log(this.menuToggle);
    this.buttonsContainer = this.menu.querySelector('.button-container');
    this.menuTransitionTime = parseInt(this.menu.dataset.transitionDuration);
    this.buttonsContainer.style.transition = `transform ${this.menuTransitionTime / 2000}s linear`;
    this.menuRadius = this.menu.dataset.radius ? parseInt(this.menu.dataset.radius) : (this.menu.offsetWidth / 2) - this.buttonDiameter - 40;
    this.buttonCount = this.buttons.length
    this.buttonTransitionTime = (this.menuTransitionTime / this.buttonCount).toFixed(2);
    this.angleGap = 360 / this.buttonCount;
    this.radGap = this.angleGap * Math.PI/180
    this.buttonDiameter = Math.sin(this.radGap / 2) * this.menuRadius * 2 * 0.8
    this.buttons.forEach((button) => {
      button.style.width = `${this.buttonDiameter}px`
      button.style.height = `${this.buttonDiameter}px`
      button.style.transition = `all ${this.buttonTransitionTime/1000}s linear`
    })
    this.menuLocked = false
    this.menuOpen = false

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    this.menuToggle.addEventListener('mouseover', this.openMenu);
    this.menu.addEventListener('mouseleave', this.closeMenu)
  }

  openMenu() {
    this.menuToggle.classList.add('active')
    this.buttonsContainer.classList.add('active')
    if (this.menuLocked || this.menuOpen) {
      return;
    }
    this.menuLocked = true;
    setTimeout(() => {
      this.menuLocked = false;
    }, this.menuTransitionTime / 2);
    for (let i = 0; i < this.buttonCount; i++) {
      const angleDeg = this.angleGap * (i)
      const angleRad = angleDeg * Math.PI/180
      let xOffset = Math.sin(angleRad) * this.menuRadius;
      let yOffset = Math.cos(angleRad) * this.menuRadius;
      yOffset = yOffset * -1
      this.buttons[i].xOffset = xOffset
      this.buttons[i].yOffset = yOffset
      this.addHoverToButton(this.buttons[i])
      setTimeout(() => {
        this.buttons[i].style.transform = `translate(calc(${xOffset}px - 50%), calc(${yOffset}px - 50%))`;
        this.buttons[i].classList.add('active');
      }, i * (this.buttonTransitionTime/2));
    }
    this.menuOpen = true
  }

  closeMenu() {
    if (this.menuLocked || !this.menuOpen) {
      return
    }
    this.menuToggle.classList.remove('active')
    this.menuLocked = true;
    setTimeout(() => {
      this.menuLocked = false;
    }, this.menuTransitionTime / 2);
    this.buttonsContainer.classList.remove('active')
    for (let i = (this.buttonCount - 1); i >= 0; i--) {
      setTimeout(() => {
        this.buttons[i].style.transform = `translate(0px, 0px)`;
        this.buttons[i].classList.remove('active');
      }, ((i - this.buttonCount) * -1) * (this.buttonTransitionTime/2));
    }
    this.menuOpen = false
  }

  addHoverToButton(button) {
    button.addEventListener('mouseover', this.hoverStart)
    button.addEventListener('mouseout', this.hoverEnd)
  }

  removeHoverFromButton(button) {
    button.removeEventListener("mouseover", this.hoverStart, false);
    button.removeEventListener("mouseout", this.hoverEnd, false);
  }

  hoverStart(_event) {
    _event.target.style.transform = `translate(calc(${_event.target.xOffset}px - 50%), calc(${_event.target.yOffset}px - 50%)) scale(1.1)`
  }

  hoverEnd(_event) {
    _event.target.style.transform = `translate(calc(${_event.target.xOffset}px - 50%), calc(${_event.target.yOffset}px - 50%)) scale(1)`
  }

}


const radialMenus = document.querySelectorAll('.radial-menu')

radialMenus.forEach((menu) => {
  new RadialMenu(menu)
})
