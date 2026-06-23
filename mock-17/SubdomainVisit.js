/***
 * 
Q4 of 5 — Subdomain Visit Count (re-anchor)
You get strings like "9001 discuss.leetcode.com". The visit count applies to every parent subdomain too — so that one entry adds 9001 to discuss.leetcode.com, leetcode.com, and com.
Return all "count domain" strings, any order.
 */
function subdomainVisits(domains) {
    if(domains.length === 0) return [];
    // Declare map, result = []
    const map = new Map();
    const res = []
    // Format <count> <domain>
    // map --> <k,v> --> <domain, count>
    domains.forEach(d => {
        const [count, domain] = d.split(" ");
        // generate subdomanis
        const parts = domain.split(".");
        let subdomain = "";
        for(let i =0; i<parts.length; i++){
            let subdomain = parts.slice(i).join(".");
            let subdomainCount = map.get(subdomain) ?? 0;
            map.set(subdomain, Number(subdomainCount) + Number(count));
        }
    });
    
    map.forEach((subdomainCount, subdomain) => res.push(`${subdomainCount} ${subdomain}` ));


// iterate over the map
 // res.push(`${map.get(key)} ${key}` )
    console.log(res);
    return res;
}

subdomainVisits([
  "900 google.mail.com",
  "50 yahoo.com",
  "1 intel.mail.com",
  "5 wiki.org"
])
// → contains: "901 mail.com", "951 com", "50 yahoo.com",
//             "900 google.mail.com", "1 intel.mail.com",
//             "5 wiki.org", "5 org"



// TIme complexity - O(n + m) where n is the size of array, m is size of map
// Space complexity - O(m) m is size of map
