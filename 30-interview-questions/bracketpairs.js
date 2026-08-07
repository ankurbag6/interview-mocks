/**
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 
 (name)is(age)yearsold
  keys = [];
  scan the string if "(", collect char till ")"
  key.push = string between ( "" )
  if(knowledge[key]) replace key with knowledge[key] 
    else replace key with ?
 */
var evaluate = function(s, knowledge) {
    const keys = [];
    let i =0;

        let begin = false;

        let temp = "";
    for(let c of s) {
        
        if(c === "(") {
            //console.log(c);
            begin =true;
            continue;
        }
        if(c === ")") {
            begin =false;
            keys[i] = temp; 
            temp="";
            
            i++;
        }
        if(begin) { 
            temp += c;
            console.log(c);
        }
        console.log(temp);
    }
    //console.log(keys);
    const text = "Apple, Banana, Apple";
    let result = s;
    console.log(knowledge[0])
    const map = new Map(knowledge);
    for(const k of keys) {
        
        result = result.replaceAll("("+k+")", (map.get(k) ? map.get(k) : '?'));
    }
    return result;

};

console.log(evaluate("(name)is(age)yearsold", [["name","bob"],["age","two"]]));