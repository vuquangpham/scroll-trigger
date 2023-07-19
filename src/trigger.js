import {clamp} from "./utils";

/**
 * Checking trigger point
 * @param instance {object}
 * @return boolean
 * */
export function handlePositionUpdate(instance){
    let previousProgress = 0;

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
        doCallbacks(instance, previousProgress, progress);

        // update previousProgress value
        previousProgress = progress;

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
 * @param previousProgress {number}
 * @param progress {number}
 * @return void
 * */
const doCallbacks = (instance, previousProgress, progress) => {
    const validateProgress = clamp(progress, 0, 1);
    const validateLastProgress = clamp(previousProgress, 0, 1);

    const returnObject = {
        trigger: instance.trigger,
        progress: validateProgress,
        destroy: instance.destroy
    };

    // onEnter
    const hasEnterTheViewport = (previousProgress <= 0 && progress > 0) || (previousProgress > 1 && progress <= 1);
    if(typeof instance.onEnter === 'function' && hasEnterTheViewport){
        instance.onEnter({...returnObject, isEnterBack: previousProgress > 1 && progress <= 1});
    }

    // onUpdate
    if(typeof instance.onUpdate === 'function' && validateProgress !== validateLastProgress){
        instance.onUpdate(returnObject);
    }

    // on Leave
    const hasLeaveTheViewport = (previousProgress <= 1 && progress > 1) || (previousProgress > 0 && progress <= 0);
    if(typeof instance.onLeave === 'function' && hasLeaveTheViewport){
        instance.onLeave({...returnObject, isLeaveBack: previousProgress >= 0 && progress < 0});
    }
};