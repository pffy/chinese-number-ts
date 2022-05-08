# chinese-number-ts
TypeScript implementation of the ChineseNumber object

## Install

> **NOTE:** Requires NodeJS.

Add module to your project:

```bash
npm i -D git+https://github.com/pffy/chinese-number-ts.git
```

Or, you can also do this:

```bash
npm i -D github:pffy/chinese-number-ts
```

## Usage

TypeScript:
```typescript
import { ChineseNumber } from 'chinese-number-ts';
```

JavaScript:
```javascript
const { ChineseNumber } = require('chinese-number-ts');
```

You can get all the info at the same time:
```javascript
const num = new ChineseNumber(88888);

// automatically uses toString()
console.log('' + num);

// automatically uses toJSON()
console.log(JSON.parse(num));
/*
{
  "value": 88888,
  "isNegative": false,
  "chinese": "八万八千八百八十八",
  "pinyin": "bā wàn bā qiān bā bǎi bā shí bā"
}
*/
```

Or, you can:
```javascript
const num = new ChineseNumber(88888888);

// 八千八百八十八万八千八百八十八
console.log(num.getChinese());

// bā qiān bā bǎi bā shí bā wàn bā qiān bā bǎi bā shí bā
console.log(num.getPinyin());

// again, automatically using toJSON()
console.log(JSON.stringify(new ChineseNumber(88888888), 0, 2));
/*
{
  "value": 88888888,
  "isNegative": false,
  "chinese": "八千八百八十八万八千八百八十八",
  "pinyin": "bā qiān bā bǎi bā shí bā wàn bā qiān bā bǎi bā shí bā"
}
*/
```

Or, you can:
```javascript
const num = new ChineseNumber(88888888);

// 八千八百八十八万八千八百八十八
JSON.parse(num).chinese;

// bā qiān bā bǎi bā shí bā wàn bā qiān bā bǎi bā shí bā
JSON.parse(num).pinyin;
````

# License
  + MIT License https://opensource.org/licenses/MIT
