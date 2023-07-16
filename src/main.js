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

const menu = document.querySelector('.radial-menu');
const menuToggle = menu.querySelector('.toggle');
const buttons = menu.querySelectorAll('.button');
const buttonsContainer = menu.querySelector('.button-container');
const menuTransitionTime = parseInt(menu.dataset.transitionDuration);
buttonsContainer.style.transition = `transform ${menuTransitionTime / 2000}s linear`;
const buttonOffset = menu.offsetWidth / 2 - 40;
const buttonCount = buttons.length;
const buttonTransitionTime = (menuTransitionTime / buttonCount).toFixed(2);
const angleGap = 360 / buttonCount;
let menuLocked = false;
const openMenu = _event => {
  menuToggle.classList.add('active');
  buttonsContainer.classList.add('active');
  if (menuLocked) {
    return;
  }
  menuLocked = true;
  setTimeout(() => {
    menuLocked = false;
    mousePos = {
      x: _event.clientX,
      y: _event.clientY
    };
  }, menuTransitionTime);
  for (let i = 0; i < buttonCount; i++) {
    const angleDeg = angleGap * i;
    const angleRad = angleDeg * Math.PI / 180;
    let xOffset = Math.sin(angleRad) * buttonOffset;
    let yOffset = Math.cos(angleRad) * buttonOffset;
    yOffset = yOffset * -1;
    setTimeout(() => {
      buttons[i].style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      buttons[i].classList.add('active');
    }, i * (buttonTransitionTime / 2));
  }
};
const closeMenu = _event => {
  if (menuLocked) {
    return;
  }
  menuToggle.classList.remove('active');
  menuLocked = true;
  setTimeout(() => {
    menuLocked = false;
  }, menuTransitionTime);
  buttonsContainer.classList.remove('active');
  for (let i = buttonCount - 1; i >= 0; i--) {
    setTimeout(() => {
      buttons[i].style.transform = `translate(0px, 0px)`;
      buttons[i].classList.remove('active');
    }, (i - buttonCount) * -1 * (buttonTransitionTime / 2));
  }
};
menuToggle.addEventListener('mouseover', openMenu);
menu.addEventListener('mouseleave', closeMenu);

/***/ })

/******/ });
//# sourceMappingURL=main.js.map