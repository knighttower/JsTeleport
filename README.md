
# Teleport JavaScript Library Documentation


## Github

[GitHub Repository](https://github.com/knighttower)

## Description

The Teleport class enables you to move a DOM element to another location in the DOM tree, either before, inside, or after a target element. The class provides various methods for this functionality and also supports adaptive IDs for elements.  
For working examples checkout the "examples" folder in [https://github.com/knighttower/adaptive.js](https://github.com/knighttower/adaptive.js)  

**---> Note: this library also offers direct integration with VUE and REACT via Adaptive.js [https://github.com/knighttower/adaptive.js](https://github.com/knighttower/adaptive.js) as "directive" or "component", you're welcome! ;)**  

```javascript
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
```

---

## Installation

Import the required modules:

```javascript
npm install @knighttower/js-teleport
```
```javascript
yarn add @knighttower/js-teleport
```  

To use directly in the DOM via script tag  
``https://cdn.jsdelivr.net/npm/@knighttower/js-teleport@latest/dist/JsTeleport.min.js``  


---

## Usage

### Importing as a module

```javascript
import Teleport from '@knighttower/js-teleport';
```

### Initialization

You can initialize a new Teleport object in multiple ways:

#### Using a DOM element:

```javascript
new Teleport(domElement).beam({to: selector});
// * @example new Teleport(domElement).beam({after: selector})
//  * @example new Teleport(domElement).beam({before: selector})
//  * @example new Teleport(domElement).beam(selector) // defaults to "to" which is inside the selector
// * @example const eleTeleport = new Teleport(domElement) // returns the object with eleTeleport{beam(String|Object), back(), cancel()}
//  *
```

#### Using an object:

```javascript
new Teleport({domElement: 'element', adaptiveId: 'uniqueId'}).beam({to: 'selector'});
```  

#### Enabling Globally in the window:  
This will automatically lookup for all elements that have the attribute "data-teleport"

```javascript
// in you js file
// * @example Make it global so that is available in the browser and works as a 'window' library
new Teleport().global();

// ---> then in html markup
//  *      - <div data-teleport="selector"></div>
//  *      - <div data-teleport="{before: 'selector'}"></div>
//  *     - <div data-teleport="{after: 'selector'}"></div>

```

#### loading via script tag:

```javascript
// in you js file
// Teleport is already global and is available in the browser and works as a 'window' library
const sendMyElement = new Teleport(...object|string).beam(...params);
```
---
<br/>

### Methods

#### `beam($directive)`

Beams the element to another place in the DOM.

- **Parameters:**
  - `$directive`: String or Object. Specifies where to move the element. Defaults to "to" (inside the target) if not specified.
  
- **Examples:**

  ```javascript
  new Teleport(domElement).beam({after: selector});
  domElement.beam({after: selector});
  ```  
  ```javascript
  /**
     * Beam the element to another place in the DOM
     * This method will look for the "tagert" element if it is in the DOM and it will querying the DOM until it finds it
     * if the target is not found call the cancel() method to stop the observer
     * @param {String|Object} target (selector) directive defaults to "to" || {to|after|before: target}
     * @example new Teleport(domElement).beam({after: selector})
     * @example domElement.beam({after: selector})
     */
    ```  


#### `back()`

Moves the element back to its original place.

- **Examples:**

  ```javascript
  new Teleport(domElement).back();
  domElement.back();
  ```

#### `cancel()`

Cancels the observer if the target element is not found in the DOM.

- **Examples:**

  ```javascript
  new Teleport(domElement).cancel();
  domElement.cancel();
  ```

#### `global()`

Makes the Teleport object global. This will enable Teleport functionality for elements with a `data-teleport` attribute.

- **Example:**

  ```javascript
  new Teleport().global();
  ```

### Features

- If the target element is not in the DOM, the Teleport class will keep looking for it until it's found.

---

For other cool libraries checkout [knighttower.io](https://knighttower.io)
