const MAX_MEMORY = 6000;

// brainFuck compiler https://en.wikipedia.org/wiki/Brainfuck
export function brainFuck(code: string, input: string) {
  const mem = new Array(MAX_MEMORY).fill(0);
  let output = [];
  let loops = loopEntry(code);
  let pos = 0;
  let ptr = 0;
  let atInput = 0;

  while (pos < code.length) {
    if (code[pos] === ">") {
      ptr++;
      pos++;
    } else if (code[pos] === "<") {
      ptr--;
      pos++;
    } else if (code[pos] === "+") {
      mem[ptr] = (mem[ptr] + 1) % 255;
      pos++;
    } else if (code[pos] === "-") {
      mem[ptr] = mem[ptr] - 1 >= 0 ? mem[ptr] - 1 : 255;
      pos++;
    } else if (code[pos] === ",") {
      if (atInput >= input.length) {
        break;
      }

      mem[ptr] = input.charCodeAt(atInput++) || 0;
      pos++;
    } else if (code[pos] === ".") {
      output.push(mem[ptr]);
      pos++;
    } else if (code[pos] === "[") {
      if (mem[ptr] === 0) {
        pos = loops.get(pos).closeAt;
      } else pos++;
    } else if (code[pos] === "]") {
      if (mem[ptr] !== 0) {
        pos = loops.get(pos).openAt;
      } else pos++;
    }
  }

  return output.map((v) => String.fromCharCode(v)).join("");
}

function loopEntry(code: string) {
  const table = new Map();
  const stack = [];
  let pos = 0;

  while (pos < code.length) {
    if (code[pos] === "[") {
      stack.push({ type: "OPEN", at: pos++ });
    } else if (code[pos] === "]") {
      const s = stack.pop()!;
      table.set(pos, { type: "CLOSE", openAt: s.at, closeAt: pos });
      table.set(s.at, { type: "OPEN", openAt: s.at, closeAt: pos });
      pos++;
    } else pos++;
  }

  return table;
}
