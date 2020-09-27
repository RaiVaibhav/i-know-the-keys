I Know the keys
==================
I know which keys are changed when object updated.

### How it will help

Concept is to first flat the coming data and after every update check which key value gets changed.

`IKnowTheKeys` takes 3 argument

```
prev (Required) - Previous Object 
next (Required) - Next object which will be getting compared with prev object
arrayIndexTransformKey (optional) -  To bind the array index with external key
```

`IKnowTheKeys` will return null if length of comparing objects are not same why? becuase it's not it's objective.

### Example

```
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

  const instance = new IKnowTheKeys(a, b);
  expect(instance.getChangedKeys()).to.deep.equal([ '0.id', '1.keyB', '1.id', '2.a.b.c']);

  // Passing the id will ignore those case where id is not same 
  const instance = new IKnowTheKeys(a, b, 'id');
  expect(instance.getChangedKeys()).to.deep.equal(['world.a.b.c']);
```