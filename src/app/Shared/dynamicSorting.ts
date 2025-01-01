export const buildSortObject = (
  sortBy?: string,
  sortOrder?: string,
): Record<string, 1 | -1> => {
  const validSortOrder = sortOrder === 'desc' ? -1 : 1; // Default to ascending order
  if (sortBy) {
    return { [sortBy]: validSortOrder };
  }
  return {}; // Return empty object if no sorting is needed
};

// TODO : My Formula for Dynamic Sorting :: Using a custom sorting function
