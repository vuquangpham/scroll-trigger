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
 * */
export function init(context){
}