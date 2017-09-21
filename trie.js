'use strict';

module.exports = input => input.reduce((trie, item) => {
  [...item].reduce((word, c, index, array) => {
    word[c] = word[c] || {};
    word = word[c];
    if (index === array.length - 1) {
      word.$ = 1;
    }
    return word;
  }, trie);
  return trie;
}, {});
