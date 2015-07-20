var eqeq = require('./index.js');
var expect = require('chai').expect;

describe('coercion.js', function() {

  var crazyNum = new Number(1);
  crazyNum.toString = function() { return '2'; };
  crazyNum == 1;

  var crazyObj  = {
    toString: function() { return '2'; }
  }
  crazyObj == 1;

  // test cases
  var t = [];
  // labels
  var l = [];

  t.push(true);       l.push('true');
  t.push(false);      l.push('false');
  t.push(2);          l.push('2');
  t.push(1);          l.push('1');
  t.push(0);          l.push('0');
  t.push(-0);         l.push('-0');
  t.push(-1);         l.push('-1');
  t.push('true');     l.push('"true"');
  t.push('false');    l.push('"false"');
  t.push('1');        l.push('"1"');
  t.push('0');        l.push('"0"');
  t.push('-0');       l.push('"-0"');
  t.push('-1');       l.push('"-1"');
  t.push('');         l.push('""');
  t.push(null);       l.push('null');
  t.push(undefined);  l.push('undefined');
  t.push(Infinity);   l.push('Infinity');
  t.push(-Infinity);  l.push('-Infinity');
  t.push([]);         l.push('[]');
  t.push({});         l.push('{}');
  t.push([[]]);       l.push('[[]]');
  t.push([0]);        l.push('[0]');
  t.push([1]);        l.push('[1]');
  t.push(NaN);        l.push('NaN');
  t.push('potato');   l.push('"potato"');
  t.push(crazyNum);   l.push('crazyNum');
  t.push(crazyObj);   l.push('crazyObj');

  var len = t.length;

  describe('should return the same value as native "==" ', function() {
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
        it('( ' + l[i] + ' == ' + l[j] + ' ) => ' + (t[i] == t[j]), function() {
          expect(eqeq(t[i], t[j])).to.equal(t[i] == t[j]);
        });
      }
    }
  });
});
