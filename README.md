# moped-sync-store-base

Base class for moped-sync-stores

[![Dependency Status](https://img.shields.io/gemnasium/mopedjs/moped-sync-store-base.svg)](https://gemnasium.com/mopedjs/moped-sync-store-base)
[![NPM version](https://img.shields.io/npm/v/moped-sync-store-base.svg)](https://www.npmjs.org/package/moped-sync-store-base)

## Installation

    npm install moped-sync-store-base

## Usage

```js
var BaseStore = require('moped-sync-store-base');

function MyStore() {
  BaseStore.call(this);
}
MyStore.prototype = Object.create(BaseStore.prototype);
MyStore.prototype.constructor = MyStore;

MyStore.prototype._getItem = function (collection, id) {
  // todo: implement me
};
MyStore.prototype._getInitial = function (filter) {
  // todo: implement me
};
MyStore.prototype._writeChanges = function (changes) {
  // todo: implement me
};
MyStore.prototype._getChanges = function (id, filter) {
  // todo: implement me
};
```

The base store ensures that all methods correctly return promises, and correctly handle filtering for getInitial and getChanges.

## License

  MIT
