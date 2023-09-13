/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@knighttower/element-helper/src/ElementHelper.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@knighttower/element-helper/src/ElementHelper.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ElementHelper: () => (/* binding */ ElementHelper),
/* harmony export */   "default": () => (/* binding */ ElementHelper)
/* harmony export */ });
/* harmony import */ var _knighttower_js_dom_observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @knighttower/js-dom-observer */ "./node_modules/@knighttower/js-dom-observer/dist/DomObserver.js");
/* harmony import */ var _knighttower_js_dom_observer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_knighttower_js_dom_observer__WEBPACK_IMPORTED_MODULE_0__);
// Author Knighttower
// MIT License
// Copyright (c) [2022] [Knighttower] https://github.com/knighttower



/**
 * @class Adds some extra functionality to interact with a DOM element
 * @param {String|Object} selector Class or ID or DOM element
 * @param {String} scope The scope to search in, window, document, dom element. Defaults to document
 * @return {Object}
 * @example new ElementHelper('elementSelector')
 * @example new ElementHelper('elementSelector', domElement|window|document)
 *
 */
class ElementHelper {
    /**
     * Constructor
     * @param {String|Object} selector
     * @return {Object}
     */
    constructor(selector, scope = document) {
        this.selector = selector;
        if (typeof selector === 'object') {
            this.domElement = selector;
        } else if (String(selector).includes('//')) {
            this.domElement = this.getElementByXpath(selector);
        } else {
            this.domElement = scope.querySelector(selector);
        }
    }

    // =========================================
    // --> Public
    // --------------------------

    /**
     * Check if the element exists or is visible. It will keep querying
     * @return {Boolean}
     */
    isInDom() {
        return Boolean(this.domElement?.outerHTML);
    }

    /**
     * Wait for element exists or is visible. It will keep querying
     * @function whenInDom
     * @return {Promise}
     */
    whenInDom() {
        let $this = this;
        let callbackId = Date.now() + Math.floor(Math.random() * 1000);

        return new Promise(function(resolveThis) {
            if (!$this.isInDom()) {
                _knighttower_js_dom_observer__WEBPACK_IMPORTED_MODULE_0___default().addOnNodeChange(callbackId, () => {
                    let element = new ElementHelper($this.selector);
                    if (element.isInDom()) {
                        $this = element;
                        resolveThis($this);
                        _knighttower_js_dom_observer__WEBPACK_IMPORTED_MODULE_0___default().removeOnNodeChange(callbackId);
                    }
                });
            } else {
                resolveThis($this);
            }
        });
    }

    /**
     * Find element by Xpath string
     * @param {String} xpath
     * @example getElementByXpath("//html[1]/body[1]/div[1]")
     * @return {Object} DOM element
     */
    getElementByXpath(xpath) {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    /**
     * Get the element xpath string
     * @author Based on https://stackoverflow.com/questions/2631820/how-do-i-ensure-saved-click-coordinates-can-be-reload-to-the-same-place-even-if/2631931#2631931
     * @return {String}
     */
    getXpathTo() {
        let element = this.domElement;

        if (element.id) {
            return "//*[@id='" + element.id + "']";
        }
        if (element === document.body) {
            return '//' + element.tagName;
        }

        let ix = 0;
        let siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            let sibling = siblings[i];
            if (sibling === element) {
                return (
                    new ElementHelper(element.parentNode).getXpathTo() + '/' + element.tagName + '[' + (ix + 1) + ']'
                );
            }
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                ix++;
            }
        }
    }

    /**
     * Get the element attribute, but parse it if it is an object or array
     * @param {String} attr Atrribute name
     * @return {String|Array|Object|Null}
     */
    getAttribute(attr) {
        return this.domElement.getAttribute(attr) || null;
    }

    /**
     * Create a unique has for the element derived from its xpath
     * @author Based on https://www.geeksforgeeks.org/how-to-create-hash-from-string-in-javascript/
     * @return {String}
     */
    getHash() {
        let string = String(this.getXpathTo());
        let hash = 0;

        if (string.length === 0) {
            return hash;
        }

        for (let i = 0; i < string.length; i++) {
            let char = string.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
        }

        return hash;
    }
}

