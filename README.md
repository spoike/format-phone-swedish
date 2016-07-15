# format-phone-swedish

Module for formatting strings to Swedish phone numbers. For international phone
numbers use [format-phone](https://www.npmjs.com/package/format-phone) instead.

## Installation

Use npm:

```bash
npm install --save format-phone-swedish
```

## Usage

```js
import { format } from "format-phone-swedish"
let phoneNumber = "081234567"

console.log(format(phoneNumber)) // => "08 123 45 67"
```

## License

MIT
