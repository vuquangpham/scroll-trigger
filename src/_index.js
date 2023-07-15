// script
import {init, validateTarget} from "./helpers";
import {uid} from "./utils";
import {createDebug} from "./markers";
import {handlePositionUpdate} from "./trigger";

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
            markers: true,

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

        // fake value
        const start = innerHeight * 0.9, end = window.innerHeight * 0.6;

        // update the position on each frame 👀
        handlePositionUpdate(instance);

        // invalid position => not timeout value
        if(!instance.timeout) return null;

        // add new instance
        this.instances.push(instance);

        // create debug
        if(instance.markers){
            createDebug({
                start,
                end,
            }, {
                element: instance.trigger
            });
        }

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