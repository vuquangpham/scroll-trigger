// script
import {init, validateTarget} from "./helpers";
import {uid} from "./utils";
import {createDebug} from "./markers";

/**
 * Private class
 * */
class ScrollTrigger{
    constructor(){
    }

    create(options){
        const instance = {
            trigger: null,

            // position
            start: 'top top',
            end: 'top bottom',

            // debug
            markers: true,

            // callbacks
            onUpdate: (self) => {
            },
            ...options
        };
        instance.trigger = validateTarget(instance.trigger);

        if(!instance.trigger) return;

        // fake value
        const start = innerHeight * 0.9, end = window.innerHeight * 0.6;

        // logic here 👀
        const animate = () => {
            console.log('run');

            // bounding object of trigger
            const triggerBox = instance.trigger.getBoundingClientRect();

            // get position
            const areaInViewPort = start - triggerBox.top;
            const availableArea = triggerBox.height - (end - start);

            if(availableArea <= 0){
                console.warn('Available area of trigger element is shorter than the viewport!');
            }

            // match only 1 time (availableArea is equal to areaInViewport)
            if(availableArea === 0 && areaInViewPort === 0){
                // trigger progress
                console.log('trigger 1 time');
            }else if(availableArea !== 0){
                const progress = areaInViewPort / availableArea;
                console.log('area in viewport', areaInViewPort);
                console.log(progress);
                if(areaInViewPort < 0 || areaInViewPort > availableArea) return;
                console.log('in progress');
            }

            requestAnimationFrame(animate);
        };
        animate();

        // create debug
        if(instance.markers){
            createDebug({
                start,
                end,
            }, {
                element: instance.trigger
            });
        }
    }

    get(id){

    }

    destroy(instance){

    }
}


/**
 * Public library
 * */
window.ScrollTrigger = new ScrollTrigger();