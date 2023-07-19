// script
import {init, validateTarget} from "./helpers";
import {debounce, uid} from "./utils";
import {createMarkers} from "./markers";
import {handleResizeEvent} from "./resize";

/**
 * Private class
 * */
class ScrollTrigger{
    constructor(){
        // instances
        this.instances = [];

        // resize
        window.addEventListener('resize', debounce(handleResizeEvent.bind(this)));
    }

    create(options){
        const instance = {
            id: uid('st-'),
            trigger: null,

            // position
            start: 'top top',
            end: 'bottom bottom',

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

        // init
        const initStatus = init(instance);
        if(!initStatus) return null;

        // add destroy method
        instance.destroy = this.destroy.bind(this, instance);

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