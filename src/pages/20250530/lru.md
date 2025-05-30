---
title: 'lru缓存'
layout: ../../layouts/main.astro
---

# LRU缓存数据结构

<style>
    pre{
        width: 50vw;
        margin: 0 auto;
        padding: 20px;
    }
</style>

```js
class Node {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.cache = {}; // 哈希表：key -> Node
    this.size = 0; // 当前缓存大小
    this.capacity = capacity; // 最大容量

    // 初始化伪头尾节点
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  _addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }
  _removeNode(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  }
  _moveToHead(node) {
    this._removeNode(node);
    this._addToHead(node);
  }
  _popTail() {
    const node = this.tail.prev;
    this._removeNode(node);
    return node;
  }
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.cache[key];
  if (!node) return -1;
  this._moveToHead(node);
  return node.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const node = this.cache[key];
  if (node) {
    node.value = value;
    this._moveToHead(node);
  } else {
    const newNode = new Node(key, value);
    this.cache[key] = newNode;
    this._addToHead(newNode);
    this.size++;
    if (this.size > this.capacity) {
      const tailNode = this._popTail();
      delete this.cache[tailNode.key];
      this.size--;
    }
  }
};


```