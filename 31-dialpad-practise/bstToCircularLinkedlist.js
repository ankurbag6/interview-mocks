function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

var treeToDoublyList = function(root) {
  if (!root) return null;

  let head = null;   // smallest node — set once
  let prev = null;   // last node visited in inorder

  function inorder(node) {
    if (!node) return;

    inorder(node.left);

    // Visit: link prev <-> current
    if (!prev) {
      head = node;          // first node visited = smallest = head
    } else {
      prev.right = node;    // successor link
      node.left = prev;     // predecessor link
    }
    prev = node;

    inorder(node.right);
  }

  inorder(root);

  // Close the circle: prev is now the largest node
  prev.right = head;
  head.left = prev;

  return head;
};