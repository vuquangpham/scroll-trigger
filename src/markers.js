import {createDOMElement} from "./utils";

/***
 * Create markers for debug
 * Params in pixel unit
 * @param viewportPosition
 * @param triggerPosition
 */
export function createDebug(viewportPosition, triggerPosition){
    [viewportPosition, triggerPosition].forEach(position => {
        const hasFixedPosition = !position.element;

        // create element
        const debugPanel = createDOMElement({
            type: 'div',
            style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        });

        // common style
        const commonStyle = {
            position: hasFixedPosition ? 'fixed' : 'absolute',
            right: 0,
            width: '100px',
            height: '3px',
            fontSize: '14px'
        };

        // start position
        const startPosition = createDOMElement({
            type: 'div',
            style: {
                top: hasFixedPosition ? position.start : 0,
                background: 'green',
                color: 'green',
                ...commonStyle
            }
        });
        startPosition.innerHTML = `<span>${hasFixedPosition ? 'scroller-start' : 'start'}</span>`;

        // end position
        const endPosition = createDOMElement({
            type: 'div',
            style: {
                top: hasFixedPosition ? position.end + 'px' : '100%',
                right: 0,
                background: 'red',
                color: 'red',
                transform: 'translateY(-100%)',
                ...commonStyle
            }
        });
        endPosition.innerHTML = `<span style="transform:translateY(-100%); display:block;">${hasFixedPosition ? 'scroller-end' : 'end'}</span>`;

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