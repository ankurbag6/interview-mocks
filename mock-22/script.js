class SSEParser {
    output;
    constructor() {
    this.buffer = '';
  }

  feed(chunk) {
    this.buffer += chunk;
    const events = [];

    let separatorIdx;
    while ((separatorIdx = this.buffer.indexOf('\n\n')) !== -1) {
      const rawEvent = this.buffer.slice(0, separatorIdx);
      this.buffer = this.buffer.slice(separatorIdx + 2);
      events.push(this.parseEvent(rawEvent));
    }

    return events.filter(e => e !== null);
  }

  parseEvent(raw) {
    // SSE allows multi-line data: fields that should be joined with \n.
    // Most LLM streams use single-line, but doing this correctly is cheap.
    const dataLines = [];
    for (const line of raw.split('\n')) {
      if (line.startsWith('data:')) {
        // spec: optional single space after the colon
        dataLines.push(line.startsWith('data: ') ? line.slice(6) : line.slice(5));
      }
      // ignoring event:, id:, retry: for now — could add if needed
    }

    if (dataLines.length === 0) return null;
    const data = dataLines.join('\n');

    if (data === '[DONE]') {
      return { type: 'done' };
    }

    try {
      return { type: 'data', payload: JSON.parse(data) };
    } catch (err) {
      return { type: 'error', raw: data, message: err.message };
    }
  }
}

// quick sanity check — feel free to add more
const parser = new SSEParser();
console.log(parser.feed('data: {"token": "Hel'));
// → []
// nothing complete yet — the event ends mid-JSON, no \n\n seen
console.log(parser.feed('lo"}\n\ndata: {"token": " world"}\n\ndata: [DONE]\n\n'));
// → [
//     { type: 'data', payload: { token: 'Hello' } },
//     { type: 'data', payload: { token: ' world' } },
//     { type: 'done' }
//   ]