'use strict';

const trie = require('trie-prefix-tree');

const defaultOptions = {
  replacement: '-',
  symbols: true,
  remove: null,
  lower: true,
  charmap: {/*something*/},
  multicharmap:{
    '<---3': 'love',
    '||': 'or',
    '&&': 'and',
    '🐈': 'cat',
    '$$': 'money',
  },
};


const slug = (content, opts=defaultOptions) => {
  let result = '';
  //TODO: 需要自己实现一个更符合要求的 trie 现在这样又 stringify 又 parse 的太低效了
  const multiCharTrie = JSON.parse(trie(Object.keys(opts.multicharmap)).dump());

  function trieMatch(trie, keyIndex) {

    //FIXME: 下面这里需要再仔细想想

    if (!trie || !trie[content[keyIndex]]) {
      return keyIndex;
    }

    if (trie[content[keyIndex]].$ === 1) {
      return keyIndex;
    }

    return trieMatch(trie[content[keyIndex]], keyIndex + 1);
  };

  for (let i = 0, l = content.length; i < l; i++) {
    const lastIndex = trieMatch(multiCharTrie, i);
    if (i !== lastIndex) {

      //FIXME: 这里做了一个 +1 可能会出现越界的事情，需要想办法来处理一下子
      const key = content.slice(i, lastIndex + 1);
      result = result + opts.multicharmap[key];
      i = lastIndex;
    } else {
      result = result + content[i];
    }
  }

  return opts.lower ? result.toLowerCase() : result;
};

console.log(slug('<---3 || hate'));
