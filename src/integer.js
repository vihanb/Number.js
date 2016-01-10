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
 */

/*=== INTEGER PRIMITIVE ===*/

/**
 * add
 * minus
**/

const INT_BASE = 9; // -1 from desired base
class Int {
  constructor(str) {
    this.Num = str.split("");
  }
  get val() { return this.Num.join(""); }
  set val(n) { this.Num = n.split(""); }
  plus(n) {
    let N = n.split("");
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
      } else {
        R.unshift(L|0);
        C = 0;
      }
    }
    if (C === 1) R.unshift(1); // Finish carry outs
    this.Num = R;
    return this;
  }
  gt(n) {
    let A = this.Num;
    let B = n;

    let C = A.length;
    let D = B.length;

    let E;
    let F;

    while (C--) {
      E = A.shift();
      F = B.shift();
      if (E > F) return 1;
      else if (F < E) return 0;
    }

    return 0;
  }
  minus(n) {
    let A = n.split("");
    let B = this.Num; // Lookups are slow as heck

    let C = A.shift();
    let D = B.shift();

    let W;

    let L = 0;

    while (W--) {
      L = A.pop()
    }
  }
}

/**
For above 2^32 length, pass an array literal:
 * Array.prototype.join = Array.prototype.split = () => this;
 * var MyInt = new Int([]);
**/

/**
 * == Integer Class ==
 */

const IntegerValidate = Integer => {
  let N;
  let V;
  if (Integer instanceof Array)
    N = Integer;
  else if (Integer instanceof String)
    N = Integer.split("");
  else if (Integer instanceof Number)
    N = (Integer+"").split("");
  else if (Integer instanceof Integer)
    // FIXME: Better integer copying
    N = Integer.N.slice(); // FIX
  else if (Integer instanceof Int)
    N = this.Num.split("");
  else
    throw new TypeError(`can't convert ${Integer.constructor.name} to integer primitive`);

  N = +N;

  if (N !== N)
    N = new Num(N);
  else
    throw new TypeError(this.Value + " to integer");

  return N;
}

class Integer {
  constructor(obj) {
    this.Value = IntegerValidate(N);
  }
  get Length() { return this.Value.length >>> 0 }

  add(obj) {
    this.Value.add(IntegerValidate);

  }
}

/**
  // Example Use

  var one = Num('1');
  one.add('2');
  one.add(one);

  */
