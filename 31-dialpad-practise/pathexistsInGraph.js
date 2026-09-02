/*
1971. Find if Path Exists in Graph

There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). 
The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. 
Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

You want to determine if there is a valid path that exists from vertex source to vertex destination.

Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise

Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: There are two paths from vertex 0 to vertex 2:
- 0 → 1 → 2
- 0 → 2

Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: There is no path from vertex 0 to vertex 5.
 

Constraints:

1 <= n <= 2 * 105
0 <= edges.length <= 2 * 105
edges[i].length == 2
0 <= ui, vi <= n - 1
ui != vi
0 <= source, destination <= n - 1
There are no duplicate edges.
There are no self edges.

*/

// bfs


function isPathExists(n, edges, source, destination) {
    let res = false;
    const adjGraph = new Map(); // <node -> []>
    const visited = Array(n).fill(-1);
    // Create Adj Graph
    for(const [s,e] of edges) {
        if (!adjGraph.has(s)) adjGraph.set(s, []);
        if (!adjGraph.has(e)) adjGraph.set(e, []);
        adjGraph.get(s).push(e);
        adjGraph.get(e).push(s);
    }
    console.log(adjGraph, visited);
    // bfs
    res = bfs(source, destination, visited, adjGraph);
    return res;
}
function bfs(source, destination, visited, adjGraph) {

    const q = [];
    q.push(source); // q : 0
    visited[source] = 1; //[1 ....]
    if(source === destination)
        return true;
    while(q.length !== 0) {
        const currNode = q.shift(); // 0 q : [] // 1 q :[2]
        if(currNode === destination)
            return true;
        const neighbors = adjGraph.get(currNode) ?? []; // [1, 2] // [0]
        for(const neighbor of neighbors) {
            if(visited[neighbor] === -1) {
                q.push(neighbor); // q : [1 ]
                visited[neighbor] = 1; // [1 1]
            }
        }
    }
    return false;
}

/**
 * 
 * ALternate solution
One thing left: q.shift() — line 63
I want to correct something I implied last round. I said shift() "will likely TLE," and my first scale test seemed to contradict that — a 200k chain ran in 101ms. That's because a chain keeps the queue at one or two elements, so shift() has nothing to re-index. It wasn't testing what I claimed.

The case that actually exercises it is a star — vertex 0 adjacent to everything, so the queue balloons to ~200k entries before any of them are dequeued:


shiftVer   3152 ms
headVer      30 ms
105× slower, same graph, same algorithm — only the dequeue differs. So the concern was real, but it's shape-dependent, not universal: it needs a graph where the frontier gets wide. High-degree vertices are exactly what LeetCode's large tests include.

The fix is the read pointer:

*/

// for (let head = 0; head < q.length; head++) {
//     const currNode = q[head];
//     if (currNode === destination) return true;
//     for (const neighbor of adjGraph.get(currNode) ?? []) {
//         if (visited[neighbor] === -1) {
//             visited[neighbor] = 1;
//             q.push(neighbor);
//         }
//     }
// }


console.log(isPathExists(3, [[0,1],[1,2],[2,0]], 0, 2));
console.log(isPathExists(6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5));