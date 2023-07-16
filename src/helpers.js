import {validateAndConvertObservePositionToPixel} from "./position";
import {handlePositionUpdate} from "./trigger";

/**
 * Validate DOM element
 * @param {string || object} target
 * @return {object || boolean}
 * */
export function validateTarget(target){
    // validate target
    let targetErrorMessage = `Target element not found! Please use correct DOM element!`;

    // target is string
    if(typeof target === 'string'){
        target = document.querySelector(target);

        // check if the target element doesn't exist
        targetErrorMessage = `Target string is not valid! Please use correct CSS selector!`;
    }

    // target not found
    if(!target){
        console.error(targetErrorMessage);
        return false;
    }
    return target;
}


/**
 * Init options
 * @param instance {object}
 * @return boolean
 * */
export function init(instance){
    // get pixel value
    const isValidPositionPoint = validateAndConvertObservePositionToPixel(instance);
    if(!isValidPositionPoint) return false;

    // update the position on each frame 👀
    const isValidPositionWhenUpdate = handlePositionUpdate(instance);

    // invalid position => not timeout value
    if(!isValidPositionWhenUpdate) return false;

    return true;
}