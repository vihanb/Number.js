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
 */

class Int {
  constructor(str) {
    this.Num = str.split("");
  }
  get Ival() { return this.Num.join(""); }
  set Ival(n) { this.Num = n.split(""); }
  Iadd(n) {
    let N = n.split("");
    let B = this.Num; // Lookups are slow as heck
    let R = []; // Contains results
    let C = 0; // Carry out register
    let L = 0;
    if (n instanceof Num === true) {
      N = n.NumInt;
    } else {
      N = n.split("");
    }
    while(N.length) {
      // Carry outs make this a mess, so we'll just use hope the cpus adders dont blow up
      L = (N.pop()|0) + (B.pop()|0) + C;
      if (L > 9) {
        R.unshift(L - 10);
        C = 1;
      } else {
        R.unshift(L|0);
        C = 0;
      }
    }
    if (C === 1) R.unshift(1); // Finish carry outs
    this.Num = R;
    return this;
  }
  
  ISub(n) {

  }
}

class Num extends Int {
  constructor(str, dec) {
    super(str);
    this.dec = dec.split("");
    this.len = dec.length;
    this.irr = 0; // Irrational numbers
  }
  get _nval() { return this.Num.concat(this.dec) }
  add(i, d) {
    let NI = i.split("").concat(d.split(""));
    let NL = d.length;
    let RS = super.Iadd(this._nval.join(""), NI.join(""));
    
  }
}

/** 
  // Example Use

  var one = Num('1');
  one.add('2');
  one.add(one);

  */