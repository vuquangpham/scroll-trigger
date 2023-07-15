// style
import './style.scss';

// library
import '@/_index.js';
import './smoothjs.min';

// package info
import packageInfo from '../package.json';

// update project information
const dataTitles = document.querySelectorAll('[data-title]');
const dataDescriptions = document.querySelectorAll('[data-description]');

// update information
dataTitles.forEach(e => e.innerHTML = packageInfo["project-name"]);
dataDescriptions.forEach(e => e.innerHTML = packageInfo.description);

// code
const square = document.querySelector('.square');
const troi = innerWidth - square.getBoundingClientRect().width;

const current = {
    x: 0,
    rotate: 0
};

const update = {
    x: 0,
    rotate: 0
};

ScrollTrigger.create({
    trigger: '[data-target]',
    start: 'top center',
    end: 'bottom 50%',
    markers: true,
    onUpdate: (self) => {
        update.x = troi * self.progress;
        update.rotate = 360 * self.progress;

        // console.log(self);
        console.log('progress in viewport', self.progress);
    },
    onLeave: (self) => {
        console.log('leave');
        // self.destroy();
    },
    onEnter: () => {
        console.log('enter');
    }
});

Smooth.smooth({
    timing: 'lerp',
    onUpdate: (self) => {
        current.x = self.lerp(current.x, update.x, 0.03);
        current.rotate = self.lerp(current.rotate, update.rotate, 0.03);
        square.style.transform = `translateX(${current.x}px) rotate(${current.rotate}deg)`;
    }
});