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
// const current = {
//     progress: 0,
// };
// const update = {
//     progress: 0
// };

// for custom transition
const customTransition = {
    value: 0
};

ScrollTrigger.create({
    trigger: wrapper,
    start: 'top center',
    end: 'bottom 50%',
    markers: true,
    onUpdate: (self) => {
        // update.progress = self.progress;
        customTransition.value = self.progress;
    },
});

Smooth.create({
    timeFraction: customTransition,
    // timing:'lerp',
    timing: function easeInCubic(x){
        return x * x * x;
    },
    onUpdate: (self) => {
        // current.progress = self.lerp(current.progress, update.progress, 0.05);
        wrapper.style.setProperty('--progress', self.progress);
    },
});