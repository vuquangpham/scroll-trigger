import {createDOMElement} from "./utils";

/***
 * Create markers for debug
 * @param instance
 * @return void
 */
export function createMarkers(instance){
    if(!instance.markers) return;

    // viewport
    const scrollerStartMarker = createMarker({
        position: instance.startPositionObject.viewport,
        textContent: 'scroller-start',
        color: 'red',
    });
    const scrollerEndMarker = createMarker({
        position: instance.endPositionObject.viewport,
        textContent: 'scroller-end',
        color: 'green',
    });

    // trigger
    const startMarker = createMarker({
        position: instance.startPositionObject.trigger,
        textContent: 'start',
        color: 'red',
        parentEl: instance.trigger
    });
    const endMarker = createMarker({
        position: instance.endPositionObject.trigger,
        textContent: 'end',
        color: 'green',
        parentEl: instance.trigger
    });

    // save to the instance
    instance.markerElements = [scrollerStartMarker, scrollerEndMarker, startMarker, endMarker];
    document.body.append(...instance.markerElements);
}

const createMarker = (options) => {
    const {position, textContent, color, parentEl} = options;

    // validate position
    const textSize = 14;
    const isOutOfViewport = isPositionOutOfViewport(position + textSize);

    return createDOMElement({
        type: 'div',
        style: {
            position: parentEl ? 'absolute' : 'fixed',
            top: !parentEl ? position + 'px' : parentEl.getBoundingClientRect().top + position + window.scrollY + 'px',
            right: 0,
            fontSize: textSize + 'px',
            lineHeight: 1,
            borderWidth: isOutOfViewport && !parentEl ? '0 0 1px' : '1px 0 0',
            borderStyle: 'solid',
            borderColor: color,
            color: color,
            transform: isOutOfViewport && !parentEl ? 'translateY(-100%)' : '',
        },
        innerHTML: textContent
    });
};


/**
 * Is out of viewport
 * @param {number} position
 * @return {boolean}
 * */
const isPositionOutOfViewport = (position) => position >= innerHeight;