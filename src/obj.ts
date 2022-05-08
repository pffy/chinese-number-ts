/*
 * src      : obj.ts
 * job      : TypeScript implementation of ChineseNumber object
 * git      : https://github.com/pffy/chinese-number-ts
 * author   : The Pffy Authors https://pffy.dev
 * license  : https://opensource.org/licenses/MIT
 */

import { ChineseAbacus } from 'chinese-abacus-ts'
import { ChineseDigits } from 'chinese-digits-ts'
import { ChineseUnits } from 'chinese-units-ts'

interface HanziPinyin {
  chinese: string;
  pinyin: string;
}

export class ChineseNumber {

  private value: number = 0;
  private chinese: string = ChineseDigits.zero.chinese;
  private pinyin: string = ChineseDigits.zero.pinyin;
  private abba: ChineseAbacus = new ChineseAbacus();
  private isNegative: boolean = false;

  static readonly maxValue = 999999999;
  static readonly minValue = -999999999;

  constructor(num: number) {
    this.setValue(num);
  }

  setValue(num: number): ChineseNumber {
    this.isNegative = num < 0 ? true : false;
    this.value = num;
    this.abba.setValue(this.value);
    this.count();
    return this;
  }

  getValue(): number {
    return this.value;
  }

  getChinese(): string {
    return this.chinese;
  }

  getPinyin(): string {
    return this.pinyin;
  }

  // returns the JSON representation of the object
  toJSON(): any {
    return {
      value: this.value,
      isNegative: this.isNegative,
      chinese: this.chinese,
      pinyin: this.pinyin
    };
  }

  // returns the string representation of the object
  toString(): string {
    return JSON.stringify(this);
  }

  private count(): void {

    switch (Math.abs(this.value)) {
      case 0:
        this.chinese = ChineseDigits.zero.chinese;
        this.pinyin = ChineseDigits.zero.pinyin;
        break;
      case 250:
        this.chinese = ChineseUnits.pair.chinese + ChineseUnits.hundred.chinese + ChineseDigits.five.chinese;
        this.pinyin = ChineseUnits.pair.pinyin + ChineseUnits.hundred.pinyin + ChineseDigits.five.pinyin;
        break;
      default:

        const abba: ChineseAbacus = this.abba;

        const places: any = this.abba.getJSON();
        const wan: number = places.tenThousands;
        const qian: number = places.thousands;
        const bai: number = places.hundreds;
        const shi: number = places.tens;
        const num: number = places.ones;

        let strWan: string = '';
        let strQian: string = '';
        let strBai: string = '';
        let strShi: string = '';
        let strNum: string = '';

        let unitWan: string = '';
        let unitQian: string = '';
        let unitBai: string = '';
        let unitShi: string = '';
        // no unitNum


        if (wan > 0) {
          const wancn: ChineseNumber = new ChineseNumber(wan);
          strWan = wancn.getChinese();
          unitWan = ' ' + ChineseUnits.tenThousand.chinese;
        }

        if (qian > 0) {
          strQian = '' + ChineseDigits.chinese[qian];
          unitQian = ' ' + ChineseUnits.thousand.chinese;
        }

        if (bai > 0) {
          strBai = ' ' + ChineseDigits.chinese[bai];
          unitBai = ' ' + ChineseUnits.hundred.chinese;
        }

        if (shi > 0) {
          strShi = ' ' + ChineseDigits.chinese[shi];
          unitShi = ' ' + ChineseUnits.ten.chinese;
        }

        if (num > 0) {
          strNum = '' + ChineseDigits.chinese[num];
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
            unitShi = ChineseDigits.zero.chinese;
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
            unitBai = ChineseDigits.zero.chinese;
            break;

          // case #26
          case '11001':
            strBai = '';
            strShi = '';
            unitBai = ChineseDigits.zero.chinese;
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
            unitQian = ChineseDigits.zero.chinese;
            break;

          // case #23
          case '10110':
            strQian = '';
            strNum = '';
            unitQian = ChineseDigits.zero.chinese;
            unitShi = '';
            break;

          // case #22
          case '10101':
            strQian = '';
            strShi = '';
            unitQian = ChineseDigits.zero.chinese;
            unitShi = ChineseDigits.zero.chinese;
            break;

          // case #21
          case '10100':
            strQian = '';
            strShi = '';
            strNum = '';
            unitQian = ChineseDigits.zero.chinese;
            unitShi = '';
            break;

          // case #20
          // case #19
          case '10011':
          case '10010':
            strQian = '';
            strBai = '';
            unitQian = ChineseDigits.zero.chinese;
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
            unitShi = ChineseDigits.zero.chinese;
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
            unitBai = ChineseDigits.zero.chinese;
            break;

          // case #11
          case '01010':
            strBai = '';
            strNum = '';
            unitBai = ChineseDigits.zero.chinese;
            break;

          // double donuts - 1001, 3006, ...
          // case #10
          case '01001':
            strBai = '';
            strShi = '';
            unitBai = ChineseDigits.zero.chinese;
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
            unitShi = ChineseDigits.zero.chinese;
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
      this.chinese = ChineseUnits.negative.chinese + this.chinese;
      this.pinyin = ChineseUnits.negative.pinyin + this.pinyin;
    }

    this.pinyin = this.chinese;

    let re: RegExp = /\\/;
    for (let d in ChineseDigits.chinese) {
      re = new RegExp(ChineseDigits.chinese[d], 'g');
      this.pinyin = this.pinyin
        .replace(re, ' ' + ChineseDigits.pinyin[d]);
    }

    for (let u in ChineseUnits.chinese) {
      re = new RegExp(ChineseUnits.chinese[u], 'g');
      this.pinyin = this.pinyin
        .replace(re, ' ' + ChineseUnits.pinyin[u]);
    }

    this.chinese = this.chinese.replace(/\s/g, '').trim();
    this.pinyin = this.pinyin.replace(/[^\S\n]{2,}/g, ' ').trim();
  }
}

