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

## API

### format()

```js
import { format } from 'format-phone-swedish';
```

Takes a phone number-like string and formats it to a string with traditional
Swedish grouping.

```rtype
format(number: String, separator?: String) => String
```

| Param                | Description                                      |
| -------------------- | ------------------------------------------------ |
| `number: String`     | Input telephone number                           |
| `separator?: String` | The separator character to use. Default is `" "` |

*Example:* Normal 08 (Stockholm) number:

```js
console.log( format("081234567") )        // => "08 123 45 67"
```

*Example:* Change the area code separator from the default `" "` one to
`"-"`.

```js
console.log( format("081234567", "-") )   // => "08-123 45 67"
```

*Example:* Phone number with country code and extension number.

```js
console.log( format("+46 (0) 81234567") ) // => "08 123 45 67"
```

*Example:* Phone number with missing leading 0 for area code.

```js
console.log( format("81234567") )         // => "08 123 45 67"
```

*Example:* Supports number grouping for telephone numbers
without area codes and local area numbers.

```js
console.log( format("112") )              // => "112"
console.log( format("1177") )             // => "1177"
console.log( format("11414") )            // => "114 14"
console.log( format("123 456") )          // => "12 34 56"
console.log( format("1234567") )          // => "123 45 67"
console.log( format("12345678") )         // => "123 456 78"
```

## License

MIT, Read more at the [LICENSE](LICENSE.md) file.
