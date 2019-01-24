/**
 * misc.js - Misc functions that are invoked in the
 * client but don't belong in the file.
 *
 * (c) Hellomouse 2019
 */

 module.exports = {
    /**
     * If obj2 shares a key with obj1, this function will replace
     * obj1's key value with obj2's key value. If the key in obj1
     * is an object, it will be recursively replaced.
     *
     * @param {object<string, any>} obj1 Object containing default keys
     * @param {object<string, any>} obj2 Object to replace default keys with
     */
    setDefaultKeys: function(obj1, obj2) {
        const requiredKeys = Object.keys(obj1);
        for (const key of requiredKeys) {
            if (obj2[key]) {
                if (typeof obj1[key] === 'object')
                    this(obj1[key], obj2[key]);
                else if (obj2[key])
                    this.obj1[key] = obj2[key];
            }
        }
    }
 };
 