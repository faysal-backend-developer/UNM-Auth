"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const result = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            result[key] = obj[key];
        }
    }
    return result;
};
exports.default = pick;
