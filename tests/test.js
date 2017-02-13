/* William Oliveira de Lagos - 2017    *
 * MOVIE RENTAL SYSTEM API FOR BACKEND *
 * Tests file for unit testing base    *
 * With Mocha.js                       */

var assert = require('assert');
describe('Array',function(){
    describe('#indexOf()',function(){
        it('should return -1 when the value is not present',function(){
            assert.equal(-1,[1,2,3].indexOf(4));
        });
    });
});
