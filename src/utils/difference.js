const getDifference = (o1, o2) =>
  Object.keys(o1).reduce((d, k) => {
    if (
      typeof o1[k] === 'object' &&
      typeof o2[k] === 'object' &&
      (o1[k] || o2[k])
    ) {
      if (o1[k] && o2[k]) {
        if (o1[k].length !== o2[k].length) d[k] = o1[k];
        else if (o1[k].some((e, i) => e !== o2[k][i])) d[k] = o1[k];
      } else d[k] = o1[k];
    } else if (o1[k] !== o2[k]) d[k] = o1[k];
    return d;
  }, {});

export default getDifference;
