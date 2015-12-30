////
//
// Number.js
// Better Numbers for JavaScript
// with ridiculious optimizations
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
 * times
 * minus
 */
class Int {
  constructor(str) {
    this.Num = str.split("");
  }
  get val() { return this.Num.join(""); }
  set val(n) { this.Num = n.split(""); }
  add(n) {
    let N;
    if (n instanceof Array) {
      N = n;
    } else {
      N = n.split("");
    }
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
  
  times(n) {
    
  }
}

/*=== NUMBER ===*/
class Num extends Int {
  constructor(str, dec) {
    super(str);
    // this.Num = str
    this.dec = dec.split("");
    this.len = dec.length;
    this.irr = 0; // Irrational numbers
  }
  get val() { return  }
  get _nval() { return this.Num.concat(this.dec) }
  add(i, d) {
    // this.Num = [this.Num, ...this.dec].join("")
    this.Num = this.Num.concat(this.dec);
    let RS = super.Iadd(i + d).Num;

    let RL = RS.length;
    let BL = RL - 0;
    let RD = 0;

    while (RL--) {
      RD = BL - RL;
      if (RD < BL) {
        this.dec[RD] = this.Num.pop();
      }
    }
    return this;
  }
}

/** 
  // Example Use

  var one = Num('1');
  one.add('2');
  one.add(one);

  */