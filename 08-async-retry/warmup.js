// A simple async retry utility.
// Retries a failing async function up to maxAttempts times.

async function retry(fn, maxAttempts, delayMs = 0) {
    for (let i = 0; i < maxAttempts; i++) {
        try {
            return await fn();
        } catch (err) {
            if (i === maxAttempts - 1) throw err;
            if (delayMs > 0) {
                const delay = delayMs * Math.pow(2, i);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
}

// Usage:
const data = await retry(() => fetchFromAPI(), 3);