/**
 * Future
 * @private
 * @todo enhance to extend the prototype like https://stackoverflow.com/questions/779880/in-javascript-can-you-extend-the-dom
 */




/***/ }),

/***/ "./node_modules/@knighttower/js-dom-observer/dist/DomObserver.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@knighttower/js-dom-observer/dist/DomObserver.js ***!
  \***********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Author Knighttower
// MIT License
// [2022] [Knighttower] https://github.com/knighttower
(function (factory) {
    if ( true && typeof module.exports === "object") {
        var v = factory(__webpack_require__("./node_modules/@knighttower/js-dom-observer/dist sync recursive"), exports);
        if (v !== undefined) module.exports = v;
    }
    else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DomObserver = exports.cleanup = exports.removeOnNodeChange = exports.addOnNodeChange = exports.executeOnNodeChanged = void 0;
    /**
     * @module DomObserver
     * Detect DOM changes
     * @name DomObserver
     * @param {window} selector
     * @param {Function}
     * @return DomObserver
     * @example DomObserver.addOnNodeChange('elementIdentifier', () => { console.log('Node changed') })
     * @example DomObserver.removeOnNodeChange('elementIdentifier')
     */
    /**
     * Holds memory of registered functions
     * @private
     */
    const executeOnNodeChanged = {};
    exports.executeOnNodeChanged = executeOnNodeChanged;
    /**
     * When node change
     * @param {String} id
     * @param {Function} callback Callback when any node changes/ add/deleted/modified
     * @return {Void}
     */
    const addOnNodeChange = (id, callback) => {
        if (callback) {
            executeOnNodeChanged[id] = callback;
        }
    };
    exports.addOnNodeChange = addOnNodeChange;
    /**
     * Remove from node change
     * @param {String} id
     * @return {Void}
     */
    const removeOnNodeChange = (id) => {
        if (id) {
            delete executeOnNodeChanged[id];
        }
    };
    exports.removeOnNodeChange = removeOnNodeChange;
    /**
     * Deep cleanup
     * @return {Void}
     */
    const cleanup = () => {
        Object.keys(executeOnNodeChanged).forEach((key) => delete executeOnNodeChanged[key]);
    };
    exports.cleanup = cleanup;
    /**
     * Observer
     * @private
     * @return {MutationObserver}
     */
    (() => {
        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList') {
                    for (const id in executeOnNodeChanged) {
                        executeOnNodeChanged[id]();
                    }
                }
            }
        };
        const config = {
            childList: true,
            subtree: true,
        };
        const observer = new MutationObserver(callback);
        observer.observe(document.body, config);
    })();
    const DomObserver = {
        executeOnNodeChanged,
        addOnNodeChange,
        removeOnNodeChange,
        cleanup,
    };
    exports.DomObserver = DomObserver;
    exports.default = DomObserver;
});


/***/ }),

/***/ "./node_modules/@knighttower/js-dom-observer/dist sync recursive":
/*!**************************************************************!*\
  !*** ./node_modules/@knighttower/js-dom-observer/dist/ sync ***!
  \**************************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/@knighttower/js-dom-observer/dist sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "./node_modules/@knighttower/js-power-helper-functions/src/JsPowerHelperFunctions.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@knighttower/js-power-helper-functions/src/JsPowerHelperFunctions.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addQuotes: () => (/* binding */ addQuotes),
/* harmony export */   cleanStr: () => (/* binding */ cleanStr),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fixQuotes: () => (/* binding */ fixQuotes),
/* harmony export */   getDirectivesFromString: () => (/* binding */ getDirectivesFromString),
/* harmony export */   getMatchBlock: () => (/* binding */ getMatchBlock),
/* harmony export */   getMatchInBetween: () => (/* binding */ getMatchInBetween),
/* harmony export */   removeQuotes: () => (/* binding */ removeQuotes),
/* harmony export */   setExpString: () => (/* binding */ setExpString),
/* harmony export */   setLookUpExp: () => (/* binding */ setLookUpExp)
/* harmony export */ });
// Author Knighttower
// MIT License
// Copyright (c) [2022] [Knighttower] https://github.com/knighttower

