export const getLastPageFromLinks = (links) => {
  if (!links || typeof links !== "string") {
    return null;
  }

  const result = links.match(/_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"/);

  if (!result) {
    return null;
  }

  return result ? Number(result[1]) : 1;
};
