import {validateAndConvertObservePositionToPixel} from "./position";

/**
 * Handle resize event
 * */
export function handleResizeEvent(){
    // recalculate observe position
    this.instances.forEach(instance => validateAndConvertObservePositionToPixel(instance));
}