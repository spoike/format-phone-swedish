# format-phone-swedish

Module for formatting strings to Swedish phone numbers. For international phone
numbers use [format-phone](https://www.npmjs.com/package/format-phone) instead.

Supports [traditional grouping](https://sv.wikipedia.org/wiki/Telefonnummer#Sverige)
of telephone numbers. All two, three, and four digit [area codes](https://sv.wikipedia.org/wiki/Lista_%C3%B6ver_svenska_riktnummer)
are supported as well.

Will remove `+46` prefix code if present.

## Installation

Use npm:

```bash
npm install --save format-phone-swedish
```

## Usage

```js
import { format } from "format-phone-swedish"

console.log( format("081234567") )      // => "08 123 45 67"
console.log(format("081234567", "-"))   // => "08-123 45 67"

// Removes +46 country prefix
console.log( format("+4681234567") )    // => "08 123 45 67"

// Adds missing 0
console.log( format("81234567") )       // => "08 123 45 67"
```

## License

MIT
