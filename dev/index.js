// style
import './style.scss';

// library
import '@/_index.js';

// package info
import packageInfo from '../package.json';

// update project information
const dataTitles = document.querySelectorAll('[data-title]');
const dataDescriptions = document.querySelectorAll('[data-description]');

// update information
dataTitles.forEach(e => e.innerHTML = packageInfo.projectName);
dataDescriptions.forEach(e => e.innerHTML = packageInfo.description);

// code
const wrapper = document.querySelector('[data-target]');

ScrollTrigger.create({
    trigger: wrapper,
    start: 'top 30%',
    markers: true,
    responsive: [
        {
            breakpoint: 1180,
            start: 'top center',
            end: 'bottom center'
        },
    ],
    onUpdate: (self) => {
        wrapper.style.setProperty('--progress', self.progress);
    },
});