/**
 * handles the following patterns to get an object from string attributes
 * // Matches the JSON objects as string: {'directive':{key:value}} OR {key:value}
 * // Matches the Array as string: [value, value] OR ['value','value']
 * // Matches a multi-array string like [[value,value]],value]
 * // Matches object-style strings: directive.tablet(...values) OR directive[expression](...values)
 * // Matches string ID or class: literals Id(#) or class (.). Note that in Vue it needs to be in quotes attr="'#theId'"
 * // Mathes simple directive function style: directive(#idOr.Class)
 * Note: all the above with the exception of the Id/class will be converted into actual objects
 */
/**
 * Converts strings formats into objects
 * @function getDirectivesFromString
 * @param {String|Array|Object} settings
 * @return {Object|void|null}
 * @example getDirectivesFromString('directive.tablet(...values)') // {directive: {tablet: 'values'}}
 * @example getDirectivesFromString('[[value,value]],value]') // {directive: 'values', directive2: 'values'}
 * @example getDirectivesFromString('directive.tablet|mobile(...values)') // {directive: {tablet: 'values', mobile: 'values'}}
 * @example getDirectivesFromString('directive.tablet(...values)') // {directive: {tablet: 'values'}}
 */
const getDirectivesFromString = function(settings) {
    if (!settings) {
        return null;
    }
    let values, breakDownId, directive, properties;
    const type = typeof settings;
    // Matches the JSON objects as string: {'directive':{key:value}} OR {key:value}
    const regexObjectLike = /^\{((.|\n)*?)\:((.|\n)*?)\}/gm;

    // Matches the Array as string: [value, value] OR ['value','value']
    const regexArrayLike = /^\[((.|\n)*?)\]$/gm;
    // Matches a multi-array string like [[value,value]],value]
    const regexMultiArrayString = /\[(\n|)(((.|\[)*)?)\](\,\n|)(((.|\])*)?)(\n|)\]/gm;
    // Matches object-style strings: directive.tablet(...values) OR directive[expression](...values) 
    // OR directive.breakdown|breakdown2(...values) OR directive.tablet(...values)&&directive.mobile(...values)
    const regexDotObjectString = /([a-zA-Z]+)\.(.*?)\(((.|\n)*?)\)/gm;
    const regexExObjectString = /([a-zA-Z]+)\[((.|\n)*?)\]\(((.|\n)*?)\)/gm;
    // Matches string ID or class: literals #... or ....
    const regexIdOrClass = /^(\.|\#)([a-zA-Z]+)/g;
    // Mathes simple directive function style: directive(#idOr.Class)
    const regexFunctionString = /^([a-zA-Z]+)(\()(\.|\#)(.*)(\))/g;

    if (type === 'object' || type === 'array') {
        return settings;
    }
    // Else if String

    if (settings.match(regexIdOrClass)) {
        return settings;
    }

    if (settings.match(regexFunctionString)) {
        directive = settings.split('(')[0].trim();
        values = getMatchInBetween(settings, '(', ')');
        settings = {};
        settings[directive] = values;
        return settings;
    }

    if (settings.match(regexArrayLike)) {
        let start = /^\[/;
        let end = /\]$/;
        let keyProps = getMatchInBetween(settings, start, end);
        keyProps = keyProps.split(',');

        // test if multi-array
        if (settings.match(regexMultiArrayString)) {
            keyProps = getMultiArray(settings);
        }

        keyProps.forEach((str) => {
            let cleanStr = addQuotes(removeQuotes(str));
            settings = settings.replace(str, cleanStr);
        });
        return JSON.parse(fixQuotes(settings));
    }

    if (settings.match(regexObjectLike)) {
        let keyProps = getMatchInBetween(settings, '{', ':', true);
        keyProps = keyProps.concat(getMatchInBetween(settings, ',', ':', true));

        keyProps.forEach((str) => {
            let cleanStr = addQuotes(removeQuotes(str));
            settings = settings.replace(str, cleanStr);
        });
        return JSON.parse(fixQuotes(settings));
    }

    if (settings.match(regexDotObjectString) || settings.match(regexExObjectString)) {
        let setObject = {};

        settings = settings.split('&&');

        settings.forEach((command) => {
            command = command.trim();

            if (command.match(regexExObjectString)) {
                values = getMatchInBetween(command, '](', ')');
                breakDownId = getMatchInBetween(command, '[', ']');
                directive = command.split('[')[0].trim();
            } else {
                values = getMatchInBetween(command, '(', ')');
                command = command.replace(getMatchBlock(command, '(', ')'), '');
                properties = command.split('.');
                directive = properties[0];
                breakDownId = properties[1];
                properties[2] = properties[2] ?? null;
            }

            values = values
                .split(',')
                .map((cl) => cl.trim())
                .join(' ');

            if (!setObject[directive]) {
                setObject[directive] = {};
            }

            if (properties && properties[2]) {
                setObject[directive][breakDownId] = {};
                setObject[directive][breakDownId][properties[2]] = values;
            } else {
                setObject[directive][breakDownId] = values;
            }
        });

        return setObject;
    }
};

/**
 * Build the multi-array from a string like
 * @private
 * @param {String} str - find The target (needle)
 * @return {Array}
 */
function getMultiArray(str) {
    let arrays = {};
    let innerArrayRegex = /(\[([^[]*?))\]/gm;
    let start = /^\[/;
    let end = /\]$/;
    str = getMatchInBetween(str, start, end);
    let innerArrays = str.match(innerArrayRegex);

    if (innerArrays) {
        let i = 1;
        while (str.match(innerArrayRegex)) {
            str.match(innerArrayRegex).forEach((record, index) => {
                let $index = `@${i}@${index}`;
                arrays[$index] = record;
                str = str.replace(record, $index);
            });

            i++;
        }
    }

    str = str.split(',');

    const total = (Object.keys(arrays).length ?? 1) * str.length;
    let loops = 0;
    while (Object.keys(arrays).length > 0) {
        let keys = Object.keys(arrays);
        let tmpStr = str;
        Object.keys(arrays).forEach((key) => {
            let strArray = getMatchInBetween(arrays[key], start, end).split(',');
            let replaced = findAndReplaceInArray(str, key, strArray);

            if (replaced) {
                str = replaced;
                delete arrays[key];
            }
        });

        if (loops > total) {
            throw new Error('Too many loops, the string passed is malformed' + str);
        }
        loops++;
    }

    return str;
}

/**
 * Recursively will loop in array to find the desired target
 * @function findAndReplaceInArray
 * @param {Array} arr
 * @param {String} find The target (needle)
 * @param {Array|Object|String} value Replacer
 * @return {Null|Array}
 * @example findAndReplaceInArray([1,2,3,4,5], 3, 'three') // [1,2,'three',4,5]
 */
function findAndReplaceInArray(arr, find, value) {
    let results = null;
    let tmpArray = arr;

    arr.forEach((prop, index) => {
        if (Array.isArray(prop)) {
            let replaced = findAndReplaceInArray(prop, find, value);
            if (replaced) {
                tmpArray[index] = replaced;
                results = tmpArray;
            }
        }
        if (prop === find) {
            if (Array.isArray(value)) {
                value = value.map((p) => {
                    if (!Array.isArray(p)) {
                        return p.trim();
                    }
                    return p;
                });
            }
            tmpArray[index] = value;
            results = tmpArray;
        }
    });

    return results;
}

/**
 * find a match in between two delimeters, either string or regex given, returns clean matches
 * @function getMatchBlock
 * @param {String} str
 * @param {String|Regex} p1
 * @param {String|Regex} p2
 * @param {Boolean} all If it should return all matches or single one (default)
 * @return {String|Array|Null}
 * @example getMatchInBetween('hello world', 'h', 'd') // 'ello worl'
 * @example getMatchInBetween('hello <world/>', '<', '/>', true) // ['world']
 * @example getMatchInBetween('hello <world/>', '<', '/>') // 'world'
 */
function getMatchInBetween(str, p1, p2, all = false) {
    if (all) {
        let matches = [];
        let group = getMatchBlock(str, p1, p2, all) ?? [];

        group.forEach((match) => {
            matches.push(cleanStr(match, p1, p2));
        });
        return matches;
    } else {
        str = getMatchBlock(str, p1, p2) ?? str;
        return cleanStr(str, p1, p2);
    }
}

/**
 * Find math by delimeters returns raw matches
 * @function getMatchBlock
 * @param {String} str
 * @param {String|Regex} p1
 * @param {String|Regex} p2
 * @param {Boolean} all If it should return all matches or single one (default)
 * @return {String|Array|Null}
 * @example getMatchBlock('is a hello world today', 'h', 'd') // 'hello world'
 * @example getMatchBlock('is a hello world today', 'h', 'd', true) // ['hello world']
 * @example getMatchBlock('is a <hello world/> today', '<', '/>') // '<hello world/>'
 */
function getMatchBlock(str, p1, p2, all = false) {
    p1 = setExpString(p1);
    p2 = setExpString(p2);
    let regex = new RegExp(setLookUpExp(p1, p2), 'gm');
    const matches = str.match(regex);
    if (matches) {
        return all ? matches : matches[0];
    }
    return null;
}

/**
 * Clean a string from delimeters or just trimmed if no delimeters given
 * @funtion cleanStr
 * @param {String} str - String to use
 * @param {String|Regex} p1 - Delimeter 1
 * @param {String|Regex} p2 - Delimeter 2
 * @return {String}
 * @example cleanStr('hello world', 'h', 'd') // 'ello worl'
 * @example cleanStr('  hello world  ') // 'hello world'
 * @example cleanStr('hello world', 'hello') // 'world'
 * @example cleanStr('Hello World. Sunshine is here!', '\..*!') // Hello World
 * @example cleanStr('Hello World. Sunshine is here!', /Hello/g) // ' World. Sunshine is here!'
 * @example cleanStr('Hello World. Sunshine is here!', /Hello/g, /Sunshine/g) // ' World.  is here!'
 */
function cleanStr(str, p1, p2) {
    return str
        .replace(new RegExp(setExpString(p1)), '')
        .replace(new RegExp(setExpString(p2)), '')
        .trim();
}

/**
 * Scapes a string to create a regex or returns the regex if it already is an expression
 * @function setExpString
 * @param {String|Regex} exp
 * @return {String|Regex}
 * @example setExpString('hello') // '\h\e\l\l\o'
 * @example setExpString(/hello/) // /hello/
 * @example setExpString([hello]) // \\[hello\\/ then use like new new RegExp(setExpString(StringOrRegex))
 */
function setExpString(exp) {
    if (exp instanceof RegExp) {
        return exp;
    } else {
        return exp.split('').map(char => ['$', '^', '.', '*', '+', '?', '(', ')', '[', ']', '{', '}', '|', '\\'].includes(char) ? `\\${char}` : char).join('');
    }
}

/**
 * Regex builder to get a match in between two delimeters
 * @function setLookUpExp
 * @param {String|Regex} p1 - Delimeter 1
 * @param {String|Regex} p2 - Delimeter 2
 * @return {String} - Regex
 * @example setLookUpExp('h', 'd') // 'h((.|\n)*?)d'
 * @usage:
 * const pattern = setLookUpExp(".", "!");
const regex = new RegExp(pattern, 'g');
const text = "Hello World. Sunshine is here! Have fun!";
const matches = text.match(regex);
console.log(matches);  // Output: [". Sunshine is here!"]
 */
function setLookUpExp(p1, p2) {
    let p1IsRegex = p1 instanceof RegExp;
    let p2IsRegex = p2 instanceof RegExp;
    if (p1IsRegex || p2IsRegex) {
        if (p1IsRegex) {
            p1 = p1.source;
        }
        if (p2IsRegex) {
            p2 = p2.source;
        }
    }

    return `${p1}((.|\n)*?)${p2}`;
}

/**
 * Remove quotes from a string
 * @function removeQuotes
 * @param {String} str
 * @return {String}
 * @example removeQuotes('"hello"') // hello
 * @example removeQuotes("'hello'") // hello
 */
function removeQuotes(str) {
    return str.replace(/'|"/g, '');
}

/**
 * Fix quotes from a string
 * @function fixQuotes
 * @param {String} str
 * @return {String}
 * @example fixQuotes("'hello'") // "hello"
 * @example fixQuotes('"hello"') // "hello"
 */
function fixQuotes(str) {
    return str.replace(/'/g, '"');
}

/**
 * Add quotes to a string
 * @function addQuotes
 * @param {String} str
 * @return {String}
 * @example addQuotes('hello') // "hello"
 */
function addQuotes(str) {
    return `"${str}"`;
}
const powerHelper = {
    getDirectivesFromString,
    getMatchInBetween,
    getMatchBlock,
    cleanStr,
    setExpString,
    setLookUpExp,
    removeQuotes,
    fixQuotes,
    addQuotes,
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (powerHelper);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************!*\
  !*** ./src/JsTeleport.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Teleport: () => (/* binding */ Teleport),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _knighttower_element_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @knighttower/element-helper */ "./node_modules/@knighttower/element-helper/src/ElementHelper.js");
/* harmony import */ var _knighttower_js_dom_observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @knighttower/js-dom-observer */ "./node_modules/@knighttower/js-dom-observer/dist/DomObserver.js");
/* harmony import */ var _knighttower_js_dom_observer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_knighttower_js_dom_observer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _knighttower_js_power_helper_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @knighttower/js-power-helper-functions */ "./node_modules/@knighttower/js-power-helper-functions/src/JsPowerHelperFunctions.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// author Knighttower
//  MIT License
//  Copyright (c) [2022] [Knighttower] https://github.com/knighttower




/**
 * @module Teleport
 * Teleport an element to another place in the DOM before, inside or after a target
 * @param {Object|String} props || selector - props object (domElement: element, adaptiveId: null|uniqueId})
 * @example new Teleport({domElement: element, adaptiveId: uniqueId}).beam({to: selector})
 * @example new Teleport(domElement).beam({after: selector})
 * @example new Teleport(domElement).beam({before: selector})
 * @example new Teleport(domElement).beam(selector) // defaults to "to" which is inside the selector
 * @example const eleTeleport = new Teleport(domElement) // returns the object with eleTeleport{beam(String|Object), back(), cancel()}
 * @example Make it global so that is available in the browser and works as a 'window' library
 *      - new Teleport().global()
 *      - <div data-teleport="selector"></div>
 *      - <div data-teleport="{before: 'selector'}"></div>
 *     - <div data-teleport="{after: 'selector'}"></div>
 * @feature If the target (element where it will be sent to) is not in the DOM it will wait until it is and then it will beam the element
 * @return {Object} Teleport object
 */
var Teleport = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {String|Object} selector || props object (see AdaptiveElement)
   * @return {Object}
   */
  function Teleport(props) {
    _classCallCheck(this, Teleport);
    if (props) {
      if (!props.adaptiveId) {
        var element = new _knighttower_element_helper__WEBPACK_IMPORTED_MODULE_0__.ElementHelper(props);
        var uniqueId = null;
        if (!element.getAttribute('data-adaptive-id')) {
          uniqueId = element.getHash();
          element.domElement.setAttribute('data-adaptive-id', uniqueId);
        } else {
          uniqueId = element.getAttribute('data-adaptive-id');
        }
        props = {
          adaptiveId: uniqueId,
          helper: element,
          domElement: element.domElement,
          xpath: element.getXpathTo()
        };
      }
      this.props = props;
      var placeholder = new _knighttower_element_helper__WEBPACK_IMPORTED_MODULE_0__.ElementHelper("[name=\"adaptive\"][value=\"".concat(this.props.adaptiveId, "\""));
      if (!placeholder.isInDom()) {
        // @ts-ignore
        placeholder = document.createElement('param');
        placeholder.name = 'adaptive';
        placeholder.value = this.props.adaptiveId;
        this.props.domElement.insertAdjacentElement('beforebegin', placeholder);
      }
    }
  }

  /**
   * Beam the element to another place in the DOM
   * This method will look for the "tagert" element if it is in the DOM and it will querying the DOM until it finds it
   * if the target is not found call the cancel() method to stop the observer
   * @param {String|Object} target (selector) directive defaults to "to" || {to|after|before: target}
   * @example new Teleport(domElement).beam({after: selector})
   * @example domElement.beam({after: selector})
   */
  _createClass(Teleport, [{
    key: "beam",
    value: function beam($directive) {
      $directive = (0,_knighttower_js_power_helper_functions__WEBPACK_IMPORTED_MODULE_2__.getDirectivesFromString)($directive);
      // Defaults to "to" target if only the selector is passed
      if (typeof $directive === 'string') {
        $directive = {
          to: $directive
        };
      } else if (Array.isArray($directive)) {
        if ($directive.length > 1) {
          $directive = _defineProperty({}, $directive[0], $directive[1]);
        } else {
          $directive = {
            to: $directive[0]
          };
        }
      }
      var direction = Object.keys($directive)[0];
      var selector = $directive[direction];
      var target = new _knighttower_element_helper__WEBPACK_IMPORTED_MODULE_0__.ElementHelper(selector);
      var position = 'beforeend';
      switch (direction) {
        case 'to':
          // default
          break;
        case 'before':
          position = 'beforebegin';
          break;
        case 'after':
          position = 'afterend';
          break;
      }
      if (target.isInDom()) {
        target.domElement.insertAdjacentElement(position, this.props.domElement);
      } else {
        // This will create a loop up until the Element/Node is found
        var self = this;
        _knighttower_js_dom_observer__WEBPACK_IMPORTED_MODULE_1___default().addOnNodeChange(this.props.adaptiveId, function () {
          var target = new _knighttower_element_helper__WEBPACK_IMPORTED_MODULE_0__.ElementHelper(selector);
          if (target.isInDom()) {
            target.domElement.insertAdjacentElement(position, self.props.domElement);
            _knighttower_js_dom_observer__WEBPACK_IMPORTED_MODULE_1___default().removeOnNodeChange(self.props.adaptiveId);
          }
        });
      }
    }

    /**
     * Return to its original place
     * @example new Teleport(domElement).back()
     * @example domElement.back()
     */
  }, {
    key: "back",
    value: function back() {
      var target = new _knighttower_element_helper__WEBPACK_IMPORTED_MODULE_0__.ElementHelper("[name=\"adaptive\"][value=\"".concat(this.props.adaptiveId, "\""));
      if (target.isInDom()) {
        target.domElement.insertAdjacentElement('afterend', this.props.domElement);
        // target.domElement.remove();
      }
    }

    /**
     * If element target is no it the DOM and needs to cancel the observer
     * @example new Teleport(domElement).cancel()
     * @example domElement.cancel()
     */
  }, {
    key: "cancel",
    value: function cancel() {
      _knighttower_js_dom_observer__WEBPACK_IMPORTED_MODULE_1___default().removeOnNodeChange(this.props.adaptiveId);
    }

    /**
     * Warning, this will make it global and would work with data attr like data-teleport
     * @example new Teleport().global()
     */
  }, {
    key: "global",
    value: function global() {
      if (!this.props) {
        Array.from(document.querySelectorAll('[data-teleport]')).forEach(function (element) {
          new Teleport(element).beam(element.getAttribute('data-teleport'));
        });
      }
    }
  }]);
  return Teleport;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Teleport);
})();

window.Teleport = __webpack_exports__;
/******/ })()
;