import {createDOMElement} from "./utils";

/***
 * Create markers for debug
 * @param instance
 * @return void
 */
export function createMarkers(instance){
    if(!instance.markers) return;

    // create debug panel
    createDebug({
        start: instance.startPositionObject.viewport,
        end: instance.endPositionObject.viewport,
    }, {
        start: instance.startPositionObject.trigger,
        end: instance.endPositionObject.trigger,
        element: instance.trigger
    });
}


/**
 * Create debug panel
 * Params in pixel unit
 * @param viewportPosition
 * @param triggerPosition
 * */
function createDebug(viewportPosition, triggerPosition){
    [viewportPosition, triggerPosition].forEach(position => {
        const hasFixedPosition = !position.element;

        // create element
        const debugPanel = createDOMElement({
            type: 'div',
            style: {
                position: hasFixedPosition ? 'fixed' : 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none'
            }
        });

        // common style
        const commonStyle = {
            position: 'absolute',
            right: 0,
            width: '100px',
            height: '3px',
            fontSize: '14px'
        };
        // start position.js
        const startPosition = createDOMElement({
            type: 'div',
            style: {
                top: position.start + 'px',
                background: 'green',
                color: 'green',
                ...commonStyle
            }
        });
        startPosition.innerHTML = `<span>${hasFixedPosition ? 'scroller-start' : 'start'}</span>`;

        // end position.js
        const endPosition = createDOMElement({
            type: 'div',
            style: {
                top: position.end + 'px',
                right: 0,
                background: 'red',
                color: 'red',
                transform: `translateY(${position.end === 0 ? 0 : '-100%'})`,
                ...commonStyle
            }
        });
        endPosition.innerHTML = `<span style="transform:translateY(${position.end === 0 ? 0 : '-100%'}); display:block;">${hasFixedPosition ? 'scroller-end' : 'end'}</span>`;

        // append DOM element
        debugPanel.appendChild(startPosition);
        debugPanel.appendChild(endPosition);

        const wrapper = hasFixedPosition ? document.body : position.element;
        if(getComputedStyle(wrapper).position === 'static'){
            wrapper.style.position = 'relative';
        }
        wrapper.appendChild(debugPanel);
    });
}