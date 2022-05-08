"use strict";
/*
 * src      : obj.ts
 * job      : TypeScript implementation of ChineseNumber object
 * git      : https://github.com/pffy/chinese-number-ts
 * author   : The Pffy Authors https://pffy.dev
 * license  : https://opensource.org/licenses/MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChineseNumber = void 0;
const chinese_abacus_ts_1 = require("chinese-abacus-ts");
const chinese_digits_ts_1 = require("chinese-digits-ts");
const chinese_units_ts_1 = require("chinese-units-ts");
class ChineseNumber {
    constructor(num) {
        this.value = 0;
        this.chinese = chinese_digits_ts_1.ChineseDigits.zero.chinese;
        this.pinyin = chinese_digits_ts_1.ChineseDigits.zero.pinyin;
        this.abba = new chinese_abacus_ts_1.ChineseAbacus();
        this.isNegative = false;
        this.setValue(num);
    }
    setValue(num) {
        this.isNegative = num < 0 ? true : false;
        this.value = num;
        this.abba.setValue(this.value);
        this.count();
        return this;
    }
    getValue() {
        return this.value;
    }
    getChinese() {
        return this.chinese;
    }
    getPinyin() {
        return this.pinyin;
    }
    // returns the JSON representation of the object
    toJSON() {
        return {
            value: this.value,
            isNegative: this.isNegative,
            chinese: this.chinese,
            pinyin: this.pinyin
        };
    }
    // returns the string representation of the object
    toString() {
        return JSON.stringify(this);
    }
    count() {
        switch (Math.abs(this.value)) {
            case 0:
                this.chinese = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                this.pinyin = chinese_digits_ts_1.ChineseDigits.zero.pinyin;
                break;
            case 250:
                this.chinese = chinese_units_ts_1.ChineseUnits.pair.chinese + chinese_units_ts_1.ChineseUnits.hundred.chinese + chinese_digits_ts_1.ChineseDigits.five.chinese;
                this.pinyin = chinese_units_ts_1.ChineseUnits.pair.pinyin + chinese_units_ts_1.ChineseUnits.hundred.pinyin + chinese_digits_ts_1.ChineseDigits.five.pinyin;
                break;
            default:
                const abba = this.abba;
                const places = this.abba.getJSON();
                const wan = places.tenThousands;
                const qian = places.thousands;
                const bai = places.hundreds;
                const shi = places.tens;
                const num = places.ones;
                let strWan = '';
                let strQian = '';
                let strBai = '';
                let strShi = '';
                let strNum = '';
                let unitWan = '';
                let unitQian = '';
                let unitBai = '';
                let unitShi = '';
                // no unitNum
                if (wan > 0) {
                    const wancn = new ChineseNumber(wan);
                    strWan = wancn.getChinese();
                    unitWan = ' ' + chinese_units_ts_1.ChineseUnits.tenThousand.chinese;
                }
                if (qian > 0) {
                    strQian = '' + chinese_digits_ts_1.ChineseDigits.chinese[qian];
                    unitQian = ' ' + chinese_units_ts_1.ChineseUnits.thousand.chinese;
                }
                if (bai > 0) {
                    strBai = ' ' + chinese_digits_ts_1.ChineseDigits.chinese[bai];
                    unitBai = ' ' + chinese_units_ts_1.ChineseUnits.hundred.chinese;
                }
                if (shi > 0) {
                    strShi = ' ' + chinese_digits_ts_1.ChineseDigits.chinese[shi];
                    unitShi = ' ' + chinese_units_ts_1.ChineseUnits.ten.chinese;
                }
                if (num > 0) {
                    strNum = '' + chinese_digits_ts_1.ChineseDigits.chinese[num];
                }
                switch (abba.getBitString().substr(-5)) {
                    // case #32
                    case '11111':
                        // no action required
                        break;
                    // case #31
                    case '11110':
                        strNum = '';
                        unitShi = '';
                        break;
                    // case #30
                    case '11101':
                        strShi = '';
                        unitShi = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        break;
                    // case #29
                    case '11100':
                        strShi = '';
                        strNum = '';
                        unitShi = '';
                        break;
                    // case #28
                    // case #27
                    case '11011':
                    case '11010':
                        strBai = '';
                        unitBai = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        break;
                    // case #26
                    case '11001':
                        strBai = '';
                        strShi = '';
                        unitBai = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        unitShi = '';
                        break;
                    // case #25
                    case '11000':
                        strBai = '';
                        strShi = '';
                        strNum = '';
                        unitBai = '';
                        unitShi = '';
                        break;
                    // case #24
                    case '10111':
                        strQian = '';
                        unitQian = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        break;
                    // case #23
                    case '10110':
                        strQian = '';
                        strNum = '';
                        unitQian = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        unitShi = '';
                        break;
                    // case #22
                    case '10101':
                        strQian = '';
                        strShi = '';
                        unitQian = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        unitShi = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        break;
                    // case #21
                    case '10100':
                        strQian = '';
                        strShi = '';
                        strNum = '';
                        unitQian = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        unitShi = '';
                        break;
                    // case #20
                    // case #19
                    case '10011':
                    case '10010':
                        strQian = '';
                        strBai = '';
                        unitQian = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        unitBai = '';
                        break;
                    // case #17
                    case '10000':
                        strQian = '';
                        strBai = '';
                        strShi = '';
                        strNum = '';
                        unitQian = '';
                        unitBai = '';
                        unitShi = '';
                        break;
                    // case #16
                    case '01111':
                        // no action required
                        break;
                    // case #15
                    case '1110':
                        strNum = '';
                        unitShi = '';
                        break;
                    // case #14
                    case '01101':
                        strShi = '';
                        unitShi = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        break;
                    // case #13
                    case '01100':
                        strShi = '';
                        strNum = '';
                        unitBai = '';
                        unitShi = '';
                        break;
                    // case #12
                    case '01011':
                        strBai = '';
                        unitBai = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        break;
                    // case #11
                    case '01010':
                        strBai = '';
                        strNum = '';
                        unitBai = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        break;
                    // double donuts - 1001, 3006, ...
                    // case #10
                    case '01001':
                        strBai = '';
                        strShi = '';
                        unitBai = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        unitShi = '';
                        break;
                    // triple donuts - 1000, 2000, ...
                    // case #9
                    case '01000':
                        strBai = '';
                        strShi = '';
                        strNum = '';
                        unitBai = '';
                        unitShi = '';
                        break;
                    // case #8
                    case '00111':
                        // no action required
                        break;
                    // 120, 130, ...
                    // case #7
                    case '00110':
                        strNum = '';
                        unitShi = '';
                        break;
                    // single donuts - 101, 203, ...
                    // case #6
                    case '00101':
                        strShi = '';
                        unitShi = chinese_digits_ts_1.ChineseDigits.zero.chinese;
                        break;
                    // case #5
                    case '00100':
                        strShi = '';
                        strNum = '';
                        unitShi = '';
                        break;
                    default:
                        // do nothing
                        break;
                }
                // if input number is less than 20
                // case #4
                // case #3
                if (this.value < 20) {
                    strShi = '';
                }
                // combine all parts
                this.chinese = strWan + unitWan
                    + strQian + unitQian
                    + strBai + unitBai
                    + strShi + unitShi + strNum;
                break;
        }
        // finishing
        if (this.isNegative) {
            this.chinese = chinese_units_ts_1.ChineseUnits.negative.chinese + this.chinese;
            this.pinyin = chinese_units_ts_1.ChineseUnits.negative.pinyin + this.pinyin;
        }
        this.pinyin = this.chinese;
        let re = /\\/;
        for (let d in chinese_digits_ts_1.ChineseDigits.chinese) {
            re = new RegExp(chinese_digits_ts_1.ChineseDigits.chinese[d], 'g');
            this.pinyin = this.pinyin
                .replace(re, ' ' + chinese_digits_ts_1.ChineseDigits.pinyin[d]);
        }
        for (let u in chinese_units_ts_1.ChineseUnits.chinese) {
            re = new RegExp(chinese_units_ts_1.ChineseUnits.chinese[u], 'g');
            this.pinyin = this.pinyin
                .replace(re, ' ' + chinese_units_ts_1.ChineseUnits.pinyin[u]);
        }
        this.chinese = this.chinese.replace(/\s/g, '').trim();
        this.pinyin = this.pinyin.replace(/[^\S\n]{2,}/g, ' ').trim();
    }
}
exports.ChineseNumber = ChineseNumber;
ChineseNumber.maxValue = 999999999;
ChineseNumber.minValue = -999999999;
//# sourceMappingURL=obj.js.map