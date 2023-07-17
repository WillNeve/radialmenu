/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/application.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/application.js":
/*!**********************************!*\
  !*** ./assets/js/application.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

class RadialMenu {
  constructor(menu) {
    this.menu = menu;
    this.menuToggle = this.menu.querySelector('.toggle');
    this.buttons = this.menu.querySelectorAll('.button');
    console.log(this.menuToggle);
    this.buttonsContainer = this.menu.querySelector('.button-container');
    this.menuTransitionTime = parseInt(this.menu.dataset.transitionDuration);
    this.buttonsContainer.style.transition = `transform ${this.menuTransitionTime / 2000}s linear`;
    this.buttonOffset = this.menu.offsetWidth / 2 - 40;
    this.buttonCount = this.buttons.length;
    this.buttonTransitionTime = (this.menuTransitionTime / this.buttonCount).toFixed(2);
    this.angleGap = 360 / this.buttonCount;
    this.menuLocked = false;
    this.menuOpen = false;
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.menuToggle.addEventListener('mouseover', this.openMenu);
    this.menu.addEventListener('mouseleave', this.closeMenu);
  }
  openMenu() {
    this.menuToggle.classList.add('active');
    this.buttonsContainer.classList.add('active');
    if (this.menuLocked || this.menuOpen) {
      return;
    }
    this.menuLocked = true;
    setTimeout(() => {
      this.menuLocked = false;
    }, this.menuTransitionTime / 2);
    for (let i = 0; i < this.buttonCount; i++) {
      const angleDeg = this.angleGap * i;
      const angleRad = angleDeg * Math.PI / 180;
      let xOffset = Math.sin(angleRad) * this.buttonOffset;
      let yOffset = Math.cos(angleRad) * this.buttonOffset;
      yOffset = yOffset * -1;
      this.buttons[i].xOffset = xOffset;
      this.buttons[i].yOffset = yOffset;
      this.addHoverToButton(this.buttons[i]);
      setTimeout(() => {
        this.buttons[i].style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        this.buttons[i].classList.add('active');
      }, i * (this.buttonTransitionTime / 2));
    }
    this.menuOpen = true;
  }
  closeMenu() {
    if (this.menuLocked) {
      return;
    }
    this.menuToggle.classList.remove('active');
    this.menuLocked = true;
    setTimeout(() => {
      this.menuLocked = false;
    }, this.menuTransitionTime / 2);
    this.buttonsContainer.classList.remove('active');
    for (let i = this.buttonCount - 1; i >= 0; i--) {
      setTimeout(() => {
        this.buttons[i].style.transform = `translate(0px, 0px)`;
        this.buttons[i].classList.remove('active');
      }, (i - this.buttonCount) * -1 * (this.buttonTransitionTime / 2));
    }
    this.menuOpen = false;
  }
  addHoverToButton(button) {
    button.addEventListener('mouseover', this.hoverStart);
    button.addEventListener('mouseout', this.hoverEnd);
  }
  removeHoverFromButton(button) {
    button.removeEventListener("mouseover", this.hoverStart, false);
    button.removeEventListener("mouseout", this.hoverEnd, false);
  }
  hoverStart(_event) {
    _event.target.style.transform = `translate(${_event.target.xOffset}px, ${_event.target.yOffset}px) scale(1.1)`;
  }
  hoverEnd(_event) {
    _event.target.style.transform = `translate(${_event.target.xOffset}px, ${_event.target.yOffset}px) scale(1)`;
  }
}
const radialMenus = document.querySelectorAll('.radial-menu');
radialMenus.forEach(menu => {
  new RadialMenu(menu);
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map