const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour12: true,
  minute: 'numeric',
  hour: 'numeric',
});

export const formatDate = (date) => {
  try {
    return dateFormatter.format(new Date(date));
  } catch (err) {
    return 'Not available';
  }
};

const timeMapping = {
  year: 31536000000,
  month: 2592000000,
  week: 604800000,
  day: 86400000,
  hour: 3600000,
  minute: 60000,
  second: 1000,
};

export const timeSince = (date) => {
  try {
    const diff = Date.now() - new Date(date);
    for (let k in timeMapping) {
      const res = Math.floor(diff / timeMapping[k]);
      if (res !== 0) {
        if (res === 1 && k === 'day') return 'Yesterday';
        return `${res} ${k}${res > 1 ? 's' : ''} ago`;
      }
    }
    return 'Few moments ago';
  } catch (err) {
    return 'Not available';
  }
};

export const representTime = (time) => {
  const t = parseInt(time);
  if (isNaN(t)) return 'Not Available';
  const q = parseInt(time / 60);
  const r = time % 60;
  let res = '';
  if (q) res += `${q} Hour${q > 1 ? 's' : ''}`;
  if (r && q) res += ', ';
  if (r) res += `${r} Minute${r > 1 ? 's' : ''}`;
  return res;
};

export const plural = (value, suffix = 's') => {
  if (value === 1) return '';
  return suffix;
};

export const image = (src, small = true) => {
  if (src) return process.env.REACT_APP_URL + src;
  return `https://picsum.photos/id/488/${small ? '400/250' : '800/500'}`;
};
