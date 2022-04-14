export const formatResponses = responses => {
  if (!responses) return null;
  const responsesArray = responses.split(/, ?/);

  if (responsesArray.length > 1)
    return responsesArray.map(response => ({
      key: response,
      value: response,
    }));
  else return responsesArray?.[0];
};

export const removeEmptyKeys = (obj = {}) =>
  Object.entries(obj).reduce(
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );
