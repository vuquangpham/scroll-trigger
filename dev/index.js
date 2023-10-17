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

const backgroundTriggerEl = document.querySelector('[data-trigger-background]');
const imageTriggerEl = document.querySelector('[data-trigger-image]');

// background animation
ScrollTrigger.create({
    trigger: backgroundTriggerEl,
    start: 'top 100%',
    end: '+=' + innerHeight,
    onUpdate: (self) => {
        self.trigger.setAttribute('style', `--progress:${self.progress}`);
    },
});

// image animation
ScrollTrigger.create({
    trigger: imageTriggerEl,
    start: 'top bottom',
    onUpdate: (self) => {
        self.trigger.setAttribute('style', `--progress:${self.progress}`);
    }
});

// parallax
ScrollTrigger.create({
    trigger: '[data-trigger-parallax]',
    start: 'top top',
    onUpdate: (self) => {
        self.trigger.setAttribute('style', `--progress:${self.progress}`);
    }
});

// draw svg
const letterEl = document.querySelector('.letter');
letterEl.setAttribute('style', `--length:${letterEl.getTotalLength()}`);

ScrollTrigger.create({
    trigger: '[data-trigger-draw-svg]',
    start: 'top 50%',
    end: 'bottom bottom',
    onUpdate: (self) => {
        self.trigger.setAttribute('style', `--progress:${self.progress}`);
        self.trigger.querySelector('[data-progress]').innerHTML = (self.progress * 100).toFixed(2);
    }
});

// last demo
const progressElement = document.querySelector('#demo [data-progress]');
const visiblePixelElement = document.querySelector('#demo [data-pixel]');

const enterButton = document.querySelector('#enter-button');
const updateButton = document.querySelector('#update-button');
const leaveButton = document.querySelector('#leave-button');

ScrollTrigger.create({
    trigger: '[data-trigger-demo]',
    start: 'top bottom',
    end: 'bottom bottom',
    markers: true,
    onUpdate: (self) => {
        progressElement.innerHTML = (self.progress).toFixed(2);
        visiblePixelElement.innerHTML = (self.trigger.getBoundingClientRect().height * self.progress).toFixed(2);

        updateButton.classList.add('show');
        setTimeout(() => {
            updateButton.classList.remove('show');
        }, 200);
    },

    onEnter: () => {
        enterButton.classList.add('show');
        setTimeout(() => {
            enterButton.classList.remove('show');
        }, 200);
    },

    onLeave: () => {
        leaveButton.classList.add('show');
        setTimeout(() => {
            leaveButton.classList.remove('show');
        }, 200);
    },
});