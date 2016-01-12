# Number.js
An insanely fast arbitrary precision library for JavaScript.

## Just *how* fast?

NumberJS takes only **`0.00006` seconds** per operation! That's over 16,000 operations per second!

## How do I use it?

1. Create an `Int` object
```js
var MyInt = new Int('23');
```
2. Do anything!
```js
MyInt.plus('32'); // 55
MyInt.times('4'); // 220
MyInt.pow('2');   // 48400
```
---

Want an easier to use class? Use `Integer`, `Int` only supports strings and is very string on input format. This results in faster speeds but lacks convinience, the `Integer` wrapper at a *very* small speed cost. **It also supports decimals** and is easier to work with:

```js
var MyInt = new Integer(2341234.1234123412);

MyInt.add(943583984525423.18234);
```
