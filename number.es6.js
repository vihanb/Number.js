////
//
// Number.js
// Better Numbers for JavaScript
// Lots of sacrafices have been taken for very fast preformance
////

/**
 * Sacrafice List
 * List of sacrafices made for performance:
 
 * No strings
 * Using pop
 * No `for`
 * No `+`, too slow
 * No `%`, too slow
 */

class Num {
  constructor(str) {
    this.Num = str.split("");
  }
  Iadd(n) {
    let N = n.split("");
    let B = this.Num; // Lookups are slow as heck
    let C = 0; // Carry out register
    let L = 0;
    if (n instanceof Num === true) {
      N = n.NumInt;
    } else {
      N = n.split("");
    }
    
    while(N.length) {
      // Carry outs make this a mess, so we'll just use the cpu's adders rather than bitwise
      L = (N.pop()|0) + (B.pop()|0) + (C|0);
      if (L > 9) {
        B.push(L - 10);
        C = 1;
      } else {
        B.push(L);
        C = 0;
      }
    }
    if (C === 1) B.push(1); // Finish carry outs
    
    this.Num = B;
    
    return B;
  }
}

/** 
  // Example Use
  
  var one = Num('1');
  one.add('2');
  one.add(one);
  
  */