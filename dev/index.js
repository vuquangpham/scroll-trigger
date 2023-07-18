// style
import './style.scss';

// library
import '@/_index.js';
import './Smooth.min.js';

// package info
import packageInfo from '../package.json';

// update project information
const dataTitles = document.querySelectorAll('[data-title]');
const dataDescriptions = document.querySelectorAll('[data-description]');

// update information
dataTitles.forEach(e => e.innerHTML = packageInfo["project-name"]);
dataDescriptions.forEach(e => e.innerHTML = packageInfo.description);

// code
const wrapper = document.querySelector('[data-target]');

// for lerp purpose
const current = {
    progress: 0,
};
const update = {
    progress: 0
};

// for custom transition
const customTransition = {
    value: 0
};

ScrollTrigger.create({
    trigger: wrapper,
    start: 'top center',
    end: 'top 0%',
    markers: true,
    onUpdate: (self) => {
        // update.progress = self.progress;
        customTransition.value = self.progress;
    },
});

Smooth.create({
    customTimeFraction: customTransition,
    destroyWhenCompleted: false,
    timing: function easeOutBounce(x){
        const n1 = 7.5625;
        const d1 = 2.75;
        if(x < 1 / d1){
            return n1 * x * x;
        }else if(x < 2 / d1){
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        }else if(x < 2.5 / d1){
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        }else{
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    },
    onUpdate: (self) => {
        current.progress = self.lerp(current.progress, self.progress, 0.05);
        wrapper.style.setProperty('--progress', current.progress);
    },
});