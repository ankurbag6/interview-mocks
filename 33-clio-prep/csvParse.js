// ---- parse ----
function parseCsv(fileContent) {
    if (!fileContent) return [];

    const lines = fileContent.split("\n");
    // assuming line 0 is the header: id,name,email
    const records = [];
    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(",");
        if (parts.length < 3) continue;   // skip malformed/blank lines
        records.push({ id: Number(parts[0]), name: parts[1], email: parts[2] });
    }
    return records;
}

// ---- shuffle (Fisher–Yates) ----
// say it: "avoiding sort(() => Math.random() - 0.5) — it's biased"
function shuffle(arr) {
    const out = [...arr];   // copy — don't mutate the caller's array
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));   // 0..i inclusive
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

// ---- driver ----
const fileContent = `id,name,email
1,Alice,alice@clio.com
2,Bob,bob@clio.com
3,Alicia,alice@clio.com
4,Dana,dana@clio.com
5,Bob,bob.w@clio.com`;

const records = parseCsv(fileContent);
console.log("parsed:", records.length, "records");   // expect 5

for (const r of shuffle(records)) {
    console.log(`${r.id},${r.name},${r.email}`);
}

console.log("[" + parseCsv("").length + "] expect 0");