"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

/*=== CONSTANTS ===*/
var INT_DEBUG = true;
var INT_MAX = Number.MAX_SAFE_INTEGER;

// Helper functions
var IsClass = function IsClass(Value, Class) {
  return Object.prototype.toString.call(Value) === "[object " + Class + "]";
};
var IsArray = function IsArray(Value) {
  if (IsClass(Value, "Array")) return Value;
  if (IsClass(Value, "String")) return Value.split("");
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

var Int = function () {
  function Int(str) {
    _classCallCheck(this, Int);

    this.Num = IsArray(str);
  }

  _createClass(Int, [{
    key: "plus",
    value: function plus(n) {
      var N = IsArray(n);
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
        } else if (L < 0) {
            R.unshift(L + 10);
            C = -1;
          } else {
            R.unshift(L | 0);
            C = 0;
          }
      }
      if (C === 1) R.unshift(1); // Finish carry outs
      if (C === -1) R.unshift(R.shift() - 10);
      if (INT_DEBUG) console.log("CO" + C);
      this.Num = R;
      return this;
    }
  }, {
    key: "minus",
    value: function minus(n) {
      var i = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var A = this.Num;
      var B = IsArray(n); // Lookups are slow as heck

      var N = A.length;
      var M = undefined;
      var C = 0;
      var R = [];
      while (N--) {
        M = (A.pop() | 0) - (B.pop() | 0) - C;
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
          throw new RangeError("subtraction out of range. Use Integer wrapper");
        }
      }
      this.Num = R;
      return this;
    }
  }, {
    key: "ftimes",
    value: function ftimes(n) {
      var A = this.val;
      while (--n) {
        this.plus(A);
      }return this;
    }
  }, {
    key: "times",
    value: function times(n) {
      var I = new Int(n); // Iterator
      var A = this.val;
      while (+I.minus('1').val !== 0) {
        this.plus(A);
      }return this;
    }
  }, {
    key: "fpow",
    value: function fpow(n) {
      var A = this.val;
      while (--n) {
        this.times(A);
      }return this;
    }
  }, {
    key: "pow",
    value: function pow(n) {
      if (+n === 0) {
        this.Num = [1];
        return this;
      }
      var I = new Int(n);
      var A = this.val;
      while (+I.minus('1').val !== 0) {
        this.times(A);
      }return this;
    }
  }, {
    key: "is",
    value: function is(n) {
      var A = this.Num;
      var B = n.split("");

      var C = Math.max(A.length, B.length);

      var D = undefined;
      while (C--) {
        D = A[C] | 0;
        if (D !== (B.pop() | 0)) return 0;
      }
      return 1;
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
* let MyInt = new Int([]);
**/

/**
* == Integer Class ==
*/

var IntegerMake = function IntegerMake(Value) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref$Negated = _ref.Negated;
  var Negated = _ref$Negated === undefined ? false : _ref$Negated;
  var _ref$Exp = _ref.Exp;
  var Exp = _ref$Exp === undefined ? 0 : _ref$Exp;
  return {
    Value: IsArray(Value),
    Negated: Negated,
    Exp: Exp
  };
};

var IntegerParse = function IntegerParse(IntNum) {
  return [
  // TODO: Use less HORRIBLE, `replace` method
  IntNum.replace(/\D/g, ""), {
    Negated: IntNum[0] === "-",
    // TODO: Use less HORRIBLE `split` method
    Exp: (IntNum.split(".")[1] || "").length
  }];
};

var IntegerValidate = function IntegerValidate(integer) {
  var N = undefined;
  if (IsClass(integer, "String")) N = integer;else if (IsClass(integer, "Number")) N = integer + "";else if (IsClass(integer, "Array")) N = integer.join("");else if (IsClass(integer, "Boolean")) N = +integer;else if (integer instanceof Int) N = integer.Num.join("");else throw new TypeError("could not validate " + integer + " to an integer");

  N = IntegerMake.apply(undefined, _toConsumableArray(IntegerParse(N)));
  return N;
};

var Integer = function () {
  function Integer(integer) {
    _classCallCheck(this, Integer);

    _extends(this, IntegerValidate(integer));
  }

  _createClass(Integer, [{
    key: "toString",
    value: function toString() {
      return (this.Negated ? "-" : "") + (this.Exp ? this.StrVal.slice(0, -this.Exp) + "." + this.StrVal.slice(-this.Exp) : this.StrVal);
    }
  }, {
    key: "add",
    value: function add(N) {
      if (N instanceof Integer) N = N;else N = IntegerValidate(N);

      var _Integer$fix = Integer.fix(this, N);

      var _Integer$fix2 = _slicedToArray(_Integer$fix, 2);

      var A = _Integer$fix2[0].Value;
      var B = _Integer$fix2[1].Value;

      this.Value = new Int(A).plus(B).Num;
      return this;
    }
  }, {
    key: "minus",
    value: function minus(N) {
      if (N instanceof Integer) N = N;else N = IntegerValidate(N);

      var _Integer$fix3 = Integer.fix(this, N);

      var _Integer$fix4 = _slicedToArray(_Integer$fix3, 2);

      var A = _Integer$fix4[0].Value;
      var B = _Integer$fix4[1].Value;

      var _minus = new Int(A).minus(B, true);

      this.Value = _minus.Num;
      var _minus$Neg = _minus.Neg;
      this.Negated = _minus$Neg === undefined ? false : _minus$Neg;

      return this;
    }
  }, {
    key: "times",
    value: function times(N) {
      if (N instanceof Integer) N = N;else N = IntegerValidate(N);

      var _Integer$fix5 = Integer.fix(this, N);

      var _Integer$fix6 = _slicedToArray(_Integer$fix5, 2);

      var A = _Integer$fix6[0].Value;
      var B = _Integer$fix6[1].Value;

      this.Value = new Int(A).times(B).Num;
      return this;
    }
  }, {
    key: "StrVal",
    get: function get() {
      return this.Value.join("");
    }
  }], [{
    key: "fix",
    value: function fix(a, b) {
      var A = a.Value;
      var C = a.Exp;
      var B = b.Value;
      var D = b.Exp;

      var N = undefined;

      if (C === D) return [a, b];
      if (C > D) {
        N = C - D;
        while (N--) {
          B.push(0);
        }b.Exp = C;
        return [a, IntegerMake(B, b)];
      } else if (D > C) {
        N = D - C;
        while (N--) {
          A.push(0);
        }a.Exp = B;
        return [IntegerMake(A, a), b];
      } else {
        throw new TypeError("could not sign " + C + " and / or " + D);
      }
    }
  }]);

  return Integer;
}();

/**
// Example Use

var one = new Integer(32.54);
one.plus('239.32143')

*/