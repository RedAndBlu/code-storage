"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
// solution to the codewars challenge
function add(n1, n2) {
    const len = Math.max(n1.length, n2.length);
    const rst = new Array(len + 1).fill(0);
    for (let i = 1; i <= len; i++) {
        rst[rst.length - i] += digit(n1[n1.length - i]) + digit(n2[n2.length - i]);
        rst[rst.length - 1 - i] = Math.trunc(rst[rst.length - i] / 10);
        rst[rst.length - i] = rst[rst.length - i] % 10;
    }
    return rst[0] === 0 ? rst.slice(1, rst.length).join("") : rst.join("");
}
exports.add = add;
function digit(n) {
    return Number(n) || 0;
}
