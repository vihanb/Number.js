"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Int = function () {
  function Int(str) {
    _classCallCheck(this, Int);

    this.Num = str.split("");
  }

  _createClass(Int, [{
    key: "plus",
    value: function plus(n) {
      var N = n.split("");
      var B = this.Num; // Lookups are slow as heck

      var R = []; // Contains results
      var C = 0; // Carry out register
      var L = 0;

      var Q = Math.max(B.length, N.length);

      while (Q--) {
        // undefined|0 === 0
        L = (N.pop() | 0) + (B.pop() | 0) + C;
        if (L > 9) {
          // Carry out
          R.unshift(L - 10); // First value
          C = 1; // Set carry out
        } else {
            R.unshift(L | 0);
            C = 0;
          }
      }
      if (C === 1) R.unshift(1); // Finish carry outs
      this.Num = R;
      return this;
    }
  }, {
    key: "sign",
    value: function sign(n) {
      var A = this.Num;
      var B = n.split("");

      var C = A.length;
      var D = B.length;

      var E = undefined;
      var F = undefined;

      while (C--) {
        E = A.shift();
        F = B.shift();
        if (E > F) return 1;else if (E < F) return -1;
      }

      return 0;
    }
  }, {
    key: "minus",
    value: function minus(n) {
      var A = n;
      var B = this.Num; // Lookups are slow as heck

      var W = undefined;
      var X = this.sign(n);

      if (X === 1) {
        W = B;
      } else if (X === -1) {
        W = A;
      } else {
        // Numbers are equal
        return this.Num = [0];
      }

      var N = W.length;
    }
  }, {
    key: "val",
    get: function get() {
      return this.Num.join("");
    },
    set: function set(n) {
      this.Num = n.split("");
    }
  }]);

  return Int;
}();

/**
For above 2^32 length, pass an array literal:
 * Array.prototype.join = Array.prototype.split = () => this;
 * var MyInt = new Int([]);
**/

/**
 * == Integer Class ==
 */

var IntegerMake = Value;

var IntegerParse = function IntegerParse(IntNum) {
  var Data = {};
};

var IntegerValidate = function IntegerValidate(integer) {
  var N = undefined;
  if (integer instanceof String) N = IntegerParse(integer).split("");else if (integer instanceof Number) N = IntegerParse(integer + "").split("");else if (integer instanceof Array) N = integer;else if (integer instanceof Int) N = integer.Num;else throw new Error("could not validate " + integer + " to an integer");
};

var Integer = function Integer(integer) {
  _classCallCheck(this, Integer);

  this.Literal = IntegerValidate(integer);
};

/**
  // Example Use

  var one = Num('1');
  one.add('2');
  one.add(one);

  */