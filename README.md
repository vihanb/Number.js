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

## Docs Plz?

They are these functions

 - `add`
 - `minus`
 - `times`
 - `sign`
 
`times` is just repeated addition which could be improved. Currently negative numbers are not supported. Decimals are supported with the `Integer` class.

---

To make your self an bigint. First create an instance of the class

```js
var IntA = new Int("123"); // Faster, no negative or decimal support, requires argument to be a string
var IntB = new Integer(123.45); // Slightly Slower, Argument can be anything (number, string). Supports decimals with experimental negative support
```

Now what do I do? Simple, call a function `<IntClassVariable>.<function>(<argument>)`. So If I wanted to add `323` to each variable I created earlier

```js
IntA.add("323"); // I can only add a string remember
IntB.add(323); // Here I can 
```
