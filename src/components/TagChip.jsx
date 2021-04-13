import { Chip } from '@material-ui/core';
import { Link } from 'react-router-dom';

const TagChip = ({ tag, size = 'medium' }) => (
  <Chip
    clickable
    size={size}
    label={tag}
    component={Link}
    color='secondary'
    variant='outlined'
    to={`/recipes/?tags=${tag}`}
  />
);

export default TagChip;
