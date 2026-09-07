var lowestCommonAncestor = function(root, p, q) {
    if(root === null) return null;
    if(p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left, p, q);
    else if(p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);
    else return root;
};

// Other approach 
var lowestCommonAncestor = function(root, p, q) {
    while (root !== null) {
        if (p.val < root.val && q.val < root.val) root = root.left;
        else if (p.val > root.val && q.val > root.val) root = root.right;
        else return root;
    }
    return null;
};

/*
O(1) space, no stack. Same algorithm.

Contrast this with the general binary-tree LCA (not a BST), where you must search both sides and the returns stop being pure relays:
*/