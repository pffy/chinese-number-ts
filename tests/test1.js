#!/usr/bin/env node
/*
 * src      : test1.js
 * job      : tests for the ChineseNumber object
 * git      : https://github.com/pffy/chinese-number-ts
 * author   : The Pffy Authors https://pffy.dev
 * license  : https://opensource.org/licenses/MIT
 */
const { ChineseNumber } = require('../.');

console.log('test1');
console.log('' + (new ChineseNumber(0)));

console.log('test2');
console.log('' + (new ChineseNumber(250)));

console.log('test3');
console.log('' + (new ChineseNumber(-250)));

console.log('test4');
console.log('' + (new ChineseNumber(1)));

console.log('test5');
console.log('' + (new ChineseNumber(11)));

console.log('test6');
console.log('' + (new ChineseNumber(111)));

console.log('test7');
console.log('' + (new ChineseNumber(1111)));

console.log('test8');
console.log('' + (new ChineseNumber(11111)));

console.log('test9');
console.log('' + (new ChineseNumber(111111)));

console.log('test10');
console.log('' + (new ChineseNumber(1111111)));

console.log('test11');
console.log('' + (new ChineseNumber(11111111)));

console.log('test12');
console.log('' + (new ChineseNumber(111111111)));

console.log('test13');
console.log('' + (new ChineseNumber(ChineseNumber.maxValue)));

console.log('test14');
console.log('' + (new ChineseNumber(ChineseNumber.minValue)));

console.log('test15');
console.log('' + (new ChineseNumber(88888)));

console.log('test16');
console.log(JSON.stringify(new ChineseNumber(88888888), 0, 2));
