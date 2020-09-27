const expect = require('chai').expect;
var IKnowTheKeys = require('../index');

describe('Test functionality', function () {
  const a = [
    {
        keyA: 'valueI',
        id: 'zero',
    },
    {
        keyB: 'valueII',
        id: 'one'
    },
    { a: { b: { c: 2 } }, id: 'world' }
  ];
  
  const b = [
    {
        keyA: 'valueI',
        id: 'four',
    },
    {
        keyB: 'valueIII',
        id: 'five'
    },
    { a: { b: { c: 3 } }, id: 'world' }
  ];
  const c = [
    {
        keyA: 'valueI',
        id: 'nine',
    },
    {
        keyB: 'valueIII',
        id: 'five'
    },
    { a: { b: { c: 3 } }, id: 'world' }
  ];
  
  const instance = new IKnowTheKeys(a, b, 'id');
  expect(instance.getChangedKeys()).to.deep.equal(['world.a.b.c']);
  instance.update({arrayIndexTransformKey: ''});
  expect(instance.getChangedKeys()).to.deep.equal([ '0.id', '1.keyB', '1.id', '2.a.b.c']);
  instance.update({
    next: c
  });
  expect(instance.getChangedKeys()).to.deep.equal([ '0.id', '1.keyB', '1.id', '2.a.b.c' ]);
  instance.update({
    next: c,
    arrayIndexTransformKey: 'id'
  });
  expect(instance.getChangedKeys()).to.deep.equal([ 'world.a.b.c']);
});