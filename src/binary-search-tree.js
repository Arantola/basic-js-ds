const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
  }
}

class BinarySearchTree {
  constructor () {
    this.rootNode = null;
  }

  root () {
    return this.rootNode;
  }

  add (data) {
    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      } else {
        if (data > node.data) {
          node.right = addNode(node.right, data);
        } else if (data < node.data) {
          node.left = addNode(node.left, data);
        }
        return node;
      }
    }

    this.rootNode = addNode(this.rootNode, data);
    return;
  }

  find (data) {
    function findNode(node, data) {
      if (!node) return null;
      if (data === node.data) return node;
      if (data > node.data) {
        return findNode(node.right, data);
      } else {
        return findNode(node.left, data);
      }
    }

    let node = findNode(this.rootNode, data);
    return node;
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  remove (data) {
    function removeNode(node, data) {
      if (!node) return;
      if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let minRight = node.right;
        while (minRight.left) minRight = minRight.left;

        node.data = minRight.data;
        node.right =  removeNode(node.right, minRight.data);

        return node;
      }
    }
    this.rootNode = removeNode(this.rootNode, data);
  }

  min () {
    let current = this.rootNode;
    if (!current) return null;
    while (current.left) current = current.left;
    return current.data;
  }

  max () {
    let current = this.rootNode;
    if (!current) return null;
    while (current.right)current = current.right;
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
  Node
};