const DEFAULT_DELIMS = /[,\n]/;

// "//;\n1;2" -> { delim: ";", numbers: "1;2" }
// "1,2"      -> { delim: null, numbers: "1,2" }
function parseHeader(input) {
    if (!input.startsWith("//")) return { delim: null, numbers: input };
    const newlineAt = input.indexOf("\n");
    return {
        delim: input.slice(2, newlineAt),
        numbers: input.slice(newlineAt + 1)
    };
}

function add(input) {
    if (!input) return 0;

    const { delim, numbers } = parseHeader(input);
    console.log({ delim, numbers })
    return numbers
        .split(delim ?? DEFAULT_DELIMS)   // string delim: no regex, no escaping problem
        .map(Number)
        .reduce((a, b) => a + b, 0);
}

// Stage 1
console.log(add(""), "expect 0");
console.log(add(undefined), "expect 0");
console.log(add("1"), "expect 1");
console.log(add("1,2"), "expect 3");
console.log(add("1,2,3"), "expect 6");

// Stage 2
console.log(add("1\n2,3"), "expect 6");
console.log(add("4\n5\n6"), "expect 15");

// Stage 3 — spec's verbatim examples first
console.log(add("//;\n1;2"), "expect 3");
console.log(add("//#\n2#3#4"), "expect 9");
console.log(add("//-\n1-2-3"), "expect 6");
console.log(add("//*\n1*2*3"), "expect 6");   // no escaping needed — split on plain string
console.log(add("//.\n1.2"), "expect 3");     // the case that broke the regex version

// header-like text mid-string is NOT a header
console.log(add("1,2"), "expect 3");