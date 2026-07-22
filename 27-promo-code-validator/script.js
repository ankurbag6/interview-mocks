/*

Quick one to start the day. Merchants can create promo codes for their stores, and we need a validator for the code format before it hits the database. A valid code: 4–12 characters, uppercase letters and digits only, must start with a letter. Return whether a given code is valid — and if it's invalid, the caller needs to know why. Take it away

// Validator for the promo code

Rules of valid code :
4-12 chars
uppercase & digital only
must start with a letter

return a "code is valid"
else throw err with message why not valid
*/

/**
 Assumption / Plan :

Create a function validatePromoCode
if empty string, throw error --> empty string not allowed
check car length: should be between 4-12, throw error
Start not a letter throw error
Scan the string 1. check for uppercase & digital chars only 2. else throw error
return valid
 */
function isDigit(char) {
  return /^\d$/.test(char);
}
function isUpper(char) {
  return /^[A-Z]$/.test(char);
}
function validatePromoCode(promo) {

    if(typeof promo !== 'string' || promo === '') throw new Error("Error: NOt a valid String");
    const len = promo.length;
    const arr = [...promo];
    
    if(len<4 || len>12) throw new Error("Error: Length should be between 4-12");
    
    if (!isUpper(arr[0])) throw new Error("Error: Must start with a letter");

    for(const ch of promo) {
        //Scan the string 1. check for uppercase & digital chars only 2. else throw error
        if(!isUpper(ch) && !isDigit(ch)) throw new Error("Error: Only uppercase letters and digits allowed");
    }
    return true;
}

// Tests
function runTests() {
    const expectValid = (input) => {
        try {
            const result = validatePromoCode(input);
            console.log(`PASS: ${JSON.stringify(input)} -> valid (${result})`);
        } catch (e) {
            console.log(`FAIL: ${JSON.stringify(input)} -> expected valid but threw "${e.message}"`);
        }
    };

    const expectInvalid = (input) => {
        try {
            validatePromoCode(input);
            console.log(`FAIL: ${JSON.stringify(input)} -> expected error but returned valid`);
        } catch (e) {
            console.log(`PASS: ${JSON.stringify(input)} -> threw "${e.message}"`);
        }
    };

    // 1. Empty, undefined, null
    expectInvalid("");
    expectInvalid(undefined);
    expectInvalid(null);

    // 2. Valid strings
    expectValid("ABC123");
    expectValid("P1Q1R1D");

    // 3. Invalid strings
    expectInvalid("1ABCAS");     // starts with a digit
    expectInvalid("*#@#@#@#");   // symbols only
    expectInvalid("@ABC");       // starts with a symbol
}

runTests();
