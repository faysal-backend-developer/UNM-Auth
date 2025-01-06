'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.buildSortObject = void 0;
const buildSortObject = (sortBy, sortOrder) => {
  const validSortOrder = sortOrder === 'desc' ? -1 : 1; // Default to ascending order
  if (sortBy) {
    return { [sortBy]: validSortOrder };
  }
  return {
    createdAt: -1,
  }; // Return empty object if no sorting is needed
};
exports.buildSortObject = buildSortObject;
// STUB : My Formula for Dynamic Sorting :: Using a custom sorting function
