import {validateAndConvertObservePositionToPixel} from "./position";
import {createMarkers} from "./markers";

/**
 * Handle resize event
 * */
let previousWidth = innerWidth;

export function handleResizeEvent(){
    if(previousWidth === innerWidth) return;

    // update the previous width
    previousWidth = innerWidth;

    // update instance position
    this.instances.forEach(instance => {
        // recalculate observe position
        validateAndConvertObservePositionToPixel(instance);

        if(instance.markers){
            // remove DOM Element
            instance.markerElements.forEach(el => el.remove());

            // create the new markers
            createMarkers(instance);
        }
    });
}