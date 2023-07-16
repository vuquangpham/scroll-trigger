import {clamp} from "./utils";

/**
 * Checking trigger point
 * @param instance {object}
 * @return boolean
 * */
export function handlePositionUpdate(instance){
    let lastProgress = 0;

    // flag for checking is the condition valid
    let isValid = true;

    const rAF = () => {
        // progress in viewport
        const progress = getProgressInViewport(instance);

        // invalid progress number
        if(isNaN(progress)){
            isValid = false;
            console.warn('Available area of trigger element is shorter than the viewport!');
            return;
        }

        // do callbacks
        doCallbacks(instance, lastProgress, progress);

        // update lastProgress value
        lastProgress = progress;

        // destroy method
        if(instance.destroy === true) return;

        // update the rAF
        instance.timeout = requestAnimationFrame(rAF);
    };
    rAF();

    return isValid;
}


/**
 * Get progress in viewport
 * @param instance {object}
 * @return number
 * */
const getProgressInViewport = (instance) => {
    const viewportStartPosition = instance.startPositionObject.viewport,
        viewportEndPosition = instance.endPositionObject.viewport,
        triggerStartPosition = instance.startPositionObject.trigger,
        triggerEndPosition = instance.endPositionObject.trigger;

    // bounding object of trigger
    const triggerBox = instance.trigger.getBoundingClientRect();

    // get position
    const areaInViewport = viewportStartPosition - (triggerBox.top + triggerStartPosition);
    const availableArea = (triggerEndPosition - triggerStartPosition) - (viewportEndPosition - viewportStartPosition);

    // invalid area
    if(availableArea < 0) return NaN;

    // update the progress value
    // 1: height of trigger element is equal to the height of end-start
    // 2: normal situation
    return availableArea === 0 && areaInViewport === 0 ? 1 : areaInViewport / availableArea;
};


/**
 * Do callbacks
 * @param instance {object}
 * @param lastProgress {number}
 * @param progress {number}
 * @return void
 * */
const doCallbacks = (instance, lastProgress, progress) => {

    const validateProgress = clamp(progress, 0, 1);
    const validateLastProgress = clamp(lastProgress, 0, 1);

    const returnObject = {
        trigger: instance.trigger,
        progress: validateProgress,
        destroy: instance.destroy
    };

    // onEnter
    if(typeof instance.onEnter === 'function' && lastProgress < 0 && progress > 0){
        instance.onEnter(returnObject);
    }

    // onUpdate
    if(typeof instance.onUpdate === 'function' && validateProgress !== validateLastProgress){
        instance.onUpdate(returnObject);
    }

    // on Leave
    if(typeof instance.onLeave === 'function' && lastProgress <= 1 && progress > 1){
        instance.onLeave(returnObject);
    }
};