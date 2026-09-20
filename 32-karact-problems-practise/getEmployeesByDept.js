/*
**Mini-Mock 1 — Maps warm-up** (15 min, one problem, two small parts)

Xero's HR system exports `[employee, department]` pairs:

```js
records = [
  ["Priya", "Payments"],
  ["Tom", "Reporting"],
  ["Aisha", "Payments"],
  ["Ben", "Tax"],
  ["Lena", "Reporting"]
]
```

**Part 1:** Return a Map (or object) of department → list of employees:

```js
// → { Payments: ["Priya", "Aisha"], Reporting: ["Tom", "Lena"], Tax: ["Ben"] }
```

**Part 2** comes after Part 1 passes.

Rules still apply: approach + complexity up front, trace before "done." Clock starts now.
*/

let records = [
  ["Priya", "Payments"],
  ["Tom", "Reporting"],
  ["Aisha", "Payments"],
  ["Ben", "Tax"],
  ["Lena", "Reporting"],

  ["sena", "Reporting"]
]


function getEmployeesByDept(records) {
    const empByDepts = new Map();
    if(records === undefined || records.length === 0) return empByDepts;
    // department → list of employees
    
    for(const [employee, department] of records) {
        if(!empByDepts.has(department)) empByDepts.set(department, []);
        empByDepts.get(department).push(employee);
    }
    return empByDepts;
        
}

/*
Part 2: Return the department with the most employees. Ties → alphabetically first department.
*/
const empByDept = getEmployeesByDept(records);
const mapAsc = new Map([...empByDept.entries()].sort((a,b) => b[1].length - a[1].length || a[0].localeCompare(b[0])));

console.log({sortedMap : mapAsc});
// Time - O(n) 
// Space - O(n) 


function getDeptWithMostEmp() {
    const empByDept = getEmployeesByDept(records);
    let resDept = "", maxCnt = 0;
    for(const [dept, empList] of empByDept) {
        if(empList.length > maxCnt) {
            resDept = dept;
            maxCnt = empList.length;
        } else if(empList.length === maxCnt) {
            if(dept.localeCompare(resDept) < 0)
                resDept = dept;
        }
    }
    return resDept;
}

console.log(getDeptWithMostEmp());
// Time - O(D) , Space - O(1)

console.log(getEmployeesByDept(records));
// Time - O(n) 
// Space - O(n) 