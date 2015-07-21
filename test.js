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
  t.push('\n');       l.push('"\\n"');
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
  t.push(new Boolean());  l.push('<Boolean> constructor');
  t.push(new Number());   l.push('<Number> constructor');
  t.push(new String());   l.push('<String> constructor');
  t.push(new Function()); l.push('<Function> constructor');
  t.push(function(){});   l.push('<Function> literal');
  t.push(new Date());     l.push('<Date> constructor');
  t.push(new RegExp());   l.push('<RegExp> constructor');

  // duplicated list to avoid compare objects to itself
  var t2 = [];
  t2.push(true);
  t2.push(false);
  t2.push(2);
  t2.push(1);
  t2.push(0);
  t2.push(-0);
  t2.push(-1);
  t2.push('true');
  t2.push('false');
  t2.push('1');
  t2.push('0');
  t2.push('-0');
  t2.push('-1');
  t2.push('');
  t2.push('\n');
  t2.push(null);
  t2.push(undefined);
  t2.push(Infinity);
  t2.push(-Infinity);
  t2.push([]);
  t2.push({});
  t2.push([[]]);
  t2.push([0]);
  t2.push([1]);
  t2.push(NaN);
  t2.push('potato');
  t2.push(crazyNum);
  t2.push(crazyObj);
  t2.push(new Boolean());
  t2.push(new Number());
  t2.push(new String());
  t2.push(new Function());
  t2.push(function(){});
  t2.push(new Date());
  t2.push(new RegExp());


  var len = t.length;

  describe('should return the same value as native "==" ', function() {
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
        it('( ' + l[i] + ' == ' + l[j] + ' ) => ' + (t[i] == t2[j]), function() {
          expect(eqeq(t[i], t2[j])).to.equal(t[i] == t2[j]);
        });
        it('( ' + l[i] + ' == !' + l[j] + ' ) => ' + (t[i] == !t2[j]), function() {
          expect(eqeq(t[i], !t2[j])).to.equal(t[i] == !t2[j]);
        });
      }
    }
  });
});
