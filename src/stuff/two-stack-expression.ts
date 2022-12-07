// explanation more advance algo https://en.wikipedia.org/wiki/Shunting_yard_algorithm

// evaluate simple math expression with parenthesis like ((1 + 2) * 2)
export function twoStackExp(exp: string): number {
  const vls: number[] = [];
  const ops: string[] = [];
  let pos = 0;
  const OPS = /[\+\-\*\/]/;
  const DIGIT = /\d/;

  while (pos < exp.length) {
    if (OPS.test(exp[pos])) {
      ops.push(exp[pos++]);
    } else if (DIGIT.test(exp[pos])) {
      let val: string = exp[pos++];

      while (DIGIT.test(exp[pos])) {
        val += exp[pos++];
      }

      vls.push(Number(val));
    } else if (exp[pos] === ")") {
      const op = ops.pop();
      const v2 = vls.pop();
      const v1 = vls.pop();
      pos++;

      vls.push(calc(op!, v1!, v2!));
    } else pos++;
  }

  return vls.pop()!;
}

function calc(operator: string, v1: number, v2: number): number {
  if (operator === "+") {
    return v1 + v2;
  } else if (operator === "*") {
    return v1 * v2;
  } else if (operator === "-") {
    return v1 - v2;
  } else if (operator === "/") {
    return v1 / v2;
  } else {
    return 0;
  }
}
