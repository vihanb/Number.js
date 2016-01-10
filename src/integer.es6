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

/*=== INTEGER PRIMITIVE ===*/

/**
 * add
 * minus
**/

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
  sign(n) {
    let A = this.Num;
    let B = n.split("");

    let C = A.length;
    let D = B.length;

    let E;
    let F;

    while (C--) {
      E = A.shift();
      F = B.shift();
      if (E > F) return 1;
      else if (E < F) return -1;
    }

    return 0;
  }
  minus(n) {
    let A = n;
    let B = this.Num; // Lookups are slow as heck

    let W;
    let X = this.sign(n);

    if (X === 1) {
      W = B;
    } else if (X === -1) {
      W = A;
    } else {
      // Numbers are equal
      return this.Num = [0];
    }

    let N = W.length;
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

const IntegerMake  = (Value)

const IntegerParse = IntNum => {
  let Data = {

  }
};

const IntegerValidate = integer => {
  let N;
  if (integer instanceof String)      N = IntegerParse(integer)   .split("");
  else if (integer instanceof Number) N = IntegerParse(integer+"").split("");
  else if (integer instanceof Array)  N = integer;
  else if (integer instanceof Int)    N = integer.Num;
  else throw new Error(`could not validate ` + integer + ` to an integer`)
};

class Integer {
  constructor(integer) {
    this.Literal = IntegerValidate(integer);
  }
}

/**
  // Example Use

  var one = Num('1');
  one.add('2');
  one.add(one);

  */
