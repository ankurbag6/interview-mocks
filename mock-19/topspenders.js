const transactions = [
    { userId: 'a', amount: 50, timestamp: 1 },
    { userId: 'b', amount: 120, timestamp: 2 },
    { userId: 'a', amount: 60, timestamp: 3 },
    { userId: 'c', amount: 30, timestamp: 4 }
];

// threshold: 100
// → ['b', 'a']   // totals: b=120, a=110, c=30

function topSpenders(transactions, threshold) {

    //transactions --> empty --> return empty array
    if (!transactions) return [];
    // create a res array
    // temp map
    const map = new Map();
    const res = [];
    // group by userId
    // save in the map
    transactions.forEach(t => {
        let temp = map.get(t.userId);
        map.set(t.userId, temp === undefined ? t.amount : t.amount + temp);
    })

    console.log("map", map);

    // sort by desnding order
    // 1. Convert to array using spread operator [...]
    // 2. Sort descending using b[1] - a[1] (index 1 is the value)
    const sortedArray = [...map].sort((a, b) => b[1] - a[1]);

    // 3. Rebuild into a new Map
    const descendingMap = new Map(sortedArray);

    console.log(descendingMap);
    // Iterate over the map
    // check if map.get(k) > threshold --> push to res
    descendingMap.forEach((value, key) => {
        if (value > threshold)
            res.push(key);
    });
    console.log(res);
    return res;

}

topSpenders(transactions, 100);