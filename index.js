var  { flatten } = require('./flatten');

class IKnowTheKeys {
  constructor(object1, object2, arrayIndexTransformKey) {
    if (!(object1, object2)) {
      throw Error('Missing required params');
    }
    this.orginalObject1 = object1;
    this.orginalObject2 = object2;
    this.arrayIndexTransformKey = arrayIndexTransformKey;
    this.flattenObject1 = flatten(object1, {
      arrayIndexTransformKey,
    });
    this.flattenObject2 = flatten(object2, {
      arrayIndexTransformKey
    });
  }

  getChangedKeys() {
    if (typeof this.orginalObject1 !== typeof this.orginalObject2) {
      return null
    }
    const object1isArray = Array.isArray(this.orginalObject1);
    const object2isArray = Array.isArray(this.orginalObject2);
    if (object1isArray && object2isArray && (this.orginalObject1.length !== this.orginalObject2.length)) {
      return null;
    }
    if (Object.keys(this.orginalObject1).length !== Object.keys(this.orginalObject2).length) {
      return null;
    }
    return Object.keys(this.flattenObject1).reduce((keysArray, key) => {
      if (this.flattenObject2[key] === undefined) {
        return keysArray
      }
      if (this.flattenObject1[key] !== this.flattenObject2[key]) {
        return keysArray.concat(key)
      }
      return keysArray
    }, []);
  }

  update(updateValues) {
    const { prev, next, arrayIndexTransformKey} = updateValues;
    if (typeof arrayIndexTransformKey === 'string') {
      this.arrayIndexTransformKey = arrayIndexTransformKey;
      this.orginalObject1 = prev ? prev : this.orginalObject1
      this.flattenObject1 = flatten(this.orginalObject1, {
        arrayIndexTransformKey,
      });
      this.orginalObject2 = next ? next : this.orginalObject2;
      this.flattenObject2 = flatten(this.orginalObject2, {
        arrayIndexTransformKey,
      });
      return;
    }
    if (prev) {
      this.orginalObject1 = prev;
      this.flattenObject1 = flatten(prev, {
        arrayIndexTransformKey: this.arrayIndexTransformKey,
      });
    }
    if (next) {
      this.orginalObject2 = next;
      this.flattenObject2 = flatten(next, {
        arrayIndexTransformKey: this.arrayIndexTransformKey,
      });
    }
  }
}

module.exports = IKnowTheKeys;