/*
133. Clone Graph https://leetcode.com/problems/clone-graph/description/
Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

class Node {
    public int val;
    public List<Node> neighbors;
}
 

Test case format:

For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.

An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).

Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.

Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.
*/
class Node {
    constructor(val, neighbors) {
        this.val = val === undefined ? 0 : val;
        this.neighbors = neighbors === undefined ? [] : neighbors;
    }
}

function cloneGraph(node) {
    if (node === null) return null; // empty graph

    const cloned = new Map(); // original node -> its clone

    function dfs(curr) {
        // Already cloned? Return the existing copy (handles cycles)
        if (cloned.has(curr)) return cloned.get(curr);

        // 1. Clone this node first, BEFORE recursing
        const copy = new Node(curr.val);
        cloned.set(curr, copy);

        // 2. Clone all neighbors and wire them up
        for (const neighbor of curr.neighbors) {
            copy.neighbors.push(dfs(neighbor));
        }

        return copy;
    }

    return dfs(node);
}

// dfs version
/*

The one subtle ordering trap: you must put the copy in the map before recursing into neighbors. If you wait until after, the cycle 1→2→1 recurses back into node 1, doesn't find it in the map, and clones it again — infinite loop.

Walkthrough on [[2,4],[1,3],[2,4],[1,3]]:

dfs(1): clone 1', map = {1→1'}
  dfs(2): clone 2', map = {1→1', 2→2'}
    dfs(1): already in map → return 1'   ← cycle handled
    dfs(3): clone 3' ... etc.
  dfs(4): clone 4', its neighbor 1 is in map → reuse 1'

*/
/*

Complexity:

Time: O(V + E) — every node is cloned once, every edge is walked once from each side.
Space: O(V) for the map, plus O(V) recursion stack in the worst case (a long chain).

Edge cases: null input (empty graph, handled by the first line) and a single node with no neighbors (the loop just doesn't run — returns a lone clone). Both LeetCode test cases 2 and 3 are covered.

A BFS version with a queue works identically — same map trick, same complexity. Worth knowing that either is acceptable in an interview; DFS is usually less code.
*/

// bfs version
function cloneGraph_bfs(node) {
    if (node === null) return null;

    const clones = new Map();
    clones.set(node, new Node(node.val));

    const q = [node];
    for (let head = 0; head < q.length; head++) {
        const curr = q[head];
        for (const neighbor of curr.neighbors) {
            if (!clones.has(neighbor)) {
                clones.set(neighbor, new Node(neighbor.val));
                q.push(neighbor);
            }
            clones.get(curr).neighbors.push(clones.get(neighbor));
        }
    }
    return clones.get(node);
}

/*

The key insight
This isn't a traversal problem with a visited set bolted on — the map is the visited set:


const clones = new Map();   // original node -> its clone
One structure doing two jobs: clones.has(node) answers "have I seen this?" and clones.get(node) answers "what do I wire the neighbor to?" That's why you don't need a separate visited. Node objects work as Map keys directly (identity-based), which is what makes this clean — no need to key on val.

BFS version

function cloneGraph(node) {
    if (node === null) return null;

    const clones = new Map();
    clones.set(node, new Node(node.val));

    const q = [node];
    for (let head = 0; head < q.length; head++) {
        const curr = q[head];
        for (const neighbor of curr.neighbors) {
            if (!clones.has(neighbor)) {
                clones.set(neighbor, new Node(neighbor.val));
                q.push(neighbor);
            }
            clones.get(curr).neighbors.push(clones.get(neighbor));
        }
    }
    return clones.get(node);
}
Note the placement of the neighbor-push: it's outside the if. The clone is created once, but the edge must be recorded on every encounter — otherwise you'd drop edges to already-cloned nodes and the copy comes out disconnected. That's the most common bug here.

The ordering trap in the DFS version

const copy = new Node(node.val);
clones.set(node, copy);        // BEFORE recursing
for (const neighbor of node.neighbors) {
    copy.neighbors.push(cloneGraphDFS(neighbor, clones));
}
clones.set must come before the recursion. The graph is undirected, so 1→2 means 2→1 exists too; if you recursed first and registered after, node 2 would recurse back into node 1, find nothing in the map, and clone it again — infinite recursion. Registering first makes the cycle hit the clones.has(node) early return.

What the tests showed
All five shapes pass on both, including [] → null and [[]] → single isolated node. I also verified true deep-copy semantics — no node object is shared between original and clone — since a version that returns the original unchanged would pass a naive shape check.

Two extra cases worth knowing:

Self-loop (node.neighbors = [node]) — passes. The map registration handles it for the same reason cycles work.
20,000-node chain — BFS passes; DFS throws RangeError (stack overflow). LeetCode caps this problem at 100 nodes so DFS is safe there, but it's the honest reason to lead with BFS if an interviewer asks which you'd ship.
One process note: my first attempt split the file on class Node {, which also appears inside the problem-statement comment, so it truncated the spec. I rewrote the file with the full statement restored — worth a glance to confirm it reads as you had it.

*/
