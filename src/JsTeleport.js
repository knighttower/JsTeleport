// author Knighttower
//  MIT License
//  Copyright (c) [2022] [Knighttower] https://github.com/knighttower
import { ElementHelper } from '@knighttower/element-helper';
import DomObserver from '@knighttower/js-dom-observer';
import { getDirectivesFromString as GetSettings } from '@knighttower/js-power-helper-functions';

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
class Teleport {
    /**
     * Constructor
     * @param {String|Object} selector || props object (see AdaptiveElement)
     * @return {Object}
     */
    constructor(props) {
        if (props) {
            if (!props.adaptiveId) {
                let element = new ElementHelper(props);
                let uniqueId = null;
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
                    xpath: element.getXpathTo(),
                };
            }
            this.props = props;

            let placeholder = new ElementHelper(`[name="adaptive"][value="${this.props.adaptiveId}"`);
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
    beam($directive) {
        $directive = GetSettings($directive);
        // Defaults to "to" target if only the selector is passed
        if (typeof $directive === 'string') {
            $directive = { to: $directive };
        } else if (Array.isArray($directive)) {
            if ($directive.length > 1) {
                $directive = { [$directive[0]]: $directive[1] };
            } else {
                $directive = { to: $directive[0] };
            }
        }

        let direction = Object.keys($directive)[0];
        let selector = $directive[direction];
        let target = new ElementHelper(selector);
        let position = 'beforeend';
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
            let self = this;

            DomObserver.addOnNodeChange(this.props.adaptiveId, () => {
                let target = new ElementHelper(selector);

                if (target.isInDom()) {
                    target.domElement.insertAdjacentElement(position, self.props.domElement);
                    DomObserver.removeOnNodeChange(self.props.adaptiveId);
                }
            });
        }
    }

    /**
     * Return to its original place
     * @example new Teleport(domElement).back()
     * @example domElement.back()
     */
    back() {
        let target = new ElementHelper(`[name="adaptive"][value="${this.props.adaptiveId}"`);
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
    cancel() {
        DomObserver.removeOnNodeChange(this.props.adaptiveId);
    }

    /**
     * Warning, this will make it global and would work with data attr like data-teleport
     * @example new Teleport().global()
     */
    global() {
        if (!this.props) {
            Array.from(document.querySelectorAll('[data-teleport]')).forEach(function(element) {
                new Teleport(element).beam(element.getAttribute('data-teleport'));
            });
        }
    }
}

export { Teleport };
export default Teleport;
