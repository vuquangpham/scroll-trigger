/***
 * Responsive observed breakpoint
 * @param {array} responsive
 * @return {object | null}
 */
export const getObservedBreakpoint = (responsive) => {
    const breakpoint = validateResponsive(responsive);
    if(!breakpoint) return null;
    return breakpoint;
};


/***
 * Validate breakpoint object
 * @param {array} responsive
 * @return {object | null}
 * */
const validateResponsive = (responsive) => {
    // validate the responsive
    if(!Array.isArray(responsive) || responsive.length === 0) return null;

    // sort the responsive object in the right order
    responsive.sort((a, b) => b.breakpoint - a.breakpoint);
    return getBreakpoint(responsive);
};


/**
 * Get the breakpoint
 * @param {array} responsive
 * @return {object | null}
 * */
const getBreakpoint = (responsive) => {
    for(let i = responsive.length - 1; i >= 0; i--){
        if(responsive[i].breakpoint >= window.innerWidth){
            return responsive[i];
        }
    }
    return null;
};