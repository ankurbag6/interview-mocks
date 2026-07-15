/*

Merchants need an inventory check for incoming orders. 
Given the store's inventory — product SKUs and 
how many units are in stock — 
and an order containing line items (SKU + quantity), 
tell me whether the order can be fulfilled. Take it away."


Input: One order at a time, not a list. Signature-wise think canFulfill(inventory, order) → boolean. 

Inventory is the store's stock — SKU → units available. An order is line items: [{ sku, qty }, ...].

Your assumption 1: Correct — single store, one inventory.
Edge cases : 
what happens when an order references a SKU that doesn't exist in inventory at all? I will throw and error :SKU not available

And can the same SKU appear on two lines of one order? Yes we can allow 2 SKUs. From UX POV: WE can handle combiniing the SKUs. but for simplicity we can allow in this example

implementation plan-
------------------------
class StoreInventory:
------------------------
inventory: Map(<sku, qty>)
constructor(sku, qty): StoreInventory
 --> inventory = new Map()
 -->inventory.set(sku, updatedQty)

canFulfill(inventory, order): Boolean
--> if Order is not empty
    --> Scan the order, check the inventory
    --> if(inventory.get(sku) === null) throw error return
    --> if(order[sku].qty <= inventory.get(sku)) return true
return false    

*/

function canFulfill(inventory, order) {
    /*
    --> if Order is not empty
    --> Scan the order, check the inventory
    --> if(inventory.get(sku) === null) throw error return
    --> if(order[sku].qty <= inventory.get(sku)) return true
    return false  */
    if(!order) return false;
    const map = new Map();
    for(const listItem of order) {
        if(!inventory.has(listItem.sku)) throw new Error("Error: Invalid SKU");
        // agregate the qty
        map.set(listItem.sku, map.get(listItem.sku) ? map.get(listItem.sku) + listItem.qty :listItem.qty);

    }

    // iterate over the map
    return [...map].every(([sku, qty]) => qty <= inventory.get(sku));

}


// Inventory: a Map of  SKU -> units in stock
const inventory = new Map([
    ["APPLE", 10],
    ["BREAD", 3],
    ["MILK", 0],
]);

// Orders: each is an array of line items { sku, qty }
const cases = [
    { name: "enough stock",          order: [{ sku: "APPLE", qty: 5 }],                            expected: true  },
    { name: "exact stock",           order: [{ sku: "BREAD", qty: 3 }],                            expected: true  },
    { name: "not enough",            order: [{ sku: "APPLE", qty: 20 }],                           expected: false },
    { name: "zero stock",            order: [{ sku: "MILK",  qty: 1 }],                            expected: false },
    { name: "unknown SKU",           order: [{ sku: "EGGS",  qty: 1 }],                            expected: "throws" },
    { name: "multi-line all ok",     order: [{ sku: "APPLE", qty: 4 }, { sku: "BREAD", qty: 2 }],  expected: true  },
    { name: "multi-line one fails",  order: [{ sku: "APPLE", qty: 4 }, { sku: "BREAD", qty: 10 }], expected: false },
    { name: "same SKU twice (2+2>3)",order: [{ sku: "BREAD", qty: 2 }, { sku: "BREAD", qty: 2 }],  expected: false },
    { name: "empty order",           order: [],                                                    expected: true  },
    { name: "null order",            order: null,                                                  expected: false },
];

for (const { name, order, expected } of cases) {
    try {
        const result = canFulfill(inventory, order);
        //console.log("result",result)
        const pass = result === expected;
        console.log(`${pass ? "PASS" : "FAIL"}  ${name.padEnd(24)} -> got ${result}, expected ${expected}`);
    } catch (e) {
        const pass = expected === "throws";
        console.log(`${pass ? "PASS" : "FAIL"}  ${name.padEnd(24)} -> threw "${e.message}"`);
    }
}
