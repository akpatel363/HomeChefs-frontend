import { Chip, Icon } from '@material-ui/core';
import { memo } from 'react';

const RatingChip = ({ stars, ...rest }) => (
  <Chip
    label={stars !== '0.0' ? stars : 'Not rated'}
    icon={<Icon style={{ color: '#f2b01e' }}>star</Icon>}
    {...rest}
  />
);

export default memo(RatingChip);
