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
dataTitles.forEach(e => e.innerHTML = packageInfo.projectName);
dataDescriptions.forEach(e => e.innerHTML = packageInfo.description);

// code