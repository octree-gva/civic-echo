export const formatResponses = responses => {
  if (!responses) return null;

  return responses.split(/, ?/);
};

export const removeEmptyKeys = (obj = {}) =>
  Object.entries(obj).reduce(
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );
