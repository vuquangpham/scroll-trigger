import {validateAndConvertObservePositionToPixel} from "./position";
import {createMarkers} from "./markers";

/**
 * Handle resize event
 * */
export function handleResizeEvent(){
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