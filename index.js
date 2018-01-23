var markdown = require('markdown');
var assert = require('assert');
var formats = require('./recastFormats.js');

function concatArrays (iter, item) {
  return iter.concat(item);
}

function parseNode (node) {
  var type = node[0];

  switch (type) {
    case 'img':
      return [formats.image(node[1].href)];
    case 'para':
      return node.slice(1).map(function (elem) {
        if (typeof elem === 'string') {
          if (/^\s+$/.test(elem)) {
            return null;
          }
          return formats.text(elem);
        }
        return parseNode(elem);
      }).reduce(concatArrays, []);
    default:
      console.error('unsupported format :', node);
      return null;
  }
}

module.exports = function (md) {
  if (typeof md !== 'string') {
    throw new TypeError('first argument must be a string');
  }

  var tree = markdown.markdown.parse(md);

  assert(tree[0] === 'markdown');

  return tree
    .slice(1)
    .map(parseNode)
    .reduce(concatArrays, [])
    .filter(function (elem) { return !!elem; });
}
