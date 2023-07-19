import {getObservedBreakpoint} from "./responsive";

/***
 * Convert and return position in pixel unit
 * Default is pixel
 * Support: %, pixel
 * */
const AVAILABLE_POSITION = {
    top: 0,
    center: 0.5,
    bottom: 1
};


/**
 * Validate the position
 * @param instance {object}
 * @return boolean
 * */
export function validateAndConvertObservePositionToPixel(instance){
    let startPosition = instance.start, endPosition = instance.end;

    // responsive observed breakpoint
    const responsiveBreakpoint = getObservedBreakpoint(instance.responsive);
    if(responsiveBreakpoint){
        startPosition = responsiveBreakpoint.start;
        endPosition = responsiveBreakpoint.end;
    }

    // if start and end position are function
    if(typeof startPosition === 'function'){
        startPosition = startPosition();
    }
    if(typeof endPosition === 'function'){
        endPosition = endPosition();
    }

    // common
    const commonObject = {
        viewportHeight: innerHeight,
        triggerHeight: instance.trigger.getBoundingClientRect().height
    };

    // start position
    const startPositionObj = getPixelUnit({
        position: startPosition,
        ...commonObject
    });

    // end position
    let endPositionObj = getPixelUnit({
        position: endPosition,
        ...commonObject
    });

    // validate if endPositionObj is a number (with "+=400" syntax only)
    if(typeof endPositionObj === "number"){
        endPositionObj = {
            trigger: startPositionObj.trigger + endPositionObj,
            viewport: startPositionObj.viewport
        };
    }

    if(!startPositionObj || !endPositionObj || typeof startPositionObj === "number"){
        console.error('Please fill in the start and end position or left it empty to get the default value!');
        return false;
    }
    instance.startPositionObject = startPositionObj;
    instance.endPositionObject = endPositionObj;

    return true;
}


/**
 * Get pixel value
 * */
function getPixelUnit(object){
    const {position, viewportHeight, triggerHeight} = object;

    // string
    const separatePositionText = position.split(' ');

    // "+=400px" only, not "50%+=100px"
    if(separatePositionText.length === 1 && position.includes('+=')) return getNumericValue(position, triggerHeight);

    // invalid string
    if(separatePositionText.length === 1 || separatePositionText.length > 2) return null;

    const returnObject = {
        trigger: 0,
        viewport: 0
    };

    // first position belongs to the trigger element
    for(let i = 0; i < separatePositionText.length; i++){
        const positionText = separatePositionText[i];

        let value = 0;
        const height = i === 0 ? triggerHeight : viewportHeight;

        // not exist in available position
        if(!AVAILABLE_POSITION.hasOwnProperty(positionText)){
            // % value, pixel value, dummy text
            value = getNumericValue(positionText, height);
        }else{
            value = AVAILABLE_POSITION[positionText] * height;
        }
        const type = i === 0 ? 'trigger' : 'viewport';
        returnObject[type] = Math.min(value, height);
    }

    return returnObject;
}


/**
 * Get numeric value
 * @param {string} string
 * @param {number} height
 * @return {number | null}
 * */
const getNumericValue = (string, height = 0) => {
    // "+=400px" only, not "50%+=100px"
    if(string.includes('+=') && string.split('+=').length === 2)
        return string.includes('%') ? getPercentageValue(string.slice(2), height) : parseFloat(string.slice(2));

    // is a number format
    // 300px, 50%, 50%+=100px
    if(!parseFloat(string)) return null;

    // multiple calculation (with += keyword)
    if(string.includes('+=') && string.split('+=').length > 1){
        return string.split('+=').reduce((acc, cur) => cur.includes('%') ? acc + getPercentageValue(cur, height) : acc + parseFloat(cur), 0);
    }

    // percentage value
    if(string.includes('%')) return getPercentageValue(string, height);

    // pixel value
    return parseFloat(string);
};


/**
 * Get percentage value
 * @param {string} string
 * @param {number} wrapperHeight
 * @return {number}
 * */
const getPercentageValue = (string, wrapperHeight = window.innerHeight) => parseFloat(string) * 0.01 * wrapperHeight;