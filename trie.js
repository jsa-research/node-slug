'use strict';

module.exports = array => array.reduce((trie, item ) => {
  item
    .toLowerCase()
    .split('')
    .reduce((subTrie, c, index, array) => {
      subTrie[c] = subTrie[c] || {};
      subTrie = subTrie[c];

      if (index === array.length - 1) {
        subTrie['$'] = 1;
      }

      return subTrie;
    }, trie);
  return trie;
}, {});
