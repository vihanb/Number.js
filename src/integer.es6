////
//
// Number.js
// Better Numbers for JavaScript
// with ridiculious optimizations
//
////


/**
* Sacrafice List
* List of sacrafices made for performance:

* No strings
* Using pop
* No `for`
* No `+`, too slow
* No `%`, too slow
* No casting
* No reverse
* No slice
* No +=
* No join
* No implicit casting
* No explicit comparisions
* No array-built ins
*/

/*=== CONSTANTS ===*/
const INT_DEBUG = true;
const INT_MAX   = Number.MAX_SAFE_INTEGER;

// Helper functions
const IsClass = (Value, Class) => Object.prototype.toString.call(Value) === `[object ${Class}]`
const IsArray = Value => {
  if (IsClass(Value, "Array")) return Value;
  if (IsClass(Value, "String")) return Value.split("")
};

/*=== INTEGER PRIMITIVE ===*/

/**
* f - arg:Number
*
* add
* minus
* times (f)
* sign
**/

class Int {
  constructor(str) {
    this.Num = IsArray(str);
  }
  get val() { return this.Num.join(""); }
  set val(n) { this.Num = n.split(""); }
  plus(n) {
    let N = IsArray(n);
    let B = this.Num; // Lookups are slow as heck

    let R = []; // Contains results
    let C = 0; // Carry out register
    let L = 0;

    let Q = Math.max(B.length, N.length);

    while(Q--) {
      // undefined|0 === 0
      L = (N.pop()|0) + (B.pop()|0) + C;
      if (L > 9) { // Carry out
        R.unshift(L - 10); // First value
        C = 1; // Set carry out
      } else if (L < 0) {
        R.unshift(L + 10);
        C = -1;
      } else {
        R.unshift(L|0);
        C = 0;
      }
    }
    if (C === 1) R.unshift(1); // Finish carry outs
    if (C === -1) R.unshift(R.shift() - 10);
    if (INT_DEBUG) console.log(`CO${C}`);
    this.Num = R;
    return this;
  }
  minus(n,i=false) {
    let A = this.Num;
    let B = IsArray(n); // Lookups are slow as heck

    let N = A.length;
    let M;
    let C = 0;
    let R = [];
    while (N--) {
      M = (A.pop()|0) - (B.pop()|0) - C;
      if (M < 0) {
        R.unshift(M + 10);
        C = 1;
      } else {
        R.unshift(M);
        C = 0;
      }
    }
    // TODO: Move to Integer wrapper
    if (C === 1) {
      if (i) {
        R.unshift(-1 * (R.shift() - 10));
        this.Neg = true;
      } else {
        throw new RangeError(`subtraction out of range. Use Integer wrapper`);
      }
    }
    this.Num = R;
    return this;
  }
  ftimes(n) {
    let A = this.val;
    while (--n) this.plus(A);
    return this;
  }
  times(n) {
    let I = new Int(n); // Iterator
    let A = this.val;
    while (+I.minus('1').val !== 0) this.plus(A);
    return this;
  }
  fpow(n) {
    let A = this.val;
    while (--n) this.times(A);
    return this;
  }
  pow(n) {
    if (+n === 0) {
      this.Num = [1];
      return this;
    }
    let I = new Int(n);
    let A = this.val;
    while (+I.minus('1').val !== 0) this.times(A);
    return this;
  }
  is(n) {
    let A = this.Num;
    let B = n.split("");

    let C = Math.max(A.length, B.length);

    let D;
    while (C--) {
      D = A[C]|0;
      if (D !== (B.pop()|0)) return 0;
    }
    return 1;
  }
}

/**
For above 2^32 length, pass an array literal:
* Array.prototype.join = Array.prototype.split = () => this;
* let MyInt = new Int([]);
**/

/**
* == Integer Class ==
*/

const IntegerMake  = (Value, { Negated: Negated = false, Exp: Exp = 0 } = {}) => ({
  Value: IsArray(Value),
  Negated: Negated,
  Exp: Exp
});

const IntegerParse = IntNum => [
  // TODO: Use less HORRIBLE, `replace` method
  IntNum.replace(/\D/g, ""),
  {
    Negated: IntNum[0] === "-",
    // TODO: Use less HORRIBLE `split` method
    Exp: (IntNum.split(".")[1] || "").length
  }
];

const IntegerValidate = integer => {
  let N;
  if      (IsClass(integer, "String")) N = integer;
  else if (IsClass(integer, "Number")) N = integer+"";
  else if (IsClass(integer, "Array"))  N = integer.join("");
  else if (IsClass(integer, "Boolean"))N = +integer;
  else if (integer instanceof Int)     N = integer.Num.join("");
  else throw new TypeError(`could not validate ` + integer + ` to an integer`)

  N = IntegerMake(...IntegerParse(N));
  return N;
};

class Integer {
  constructor(integer) {
    Object.assign(this, IntegerValidate(integer));
  }

  get StrVal() { return this.Value.join("") }

  toString() {
    return (this.Negated ? "-" : "") + (this.Exp ?
      this.StrVal.slice(0,-this.Exp) + "." + this.StrVal.slice(-this.Exp) :
      this.StrVal
    )
  }
  static fix(a,b) {
    let {Value: A, Exp: C} = a;
    let {Value: B, Exp: D} = b;

    let N;

    if (C === D) return [a, b];
    if (C > D) {
      N = C - D;
      while (N--) B.push(0);
      b.Exp = C;
      return [a, IntegerMake(B, b)];
    } else if (D > C) {
      N = D - C;
      while (N--) A.push(0);
      a.Exp = B;
      return [IntegerMake(A, a), b]
    } else {
      throw new TypeError(`could not sign ${C} and / or ${D}`)
    }
  }
  add(N) {
    if (N instanceof Integer) N = N;
    else N = IntegerValidate(N);
    let [{Value: A}, {Value: B}] = Integer.fix(this, N);
    this.Value = new Int(A).plus(B).Num;
    return this;
  }
  minus(N) {
    if (N instanceof Integer) N = N;
    else N = IntegerValidate(N);
    let [{Value: A}, {Value: B}] = Integer.fix(this, N);
    ({ Num: this.Value, Neg: this.Negated = false } = new Int(A).minus(B, true));
    return this;
  }
  times(N) {
    if (N instanceof Integer) N = N;
    else N = IntegerValidate(N);
    let [{Value: A}, {Value: B}] = Integer.fix(this, N);
    this.Value = new Int(A).times(B).Num;
    return this;
  }
}

/**
// Example Use

var one = new Integer(32.54);
one.plus('239.32143')

*/
