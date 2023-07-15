// script
import {validateTarget} from "./helpers";
import {uid} from "./utils";
import {createMarkers} from "./markers";
import {handlePositionUpdate} from "./trigger";
import {validateAndConvertObservePositionToPixel} from "./position";

/**
 * Private class
 * */
class ScrollTrigger{
    constructor(){
        // instances
        this.instances = [];
    }

    create(options){
        const instance = {
            id: uid('st-'),
            trigger: null,

            // position
            start: 'top top',
            end: 'top bottom',

            // timeout for rAF
            timeout: null,

            // debug
            markers: false,

            // callbacks
            onEnter: (self) => {
            },
            onUpdate: (self) => {
            },
            onLeave: (self) => {
            },
            ...options
        };
        instance.trigger = validateTarget(instance.trigger);
        if(!instance.trigger) return;

        // add destroy method
        instance.destroy = this.destroy.bind(this, instance);

        // get pixel value
        const isValidPositionPoint = validateAndConvertObservePositionToPixel(instance);
        if(!isValidPositionPoint) return null;

        // update the position on each frame 👀
        const isValidPosition = handlePositionUpdate(instance);

        // invalid position => not timeout value
        if(!isValidPosition) return null;

        // add new instance
        this.instances.push(instance);

        // create debug
        createMarkers(instance);

        return {
            id: instance.id,
            trigger: instance.trigger,
            destroy: instance.destroy
        };
    }

    get(id){
        // matched condition
        const isMatched = (i) => i.id === id;
        return this.instances.find(isMatched);
    }

    destroy(instance){
        // matched condition
        const isMatched = (i) => i.id === instance.id;

        const result = this.instances.find(isMatched);
        if(result){
            const index = this.instances.findIndex(isMatched);

            // remove rAF
            instance.destroy = true;
            cancelAnimationFrame(result.timeout);

            // remove from instances
            this.instances.splice(index, 1);

            return true;
        }
        return false;
    }
}


/**
 * Public library
 * */
window.ScrollTrigger = new ScrollTrigger();