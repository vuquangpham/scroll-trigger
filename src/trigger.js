/**
 * Checking trigger point
 * @param instance {object}
 * @return void
 * */
export function handlePositionUpdate(instance){
    // const start = instance.start, end = instance.end;
    const start = innerHeight * 0.9, end = window.innerHeight * 0.6;

    let lastProgress = 0;

    const rAF = () => {
        // bounding object of trigger
        const triggerBox = instance.trigger.getBoundingClientRect();

        // get position
        const areaInViewPort = start - triggerBox.top;
        const availableArea = triggerBox.height - (end - start);

        if(availableArea <= 0){
            console.warn('Available area of trigger element is shorter than the viewport!');
            return;
        }

        // update the progress value
        // 1: height of trigger element is equal to the height of end-start
        // 2: normal situation
        const progress = availableArea === 0 && areaInViewPort === 0 ? 1 : areaInViewPort / availableArea;

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