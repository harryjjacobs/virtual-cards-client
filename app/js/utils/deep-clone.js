/**
 * A simple deep cloning implementation - 
 * doesn't take into account Date objects
 * or functions for example.
 * @param {The object to clone} obj 
 */
export const simpleDeepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};