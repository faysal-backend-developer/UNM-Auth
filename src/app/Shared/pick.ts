const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
) => {
  const result: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }

  return result;
};

export default pick;
