export const buildSortObject = (
  sortBy?: string,
  sortOrder?: string,
): Record<string, 1 | -1> => {
  const validSortOrder = sortOrder === 'desc' ? -1 : 1; // Default to ascending order
  if (sortBy) {
    return { [sortBy]: validSortOrder };
  }
  return {
    createdAt: -1,
  }; // Return empty object if no sorting is needed
};

// STUB : My Formula for Dynamic Sorting :: Using a custom sorting function
