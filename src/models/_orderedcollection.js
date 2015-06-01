/**
 * Copyright 2013 International Business Machines Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Utility library for working with Activity Streams Actions
 * Requires underscorejs.
 *
 * @author James M Snell (jasnell@us.ibm.com)
 */
var Collection = require('./_collection');
var util = require('util');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');
var models = require('../models');

function OrderedCollection(expanded, reasoner, parent) {
  if (!(this instanceof OrderedCollection))
    return new OrderedCollection(expanded, reasoner, parent);
  Collection.call(this,expanded, reasoner, parent);
}
util.inherits(OrderedCollection, Collection);
utils.define(OrderedCollection.prototype, 'startIndex', function() {
  var ret = Math.max(0,this.get(vocabs.as.startIndex));
  return isNaN(ret) ? 0 : ret;
});

OrderedCollection.Builder = function(reasoner, types, base) {
  if (!(this instanceof OrderedCollection.Builder))
    return new OrderedCollection.Builder(reasoner, types, base);
  Collection.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner, vocabs.as.OrderedCollection, types),
    base || new OrderedCollection({}, reasoner));
};
util.inherits(OrderedCollection.Builder, Collection.Builder);
OrderedCollection.Builder.prototype.items = function(val) {
  return this.orderedItems.apply(this,arguments);
};
OrderedCollection.Builder.prototype.startIndex = function(val) {
  utils.set_non_negative_int.call(this, as.startIndex, val);
  return this;
};

module.exports = OrderedCollection;