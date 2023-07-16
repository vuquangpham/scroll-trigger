/**
 * Debounce
 * @param func
 * @param timeout
 * @returns function
 */
export function debounce(func, timeout = 200){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}


/**
 * Generate unique ID
 * @return string
 * @param prefix
 */
export function uid(prefix = ''){
    return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2);
}


/**
 * Remove accents in UNICODE
 * @param string
 * @return string
 * */
export function removeAccents(string){
    return string.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}


/**
 * Convert string to slug
 * @param string
 * @return string
 * */
export function stringToSlug(string){
    if(!string) return '';
    return string.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
        .toLowerCase();
}


/**
 * Create DOM Element
 * */
export function createDOMElement(options = {
    type: 'div',
    attributes: [{
        key: '',
        value: ''
    }],
    style: {},
    classes: []
}){
    let element = null;

    if(options.namespace){
        element = document.createElementNS(options.namespace, options.type);
    }else{
        element = document.createElement(options.type);
    }

    // assign data attribute
    if(options.attributes){
        options.attributes.forEach(attribute => element.setAttribute(attribute.key, attribute.value));
    }

    // assign classes
    if(options.classes){
        element.classList.add(...options.classes);
    }

    // assign custom style
    Object.assign(element.style, options.style);

    return element;
}


/**
 * Map number from another range to another range
 * @param number
 * @param inMin
 * @param inMax
 * @param outMin
 * @param outMax
 * @return number
 * */
export function mapNumber(number, inMin, inMax, outMin, outMax){
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


/**
 * Clamp
 * @param number
 * @param min
 * @param max
 * @return number
 * */
export function clamp(number, min, max){
    return Math.max(min, Math.min(number, max));
}