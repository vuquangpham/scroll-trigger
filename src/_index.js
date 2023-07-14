// style
import './_index.scss';

// script
import {init, validateTarget} from "./helpers";
import {uid} from "./utils";

/**
 * Private class
 * */
const defaultOptions = {
    id: uid(),
};

class Library{
    constructor(target, options){
        this._attr = {};
        this._class = {};

        // validate target
        this.target = validateTarget(target);
        if(!this.target) return;

        // options
        this.options = {
            ...defaultOptions,
            ...options
        };

        init(this);
    }
}


/**
 * Controller
 * */
class LibraryController{
    constructor(){
        this.instances = [];
    }

    add(instance = {}){
        if(this.instances.find(i => i.id !== instance.id)){
            this.instances.push(instance);
            return instance;
        }
        return null;
    }

    get(id){
        return this.instances.find(i => i.id === id);
    }
}


/**
 * Public library controller
 * */
window.LibraryController = new LibraryController();


/**
 * Public library
 * */
window.Library = {
    init: (target, options = {}) => {
        return window.LibraryController.add(new Library(target, options));
    },
    get: (id) => window.LibraryController.get(id)
};