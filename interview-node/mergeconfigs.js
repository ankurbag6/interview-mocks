/*
Input:
template - 
defaultConfig = {
  display: {
    brightness: 50,
    theme: "light"
  }
}

userConfig = {
  display: {
    theme: "dark",
    font: "San serif"
  }
}

userConfig = {
 picture : {
  type: "jpeg",
  filename: "hello.jpg"
 }
}

output : 

{
  display: {
    brightness: 50,
    theme: "dark",
    font: "San serif"
  }
}

ouptut 2:
{
  display: {
    brightness: 50,
    theme: "light"
  },
  picture : {
    type: "jpeg",
    filename: "hello.jpg"
 }

}
*/
const DEFAULT_CONFIG ={
  display: {
    brightness: 50,
    theme: "light"
  }
}

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

const isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);


function mergeConfigs(userconfig, defaultConfig =DEFAULT_CONFIG) {
    // validation
    if(userconfig === undefined || isEmpty(userconfig)) return defaultConfig;
    // processing
    let res = {...defaultConfig};
    
    //console.log(res);
    for (const prop in userconfig) {
        if(isObject(userconfig[prop]) && isObject(res[prop])) {
            res[prop] = mergeConfigs(userconfig[prop], res[prop]);
        } else {
            // add the props in the res
            res[prop] = userconfig[prop];
        }
    }
    //console.log(res);
    return res;
    
}
let userConfig ={
  display: {
    theme: "dark",
    font: "San serif"
  }
}
console.log(mergeConfigs(userConfig));

