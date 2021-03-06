(function(global) {

  'use strict';

  function typeOf(a) {
    if (a === null) {
      return 'null';
    }
    if (typeof a === 'function') {
      return 'object';
    }
    return typeof a;
  }

  function isPrimitive(a) {
    return typeOf(a) !== 'object';
  }

  /**
   * @see http://www.ecma-international.org/ecma-262/5.1/#sec-8.12.8
   * @param <Any>
   * @return <primitive value>
   */
  function toPrimitive(a, hint) {
    if (isPrimitive(a)) {
      return a;
    }

    var toStr, valOf;

    if (hint === 'string' || a instanceof Date) {
      // hint is 'string' or object is a Date

      if (typeof a['toString'] === 'function') {
        toStr = a.toString();
        if (isPrimitive(toStr)) {
          return toStr;
        }
      }

      if (typeof a['valueOf'] === 'function') {
        valOf = a.valueOf();
        if (isPrimitive(valOf)) {
          return valOf;
        }
      }

    } else {
      // no hint, or hint is 'number'

      if (typeof a['valueOf'] === 'function') {
        valOf = a.valueOf();
        if (isPrimitive(valOf)) {
          return valOf;
        }
      }

      if (typeof a['toString'] === 'function') {
        toStr = a.toString();
        if (isPrimitive(toStr)) {
          return toStr;
        }
      }

    }

    throw new TypeError('Cannot convert object to primitive value');
  }

  function toNumber(a) {
    if (typeOf(a) === 'undefined') {
      return NaN;
    }
    if (typeOf(a) === 'null') {
      return 0;
    }
    if (typeOf(a) === 'boolean') {
      return a ? 1 : 0;
    }
    if (typeOf(a) === 'number') {
      return a;
    }
    if (typeOf(a) === 'string') {
      return Number(a);
    }
    // convert object
    return toNumber(toPrimitive(a), 'number');
  }

  // return true if 'a' and 'b' are exactly the same sequence of characters
  // (same length and same characters in corresponding positions)
  function eqeqString(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    for (var i = 0, len = a.length; i < len; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  function eqeqNumber(a, b) {

    function isPositiveZero(number) {
      return number === 0 && (1 / number) === Infinity;
    }

    function isNegativeZero(number) {
      return number === 0 && (1 / number) === -Infinity;
    }

    if (isNaN(a)) {
      return false;
    }

    if (isNaN(b)) {
      return false;
    }

    // If 'a' is the same Number value as 'b', return true.
    if ((new Number(a)).valueOf() === (new Number(b)).valueOf()) {
      return true;
    }

    if (isPositiveZero(a) && isNegativeZero(b)) {
      return true;
    }

    if (isNegativeZero(a) && isPositiveZero(b)) {
      return true;
    }

    return false;
  }

  /**
   * @see http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3
   * @param <Any> x
   * @param <Any> y
   * @return <Boolean>
   */
  function eqeq(x, y) {
    if (typeOf(x) === typeOf(y)) {
      // Type(x) is the same as Type(y)

      if (typeOf(x) === 'undefined') {
        return true;
      }

      if (typeOf(x) === 'null') {
        return true;
      }

      if (typeOf(x) === 'number') {
        return eqeqNumber(x, y);
      }

      if (typeOf(x) === 'string') {
        return eqeqString(x, y);
      }

      if (typeOf(x) === 'boolean') {
        if (x && y) {
          return true;
        }

        if (!x && !y) {
          return true;
        }

        return false;
      }

      // object: Return true if x and y refer to the same object
      return (x === y);

    } else {
      // Type(x) is different as Type(y)

      if ((typeOf(x) === 'null') && (typeOf(y) === 'undefined')) {
        return true;
      }

      if ((typeOf(x) === 'undefined') && (typeOf(y) === 'null')) {
        return true;
      }

      if ((typeOf(x) === 'number') && (typeOf(y) === 'string')) {
        return eqeqNumber(x, toNumber(y));
      }

      if ((typeOf(x) === 'string') && (typeOf(y) === 'number')) {
        return eqeqNumber(toNumber(x), y);
      }

      if (typeOf(x) === 'boolean') {
        return eqeq(toNumber(x), y);
      }

      if (typeOf(y) === 'boolean') {
        return eqeq(x, toNumber(y));
      }

      if (((typeOf(x) === 'string') || (typeOf(x) === 'number')) && (typeOf(y) === 'object')) {
        return eqeq(x, toPrimitive(y, typeOf(x)));
      }

      if ((typeOf(x) === 'object') && ((typeOf(y) === 'string') || (typeOf(y) === 'number'))) {
        return eqeq(toPrimitive(x, typeOf(y)), y);
      }

      return false;
    }
  }


  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    // register as node.js module
    module.exports = eqeq;
  } else {
    if (typeof define === 'function' && define.amd) {
      // register as AMD module
      define([], function() {
        return eqeq;
      });
    } else {
      // register to global scope
      global.eqeq = eqeq;
    }
  }

})(this);
