'use strict';

var Promise = require('promise');
var clone = require('clone');
var match = require('mongomatch');

module.exports = BaseStore;
function BaseStore() {}


BaseStore.prototype.getItem = function (collection, id) {
  return Promise.resolve(null).then(function () {
    return this._getItem(collection, id);
  }.bind(this));
};

BaseStore.prototype.getInitial = function (filter) {
  return Promise.resolve(null).then(function () {
    return this._getInitial(filter)
  }.bind(this)).then(function (initial) {
    initial = clone(initial);
    var state = initial.state;
    initial.state = {};
    Object.keys(filter).forEach(function (collection) {
      if (collection in state) {
        initial.state[collection] = state[collection].filter(match.bind(null, filter[collection]));
      } else {
        initial.state[collection] = [];
      }
    }.bind(this));
    return initial;
  }.bind(this));
};

BaseStore.prototype.writeChanges = function (changes) {
  return Promise.resolve(null).then(function () {
    return this._writeChanges(changes);
  }.bind(this));
};

BaseStore.prototype.getChanges = function (id, filter) {
  return Promise.resolve(null).then(function () {
    return this._getChanges(id, filter)
  }.bind(this)).then(function (result) {
    if (result.changes.length === 0) {
      return result;
    }
    var changes = result.changes.filter(function (change) {
      return change.collection in filter;
    });
    var changesInclusion = Promise.all(changes.map(function (change) {
      if (change.action === 'remove' || change.action === 'update') {
        return this.getItem(change.collection, change.itemId).then(function (item) {
          return match(filter[change.collection], item);
        });
      } else {
        return match(filter[change.collection], change.item);
      }
    }.bind(this)));
    return changesInclusion.then(function (changesInclusion) {
      return {
        changes: changes.filter(function (change, index) {
          return changesInclusion[index];
        }),
        next: result.next
      };
    });
  }.bind(this));
};
