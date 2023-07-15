/**
 * Checking trigger point
 * @param instance {object}
 * @return boolean
 * */
export function handlePositionUpdate(instance){
    const viewportStartPosition = instance.startPositionObject.viewport,
        viewportEndPosition = instance.endPositionObject.viewport,
        triggerStartPosition = instance.startPositionObject.trigger,
        triggerEndPosition = instance.endPositionObject.trigger;
    let lastProgress = 0;

    // flag for checking is the condition valid
    let isValid = true;

    const rAF = () => {
        // bounding object of trigger
        const triggerBox = instance.trigger.getBoundingClientRect();

        // get position
        const areaInViewport = viewportStartPosition - (triggerBox.top + triggerStartPosition);
        const availableArea = (triggerEndPosition - triggerStartPosition) - (viewportEndPosition - viewportStartPosition);

        if(availableArea <= 0){
            isValid = false;
            console.warn('Available area of trigger element is shorter than the viewport!');
            return;
        }

        // update the progress value
        // 1: height of trigger element is equal to the height of end-start
        // 2: normal situation
        const progress = availableArea === 0 && areaInViewport === 0 ? 1 : areaInViewport / availableArea;

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
 * Validate progress
 * @param number
 * @return boolean
 * */
const validateProgress = (number) => number >= 0 && number <= 1;


/**
 * Do callbacks
 * @param instance {object}
 * @param lastProgress {number}
 * @param progress {number}
 * @return void
 * */
const doCallbacks = (instance, lastProgress, progress) => {
    const returnObject = {
        trigger: instance.trigger,
        progress: progress,
        destroy: instance.destroy
    };

    // onEnter
    if(typeof instance.onEnter === 'function' && lastProgress < 0 && progress > 0){
        instance.onEnter(returnObject);
    }

    // on Leave
    if(typeof instance.onLeave === 'function' && progress > 1 && validateProgress(lastProgress)){
        instance.onLeave(returnObject);
    }

    // onUpdate
    if(typeof instance.onUpdate === 'function' && validateProgress(progress) && lastProgress !== progress){
        instance.onUpdate(returnObject);
    }
};