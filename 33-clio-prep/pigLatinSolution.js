const VOWELS = ['a', 'e', 'i', 'o', 'u'];
const PUNCT = ['?', '!', ',', '.'];
const isVowel = (ch, idx) => VOWELS.includes(ch) || (ch === 'y' && idx > 0);
const isNumeric = (s) => /^-?\d+$/.test(s);

function convertToPigLatin(str) {
    if (!str) return "";
    if (isNumeric(str)) return str;

    // peel punctuation off the end
    let punct = "";
    if (PUNCT.includes(str[str.length - 1])) {
        punct = str[str.length - 1];
        str = str.slice(0, -1);
        if (!str) return punct;          // token was only punctuation
    }

    const wasCapitalized = str[0] === str[0].toUpperCase() && str[0] !== str[0].toLowerCase();
    str = str.toLowerCase();

    // find end of leading consonant cluster
    let i = 0;
    while (i < str.length && !isVowel(str[i], i)) i++;

    let out = (i === 0)
        ? str + "way"
        : str.slice(i) + str.slice(0, i) + "ay";   // i === str.length works free: "" + whole word

    if (wasCapitalized) out = out[0].toUpperCase() + out.slice(1);
    return out + punct;
}

function convertSentenceToPigLatin(sentence, delim = " ") {
    if (!sentence) return "";
    return sentence.split(delim).map(convertToPigLatin).join(delim);
}