import {
  Box,
  Icon,
  LinearProgress,
  Typography as Text,
} from '@material-ui/core';
import { memo, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

const RatingBar = ({ count, stars, total }) => {
  return (
    <Box display='flex' alignItems='center'>
      <Box marginRight={1}>
        <Text>{stars}</Text>
      </Box>
      <Box flexBasis='100%'>
        <LinearProgress variant='determinate' value={(100 * count) / total} />
      </Box>
    </Box>
  );
};

const RatingGroups = (props) => {
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const groups = useSelector((s) => s.ratings.ratingGroups);

  useEffect(() => {
    const [total, totalStars] = Object.entries(groups || {}).reduce(
      (p, [i, n]) => [p[0] + n, p[1] + n * i],
      [0, 0]
    );
    setTotal(total);
    setAvg((totalStars / total).toFixed(1));
  }, [groups]);

  if (total === 0)
    return (
      <Text align='center' style={{ marginBottom: 16 }}>
        No stats available.
      </Text>
    );

  return (
    <Box display='flex' alignItems='center' marginBottom={2}>
      <Box
        display='flex'
        marginRight={2}
        alignItems='center'
        flexDirection='column'
      >
        <Icon style={{ fontSize: '3em', color: '#f2b01e' }}>star</Icon>
        <Text variant='h5'>
          {avg} <small>({total})</small>
        </Text>
      </Box>
      <Box flexGrow={1}>
        {[5, 4, 3, 2, 1].map((i) => (
          <RatingBar count={groups[i] || 0} stars={i} total={total} key={i} />
        ))}
      </Box>
    </Box>
  );
};

export default memo(RatingGroups);
