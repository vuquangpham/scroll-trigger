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
    const commonObject = {
        viewportHeight: innerHeight,
        triggerHeight: instance.trigger.getBoundingClientRect().height
    };

    const startPositionObj = getPixelUnit({
        position: instance.start,
        ...commonObject
    });
    const endPositionObj = getPixelUnit({
        position: instance.end,
        ...commonObject
    });

    if(!startPositionObj || !endPositionObj){
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
 * */
const getNumericValue = (string, height = 0) => {
    // is a number format
    // 300px, 50%, 50%+=100px
    const castToNumericValue = parseFloat(string);
    if(!castToNumericValue) return null;

    // multiple calculation (with += keyword)
    if(string.includes('+=') && string.split('+=').length > 1){
        return string.split('+=').reduce((acc, cur) => {
            if(cur.includes('%')) return acc + getPercentageValue(cur, height);
            return acc + parseFloat(cur);
        }, 0);
    }

    // percentage value
    if(string.includes('%')) return getPercentageValue(string, height);

    // pixel value
    return parseFloat(string);
};

const getPercentageValue = (string, wrapperHeight = window.innerHeight) => parseFloat(string) * 0.01 * wrapperHeight;